import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import pg from "pg";
import dotenv from "dotenv";
import { PublicKey } from "@solana/web3.js";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(rootDir, ".env") });

function argument(name, fallback = null) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : fallback;
}

function requiredText(value, field) {
  if (typeof value !== "string" || !value.trim()) throw new Error(`${field} is required`);
  return value.trim();
}

function validAddress(value, field) {
  const address = requiredText(value, field);
  try { new PublicKey(address); } catch { throw new Error(`${field} must be a valid Solana public address`); }
  return address;
}

function readConfig() {
  const configArg = argument("--config", "config/local-demo-provisioning.json");
  const configPath = path.resolve(rootDir, configArg);
  const parsed = JSON.parse(fs.readFileSync(configPath, "utf8"));
  const roles = new Set(["admin", "contributor", "viewer"]);
  const memberRole = parsed.memberRole || "viewer";
  if (!roles.has(memberRole)) throw new Error("memberRole must be admin, contributor, or viewer");
  const quotaBytes = Number(parsed.quotaBytes);
  if (!Number.isSafeInteger(quotaBytes) || quotaBytes < 0) throw new Error("quotaBytes must be a non-negative safe integer");
  return {
    configPath,
    organizationId: requiredText(parsed.organizationId, "organizationId"),
    organizationName: requiredText(parsed.organizationName, "organizationName"),
    ownerAddress: validAddress(parsed.ownerAddress, "ownerAddress"),
    memberAddress: validAddress(parsed.memberAddress, "memberAddress"),
    memberRole,
    quotaBytes,
    storage: {
      spaceId: requiredText(parsed.storage?.spaceId, "storage.spaceId"),
      bucketId: requiredText(parsed.storage?.bucketId, "storage.bucketId"),
      sealPolicyId: requiredText(parsed.storage?.sealPolicyId, "storage.sealPolicyId")
    }
  };
}

async function upsertUser(client, address) {
  const result = await client.query(
    `INSERT INTO users (id, solana_address) VALUES ($1, $2)
     ON CONFLICT (solana_address) DO UPDATE SET solana_address = EXCLUDED.solana_address
     RETURNING id`,
    [crypto.randomUUID(), address]
  );
  return result.rows[0].id;
}

async function main() {
  const config = readConfig();
  const databaseUrl = argument("--database-url", process.env.DATABASE_URL || "postgresql://nodus:nodus-local-only@127.0.0.1:55432/nodus_local_tests");
  const pool = new pg.Pool({ connectionString: databaseUrl });
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query(
      `INSERT INTO organizations (id, name) VALUES ($1, $2)
       ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name`,
      [config.organizationId, config.organizationName]
    );
    await client.query(
      `INSERT INTO tenant_storage_contexts
       (organization_id, space_id, bucket_id, seal_policy_id, quota_bytes, active, storage_provider)
       VALUES ($1, $2, $3, $4, $5, true, 'walrus')
       ON CONFLICT (organization_id) DO UPDATE SET
         space_id = EXCLUDED.space_id,
         bucket_id = EXCLUDED.bucket_id,
         seal_policy_id = EXCLUDED.seal_policy_id,
         quota_bytes = EXCLUDED.quota_bytes,
         active = true,
         storage_provider = 'walrus'`,
      [config.organizationId, config.storage.spaceId, config.storage.bucketId, config.storage.sealPolicyId, config.quotaBytes]
    );

    const ownerUserId = await upsertUser(client, config.ownerAddress);
    const memberUserId = await upsertUser(client, config.memberAddress);
    await client.query(
      `INSERT INTO memberships (organization_id, user_id, role) VALUES ($1, $2, 'owner')
       ON CONFLICT (organization_id, user_id) DO UPDATE SET role = 'owner'`,
      [config.organizationId, ownerUserId]
    );
    await client.query(
      `INSERT INTO memberships (organization_id, user_id, role) VALUES ($1, $2, $3)
       ON CONFLICT (organization_id, user_id) DO UPDATE SET role = EXCLUDED.role`,
      [config.organizationId, memberUserId, config.memberRole]
    );
    await client.query("COMMIT");

    console.log("Demo organization provisioned idempotently:");
    console.log(`  Config:       ${path.relative(rootDir, config.configPath)}`);
    console.log(`  Organization: ${config.organizationId} (${config.organizationName})`);
    console.log(`  Owner:        ${config.ownerAddress} (owner)`);
    console.log(`  Member:       ${config.memberAddress} (${config.memberRole})`);
    console.log(`  Storage:      local Walrus-compatible context (${config.quotaBytes} bytes)`);
    console.log("  Network proof: not created; this command provisions PostgreSQL only.");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch((error) => {
  console.error(`Demo provisioning failed: ${error.message}`);
  process.exit(1);
});
