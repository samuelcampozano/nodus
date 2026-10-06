import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";

const programId = "Demo11111111111111111111111111111111111111";
const completeEnvironment = {
  ...process.env,
  NODUS_DEPLOYMENT_ENV: "sandbox",
  WALRUS_DIRECT_TESTNET_ENABLED: "true",
  SOLANA_DEVNET_RPC_URL: "https://api.devnet.solana.com",
  NODUS_SOLANA_RBAC_MODE: "devnet",
  SOLANA_PROGRAM_ID: programId,
  CONSOLE_API_KEY: "hbr_test_key",
  CONSOLE_SERVICE_PRIVATE_KEY: "suiprivkey1_test_key",
  NODUS_PUBLISHER_JWT_SECRET: "test-jwt-secret",
  NODUS_PUBLISHER_RECEIPT_SECRET: "test-receipt-secret"
};

const ready = spawnSync(process.execPath, ["scripts/hackathon-preflight.mjs", "--require-live"], { cwd: process.cwd(), env: completeEnvironment, encoding: "utf8" });
assert.equal(ready.status, 0, ready.stderr || ready.stdout);
assert.match(ready.stdout, /Preflight concluído/);

const incomplete = spawnSync(process.execPath, ["scripts/hackathon-preflight.mjs", "--require-live"], {
  cwd: process.cwd(),
  env: { ...completeEnvironment, SOLANA_PROGRAM_ID: "NodUS11111111111111111111111111111111111111" },
  encoding: "utf8"
});
assert.equal(incomplete.status, 1);
assert.match(incomplete.stdout, /Program ID definitivo configurado/);
console.log("✅ Hackathon preflight checks passed");
