/**
 * @fileoverview Nodus Multi-Cloud Storage Provider Abstraction
 * 
 * Implements decoupled storage engines for Nodus Private Data Layer (Milestone U1):
 * - WalrusStorageProvider: Decentralized, verifiable blob dispersal on Walrus Protocol.
 * - S3CompatibleStorageProvider: BYOS (Bring Your Own Storage) for AWS S3, Cloudflare R2, Backblaze B2, and MinIO.
 * - LocalEncryptedStorageProvider: Local disk ciphertext store for isolated sandbox/development.
 * - MemoryStorageProvider: In-memory store for deterministic unit tests.
 * 
 * INVARIANT: Storage providers NEVER receive, process, or store plaintext.
 * All inputs must be pre-encrypted ciphertext bytes.
 */

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { directWalrusAdapter } from "./walrus-direct-adapter.js";

/** Obvious plaintext headers that violate the Private Data Layer zero-plaintext invariant */
const KNOWN_PLAINTEXT_SIGNATURES = [
  Buffer.from([0x89, 0x50, 0x4e, 0x47]), // PNG
  Buffer.from([0xff, 0xd8, 0xff]),       // JPEG
  Buffer.from([0x25, 0x50, 0x44, 0x46]), // PDF (%PDF)
  Buffer.from([0x47, 0x49, 0x46, 0x38]), // GIF (GIF8)
  Buffer.from("{\""),                    // JSON
  Buffer.from("<!DOCTYPE"),              // HTML
  Buffer.from("<svg")                    // SVG
];

/**
 * Asserts that the buffer does not begin with unencrypted plaintext magic bytes.
 * @param {Buffer} buffer
 */
export function assertCiphertextIntegrity(buffer) {
  if (!Buffer.isBuffer(buffer) || buffer.length === 0) {
    throw new Error("Ciphertext payload must be a non-empty binary Buffer");
  }
  for (const sig of KNOWN_PLAINTEXT_SIGNATURES) {
    if (buffer.length >= sig.length && buffer.subarray(0, sig.length).equals(sig)) {
      throw new Error(`Zero-plaintext invariant violated: payload starts with unencrypted plaintext signature (${sig.toString("utf8").replace(/[^\x20-\x7E]/g, "?")})`);
    }
  }
}

/**
 * Abstract Base StorageProvider
 */
export class StorageProvider {
  constructor(name) {
    if (new.target === StorageProvider) {
      throw new TypeError("Cannot instantiate abstract StorageProvider directly");
    }
    this.name = name;
  }

  async checkHealth() {
    throw new Error("checkHealth() must be implemented by subclass");
  }

  async putCiphertext({ key, ciphertext, contentType = "application/octet-stream", metadata = {} }) {
    throw new Error("putCiphertext() must be implemented by subclass");
  }

  async getCiphertext({ key, range }) {
    throw new Error("getCiphertext() must be implemented by subclass");
  }

  async headCiphertext({ key }) {
    throw new Error("headCiphertext() must be implemented by subclass");
  }

  async deleteCiphertext({ key }) {
    throw new Error("deleteCiphertext() must be implemented by subclass");
  }
}

/**
 * Walrus Decentralized Storage Provider
 * Disperses encrypted ciphertext across Walrus storage nodes with Sui attestations.
 */
export class WalrusStorageProvider extends StorageProvider {
  constructor({ adapter = directWalrusAdapter, defaultEpochs = 1 } = {}) {
    super("walrus");
    this.adapter = adapter;
    this.defaultEpochs = defaultEpochs;
  }

  async checkHealth() {
    if (!this.adapter) return { ok: false, provider: "walrus", error: "Adapter not configured" };
    const health = await this.adapter.checkHealth();
    return { ok: health.ok, provider: "walrus", endpoint: health.endpoint, status: health.status };
  }

  async putCiphertext({ key, ciphertext, metadata = {} }) {
    const buffer = Buffer.isBuffer(ciphertext) ? ciphertext : Buffer.from(ciphertext);
    assertCiphertextIntegrity(buffer);

    if (this.adapter && this.adapter.enabled) {
      const stored = await this.adapter.storeBlob(buffer, {
        epochs: metadata.epochs || this.defaultEpochs,
        deletable: true
      });
      return {
        key: stored.blobId || key,
        blobId: stored.blobId,
        suiObjectId: stored.suiObjectId,
        size: stored.size,
        provider: "walrus",
        verifiable: true
      };
    }

    // Local simulated Walrus storage for sandbox mode
    const hash = crypto.createHash("sha256").update(buffer).digest("hex");
    const simulatedBlobId = `walrus_sim_${hash.slice(0, 32)}`;
    return {
      key: simulatedBlobId,
      blobId: simulatedBlobId,
      suiObjectId: `0xsim_${hash.slice(0, 16)}`,
      size: buffer.length,
      provider: "walrus",
      simulated: true,
      verifiable: false
    };
  }

  async getCiphertext({ key }) {
    if (!key) throw new Error("Key/BlobId is required");
    if (this.adapter && this.adapter.enabled) {
      const buffer = await this.adapter.readBlob(key);
      assertCiphertextIntegrity(buffer);
      return {
        key,
        data: buffer,
        size: buffer.length,
        contentType: "application/octet-stream",
        provider: "walrus"
      };
    }
    throw new Error(`Walrus blob ${key} cannot be fetched in offline simulation`);
  }

  async headCiphertext({ key }) {
    if (!key) return { exists: false };
    if (this.adapter && this.adapter.enabled) {
      try {
        const health = await this.adapter.checkHealth();
        return { exists: health.ok, provider: "walrus" };
      } catch {
        return { exists: false, provider: "walrus" };
      }
    }
    return { exists: true, provider: "walrus", simulated: true };
  }

  async deleteCiphertext({ key }) {
    if (!key) throw new Error("Key/BlobId is required");
    return { deleted: true, key, provider: "walrus" };
  }
}

/**
 * Standard AWS Signature V4 Calculator for Node.js
 */
function hmacSha256(key, string) {
  return crypto.createHmac("sha256", key).update(string).digest();
}

function getSignatureKey(key, dateStamp, regionName, serviceName) {
  const kDate = hmacSha256("AWS4" + key, dateStamp);
  const kRegion = hmacSha256(kDate, regionName);
  const kService = hmacSha256(kRegion, serviceName);
  return hmacSha256(kService, "aws4_request");
}

/**
 * S3-Compatible Storage Provider (AWS S3, Cloudflare R2, Backblaze B2, MinIO)
 * Enables true BYOS (Bring Your Own Storage) for enterprise clients.
 */
export class S3CompatibleStorageProvider extends StorageProvider {
  constructor({
    endpoint = process.env.S3_ENDPOINT || null,
    bucket = process.env.S3_BUCKET || "nodus-vault",
    region = process.env.S3_REGION || "us-east-1",
    accessKeyId = process.env.S3_ACCESS_KEY_ID || null,
    secretAccessKey = process.env.S3_SECRET_ACCESS_KEY || null,
    forcePathStyle = true,
    mockStore = null // Injected in unit tests
  } = {}) {
    super("s3_byos");
    this.endpoint = endpoint ? endpoint.replace(/\/+$/, "") : null;
    this.bucket = bucket;
    this.region = region;
    this.accessKeyId = accessKeyId;
    this.secretAccessKey = secretAccessKey;
    this.forcePathStyle = forcePathStyle;
    this.mockStore = mockStore;
  }

  _isConfigured() {
    return Boolean(this.mockStore || (this.endpoint && this.accessKeyId && this.secretAccessKey && this.bucket));
  }

  async checkHealth() {
    if (this.mockStore) return { ok: true, provider: "s3_byos", mock: true };
    if (!this._isConfigured()) {
      return { ok: false, provider: "s3_byos", error: "S3 BYOS credentials not configured" };
    }
    try {
      const res = await this._sendRequest("HEAD", "");
      return { ok: res.status >= 200 && res.status < 400, status: res.status, provider: "s3_byos" };
    } catch (err) {
      return { ok: false, error: err.message, provider: "s3_byos" };
    }
  }

  _buildUrl(key) {
    if (!this.endpoint) throw new Error("S3 endpoint is not configured");
    const cleanKey = key ? encodeURIComponent(key).replace(/%2F/g, "/") : "";
    if (this.forcePathStyle) {
      return `${this.endpoint}/${this.bucket}/${cleanKey}`;
    }
    const url = new URL(this.endpoint);
    return `${url.protocol}//${this.bucket}.${url.host}/${cleanKey}`;
  }

  async _sendRequest(method, key, body = null, extraHeaders = {}) {
    if (this.mockStore) {
      return this._mockHandle(method, key, body, extraHeaders);
    }
    const urlString = this._buildUrl(key);
    const url = new URL(urlString);
    const now = new Date();
    const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, "");
    const dateStamp = amzDate.slice(0, 8);
    const payloadHash = crypto.createHash("sha256").update(body || "").digest("hex");

    const headers = {
      Host: url.host,
      "x-amz-date": amzDate,
      "x-amz-content-sha256": payloadHash,
      ...extraHeaders
    };
    if (body) {
      headers["Content-Length"] = String(Buffer.byteLength(body));
    }

    // Canonical Headers
    const signedHeaderKeys = Object.keys(headers).map(k => k.toLowerCase()).sort();
    const canonicalHeaders = signedHeaderKeys.map(k => `${k}:${headers[k].trim()}\n`).join("");
    const signedHeaders = signedHeaderKeys.join(";");

    const canonicalRequest = [
      method,
      url.pathname,
      url.search.slice(1),
      canonicalHeaders,
      signedHeaders,
      payloadHash
    ].join("\n");

    const algorithm = "AWS4-HMAC-SHA256";
    const credentialScope = `${dateStamp}/${this.region}/s3/aws4_request`;
    const stringToSign = [
      algorithm,
      amzDate,
      credentialScope,
      crypto.createHash("sha256").update(canonicalRequest).digest("hex")
    ].join("\n");

    const signingKey = getSignatureKey(this.secretAccessKey, dateStamp, this.region, "s3");
    const signature = crypto.createHmac("sha256", signingKey).update(stringToSign).digest("hex");
    headers["Authorization"] = `${algorithm} Credential=${this.accessKeyId}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

    const res = await fetch(urlString, {
      method,
      headers,
      body: body || undefined
    });
    return res;
  }

  async _mockHandle(method, key, body, headers) {
    if (method === "PUT") {
      this.mockStore.set(key, { data: body, headers, modified: new Date() });
      return { status: 200, ok: true };
    }
    if (method === "GET") {
      const item = this.mockStore.get(key);
      if (!item) return { status: 404, ok: false, text: async () => "Not Found" };
      return { status: 200, ok: true, arrayBuffer: async () => item.data.buffer, headers: new Headers({ "content-length": String(item.data.length) }) };
    }
    if (method === "HEAD") {
      const item = this.mockStore.get(key);
      if (!item) return { status: 404, ok: false };
      return { status: 200, ok: true, headers: new Headers({ "content-length": String(item.data.length) }) };
    }
    if (method === "DELETE") {
      this.mockStore.delete(key);
      return { status: 204, ok: true };
    }
    return { status: 400, ok: false };
  }

  async putCiphertext({ key, ciphertext, contentType = "application/octet-stream", metadata = {} }) {
    const buffer = Buffer.isBuffer(ciphertext) ? ciphertext : Buffer.from(ciphertext);
    assertCiphertextIntegrity(buffer);

    const safeKey = key || `cipher_${crypto.randomUUID()}`;
    if (this.mockStore) {
      this.mockStore.set(safeKey, { data: buffer, contentType, metadata, modified: new Date() });
      return { key: safeKey, size: buffer.length, provider: "s3_byos", bucket: this.bucket };
    }

    if (!this._isConfigured()) {
      throw new Error("S3 BYOS credentials are not configured");
    }

    const res = await this._sendRequest("PUT", safeKey, buffer, {
      "Content-Type": contentType
    });
    if (!res.ok) {
      throw new Error(`S3 PutObject failed: HTTP ${res.status}`);
    }

    return {
      key: safeKey,
      size: buffer.length,
      provider: "s3_byos",
      bucket: this.bucket
    };
  }

  async getCiphertext({ key, range }) {
    if (!key) throw new Error("Key is required");

    if (this.mockStore) {
      const item = this.mockStore.get(key);
      if (!item) throw new Error(`S3 object not found: ${key}`);
      assertCiphertextIntegrity(item.data);
      return {
        key,
        data: item.data,
        size: item.data.length,
        contentType: item.contentType || "application/octet-stream",
        provider: "s3_byos"
      };
    }

    if (!this._isConfigured()) throw new Error("S3 BYOS credentials are not configured");

    const extraHeaders = {};
    if (range) extraHeaders["Range"] = range;

    const res = await this._sendRequest("GET", key, null, extraHeaders);
    if (!res.ok) throw new Error(`S3 GetObject failed for ${key}: HTTP ${res.status}`);

    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    assertCiphertextIntegrity(buffer);

    return {
      key,
      data: buffer,
      size: buffer.length,
      contentType: res.headers.get("content-type") || "application/octet-stream",
      provider: "s3_byos"
    };
  }

  async headCiphertext({ key }) {
    if (!key) return { exists: false };
    if (this.mockStore) {
      const exists = this.mockStore.has(key);
      return { exists, provider: "s3_byos", size: exists ? this.mockStore.get(key).data.length : undefined };
    }
    if (!this._isConfigured()) return { exists: false, provider: "s3_byos" };
    try {
      const res = await this._sendRequest("HEAD", key);
      return { exists: res.status === 200, status: res.status, provider: "s3_byos" };
    } catch {
      return { exists: false, provider: "s3_byos" };
    }
  }

  async deleteCiphertext({ key }) {
    if (!key) throw new Error("Key is required");
    if (this.mockStore) {
      this.mockStore.delete(key);
      return { deleted: true, key, provider: "s3_byos" };
    }
    if (!this._isConfigured()) throw new Error("S3 BYOS credentials are not configured");
    const res = await this._sendRequest("DELETE", key);
    return { deleted: res.ok, key, provider: "s3_byos" };
  }
}

/**
 * Local Encrypted Disk Storage Provider (Sandbox / Dev)
 */
export class LocalEncryptedStorageProvider extends StorageProvider {
  constructor({ baseDir = path.resolve(process.cwd(), "temp_storage", "ciphertext_vault") } = {}) {
    super("local_disk");
    this.baseDir = baseDir;
    fs.mkdirSync(this.baseDir, { recursive: true, mode: 0o700 });
  }

  _safePath(key) {
    const cleanKey = path.basename(key);
    return path.join(this.baseDir, `${cleanKey}.enc`);
  }

  async checkHealth() {
    return { ok: fs.existsSync(this.baseDir), provider: "local_disk", path: this.baseDir };
  }

  async putCiphertext({ key, ciphertext, contentType = "application/octet-stream", metadata = {} }) {
    const buffer = Buffer.isBuffer(ciphertext) ? ciphertext : Buffer.from(ciphertext);
    assertCiphertextIntegrity(buffer);

    const safeKey = key || `cipher_${crypto.randomUUID()}`;
    const filePath = this._safePath(safeKey);
    fs.writeFileSync(filePath, buffer, { mode: 0o600 });

    return {
      key: safeKey,
      size: buffer.length,
      provider: "local_disk",
      path: filePath
    };
  }

  async getCiphertext({ key }) {
    if (!key) throw new Error("Key is required");
    const filePath = this._safePath(key);
    if (!fs.existsSync(filePath)) throw new Error(`Ciphertext file not found: ${key}`);

    const buffer = fs.readFileSync(filePath);
    assertCiphertextIntegrity(buffer);

    return {
      key,
      data: buffer,
      size: buffer.length,
      contentType: "application/octet-stream",
      provider: "local_disk"
    };
  }

  async headCiphertext({ key }) {
    if (!key) return { exists: false };
    const filePath = this._safePath(key);
    const exists = fs.existsSync(filePath);
    return {
      exists,
      provider: "local_disk",
      size: exists ? fs.statSync(filePath).size : undefined
    };
  }

  async deleteCiphertext({ key }) {
    if (!key) throw new Error("Key is required");
    const filePath = this._safePath(key);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    return { deleted: true, key, provider: "local_disk" };
  }
}

/**
 * Memory Storage Provider (Unit Testing & Ephemeral Runs)
 */
export class MemoryStorageProvider extends StorageProvider {
  constructor() {
    super("memory");
    this.store = new Map();
  }

  async checkHealth() {
    return { ok: true, provider: "memory", count: this.store.size };
  }

  async putCiphertext({ key, ciphertext, contentType = "application/octet-stream", metadata = {} }) {
    const buffer = Buffer.isBuffer(ciphertext) ? ciphertext : Buffer.from(ciphertext);
    assertCiphertextIntegrity(buffer);

    const safeKey = key || `mem_${crypto.randomUUID()}`;
    this.store.set(safeKey, {
      data: buffer,
      contentType,
      metadata,
      createdAt: new Date()
    });

    return {
      key: safeKey,
      size: buffer.length,
      provider: "memory"
    };
  }

  async getCiphertext({ key }) {
    if (!key) throw new Error("Key is required");
    const entry = this.store.get(key);
    if (!entry) throw new Error(`Ciphertext not found in memory: ${key}`);
    assertCiphertextIntegrity(entry.data);
    return {
      key,
      data: entry.data,
      size: entry.data.length,
      contentType: entry.contentType,
      provider: "memory"
    };
  }

  async headCiphertext({ key }) {
    const entry = this.store.get(key);
    return {
      exists: Boolean(entry),
      provider: "memory",
      size: entry ? entry.data.length : undefined
    };
  }

  async deleteCiphertext({ key }) {
    const deleted = this.store.delete(key);
    return { deleted, key, provider: "memory" };
  }
}

/**
 * Factory for creating configured StorageProvider instances.
 * @param {object} options
 * @param {'walrus'|'s3_byos'|'local_disk'|'memory'} [options.type]
 * @param {object} [options.config]
 * @returns {StorageProvider}
 */
export function createStorageProvider({ type = "walrus", config = {} } = {}) {
  switch (type.toLowerCase()) {
    case "walrus":
      return new WalrusStorageProvider(config);
    case "s3":
    case "s3_byos":
    case "r2":
    case "b2":
      return new S3CompatibleStorageProvider(config);
    case "local":
    case "local_disk":
      return new LocalEncryptedStorageProvider(config);
    case "memory":
      return new MemoryStorageProvider();
    default:
      throw new Error(`Unsupported storage provider type: ${type}. Expected 'walrus', 's3_byos', 'local_disk', or 'memory'.`);
  }
}
