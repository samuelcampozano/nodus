import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import nacl from "tweetnacl";
import bs58 from "bs58";
import { createNodusClient, NodusCrypto } from "../sdk/index.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const api = process.env.NODUS_DEMO_API_URL || "http://localhost:3000";
const artifactPath = path.join(root, "scratch", "demo_uploaded_asset.json");
const reportPath = path.join(root, "scratch", "demo_collaboration_report.json");
const report = { kind: "nodus-demo-collaboration-report", startedAt: new Date().toISOString(), api, status: "running" };

function safeError(error) { return String(error?.message || error).replace(/Bearer\s+[^\s]+/gi, "Bearer [redacted]").replace(/[a-f0-9]{64}/gi, "[redacted]"); }
function writeReport() { report.finishedAt = new Date().toISOString(); fs.mkdirSync(path.dirname(reportPath), { recursive: true }); fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`, { mode: 0o600 }); }
function keypair(name) { const raw = JSON.parse(fs.readFileSync(path.join(root, ".demo-wallets", `${name}.json`), "utf8")); return nacl.sign.keyPair.fromSecretKey(Uint8Array.from(raw)); }

async function authenticate(pair, organizationId) {
  const address = bs58.encode(pair.publicKey);
  const client = createNodusClient({ gatewayUrl: api });
  const challenge = await client.getSolanaChallenge(address, new URL(api).hostname);
  const signature = bs58.encode(nacl.sign.detached(new TextEncoder().encode(challenge.message), pair.secretKey));
  const session = await client.verifySolanaAuth(address, signature, challenge.message, organizationId);
  if (!session.solanaProof?.memberPda) throw new Error(`Devnet PDA proof is required for ${address}`);
  return { client, address, session };
}

try {
  if (!fs.existsSync(artifactPath)) throw new Error("Missing scratch/demo_uploaded_asset.json. Run the real Owner upload first.");
  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
  if (!artifact.assetId || !/^[a-f0-9]{64}$/i.test(artifact.fileKeyHex || "")) throw new Error("The local upload artifact is incomplete.");
  const owner = await authenticate(keypair("owner"), "demo-org");
  const member = await authenticate(keypair("member"), "demo-org");
  await owner.client.bootstrapKeyIdentity();
  const memberIdentity = await member.client.bootstrapKeyIdentity();
  owner.client.keyCache.set(artifact.assetId, artifact.fileKeyHex);
  await owner.client.protectAssetKey(artifact.assetId);
  const envelope = await NodusCrypto.wrapDataKey(artifact.fileKeyHex, memberIdentity.identity.primaryPublicKey, {
    assetId: artifact.assetId, recipientAddress: member.address, recipientType: "user", organizationId: "demo-org"
  });
  const shareResponse = await fetch(`${api}/api/assets/${encodeURIComponent(artifact.assetId)}/shares`, {
    method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${owner.client.accessToken}` },
    body: JSON.stringify({ recipientAddress: member.address, role: "viewer", envelopes: [envelope] })
  });
  const shareBody = await shareResponse.json();
  if (!shareResponse.ok || !shareBody.success) throw new Error(shareBody.error || "Unable to grant encrypted access");
  const recovered = await member.client.recoverAssetKey(artifact.assetId);
  if (recovered !== artifact.fileKeyHex) throw new Error("Member envelope did not recover the expected device-local key");
  const revokeResponse = await fetch(`${api}/api/assets/${encodeURIComponent(artifact.assetId)}/shares/${encodeURIComponent(shareBody.share.id)}`, { method: "DELETE", headers: { Authorization: `Bearer ${owner.client.accessToken}` } });
  const revokeBody = await revokeResponse.json();
  if (!revokeResponse.ok || !revokeBody.success) throw new Error(revokeBody.error || "Unable to revoke encrypted access");
  const blocked = await fetch(`${api}/api/assets/${encodeURIComponent(artifact.assetId)}/key-envelopes`, { headers: { Authorization: `Bearer ${member.client.accessToken}` } });
  if (blocked.ok) throw new Error("Member still received a key envelope after revocation");
  report.status = "passed";
  report.asset = { assetId: artifact.assetId, blobId: artifact.blobId || null, walruscanUrl: artifact.walruscanUrl || null };
  report.owner = { address: owner.address, memberPda: owner.session.solanaProof.memberPda };
  report.member = { address: member.address, memberPda: member.session.solanaProof.memberPda };
  report.share = { grantId: shareBody.share.id, role: "viewer", postRevocationEnvelopeStatus: blocked.status };
  report.note = "The report contains no AES key, private identity or bearer token. On-chain capability revocation must be recorded separately by Dev 1.";
  console.log(`✅ Share granted and revoked. Member envelope read after revocation: HTTP ${blocked.status}.`);
} catch (error) {
  report.status = "failed"; report.error = safeError(error); console.error(`❌ Demo collaboration failed: ${report.error}`); process.exitCode = 1;
} finally { writeReport(); console.log("Local evidence written to scratch/demo_collaboration_report.json"); }
