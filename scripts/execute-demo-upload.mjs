import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import nacl from 'tweetnacl';
import bs58 from 'bs58';

const ownerRaw = JSON.parse(fs.readFileSync('.demo-wallets/owner.json', 'utf8'));
const ownerKeypair = nacl.sign.keyPair.fromSecretKey(Uint8Array.from(ownerRaw));
const ownerAddress = bs58.encode(ownerKeypair.publicKey);
const API_BASE = 'http://localhost:3000';

async function main() {
  console.log('==================================================');
  console.log('🌊 STEP 1 & 2: OWNER SIWS LOGIN & WALRUS UPLOAD');
  console.log('==================================================');
  console.log(`1. Authenticating as Owner (${ownerAddress})...`);

  // 1. Challenge
  const challengeRes = await fetch(`${API_BASE}/api/auth/solana/challenge`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ address: ownerAddress })
  });
  const challenge = await challengeRes.json();

  // 2. Sign
  const messageBytes = new TextEncoder().encode(challenge.message);
  const signatureBytes = nacl.sign.detached(messageBytes, ownerKeypair.secretKey);
  const signature = bs58.encode(signatureBytes);

  // 3. Verify
  const verifyRes = await fetch(`${API_BASE}/api/auth/solana/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      address: ownerAddress,
      signature,
      message: challenge.message,
      organizationId: 'demo-org'
    })
  });
  const auth = await verifyRes.json();
  if (!auth.success || !auth.accessToken) {
    throw new Error(`Owner authentication failed: ${JSON.stringify(auth)}`);
  }
  const token = auth.accessToken;
  console.log(`   ✅ SIWS Login Verified! Role: ${auth.role}, Tenant: ${auth.tenant?.organizationId}`);

  // 4. Create sample non-sensitive file and encrypt it
  console.log('\n2. Encrypting sample file client-side with AES-256-GCM...');
  const samplePlaintext = Buffer.from(
    `NODUS SOVEREIGN DATA SPECIFICATION - HACKATHON DEMO\n` +
    `Created at: ${new Date().toISOString()}\n` +
    `Tenant: demo-org\n` +
    `Classification: Highly Confidential / End-to-End Encrypted\n` +
    `Integrity: Zero-Plaintext Client Ciphertext\n` +
    `This payload was encrypted on the user device before leaving the browser.`
  );

  const fileKey = crypto.randomBytes(32); // Ephemeral file AES key
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', fileKey, iv);
  const ciphertext = Buffer.concat([cipher.update(samplePlaintext), cipher.final()]);
  const authTag = cipher.getAuthTag();
  const encryptedPayload = Buffer.concat([ciphertext, authTag]);

  const encryptionMeta = {
    iv: iv.toString('hex'),
    originalName: 'nodus-demo-spec.pdf',
    originalType: 'application/pdf',
    originalSize: samplePlaintext.length
  };

  console.log(`   Plaintext size:   ${samplePlaintext.length} bytes`);
  console.log(`   Ciphertext size:  ${encryptedPayload.length} bytes`);
  console.log(`   Encryption meta:  ${JSON.stringify(encryptionMeta)}`);

  // 5. Build Multipart Form
  console.log('\n3. Uploading encrypted ciphertext to Walrus Testnet...');
  const formData = new FormData();
  formData.append('file', new Blob([encryptedPayload], { type: 'application/octet-stream' }), 'nodus-demo-spec.pdf');
  formData.append('originalName', 'nodus-demo-spec.pdf');
  formData.append('description', 'Nodus Sovereign Architecture Specification (Encrypted)');
  formData.append('encryption', JSON.stringify(encryptionMeta));
  formData.append('tags', 'hackathon,devnet,walrus,demo');

  const uploadRes = await fetch(`${API_BASE}/api/assets/upload`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: formData
  });

  const uploadResult = await uploadRes.json();
  if (!uploadRes.ok || !uploadResult.success) {
    console.error('Upload error response:', uploadResult);
    throw new Error(`Upload failed with HTTP ${uploadRes.status}: ${uploadResult.error || 'Unknown error'}`);
  }

  const asset = uploadResult.photo || uploadResult.result;
  const blobId = asset.blob_id || asset.blobId;
  const walruscanUrl = `https://walruscan.com/testnet/blob/${blobId}`;

  console.log('\n🎉 UPLOAD TO WALRUS TESTNET SUCCESSFUL!');
  console.log(`   Asset ID:      ${asset.id}`);
  console.log(`   Blob ID:       ${blobId}`);
  console.log(`   Walruscan URL: ${walruscanUrl}`);
  console.log(`   Storage Kind:  ${asset.storage_kind || 'walrus'}`);

  // Save the encryption key locally in scratch for step 3 sharing
  const demoAssetRecord = {
    assetId: asset.id,
    blobId,
    walruscanUrl,
    fileKeyHex: fileKey.toString('hex'),
    encryptionMeta,
    uploadedAt: new Date().toISOString()
  };
  fs.writeFileSync('scratch/demo_uploaded_asset.json', JSON.stringify(demoAssetRecord, null, 2));
  console.log('\nSaved demo asset metadata to scratch/demo_uploaded_asset.json');
}

main().catch(err => {
  console.error('\n❌ Execution error:', err);
  process.exit(1);
});
