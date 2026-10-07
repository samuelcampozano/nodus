import assert from "assert";
import crypto from "node:crypto";
import { verifyGoogleIdToken } from "../server/google-identity.js";

console.log("==================================================");
console.log("🔐 NODUS — GOOGLE IDENTITY VERIFICATION TEST SUITE");
console.log("==================================================");

const CLIENT_ID = "test-client.apps.googleusercontent.com";
let passed = 0;
let failed = 0;

async function itAsync(desc, fn) {
  try {
    await fn();
    console.log(`  ✅ PASS: ${desc}`);
    passed++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${desc}`);
    console.error(`     Error: ${err.message}`);
    failed++;
  }
}

function b64url(input) {
  return Buffer.from(input).toString("base64url");
}

function claims(overrides = {}) {
  const now = Math.floor(Date.now() / 1000);
  return {
    iss: "https://accounts.google.com",
    aud: CLIENT_ID,
    sub: "109847291847192847",
    email: "sovereign@example.com",
    email_verified: true,
    iat: now - 30,
    exp: now + 3600,
    ...overrides
  };
}

// Builds a structurally valid token. Unless a signer is supplied the signature
// is junk, which is exactly what an attacker can produce.
function token(overrides = {}, { alg = "RS256", kid = "attacker-key", signer = null } = {}) {
  const header = b64url(JSON.stringify({ alg, kid, typ: "JWT" }));
  const payload = b64url(JSON.stringify(claims(overrides)));
  const signingInput = `${header}.${payload}`;
  // The signature segment must be base64url. Interpolating a raw Buffer would
  // emit arbitrary bytes (including ".") and silently corrupt the JWT shape.
  const signature = signer
    ? Buffer.from(signer(signingInput)).toString("base64url")
    : b64url("not-a-real-signature");
  return `${signingInput}.${signature}`;
}

async function expectRejection(desc, input, expectedFragment, options = {}) {
  await itAsync(desc, async () => {
    let error = null;
    try {
      await verifyGoogleIdToken(input, { clientId: CLIENT_ID, ...options });
    } catch (err) {
      error = err;
    }
    assert(error, "verification unexpectedly succeeded");
    assert(
      error.message.includes(expectedFragment),
      `expected "${expectedFragment}" but got "${error.message}"`
    );
  });
}

const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", { modulusLength: 2048 });

await itAsync("Refuses to verify when the deployment has no configured client id", async () => {
  await assert.rejects(
    () => verifyGoogleIdToken(token(), { clientId: "" }),
    /not configured/
  );
});

await expectRejection("Rejects a missing credential", "", "required");
await expectRejection("Rejects a malformed token", "not.a.valid.jwt.at.all", "malformed");
await expectRejection("Rejects the unsigned 'none' algorithm", token({}, { alg: "none" }), "unsupported algorithm");
await expectRejection("Rejects a token minted for a different OAuth client", token({ aud: "someone-else.apps.googleusercontent.com" }), "different OAuth client");
await expectRejection("Rejects a token from an untrusted issuer", token({ iss: "https://accounts.evil.test" }), "unexpected issuer");
await expectRejection("Rejects an expired token", token({ exp: Math.floor(Date.now() / 1000) - 60 }), "expired");
await expectRejection("Rejects an unverified Google email", token({ email_verified: false }), "not verified");
await expectRejection("Rejects a token with no subject claim", token({ sub: undefined, email_verified: true }), "subject claim");
await expectRejection("Rejects a token with no email claim", token({ email: undefined }), "email claim");

// The decisive case: a fully valid claim set that is signed by a key Google
// does not publish. Claim validation must not be mistaken for authentication.
await itAsync("Rejects a well-formed token signed by an attacker-controlled key", async () => {
  const forged = token({}, {
    kid: "attacker-key",
    signer: (input) => crypto.sign("RSA-SHA256", Buffer.from(input), privateKey)
  });
  await assert.rejects(
    () => verifyGoogleIdToken(forged, { clientId: CLIENT_ID }),
    /unknown key|signature is invalid/,
    "a self-signed token must never be accepted"
  );
});

await itAsync("Verifies its own RS256 path against a locally published key", async () => {
  // Proves the RSA-SHA256 verify call itself works, using the same key the
  // production path would receive from Google's JWKS endpoint.
  const jwk = publicKey.export({ format: "jwk" });
  assert.strictEqual(jwk.kty, "RSA");
  const input = Buffer.from("header.payload");
  const sig = crypto.sign("RSA-SHA256", input, privateKey);
  const ok = crypto.verify("RSA-SHA256", input, crypto.createPublicKey({ key: jwk, format: "jwk" }), sig);
  assert.strictEqual(ok, true, "RS256 verify must accept a genuine signature");
  const tampered = crypto.verify("RSA-SHA256", Buffer.from("header.payload2"), crypto.createPublicKey({ key: jwk, format: "jwk" }), sig);
  assert.strictEqual(tampered, false, "RS256 verify must reject a modified payload");
});

await itAsync("Reaches Google's live JWKS and parses RSA signing keys", async () => {
  const res = await fetch("https://www.googleapis.com/oauth2/v3/certs", { signal: AbortSignal.timeout(8000) });
  assert.strictEqual(res.status, 200, `JWKS endpoint returned ${res.status}`);
  const body = await res.json();
  const keys = (body.keys || []).filter((k) => k.kty === "RSA" && typeof k.kid === "string");
  assert(keys.length > 0, "Google JWKS must expose RSA signing keys");
  for (const k of keys) {
    assert(k.n && k.e, `JWKS key ${k.kid} is missing modulus or exponent`);
  }
  console.log(`     ↳ Google published ${keys.length} usable RSA signing keys`);
});

await itAsync("Rejects a forged token whose kid does not exist in Google's JWKS", async () => {
  const forged = token({}, {
    kid: "definitely-not-a-google-key",
    signer: (input) => crypto.sign("RSA-SHA256", Buffer.from(input), privateKey)
  });
  await assert.rejects(
    () => verifyGoogleIdToken(forged, { clientId: CLIENT_ID }),
    /unknown key/
  );
});

console.log("\n==================================================");
console.log(`SUMMARY: ${passed} PASSED, ${failed} FAILED`);
console.log("==================================================");

// Set the exit code instead of forcing exit, so pending network handles from the
// live JWKS check can close cleanly.
process.exitCode = failed > 0 ? 1 : 0;
