import { spawn } from "node:child_process";
import fs from "fs";
import path from "path";

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PORT = 9225;
const ARTIFACT_DIR = "C:\\Users\\samue\\.gemini\\antigravity\\brain\\49257c84-fa91-46e1-918a-dc7ffbb96b6b";

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

class CDPClient {
  constructor(wsUrl) {
    this.ws = new WebSocket(wsUrl);
    this.id = 1;
    this.callbacks = new Map();
    this.ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && this.callbacks.has(msg.id)) {
        const { resolve, reject } = this.callbacks.get(msg.id);
        this.callbacks.delete(msg.id);
        if (msg.error) reject(new Error(msg.error.message));
        else resolve(msg.result);
      }
    };
  }

  async ready() {
    if (this.ws.readyState === WebSocket.OPEN) return;
    return new Promise((resolve, reject) => {
      this.ws.onopen = () => resolve();
      this.ws.onerror = (err) => reject(err);
    });
  }

  send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = this.id++;
      this.callbacks.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  async eval(expression) {
    const res = await this.send("Runtime.evaluate", {
      expression,
      returnByValue: true,
      awaitPromise: true
    });
    return res.result?.value;
  }

  async screenshot(filename) {
    const res = await this.send("Page.captureScreenshot", { format: "png" });
    const buffer = Buffer.from(res.data, "base64");
    const filepath = path.join(ARTIFACT_DIR, filename);
    fs.writeFileSync(filepath, buffer);
    console.log(`  📸 Saved screenshot: ${filename} (${(buffer.length / 1024).toFixed(1)} KB)`);
    return filepath;
  }

  close() {
    this.ws.close();
  }
}

async function main() {
  console.log("==================================================");
  console.log("👁️ VERIFYING INTERACTIVE PLAYGROUND VIA HEADLESS CHROME");
  console.log("==================================================");

  const chromeProcess = spawn(
    CHROME_PATH,
    [
      "--headless=new",
      `--remote-debugging-port=${PORT}`,
      "--disable-gpu",
      "--no-first-run",
      "--no-default-browser-check",
      "--window-size=1440,960",
      "http://localhost:3000"
    ],
    { stdio: "ignore" }
  );

  let cdp = null;

  try {
    let wsUrl = null;
    for (let i = 0; i < 25; i++) {
      await delay(400);
      try {
        const res = await fetch(`http://127.0.0.1:${PORT}/json/list`);
        const list = await res.json();
        if (list.length > 0 && list[0].webSocketDebuggerUrl) {
          wsUrl = list[0].webSocketDebuggerUrl;
          break;
        }
      } catch (e) {}
    }

    if (!wsUrl) throw new Error("Could not connect to Chrome DevTools Protocol");
    console.log("🔌 Connected to Chrome DevTools:", wsUrl);

    cdp = new CDPClient(wsUrl);
    await cdp.ready();
    await cdp.send("Page.enable");
    await cdp.send("Runtime.enable");

    // Allow initial load
    await delay(1200);

    // 1. Scroll to #demo playground
    console.log("\n[Step 1] Scrolling to #demo interactive playground...");
    await cdp.eval(`
      const demoSec = document.getElementById("demo");
      if (demoSec) demoSec.scrollIntoView();
    `);
    await delay(800);
    await cdp.screenshot("playground_1_initial_overview.png");

    // 2. Adjust slider split to 40% (more cipher visible)
    console.log("\n[Step 2] Adjusting split slider to 40%...");
    await cdp.eval(`
      const handle = document.getElementById("playgroundSplitHandle");
      const cipherLayer = document.getElementById("playgroundCipherLayer");
      if (handle && cipherLayer) {
        handle.style.left = "40%";
        cipherLayer.style.width = "60%";
      }
    `);
    await delay(500);
    await cdp.screenshot("playground_2_interactive_split_lens.png");

    // 3. Switch to Golden Gate sunset preset
    console.log("\n[Step 3] Switching to Golden Gate sunset preset...");
    await cdp.eval(`
      const btn = document.getElementById("presetSunsetBtn");
      if (btn) btn.click();
    `);
    await delay(800);
    await cdp.screenshot("playground_3_sunset_preset.png");

    // 4. Click Decrypt button
    console.log("\n[Step 4] Clicking Decrypt in Browser Memory button...");
    await cdp.eval(`
      const decryptBtn = document.getElementById("playgroundDecryptBtn");
      if (decryptBtn) decryptBtn.click();
    `);
    await delay(900);
    await cdp.screenshot("playground_4_decrypted_state.png");

    // 5. Click "Open Full Sovereign Cloud App" to verify streamlined header
    console.log("\n[Step 5] Clicking Open Full Sovereign Cloud App button...");
    await cdp.eval(`
      const launchBtn = document.getElementById("playgroundLaunchBtn");
      if (launchBtn) launchBtn.click();
    `);
    await delay(700);
    await cdp.screenshot("playground_5_streamlined_app_header.png");

    console.log("\n🎉 ALL VISUAL PLAYGROUND SCREENSHOTS CAPTURED SUCCESSFULLY!");
  } finally {
    if (cdp) cdp.close();
    chromeProcess.kill();
  }
}

main().catch(err => {
  console.error("Visual verification failed:", err);
  process.exit(1);
});
