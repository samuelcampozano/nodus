import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const composeFile = path.join(rootDir, "docker-compose.local-tests.yml");
const databaseUrl = "postgresql://nodus:nodus-local-only@127.0.0.1:55432/nodus_local_tests";
const dryRun = process.argv.includes("--dry-run");
const reportArgumentIndex = process.argv.indexOf("--report");
const reportArgument = reportArgumentIndex >= 0 ? process.argv[reportArgumentIndex + 1] : "scratch/local-collaboration-report.json";
const reportPath = path.resolve(rootDir, reportArgument);
const scratchDir = path.join(rootDir, "scratch");

if (!reportPath.startsWith(`${scratchDir}${path.sep}`)) {
  throw new Error("The local collaboration report must stay inside scratch/ so it cannot be committed accidentally.");
}

const env = {
  ...process.env,
  DATABASE_URL: databaseUrl,
  NODE_ENV: "test",
  NODUS_SOLANA_RBAC_MODE: "local",
  NODUS_PROVISIONING_ADMIN_TOKEN: "local-tests-provisioning-token-32-bytes"
};

const report = {
  kind: "nodus-local-collaboration-report",
  startedAt: new Date().toISOString(),
  status: "running",
  database: "isolated PostgreSQL 16 on 127.0.0.1:55432",
  mode: dryRun ? "dry-run" : "execution",
  commands: []
};

function writeReport() {
  report.finishedAt = new Date().toISOString();
  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`, { mode: 0o600 });
}

function run(label, command, args, options = {}) {
  const started = Date.now();
  const result = spawnSync(command, args, {
    cwd: rootDir,
    env,
    encoding: "utf8",
    stdio: options.capture ? "pipe" : "inherit",
    shell: false
  });
  const entry = { label, command: [command, ...args].join(" "), exitCode: result.status, durationMs: Date.now() - started };
  if (result.error) entry.error = result.error.message;
  report.commands.push(entry);
  if (options.capture) return result;
  if (result.error || result.status !== 0) {
    const reason = result.error?.message || `exit code ${result.status ?? "unknown"}`;
    throw new Error(`${label} failed: ${reason}`);
  }
  return result;
}

function assertDockerAvailable() {
  const docker = run("Docker daemon", "docker", ["version", "--format", "{{.Server.Version}}"], { capture: true });
  if (docker.status !== 0 || docker.error) {
    throw new Error("Docker Desktop is not available. Start Docker Desktop, wait for its engine to become ready, then rerun npm run test:collaboration:local.");
  }
  const compose = run("Docker Compose plugin", "docker", ["compose", "version", "--short"], { capture: true });
  if (compose.status !== 0 || compose.error) {
    throw new Error("Docker Compose v2 is required. Install/enable it in Docker Desktop, then rerun npm run test:collaboration:local.");
  }
  report.dockerVersion = docker.stdout.trim();
  report.composeVersion = compose.stdout.trim();
}

let postgresStarted = false;
try {
  assertDockerAvailable();
  if (dryRun) {
    report.status = "ready";
    console.log("✅ Docker and Compose are ready. The local collaboration suite can now be executed.");
  } else {
    console.log("Starting an isolated PostgreSQL instance for local collaboration tests…");
    run("Start isolated PostgreSQL", "docker", ["compose", "-f", composeFile, "up", "-d", "--wait"]);
    postgresStarted = true;
    run("Provision demo organization (first run)", "node", ["scripts/init-demo-org.mjs", "--config", "config/local-demo-provisioning.json"]);
    run("Provision demo organization (idempotency run)", "node", ["scripts/init-demo-org.mjs", "--config", "config/local-demo-provisioning.json"]);
    run("Verify local provisioning", "node", ["test/test-local-demo-provisioning.js"]);
    run("Verify tenant share and revocation", "node", ["test/test-asset-sharing.js"]);
    run("Verify key envelopes and removed-member access", "node", ["test/test-key-envelopes.js"]);
    report.status = "passed";
    console.log("\n✅ Local provisioning, sharing and revocation suites completed successfully.");
  }
} catch (error) {
  report.status = "failed";
  report.error = error.message;
  console.error(`\n❌ Local collaboration validation failed: ${error.message}`);
  process.exitCode = 1;
} finally {
  if (postgresStarted) {
    console.log("Stopping the isolated PostgreSQL instance…");
    const cleanup = run("Remove isolated PostgreSQL", "docker", ["compose", "-f", composeFile, "down", "--volumes", "--remove-orphans"], { capture: true });
    report.cleanup = cleanup.status === 0 && !cleanup.error ? "completed" : "failed";
    if (report.cleanup === "failed") {
      report.cleanupError = cleanup.error?.message || cleanup.stderr?.trim() || `exit code ${cleanup.status ?? "unknown"}`;
      console.error(`Cleanup warning: ${report.cleanupError}`);
      if (report.status === "passed") process.exitCode = 1;
    }
  } else {
    report.cleanup = "not-needed";
  }
  writeReport();
  console.log(`Local report written to ${path.relative(rootDir, reportPath)}`);
}
