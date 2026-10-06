import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const composeFile = path.join(rootDir, "docker-compose.local-tests.yml");
const databaseUrl = "postgresql://nodus:nodus-local-only@127.0.0.1:55432/nodus_local_tests";
const env = {
  ...process.env,
  DATABASE_URL: databaseUrl,
  NODE_ENV: "test",
  NODUS_SOLANA_RBAC_MODE: "local",
  NODUS_PROVISIONING_ADMIN_TOKEN: "local-tests-provisioning-token-32-bytes"
};

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: rootDir,
    env,
    encoding: "utf8",
    stdio: options.capture ? "pipe" : "inherit",
    shell: false
  });
  if (options.capture) return result;
  if (result.status !== 0) throw new Error(`${command} ${args.join(" ")} failed with exit code ${result.status ?? "unknown"}`);
  return result;
}

const dockerCheck = run("docker", ["version", "--format", "{{.Server.Version}}"], { capture: true });
if (dockerCheck.status !== 0) {
  console.error("Docker with Compose is required for the self-contained local collaboration suite.");
  console.error("Start Docker Desktop and rerun: npm run test:collaboration:local");
  process.exit(1);
}

console.log("Starting an isolated PostgreSQL instance for local collaboration tests…");
try {
  run("docker", ["compose", "-f", composeFile, "up", "-d", "--wait"]);
  run("node", ["scripts/init-demo-org.mjs", "--config", "config/local-demo-provisioning.json"]);
  run("node", ["scripts/init-demo-org.mjs", "--config", "config/local-demo-provisioning.json"]);
  run("node", ["test/test-local-demo-provisioning.js"]);
  run("node", ["test/test-asset-sharing.js"]);
  run("node", ["test/test-key-envelopes.js"]);
  console.log("\nLocal provisioning, sharing and revocation suites completed successfully.");
} finally {
  console.log("Stopping the isolated PostgreSQL instance…");
  run("docker", ["compose", "-f", composeFile, "down", "--volumes", "--remove-orphans"]);
}
