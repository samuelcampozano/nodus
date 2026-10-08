import assert from "assert";
import { DEFAULT_SEAL_POLICY_ID, DEFAULT_BUCKET_ID, DEFAULT_SPACE_ID, resolveSealPolicyId } from "../server/walrus-client.js";

console.log("==================================================");
console.log("🔒 NODUS — WALRUS STORAGE CONTEXT TEST SUITE");
console.log("==================================================");

let passed = 0;
let failed = 0;

function it(desc, fn) {
  try {
    fn();
    console.log(`  ✅ PASS: ${desc}`);
    passed++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${desc}`);
    console.error(`     Error: ${err.message}`);
    failed++;
  }
}

const HEX_POLICY = "0x9c1baccb244e45342ac150a0123a4802e8e834f25c00210e50c81081354eee44";

it("Default seal policy is the real 0x-prefixed id upload_file requires", () => {
  assert.match(DEFAULT_SEAL_POLICY_ID, /^0x[0-9a-f]{64}$/, "default policy must be a 32-byte hex id");
});

it("Default space and bucket identifiers look like the Console's UUIDs", () => {
  const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
  assert.match(DEFAULT_SPACE_ID, uuid, "space id must be a UUID");
  assert.match(DEFAULT_BUCKET_ID, uuid, "bucket id must be a UUID");
});

// This is the exact regression: tenant contexts were provisioned with the literal
// string "active" as their seal policy, and upload_file rejected every write with
// "Invalid hex string 0x...active".
it("Rejects the 'active' placeholder that broke every upload", () => {
  const resolved = resolveSealPolicyId({ sealPolicyId: "active" });
  assert.strictEqual(resolved, DEFAULT_SEAL_POLICY_ID, "placeholder must fall back to the bucket policy");
  assert.match(resolved, /^0x[0-9a-f]{64}$/);
});

it("Accepts a valid tenant seal policy", () => {
  assert.strictEqual(resolveSealPolicyId({ sealPolicyId: HEX_POLICY }), HEX_POLICY);
});

it("Falls back for missing, empty, and malformed policies", () => {
  assert.strictEqual(resolveSealPolicyId(null), DEFAULT_SEAL_POLICY_ID);
  assert.strictEqual(resolveSealPolicyId(undefined), DEFAULT_SEAL_POLICY_ID);
  assert.strictEqual(resolveSealPolicyId({}), DEFAULT_SEAL_POLICY_ID);
  assert.strictEqual(resolveSealPolicyId({ sealPolicyId: "" }), DEFAULT_SEAL_POLICY_ID);
  assert.strictEqual(resolveSealPolicyId({ sealPolicyId: null }), DEFAULT_SEAL_POLICY_ID);
  assert.strictEqual(resolveSealPolicyId({ sealPolicyId: 42 }), DEFAULT_SEAL_POLICY_ID);
  assert.strictEqual(resolveSealPolicyId({ sealPolicyId: "pending" }), DEFAULT_SEAL_POLICY_ID);
  assert.strictEqual(resolveSealPolicyId({ sealPolicyId: "0x1234" }), DEFAULT_SEAL_POLICY_ID, "short hex is not a policy");
  assert.strictEqual(resolveSealPolicyId({ sealPolicyId: "9c1baccb244e45342ac150a0123a4802e8e834f25c00210e50c81081354eee44" }), DEFAULT_SEAL_POLICY_ID, "missing 0x prefix is not a policy");
  assert.strictEqual(resolveSealPolicyId({ sealPolicyId: "0x" + "Z".repeat(64) }), DEFAULT_SEAL_POLICY_ID, "non-hex characters are not a policy");
});

it("Never returns a value that would fail the Console's hex validation", () => {
  const candidates = [undefined, null, "", "active", "pending", "0xbad", { evil: true }];
  for (const candidate of candidates) {
    const resolved = resolveSealPolicyId({ sealPolicyId: candidate });
    assert.match(resolved, /^0x[0-9a-f]{64}$/, `resolved policy for ${JSON.stringify(candidate)} must be usable`);
  }
});

console.log("\n==================================================");
console.log(`SUMMARY: ${passed} PASSED, ${failed} FAILED`);
console.log("==================================================");

process.exitCode = failed > 0 ? 1 : 0;
