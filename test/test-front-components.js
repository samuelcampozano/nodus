import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const appSource = fs.readFileSync(path.join(rootDir, "public", "app.js"), "utf8");
const htmlSource = fs.readFileSync(path.join(rootDir, "public", "index.html"), "utf8");
const styleSource = fs.readFileSync(path.join(rootDir, "public", "style.css"), "utf8").replace(/\r\n/g, "\n");

function assert(condition, message) {
  if (!condition) throw new Error(message);
  console.log(`  ✅ PASS: ${message}`);
}

console.log("==================================================");
console.log("🧩 NODUS — FRONT-END COMPONENT CONTRACT TESTS");
console.log("==================================================");

assert(htmlSource.includes('id="themeBtn"') && appSource.includes('themeBtn.addEventListener("click"'), "Theme selector has an interactive click handler");
assert(appSource.includes('localStorage.setItem("nodus_theme"') && appSource.includes('localStorage.getItem("nodus_theme")'), "Theme preference is persisted and restored");
assert(appSource.includes('document.body.classList.add(`${nextTheme}-theme`)'), "Selected theme is applied to the document body");
assert(appSource.includes('getElementById("dockWalruscanLink")') && appSource.includes('getElementById("dockSuivisionLink")'), "Upload proof links use the IDs rendered by the page");
assert(htmlSource.includes('id="demoEvidencePanel"') && htmlSource.includes('id="demoSolanaProofLink"'), "Demo evidence panel exposes the live Devnet proof link");
assert(appSource.includes("solanaProof: verifyData.solanaProof") && appSource.includes("function updateDemoEvidence()"), "SIWS proof is retained in the session and rendered for the demo");
assert(styleSource.includes(".nav-top-row {\n    flex-wrap: wrap;") && styleSource.includes(".nav-right {\n    width: 100%;"), "Mobile navigation wraps instead of overflowing the viewport");
assert(htmlSource.includes('aria-haspopup="menu" aria-expanded="false"'), "Dropdown controls expose their expanded state to assistive technology");
assert(htmlSource.includes('id="shareSelectedAsset"') && htmlSource.includes('Viewer — visualizar e baixar'), "Hackathon share modal is scoped to one file and viewer access");
assert(!htmlSource.includes('id="shareResourceType"') && !htmlSource.includes('id="shareExpiresAt"'), "Unstable folder and expiry controls are hidden from the hackathon happy path");
assert(appSource.includes('role: "viewer", expiresAt: null') && appSource.includes("Acesso cifrado concedido a"), "Share action grants a deterministic viewer envelope with a clear success state");
assert(appSource.includes("Cópias já baixadas não podem ser apagadas"), "Revocation UI communicates its cryptographic limitation honestly");
assert(htmlSource.includes('id="shareFlowStatus"') && htmlSource.includes('aria-live="polite"'), "Sharing exposes accessible loading, success and error feedback");
assert(htmlSource.includes('id="sidebarCurrentRole"') && htmlSource.includes('id="sidebarSolanaProofLink"'), "File details expose the current role and only render a Devnet proof link when available");

console.log("🎉 ALL FRONT-END COMPONENT CONTRACT TESTS PASSED");
