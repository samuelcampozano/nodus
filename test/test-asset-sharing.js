import crypto from "node:crypto";

function assert(condition, message) {
  if (!condition) throw new Error(message);
  console.log(`  ✅ PASS: ${message}`);
}

function envelope(address, organizationId) {
  return {
    recipientAddress: address, recipientType: "user", organizationId,
    algorithm: "ECDH-P256/AES-256-GCM",
    ephemeralPublicKey: { kty: "EC", crv: "P-256", x: "a".repeat(43), y: "b".repeat(43) },
    iv: crypto.randomBytes(12).toString("hex"), ciphertext: crypto.randomBytes(48).toString("hex")
  };
}

async function run() {
  if (!process.env.DATABASE_URL) {
    console.log("⏭️  SKIPPED: DATABASE_URL is required for the PostgreSQL asset-sharing suite.");
    return;
  }
  const { AuthTenantStore } = await import("../server/auth-tenant-store.js");
  const store = new AuthTenantStore({ databaseUrl: process.env.DATABASE_URL });
  await store.init();
  const orgA = `share-a-${Date.now()}`; const orgB = `share-b-${Date.now()}`;
  const aliceId = crypto.randomUUID(); const bobId = crypto.randomUUID(); const charlieId = crypto.randomUUID();
  const alice = `alice-${crypto.randomUUID()}`; const bob = `bob-${crypto.randomUUID()}`; const charlie = `charlie-${crypto.randomUUID()}`; const assetId = crypto.randomUUID();
  try {
    const db = store.pool;
    await db.query("INSERT INTO organizations (id,name) VALUES ($1,'Share A'),($2,'Share B')", [orgA, orgB]);
    await db.query("INSERT INTO users (id,solana_address) VALUES ($1,$2),($3,$4),($5,$6)", [aliceId, alice, bobId, bob, charlieId, charlie]);
    await db.query("INSERT INTO memberships (organization_id,user_id,role) VALUES ($1,$2,'owner'),($1,$3,'viewer'),($1,$4,'viewer'),($5,$2,'owner')", [orgA, aliceId, bobId, charlieId, orgB]);
    await db.query("INSERT INTO user_key_identities (user_id,public_key) VALUES ($1,$2::jsonb),($3,$4::jsonb)", [aliceId, JSON.stringify(envelope(alice, orgA).ephemeralPublicKey), bobId, JSON.stringify(envelope(bob, orgA).ephemeralPublicKey)]);
    await db.query("INSERT INTO key_envelope_assets (organization_id,asset_id,owner_user_id) VALUES ($1,$2,$3)", [orgA, assetId, aliceId]);
    const expiresAt = new Date(Date.now() + 3600_000).toISOString();
    const firstGrant = await store.shareAsset({ organizationId: orgA, assetId, actorUserId: aliceId, recipientAddress: bob, role: "viewer", expiresAt, envelopes: [envelope(bob, orgA)] });
    assert((await store.envelopesForRecipient({ organizationId: orgA, assetId, recipientUserId: bobId }))?.envelopes.length === 1, "A tenant member receives only their encrypted envelope");
    const shares = await store.listAssetShares({ organizationId: orgA, assetId });
    assert(shares[0].role === "viewer" && shares[0].status === "active", "Share roles and expiry are persisted per tenant asset");
    const repeatedGrant = await store.shareAsset({ organizationId: orgA, assetId, actorUserId: aliceId, recipientAddress: bob, role: "viewer", expiresAt, envelopes: [envelope(bob, orgA)] });
    assert(repeatedGrant.id === firstGrant.id && (await store.listAssetShares({ organizationId: orgA, assetId })).length === 1, "Repeating a share updates one idempotent recipient grant instead of duplicating access");
    await store.shareAsset({ organizationId: orgA, assetId, actorUserId: aliceId, recipientAddress: charlie, role: "viewer", envelopes: [envelope(charlie, orgA)] })
      .then(() => { throw new Error("recipient without identity unexpectedly received access"); })
      .catch((error) => assert(error.message.includes("registered encryption identity"), "A member without an encryption identity cannot receive a share"));
    assert(await store.envelopesForRecipient({ organizationId: orgB, assetId, recipientUserId: bobId }) === null, "Tenant isolation hides an envelope when the same asset ID is queried from another organization");
    await db.query("UPDATE asset_access_grants SET expires_at=now()-interval '1 second' WHERE organization_id=$1 AND asset_id=$2", [orgA, assetId]);
    assert((await store.envelopesForRecipient({ organizationId: orgA, assetId, recipientUserId: bobId })) === null, "Expired access blocks future encrypted-envelope reads");
    await store.shareAsset({ organizationId: orgA, assetId, actorUserId: aliceId, recipientAddress: bob, role: "admin", expiresAt: null, envelopes: [envelope(bob, orgA)] });
    const renewed = await store.listAssetShares({ organizationId: orgA, assetId });
    await store.revokeAssetShare({ organizationId: orgA, assetId, grantId: renewed[0].id, actorUserId: aliceId });
    assert((await store.envelopesForRecipient({ organizationId: orgA, assetId, recipientUserId: bobId })) === null, "Revocation blocks future encrypted-envelope reads");
    assert((await store.listAssetShares({ organizationId: orgA, assetId }))[0].status === "revoked", "Revoked access is retained as an auditable grant state");
    await store.revokeAssetShare({ organizationId: orgB, assetId, grantId: renewed[0].id, actorUserId: aliceId })
      .then(() => { throw new Error("cross-tenant revocation unexpectedly succeeded"); })
      .catch((error) => assert(error.message.includes("not found"), "A grant cannot be revoked through another tenant"));
    await store.shareAsset({ organizationId: orgA, assetId, actorUserId: aliceId, recipientAddress: bob, role: "viewer", expiresAt: null, envelopes: [envelope(bob, orgA)] });
    assert(Boolean(await store.envelopesForRecipient({ organizationId: orgA, assetId, recipientUserId: bobId })), "A deliberate re-share reactivates the existing recipient grant");
    await store.shareAsset({ organizationId: orgA, assetId, actorUserId: aliceId, recipientAddress: bob, role: "owner", envelopes: [envelope(bob, orgA)] })
      .then(() => { throw new Error("invalid owner share unexpectedly succeeded"); })
      .catch((error) => assert(error.message.includes("viewer, contributor, or admin"), "Asset sharing rejects roles outside the allowed grant hierarchy"));
    await store.shareAsset({ organizationId: orgA, assetId, actorUserId: aliceId, recipientAddress: bob, role: "viewer", expiresAt: new Date(Date.now() - 1000).toISOString(), envelopes: [envelope(bob, orgA)] })
      .then(() => { throw new Error("expired share unexpectedly succeeded"); })
      .catch((error) => assert(error.message.includes("future date"), "Asset sharing rejects an already-expired grant"));
    await store.shareAsset({ organizationId: orgB, assetId, actorUserId: aliceId, recipientAddress: bob, role: "viewer", envelopes: [envelope(bob, orgB)] }).then(() => { throw new Error("cross-tenant share unexpectedly succeeded"); }).catch((error) => assert(error.message.includes("Recipient"), "A recipient outside the organization cannot receive a cross-tenant share"));
  } finally {
    await store.pool.query("DELETE FROM organizations WHERE id=ANY($1::text[])", [[orgA, orgB]]).catch(() => {});
    await store.pool.end();
  }
}
run().catch((error) => { console.error(`❌ Asset sharing test failed: ${error.message}`); process.exit(1); });
