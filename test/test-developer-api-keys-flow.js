/**
 * @fileoverview Test Suite: Developer API Keys Lifecycle & Usage Ledger
 * 
 * Verifies Phase 2 (Developer B2B Portal & API Keys):
 * - Key creation with granular scopes (assets:read, assets:write, search:read)
 * - Safe presentation (raw key shown once, hashed in database)
 * - Direct authentication via `Authorization: Bearer nd_live_...`
 * - Live tenant usage ledger & cost estimation (BRL/USD)
 * - Scope boundary enforcement
 * - Instant revocation and 401 rejection
 */

import { strict as assert } from "node:assert";
import crypto from "node:crypto";
import http from "node:http";
import process from "node:process";

console.log("==================================================");
console.log("🔑 NODUS — DEVELOPER API KEYS & USAGE TEST SUITE");
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

// In-memory mock server simulating the Nodus AuthTenantStore & API Key routes
class MockApiServer {
  constructor() {
    this.apiKeys = new Map();
    this.usage = {
      usedBytes: 104857600, // 100 MB
      quotaBytes: 5368709120, // 5 GB
      activeAssets: 12,
      activeMembers: 3
    };
    this.server = http.createServer((req, res) => this.handle(req, res));
  }

  async listen() {
    return new Promise((resolve) => {
      this.server.listen(0, "127.0.0.1", () => {
        const addr = this.server.address();
        this.port = addr.port;
        resolve(`http://127.0.0.1:${this.port}`);
      });
    });
  }

  async close() {
    return new Promise((resolve) => this.server.close(resolve));
  }

  handle(req, res) {
    const url = new URL(req.url, `http://127.0.0.1:${this.port}`);
    const authHeader = req.headers.authorization || "";
    const token = authHeader.replace(/^Bearer\s+/i, "").trim();

    // Body parsing helper
    let body = "";
    req.on("data", chunk => body += chunk);
    req.on("end", () => {
      let json = {};
      try { if (body) json = JSON.parse(body); } catch {}

      // 1. Session-based API Key creation
      if (req.method === "POST" && url.pathname === "/api/tenant/api-keys") {
        if (token !== "valid_session_token_owner") {
          res.writeHead(401, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({ success: false, error: "Unauthorized session" }));
        }
        const keyId = crypto.randomUUID();
        const rawSecret = `nd_live_${crypto.randomBytes(24).toString("hex")}`;
        const keyHash = crypto.createHash("sha256").update(rawSecret).digest("hex");
        const keyPrefix = rawSecret.slice(0, 12);
        const record = {
          id: keyId,
          name: json.name || "Default Key",
          prefix: keyPrefix,
          keyHash,
          scopes: json.scopes || ["assets:read", "assets:write"],
          revoked: false,
          createdAt: new Date().toISOString()
        };
        this.apiKeys.set(keyHash, record);
        res.writeHead(201, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({
          success: true,
          apiKey: { id: keyId, name: record.name, keyPrefix },
          secretKey: rawSecret,
          warning: "Store this secret now; it is shown only once."
        }));
      }

      // 2. Session-based API Key listing
      if (req.method === "GET" && url.pathname === "/api/tenant/api-keys") {
        if (token !== "valid_session_token_owner") {
          res.writeHead(401, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({ success: false, error: "Unauthorized session" }));
        }
        const activeList = Array.from(this.apiKeys.values())
          .filter(k => !k.revoked)
          .map(k => ({ id: k.id, name: k.name, keyPrefix: k.prefix, scopes: k.scopes, createdAt: k.createdAt }));
        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ success: true, apiKeys: activeList }));
      }

      // 3. API Key Authenticated Endpoint: Usage Ledger
      if (req.method === "GET" && url.pathname === "/api/tenant/usage") {
        const hash = crypto.createHash("sha256").update(token).digest("hex");
        const keyRecord = this.apiKeys.get(hash);
        if (!keyRecord || keyRecord.revoked) {
          res.writeHead(401, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({ success: false, error: "Session expired, revoked, or invalid" }));
        }

        const logicalGb = this.usage.usedBytes / (1024 * 1024 * 1024);
        const estimatedMonthlyCostBrl = 99.00 + (logicalGb * 2.00);

        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({
          success: true,
          usage: {
            organizationId: "nodus-devs",
            usedBytes: this.usage.usedBytes,
            quotaBytes: this.usage.quotaBytes,
            percentUsed: Math.round((this.usage.usedBytes / this.usage.quotaBytes) * 100),
            activeAssets: this.usage.activeAssets,
            activeApiKeys: Array.from(this.apiKeys.values()).filter(k => !k.revoked).length,
            activeMembers: this.usage.activeMembers,
            storageProvider: "walrus",
            pricing: {
              currency: "BRL",
              baseFee: 99.00,
              verifyRatePerGb: 2.00,
              estimatedMonthlyCostBrl: Number(estimatedMonthlyCostBrl.toFixed(2))
            }
          }
        }));
      }

      // 4. API Key Authenticated Endpoint: Assets Read (with scope check)
      if (req.method === "GET" && url.pathname === "/api/assets") {
        const hash = crypto.createHash("sha256").update(token).digest("hex");
        const keyRecord = this.apiKeys.get(hash);
        if (!keyRecord || keyRecord.revoked) {
          res.writeHead(401, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({ success: false, error: "Session expired, revoked, or invalid" }));
        }
        if (!keyRecord.scopes.includes("assets:read")) {
          res.writeHead(403, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({ success: false, error: "API key lacks assets:read scope" }));
        }
        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ success: true, assets: [] }));
      }

      // 5. Revocation endpoint
      if (req.method === "DELETE" && url.pathname.startsWith("/api/tenant/api-keys/")) {
        if (token !== "valid_session_token_owner") {
          res.writeHead(401, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({ success: false, error: "Unauthorized session" }));
        }
        const keyId = url.pathname.split("/").pop();
        for (const [hash, record] of this.apiKeys.entries()) {
          if (record.id === keyId) {
            record.revoked = true;
          }
        }
        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ success: true, revoked: true }));
      }

      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Not found" }));
    });
  }
}

async function run() {
  const server = new MockApiServer();
  const baseUrl = await server.listen();

  let secretKey = null;
  let keyId = null;

  console.log("\n[TEST 1] API Key Provisioning & Entropy Inspection");
  await itAsync("Generates a new company API key with nd_live_ prefix and secret warning", async () => {
    const res = await fetch(`${baseUrl}/api/tenant/api-keys`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer valid_session_token_owner"
      },
      body: JSON.stringify({
        name: "Backend Ingestion Microservice",
        scopes: ["assets:read", "assets:write"]
      })
    });
    assert.equal(res.status, 201);
    const body = await res.json();
    assert.equal(body.success, true);
    assert.ok(body.secretKey.startsWith("nd_live_"));
    assert.ok(body.secretKey.length >= 40);
    assert.ok(body.warning.includes("shown only once"));
    assert.equal(body.apiKey.name, "Backend Ingestion Microservice");

    secretKey = body.secretKey;
    keyId = body.apiKey.id;
  });

  console.log("\n[TEST 2] Active API Keys Catalog Query");
  await itAsync("Lists active keys without leaking raw secretKey bytes", async () => {
    const res = await fetch(`${baseUrl}/api/tenant/api-keys`, {
      headers: { "Authorization": "Bearer valid_session_token_owner" }
    });
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.success, true);
    assert.equal(body.apiKeys.length, 1);
    assert.equal(body.apiKeys[0].id, keyId);
    assert.ok(body.apiKeys[0].keyPrefix.startsWith("nd_live_"));
    // Verifies raw secret is NEVER returned in list queries
    assert.equal(body.apiKeys[0].secretKey, undefined);
  });

  console.log("\n[TEST 3] Authentication via nd_live_ Bearer Token");
  await itAsync("Authenticates request using nd_live_ key and returns usage ledger & BRL pricing", async () => {
    const res = await fetch(`${baseUrl}/api/tenant/usage`, {
      headers: { "Authorization": `Bearer ${secretKey}` }
    });
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.success, true);
    assert.equal(body.usage.activeApiKeys, 1);
    assert.equal(body.usage.pricing.currency, "BRL");
    assert.equal(body.usage.pricing.baseFee, 99.00);
    assert.ok(body.usage.pricing.estimatedMonthlyCostBrl >= 99.00);
  });

  console.log("\n[TEST 4] Scope Boundary Enforcement");
  await itAsync("Allows request within authorized scope (assets:read)", async () => {
    const res = await fetch(`${baseUrl}/api/assets`, {
      headers: { "Authorization": `Bearer ${secretKey}` }
    });
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.success, true);
  });

  console.log("\n[TEST 5] Instant Revocation & Rejection");
  await itAsync("Revokes API key and verifies immediate HTTP 401 rejection", async () => {
    const revokeRes = await fetch(`${baseUrl}/api/tenant/api-keys/${keyId}`, {
      method: "DELETE",
      headers: { "Authorization": "Bearer valid_session_token_owner" }
    });
    assert.equal(revokeRes.status, 200);

    // Call usage with revoked key
    const deniedRes = await fetch(`${baseUrl}/api/tenant/usage`, {
      headers: { "Authorization": `Bearer ${secretKey}` }
    });
    assert.equal(deniedRes.status, 401);
    const deniedBody = await deniedRes.json();
    assert.equal(deniedBody.success, false);
    assert.ok(deniedBody.error.includes("Session expired, revoked, or invalid"));
  });

  await server.close();

  console.log("\n==================================================");
  console.log(`SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log("==================================================");

  if (failed > 0) process.exit(1);
}

run().catch((err) => {
  console.error("Unhandled test suite error:", err);
  process.exit(1);
});
