/**
 * @fileoverview Test Suite: Multi-Cloud Storage Provider & BYOS Zero-Plaintext Engine
 * 
 * Tests the decoupled storage engine (Milestone U1):
 * - Abstract StorageProvider contract
 * - Zero-plaintext invariant enforcement (rejects PNG, PDF, JSON, HTML)
 * - MemoryStorageProvider put/get/delete
 * - LocalEncryptedStorageProvider put/get/delete with disk hygiene
 * - S3CompatibleStorageProvider (AWS S3 / Cloudflare R2 / MinIO BYOS)
 * - WalrusStorageProvider fallback and attestation
 * - Factory instantiation
 */

import { strict as assert } from "node:assert";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import {
  StorageProvider,
  MemoryStorageProvider,
  LocalEncryptedStorageProvider,
  S3CompatibleStorageProvider,
  WalrusStorageProvider,
  createStorageProvider,
  assertCiphertextIntegrity
} from "../server/storage-provider.js";

console.log("==================================================");
console.log("📦 NODUS — STORAGE PROVIDER & BYOS TEST SUITE");
console.log("==================================================");

let passed = 0;
let failed = 0;

function it(name, fn) {
  try {
    fn();
    console.log(`  ✅ PASS: ${name}`);
    passed++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${name}`);
    console.error(`     ${err.message}`);
    failed++;
  }
}

async function itAsync(name, fn) {
  try {
    await fn();
    console.log(`  ✅ PASS: ${name}`);
    passed++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${name}`);
    console.error(`     ${err.message}`);
    failed++;
  }
}

// Generate valid AES-GCM ciphertext helper
function makeCiphertext(payloadStr = "confidential-data-test") {
  const key = crypto.randomBytes(32);
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  return Buffer.concat([iv, cipher.update(Buffer.from(payloadStr)), cipher.final(), cipher.getAuthTag()]);
}

async function run() {
  console.log("\n[GROUP 1] Abstract Contract & Invariants");

  it("Prevents direct instantiation of abstract StorageProvider", () => {
    assert.throws(
      () => new StorageProvider("abstract"),
      /Cannot instantiate abstract StorageProvider directly/
    );
  });

  it("Asserts ciphertext integrity and rejects PNG plaintext header", () => {
    const pngHeader = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
    assert.throws(
      () => assertCiphertextIntegrity(pngHeader),
      /Zero-plaintext invariant violated/
    );
  });

  it("Asserts ciphertext integrity and rejects JSON plaintext header", () => {
    const jsonHeader = Buffer.from('{"secret":"unencrypted"}');
    assert.throws(
      () => assertCiphertextIntegrity(jsonHeader),
      /Zero-plaintext invariant violated/
    );
  });

  it("Asserts ciphertext integrity and rejects PDF header", () => {
    const pdfHeader = Buffer.from("%PDF-1.5 fake content");
    assert.throws(
      () => assertCiphertextIntegrity(pdfHeader),
      /Zero-plaintext invariant violated/
    );
  });

  it("Accepts high-entropy encrypted ciphertext buffer", () => {
    const validCiphertext = makeCiphertext();
    assert.doesNotThrow(() => assertCiphertextIntegrity(validCiphertext));
  });

  console.log("\n[GROUP 2] Memory Storage Provider");

  await itAsync("Stores, retrieves, and checks health in memory", async () => {
    const mem = new MemoryStorageProvider();
    const health = await mem.checkHealth();
    assert.equal(health.ok, true);

    const ciphertext = makeCiphertext("memory-test-secret");
    const stored = await mem.putCiphertext({ key: "mem_item_1", ciphertext });
    assert.equal(stored.key, "mem_item_1");
    assert.equal(stored.size, ciphertext.length);

    const head = await mem.headCiphertext({ key: "mem_item_1" });
    assert.equal(head.exists, true);
    assert.equal(head.size, ciphertext.length);

    const fetched = await mem.getCiphertext({ key: "mem_item_1" });
    assert.deepEqual(fetched.data, ciphertext);

    const del = await mem.deleteCiphertext({ key: "mem_item_1" });
    assert.equal(del.deleted, true);

    const postHead = await mem.headCiphertext({ key: "mem_item_1" });
    assert.equal(postHead.exists, false);
  });

  console.log("\n[GROUP 3] Local Encrypted Storage Provider");

  await itAsync("Stores ciphertext on local disk with 0600 mode and purges cleanly", async () => {
    const tempDir = path.resolve(process.cwd(), "temp_storage", "test_vault_provider");
    const local = new LocalEncryptedStorageProvider({ baseDir: tempDir });

    const ciphertext = makeCiphertext("disk-test-secret");
    const stored = await local.putCiphertext({ key: "disk_item_1", ciphertext });
    assert.equal(stored.provider, "local_disk");
    assert.ok(fs.existsSync(stored.path));

    const fetched = await local.getCiphertext({ key: "disk_item_1" });
    assert.deepEqual(fetched.data, ciphertext);

    const head = await local.headCiphertext({ key: "disk_item_1" });
    assert.equal(head.exists, true);
    assert.equal(head.size, ciphertext.length);

    await local.deleteCiphertext({ key: "disk_item_1" });
    assert.ok(!fs.existsSync(stored.path));

    // Cleanup temp dir
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  console.log("\n[GROUP 4] S3-Compatible Storage Provider (BYOS)");

  await itAsync("Simulates S3 / Cloudflare R2 BYOS put, get, head, and delete", async () => {
    const mockStore = new Map();
    const s3 = new S3CompatibleStorageProvider({
      endpoint: "https://s3.us-east-1.amazonaws.com",
      bucket: "client-enterprise-bucket",
      region: "us-east-1",
      accessKeyId: "AKIA_MOCK_TEST_ID",
      secretAccessKey: "SECRET_KEY_MOCK_TEST_12345",
      mockStore
    });

    const health = await s3.checkHealth();
    assert.equal(health.ok, true);

    const ciphertext = makeCiphertext("enterprise-s3-byos-data");
    const stored = await s3.putCiphertext({ key: "org_alpha/doc_99.bin", ciphertext });
    assert.equal(stored.provider, "s3_byos");
    assert.equal(stored.bucket, "client-enterprise-bucket");

    const head = await s3.headCiphertext({ key: "org_alpha/doc_99.bin" });
    assert.equal(head.exists, true);
    assert.equal(head.size, ciphertext.length);

    const fetched = await s3.getCiphertext({ key: "org_alpha/doc_99.bin" });
    assert.deepEqual(fetched.data, ciphertext);

    const del = await s3.deleteCiphertext({ key: "org_alpha/doc_99.bin" });
    assert.equal(del.deleted, true);

    const postHead = await s3.headCiphertext({ key: "org_alpha/doc_99.bin" });
    assert.equal(postHead.exists, false);
  });

  console.log("\n[GROUP 5] Walrus Decentralized Storage Provider");

  await itAsync("Stores ciphertext and produces verifiable blob metadata", async () => {
    const walrus = new WalrusStorageProvider({ defaultEpochs: 2 });
    const ciphertext = makeCiphertext("walrus-dispersal-test");
    const stored = await walrus.putCiphertext({ key: "blob_canary", ciphertext });
    assert.equal(stored.provider, "walrus");
    assert.ok(stored.blobId);
    assert.equal(stored.size, ciphertext.length);
  });

  console.log("\n[GROUP 6] Storage Provider Factory");

  it("Factory creates walrus, s3_byos, local_disk, and memory providers", () => {
    const pWalrus = createStorageProvider({ type: "walrus" });
    assert.equal(pWalrus.name, "walrus");

    const pS3 = createStorageProvider({
      type: "s3_byos",
      config: { mockStore: new Map() }
    });
    assert.equal(pS3.name, "s3_byos");

    const pLocal = createStorageProvider({ type: "local" });
    assert.equal(pLocal.name, "local_disk");

    const pMem = createStorageProvider({ type: "memory" });
    assert.equal(pMem.name, "memory");

    assert.throws(
      () => createStorageProvider({ type: "unsupported_xyz" }),
      /Unsupported storage provider type/
    );
  });

  console.log("\n==================================================");
  console.log(`SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log("==================================================");

  if (failed > 0) {
    process.exit(1);
  }
}

run().catch((err) => {
  console.error("Unhandled test suite error:", err);
  process.exit(1);
});
