import pg from 'pg';
import crypto from 'node:crypto';
import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
dotenv.config({ path: path.join(rootDir, '.env') });

const dbUrl = process.env.DATABASE_URL || 'postgresql://nodus:nodus@localhost:5432/nodus';
console.log('Connecting to PostgreSQL...');
const pool = new pg.Pool({ connectionString: dbUrl });

const OWNER_ADDRESS = '3ud8N1AYHyjgi3prychYqMXUJ3PEfw6eFU9FaxADxaeF';
const MEMBER_ADDRESS = 'EoFuCwyMgxV3Fw7zzx46zeuJcktdqRyNJc8LvkYXitgA';
const ORG_ID = 'demo-org';
const ORG_NAME = 'Nodus Hackathon Demo Org';

async function main() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // 1. Organization
    await client.query(
      `INSERT INTO organizations (id, name)
       VALUES ($1, $2)
       ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name`,
      [ORG_ID, ORG_NAME]
    );

    // 2. Storage Context (Walrus Testnet Default)
    await client.query(
      `INSERT INTO tenant_storage_contexts
       (organization_id, space_id, bucket_id, seal_policy_id, quota_bytes, active, storage_provider)
       VALUES ($1, $2, $3, $4, $5, true, 'walrus')
       ON CONFLICT (organization_id) DO UPDATE
       SET active = true, storage_provider = 'walrus'`,
      [ORG_ID, 'demo-walrus-space', 'demo-walrus-bucket', 'active', 50000000000]
    );

    // 3. Owner User & Membership
    const ownerUserId = crypto.randomUUID();
    await client.query(
      `INSERT INTO users (id, solana_address)
       VALUES ($1, $2)
       ON CONFLICT (solana_address) DO NOTHING`,
      [ownerUserId, OWNER_ADDRESS]
    );
    const ownerRes = await client.query('SELECT id FROM users WHERE solana_address = $1', [OWNER_ADDRESS]);
    const actualOwnerId = ownerRes.rows[0].id;

    await client.query(
      `INSERT INTO memberships (organization_id, user_id, role)
       VALUES ($1, $2, 'owner')
       ON CONFLICT (organization_id, user_id) DO UPDATE SET role = 'owner'`,
      [ORG_ID, actualOwnerId]
    );

    // 4. Member User & Membership (Viewer)
    const memberUserId = crypto.randomUUID();
    await client.query(
      `INSERT INTO users (id, solana_address)
       VALUES ($1, $2)
       ON CONFLICT (solana_address) DO NOTHING`,
      [memberUserId, MEMBER_ADDRESS]
    );
    const memberRes = await client.query('SELECT id FROM users WHERE solana_address = $1', [MEMBER_ADDRESS]);
    const actualMemberId = memberRes.rows[0].id;

    await client.query(
      `INSERT INTO memberships (organization_id, user_id, role)
       VALUES ($1, $2, 'viewer')
       ON CONFLICT (organization_id, user_id) DO UPDATE SET role = 'viewer'`,
      [ORG_ID, actualMemberId]
    );

    await client.query('COMMIT');
    console.log('✅ Successfully provisioned demo-org in PostgreSQL:');
    console.log(`   Organization: ${ORG_ID} (${ORG_NAME})`);
    console.log(`   Owner:        ${OWNER_ADDRESS} (Role: owner, User ID: ${actualOwnerId})`);
    console.log(`   Member:       ${MEMBER_ADDRESS} (Role: viewer, User ID: ${actualMemberId})`);
    console.log(`   Storage:      Walrus Testnet (Quota: 50 GB)`);
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('❌ Failed to provision demo-org:', err);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

main();
