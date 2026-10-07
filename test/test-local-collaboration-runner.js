import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const report = path.join("scratch", "test-local-collaboration-runner.json");
const result = spawnSync(process.execPath, ["scripts/run-local-collaboration-tests.mjs", "--dry-run", "--report", report], {
  cwd: process.cwd(),
  encoding: "utf8"
});

assert([0, 1].includes(result.status), result.stderr || result.stdout);
const body = JSON.parse(fs.readFileSync(path.resolve(report), "utf8"));
assert.equal(body.kind, "nodus-local-collaboration-report");
assert.equal(body.mode, "dry-run");
assert(["ready", "failed"].includes(body.status));
assert.equal(body.database, "isolated PostgreSQL 16 on 127.0.0.1:55432");
assert(body.commands.some((command) => command.label === "Docker daemon"));
if (body.status === "failed") assert.match(body.error, /Docker Desktop is not available/);
fs.unlinkSync(path.resolve(report));
console.log("✅ Local collaboration runner diagnostics are reproducible and report-safe");
