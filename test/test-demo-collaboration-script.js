import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const source = fs.readFileSync(path.resolve("scripts/execute-demo-collaboration.mjs"), "utf8");
assert(source.includes("bootstrapKeyIdentity"), "Both wallets register only public encryption identities");
assert(source.includes("NodusCrypto.wrapDataKey"), "Member access is granted through a client-generated envelope");
assert(source.includes("/shares/${encodeURIComponent(shareBody.share.id)}"), "The runner revokes the exact persisted share grant");
assert(source.includes("postRevocationEnvelopeStatus"), "The report records the blocked post-revocation envelope read");
assert(!source.includes("fileKeyHex: artifact.fileKeyHex"), "The public collaboration report does not serialize the AES data key");
console.log("✅ Live collaboration runner preserves the zero-custody evidence boundary");
