import crypto from "node:crypto";

// Verification of Google ID tokens ("credentials") issued by Google Identity
// Services. Identity used for tenant provisioning is taken only from these
// verified claims, so a client can never assert an arbitrary email or subject.

const GOOGLE_JWKS_URL = "https://www.googleapis.com/oauth2/v3/certs";
const GOOGLE_ISSUERS = new Set(["accounts.google.com", "https://accounts.google.com"]);
const JWKS_CACHE_TTL_MS = 60 * 60 * 1000;
const CLOCK_SKEW_MS = 5 * 60 * 1000;

let cachedKeys = new Map();
let cachedAt = 0;
let inflightJwks = null;

function decodeJsonSegment(segment) {
  return JSON.parse(Buffer.from(segment, "base64url").toString("utf8"));
}

async function fetchSigningKeys({ force = false } = {}) {
  if (!force && cachedKeys.size > 0 && Date.now() - cachedAt < JWKS_CACHE_TTL_MS) return cachedKeys;
  if (inflightJwks) return inflightJwks;

  inflightJwks = (async () => {
    const response = await fetch(GOOGLE_JWKS_URL, { signal: AbortSignal.timeout(5000) });
    if (!response.ok) throw new Error(`Google JWKS request failed with status ${response.status}`);
    const body = await response.json();
    const keys = new Map();
    for (const jwk of Array.isArray(body?.keys) ? body.keys : []) {
      if (jwk?.kty === "RSA" && typeof jwk.kid === "string") keys.set(jwk.kid, jwk);
    }
    if (keys.size === 0) throw new Error("Google JWKS response contained no RSA signing keys");
    cachedKeys = keys;
    cachedAt = Date.now();
    return keys;
  })();

  try {
    return await inflightJwks;
  } finally {
    inflightJwks = null;
  }
}

/**
 * Verifies a Google ID token signature and its issuer/audience/expiry claims.
 * Throws with a caller-safe reason when the credential is not trustworthy.
 */
export async function verifyGoogleIdToken(credential, { clientId, now = Date.now() } = {}) {
  if (!clientId) throw new Error("Google sign-in is not configured on this deployment");
  const token = typeof credential === "string" ? credential.trim() : "";
  if (!token) throw new Error("a Google credential is required");

  const segments = token.split(".");
  if (segments.length !== 3) throw new Error("the Google credential is malformed");
  const [encodedHeader, encodedPayload, encodedSignature] = segments;

  let header;
  let payload;
  try {
    header = decodeJsonSegment(encodedHeader);
    payload = decodeJsonSegment(encodedPayload);
  } catch {
    throw new Error("the Google credential is malformed");
  }

  if (header.alg !== "RS256") throw new Error("the Google credential uses an unsupported algorithm");
  if (!GOOGLE_ISSUERS.has(payload.iss)) throw new Error("the Google credential has an unexpected issuer");
  if (payload.aud !== clientId) throw new Error("the Google credential was issued for a different OAuth client");
  if (!Number.isFinite(Number(payload.exp)) || Number(payload.exp) * 1000 <= now) throw new Error("the Google credential has expired");
  if (Number.isFinite(Number(payload.iat)) && Number(payload.iat) * 1000 > now + CLOCK_SKEW_MS) {
    throw new Error("the Google credential is not yet valid");
  }
  if (!payload.sub) throw new Error("the Google credential is missing the subject claim");
  if (payload.email_verified !== true && payload.email_verified !== "true") {
    throw new Error("the Google account email is not verified");
  }
  if (typeof payload.email !== "string" || !payload.email.includes("@")) {
    throw new Error("the Google credential is missing the email claim");
  }

  let keys = await fetchSigningKeys();
  let jwk = keys.get(header.kid);
  if (!jwk) {
    // Google rotates signing keys; refresh once before rejecting the credential.
    keys = await fetchSigningKeys({ force: true });
    jwk = keys.get(header.kid);
  }
  if (!jwk) throw new Error("the Google credential was signed with an unknown key");

  const signatureValid = crypto.verify(
    "RSA-SHA256",
    Buffer.from(`${encodedHeader}.${encodedPayload}`),
    crypto.createPublicKey({ key: jwk, format: "jwk" }),
    Buffer.from(encodedSignature, "base64url")
  );
  if (!signatureValid) throw new Error("the Google credential signature is invalid");

  return {
    sub: String(payload.sub),
    email: payload.email.trim().toLowerCase(),
    name: typeof payload.name === "string" ? payload.name : "",
    picture: typeof payload.picture === "string" ? payload.picture : null
  };
}
