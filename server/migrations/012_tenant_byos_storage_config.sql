-- Migration 012: Tenant Bring-Your-Own-Storage (BYOS) Configuration
-- Enables enterprise self-serve storage backend configuration (AWS S3, Cloudflare R2, MinIO, or Walrus)

ALTER TABLE tenant_storage_contexts
  ADD COLUMN IF NOT EXISTS storage_provider TEXT NOT NULL DEFAULT 'walrus',
  ADD COLUMN IF NOT EXISTS byos_endpoint TEXT,
  ADD COLUMN IF NOT EXISTS byos_bucket TEXT,
  ADD COLUMN IF NOT EXISTS byos_region TEXT,
  ADD COLUMN IF NOT EXISTS byos_access_key_id TEXT,
  ADD COLUMN IF NOT EXISTS byos_secret_access_key_enc TEXT;
