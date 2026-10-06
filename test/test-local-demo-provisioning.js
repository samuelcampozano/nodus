import fs from "node:fs";
import path from "node:path";
import { strict as assert } from "node:assert";
import { Pool } from "pg";

const config = JSON.parse(fs.readFileSync(path.resolve("config/local-demo-provisioning.json"), "utf8"));
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

try {
  const organization = await pool.query(
    `SELECT o.name, s.space_id AS "spaceId", s.bucket_id AS "bucketId",
            s.seal_policy_id AS "sealPolicyId", s.quota_bytes AS "quotaBytes", s.active
     FROM organizations o JOIN tenant_storage_contexts s ON s.organization_id=o.id
     WHERE o.id=$1`,
    [config.organizationId]
  );
  assert.equal(organization.rowCount, 1, "provisioning creates exactly one organization and storage context");
  assert.equal(organization.rows[0].name, config.organizationName);
  assert.equal(organization.rows[0].spaceId, config.storage.spaceId);
  assert.equal(organization.rows[0].bucketId, config.storage.bucketId);
  assert.equal(organization.rows[0].sealPolicyId, config.storage.sealPolicyId);
  assert.equal(Number(organization.rows[0].quotaBytes), config.quotaBytes);
  assert.equal(organization.rows[0].active, true);

  const memberships = await pool.query(
    `SELECT u.solana_address AS address, m.role
     FROM memberships m JOIN users u ON u.id=m.user_id
     WHERE m.organization_id=$1 ORDER BY m.role`,
    [config.organizationId]
  );
  assert.equal(memberships.rowCount, 2, "rerunning provisioning does not duplicate memberships");
  assert.deepEqual(new Map(memberships.rows.map((row) => [row.address, row.role])), new Map([
    [config.ownerAddress, "owner"],
    [config.memberAddress, config.memberRole]
  ]));
  console.log("PASS local demo provisioning is complete, deterministic and idempotent.");
} finally {
  await pool.end();
}
