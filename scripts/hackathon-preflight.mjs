import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(rootDir, ".env") });

const requireLive = process.argv.includes("--require-live");
const expectedMigrations = [
  "001_auth_tenants.sql",
  "002_tenant_key_envelopes.sql",
  "011_asset_sharing.sql",
  "012_tenant_byos_storage_config.sql"
];
const defaultProgramId = "NodUS11111111111111111111111111111111111111";
const checks = [];

function check(label, pass, remediation) {
  checks.push({ label, pass, remediation });
}

function configured(value) {
  return typeof value === "string" && value.trim() && !/your_|replace_with|example\.com/i.test(value);
}

const env = process.env;
check("Migrations críticas disponíveis", expectedMigrations.every((file) => fs.existsSync(path.join(rootDir, "server", "migrations", file))), "Restaure as migrations de tenant, envelopes, compartilhamento e BYOS.");
check("Compose inicializa migrations de share e BYOS", (() => {
  const compose = fs.readFileSync(path.join(rootDir, "docker-compose.yml"), "utf8");
  return ["011_asset_sharing.sql", "012_tenant_byos_storage_config.sql"].every((file) => compose.includes(file));
})(), "Inclua as migrations 011 e 012 no serviço postgres do docker-compose.yml.");
check("Arquivos sensíveis ignorados pelo Git", (() => {
  const ignore = fs.readFileSync(path.join(rootDir, ".gitignore"), "utf8");
  return [".env", ".demo-wallets/", "target/deploy/*.json"].every((entry) => ignore.includes(entry));
})(), "Mantenha .env, .demo-wallets/ e target/deploy/*.json no .gitignore.");

if (requireLive) {
  const deployment = (env.NODUS_DEPLOYMENT_ENV || "sandbox").toLowerCase();
  check("Ambiente descartável de demonstração", deployment === "sandbox" || deployment === "test", "Defina NODUS_DEPLOYMENT_ENV=sandbox no .env local.");
  check("Walrus Testnet direto habilitado", env.WALRUS_DIRECT_TESTNET_ENABLED === "true", "Defina WALRUS_DIRECT_TESTNET_ENABLED=true.");
  check("RPC Solana Devnet configurado", /^https:\/\/.*devnet/i.test(env.SOLANA_DEVNET_RPC_URL || ""), "Defina SOLANA_DEVNET_RPC_URL=https://api.devnet.solana.com.");
  check("RBAC Solana em modo Devnet", env.NODUS_SOLANA_RBAC_MODE === "devnet", "Defina NODUS_SOLANA_RBAC_MODE=devnet.");
  check("Program ID definitivo configurado", configured(env.SOLANA_PROGRAM_ID) && env.SOLANA_PROGRAM_ID !== defaultProgramId, "Após o deploy Anchor, defina SOLANA_PROGRAM_ID com o Program ID Devnet real.");
  check("Credenciais Walrus Testnet configuradas", configured(env.CONSOLE_API_KEY) && (configured(env.CONSOLE_SERVICE_PRIVATE_KEY) || configured(env.CONSOLE_CREDENTIAL_BUNDLE)), "Configure credenciais reais do Walrus Testnet exclusivamente no .env local.");
  check("Segredos distintos do publisher configurados", configured(env.NODUS_PUBLISHER_JWT_SECRET) && configured(env.NODUS_PUBLISHER_RECEIPT_SECRET) && env.NODUS_PUBLISHER_JWT_SECRET !== env.NODUS_PUBLISHER_RECEIPT_SECRET, "Defina dois segredos aleatórios e diferentes para JWT e receipt do publisher.");
}

console.log("Nodus hackathon preflight");
for (const item of checks) {
  console.log(`${item.pass ? "✅" : "❌"} ${item.label}`);
  if (!item.pass) console.log(`   → ${item.remediation}`);
}

const failures = checks.filter((item) => !item.pass);
if (failures.length) {
  console.error(`\n${failures.length} pendência(s) encontrada(s).`);
  process.exitCode = 1;
} else {
  console.log("\n✅ Preflight concluído: o ambiente está configurado para a demo real.");
}
