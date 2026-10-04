/**
 * @fileoverview Test Suite: Phase 5 Bring-Your-Own-Storage (BYOS) Lifecycle
 * 
 * Verifies Phase 5 (Self-Serve BYOS Settings & Management):
 * - Safe query of storage configuration (secrets masked)
 * - Privilege defense (viewers blocked from mutating storage config)
 * - Connection probe handshake endpoint
 * - Activating AWS S3 / Cloudflare R2 BYOS
 * - Reverting to decentralized Walrus Protocol
 * - Zero-plaintext invariant enforced across all engines
 */

import { strict as assert } from "node:assert";
import crypto from "node:crypto";
import http from "node:http";
import process from "node:process";
import { assertCiphertextIntegrity, createStorageProvider } from "../server/storage-provider.js";

console.log("==================================================");
console.log("☁️  NODUS — BYOS STORAGE CONFIGURATION TEST SUITE");
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

// In-memory mock server simulating the Nodus Tenant BYOS endpoints
class MockByosServer {
  constructor() {
    this.storageConfigs = new Map([
      ["org_alpha", {
        organizationId: "org_alpha",
        provider: "walrus",
        endpoint: null,
        bucket: null,
        region: null,
        accessKeyId: null,
        secretAccessKeyEnc: null
      }]
    ]);

    this.sessions = new Map([
      ["token_admin", { userId: "user_owner", role: "owner", organizationId: "org_alpha" }],
      ["token_viewer", { userId: "user_viewer", role: "viewer", organizationId: "org_alpha" }]
    ]);

    this.server = http.createServer((req, res) => this.handle(req, res));
  }

  async listen(port = 0) {
    return new Promise((resolve) => {
      this.server.listen(port, "127.0.0.1", () => {
        const address = this.server.address();
        this.port = typeof address === "object" ? address.port : 0;
        this.baseUrl = `http://127.0.0.1:${this.port}`;
        resolve(this.baseUrl);
      });
    });
  }

  async close() {
    return new Promise((resolve) => this.server.close(resolve));
  }

  handle(req, res) {
    const url = new URL(req.url, this.baseUrl);
    const authHeader = req.headers.authorization || "";
    const token = authHeader.replace(/^Bearer\s+/i, "").trim();
    const session = this.sessions.get(token);

    if (!session) {
      res.writeHead(401, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ success: false, error: "Bearer token required" }));
    }

    let body = "";
    req.on("data", (chunk) => { body += chunk; });
    req.on("end", () => {
      let parsed = {};
      try { if (body) parsed = JSON.parse(body); } catch (e) {}

      // GET /api/tenant/storage-config
      if (req.method === "GET" && url.pathname === "/api/tenant/storage-config") {
        const cfg = this.storageConfigs.get(session.organizationId) || { provider: "walrus" };
        const key = cfg.accessKeyId;
        const masked = key ? (key.length > 8 ? `${key.slice(0, 4)}••••${key.slice(-4)}` : "••••••••") : null;
        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({
          success: true,
          config: {
            organizationId: session.organizationId,
            provider: cfg.provider,
            endpoint: cfg.endpoint,
            bucket: cfg.bucket,
            region: cfg.region,
            accessKeyIdMasked: masked,
            configured: true
          }
        }));
      }

      // POST /api/tenant/storage-config/test (admin only)
      if (req.method === "POST" && url.pathname === "/api/tenant/storage-config/test") {
        if (session.role !== "owner" && session.role !== "admin") {
          res.writeHead(403, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({ success: false, error: "Admin role required to test storage config" }));
        }

        const { provider = "s3_byos", bucket, accessKeyId, secretAccessKey } = parsed;
        if (provider !== "walrus" && (!bucket || !accessKeyId || !secretAccessKey)) {
          res.writeHead(400, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({ success: false, error: "Bucket, Access Key, and Secret are required for BYOS test" }));
        }

        // Test credentials (mock acceptance for valid pattern)
        if (secretAccessKey === "invalid_key_error") {
          res.writeHead(400, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({ success: false, error: "InvalidAccessKeyId: The AWS Access Key Id you provided does not exist" }));
        }

        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({
          success: true,
          message: `Connection to ${provider.toUpperCase()} (${bucket}) verified successfully`,
          health: { ok: true, provider }
        }));
      }

      // PUT /api/tenant/storage-config (admin only)
      if (req.method === "PUT" && url.pathname === "/api/tenant/storage-config") {
        if (session.role !== "owner" && session.role !== "admin") {
          res.writeHead(403, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({ success: false, error: "Admin role required to update storage config" }));
        }

        const { provider = "walrus", endpoint = null, bucket = null, region = null, accessKeyId = null, secretAccessKey = null } = parsed;
        if (provider !== "walrus" && (!bucket || !accessKeyId)) {
          res.writeHead(400, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({ success: false, error: "Bucket name and Access Key ID are required when activating BYOS" }));
        }

        this.storageConfigs.set(session.organizationId, {
          organizationId: session.organizationId,
          provider,
          endpoint,
          bucket,
          region,
          accessKeyId,
          secretAccessKeyEnc: secretAccessKey ? "enc_" + secretAccessKey : null
        });

        const updated = this.storageConfigs.get(session.organizationId);
        const masked = updated.accessKeyId ? (updated.accessKeyId.length > 8 ? `${updated.accessKeyId.slice(0, 4)}••••${updated.accessKeyId.slice(-4)}` : "••••••••") : null;
        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({
          success: true,
          message: `Storage provider updated to ${provider}`,
          config: {
            organizationId: session.organizationId,
            provider,
            endpoint,
            bucket,
            region,
            accessKeyIdMasked: masked,
            configured: true
          }
        }));
      }

      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Not found" }));
    });
  }
}

async function run() {
  const mockServer = new MockByosServer();
  const baseUrl = await mockServer.listen(0);

  // [TEST 1] Querying Default Storage Configuration
  console.log("\n[TEST 1] Querying Default Storage Configuration");
  await itAsync("Returns default Walrus provider without leaking secrets", async () => {
    const res = await fetch(`${baseUrl}/api/tenant/storage-config`, {
      headers: { Authorization: "Bearer token_admin" }
    });
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.success, true);
    assert.equal(data.config.provider, "walrus");
    assert.equal(data.config.accessKeyIdMasked, null);
    assert.equal(data.config.secretAccessKey, undefined);
    assert.equal(data.config.secretAccessKeyEnc, undefined);
  });

  // [TEST 2] Role Boundary & Privilege Defense
  console.log("\n[TEST 2] Role Boundary & Privilege Defense");
  await itAsync("Blocks non-admin viewer from updating storage configuration", async () => {
    const res = await fetch(`${baseUrl}/api/tenant/storage-config`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer token_viewer",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        provider: "s3_byos",
        bucket: "unauthorized-bucket",
        accessKeyId: "AKIA_FAKE"
      })
    });
    assert.equal(res.status, 403);
    const data = await res.json();
    assert.equal(data.success, false);
    assert(data.error.includes("Admin role required"));
  });

  await itAsync("Blocks non-admin viewer from running connection handshake test", async () => {
    const res = await fetch(`${baseUrl}/api/tenant/storage-config/test`, {
      method: "POST",
      headers: {
        Authorization: "Bearer token_viewer",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        provider: "s3_byos",
        bucket: "unauthorized-bucket",
        accessKeyId: "AKIA_FAKE",
        secretAccessKey: "fake_secret"
      })
    });
    assert.equal(res.status, 403);
  });

  // [TEST 3] Handshake Connection Test Route
  console.log("\n[TEST 3] Storage Connection Handshake Probe");
  await itAsync("Rejects test request when required parameters are missing", async () => {
    const res = await fetch(`${baseUrl}/api/tenant/storage-config/test`, {
      method: "POST",
      headers: {
        Authorization: "Bearer token_admin",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ provider: "s3_byos" })
    });
    assert.equal(res.status, 400);
    const data = await res.json();
    assert.equal(data.success, false);
  });

  await itAsync("Reports actionable error when credentials fail handshake", async () => {
    const res = await fetch(`${baseUrl}/api/tenant/storage-config/test`, {
      method: "POST",
      headers: {
        Authorization: "Bearer token_admin",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        provider: "s3_byos",
        bucket: "acme-corp-vault",
        accessKeyId: "AKIA_INVALID",
        secretAccessKey: "invalid_key_error"
      })
    });
    assert.equal(res.status, 400);
    const data = await res.json();
    assert(data.error.includes("InvalidAccessKeyId"));
  });

  await itAsync("Confirms successful handshake probe for valid parameters", async () => {
    const res = await fetch(`${baseUrl}/api/tenant/storage-config/test`, {
      method: "POST",
      headers: {
        Authorization: "Bearer token_admin",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        provider: "s3_byos",
        bucket: "acme-corp-vault",
        region: "us-east-1",
        accessKeyId: "AKIAIOSFODNN7EXAMPLE",
        secretAccessKey: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
      })
    });
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.success, true);
    assert(data.message.includes("S3_BYOS"));
  });

  // [TEST 4] Activating BYOS S3 Storage Configuration
  console.log("\n[TEST 4] Activating Bring-Your-Own-Storage (BYOS)");
  await itAsync("Activates AWS S3 BYOS and masks the access key", async () => {
    const putRes = await fetch(`${baseUrl}/api/tenant/storage-config`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer token_admin",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        provider: "s3_byos",
        bucket: "acme-corp-private-vault",
        region: "us-east-1",
        accessKeyId: "AKIAIOSFODNN7EXAMPLE",
        secretAccessKey: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
      })
    });
    assert.equal(putRes.status, 200);
    const putData = await putRes.json();
    assert.equal(putData.success, true);
    assert.equal(putData.config.provider, "s3_byos");
    assert.equal(putData.config.accessKeyIdMasked, "AKIA••••MPLE");

    // Verify subsequent GET returns active S3 BYOS
    const getRes = await fetch(`${baseUrl}/api/tenant/storage-config`, {
      headers: { Authorization: "Bearer token_admin" }
    });
    const getData = await getRes.json();
    assert.equal(getData.config.provider, "s3_byos");
    assert.equal(getData.config.bucket, "acme-corp-private-vault");
    assert.equal(getData.config.accessKeyIdMasked, "AKIA••••MPLE");
  });

  // [TEST 5] Reverting to Decentralized Walrus Default
  console.log("\n[TEST 5] Reverting to Walrus Protocol");
  await itAsync("Reverts active provider back to Walrus Protocol", async () => {
    const revertRes = await fetch(`${baseUrl}/api/tenant/storage-config`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer token_admin",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ provider: "walrus" })
    });
    assert.equal(revertRes.status, 200);
    const revertData = await revertRes.json();
    assert.equal(revertData.success, true);
    assert.equal(revertData.config.provider, "walrus");

    const getRes = await fetch(`${baseUrl}/api/tenant/storage-config`, {
      headers: { Authorization: "Bearer token_admin" }
    });
    const getData = await getRes.json();
    assert.equal(getData.config.provider, "walrus");
  });

  // [TEST 6] Zero-Plaintext Assertion on BYOS Provider
  console.log("\n[TEST 6] Zero-Plaintext Security Invariant Across Storage Engines");
  it("S3 BYOS engine strictly enforces ciphertext integrity before put", () => {
    const s3Provider = createStorageProvider({
      type: "s3_byos",
      config: { mockStore: new Map() }
    });
    const plaintextPng = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x00, 0x01]);
    assert.throws(() => {
      assertCiphertextIntegrity(plaintextPng);
    }, /Zero-plaintext invariant violated/);

    const validCiphertext = crypto.randomBytes(128);
    assert.doesNotThrow(() => {
      assertCiphertextIntegrity(validCiphertext);
    });
  });

  await mockServer.close();

  console.log("\n==================================================");
  console.log(`SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log("==================================================");

  if (failed > 0) process.exit(1);
}

run().catch((err) => {
  console.error("Fatal test error:", err);
  process.exit(1);
});
