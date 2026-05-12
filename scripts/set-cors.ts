/**
 * Firebase Storage CORS ayarlama scripti
 * Firebase Admin SDK + Google Auth ile çalışır
 * Çalıştır: npx ts-node --project tsconfig.seed.json scripts/set-cors.ts
 */

import * as https from "https";
import * as fs from "fs";
import * as path from "path";
import * as childProcess from "child_process";

const BUCKET = "portfolyo-259f9.appspot.com";
const CORS_CONFIG = [
  {
    origin: ["*"],
    method: ["GET", "PUT", "POST", "DELETE", "HEAD", "OPTIONS"],
    maxAgeSeconds: 3600,
    responseHeader: [
      "Content-Type",
      "Authorization",
      "Content-Length",
      "User-Agent",
      "x-goog-resumable",
      "x-goog-meta-*",
    ],
  },
];

function getAccessToken(): Promise<string> {
  return new Promise((resolve, reject) => {
    // Firebase CLI'ın cached token'ını kullan
    const proc = childProcess.spawn(
      "firebase",
      ["login:print-token"],
      { shell: true, stdio: ["pipe", "pipe", "pipe"] }
    );
    let out = "";
    let err = "";
    proc.stdout.on("data", (d: Buffer) => (out += d.toString()));
    proc.stderr.on("data", (d: Buffer) => (err += d.toString()));
    proc.on("close", (code: number) => {
      const token = out.trim().split("\n").pop()?.trim() || "";
      if (token && token.length > 20) {
        resolve(token);
      } else {
        reject(new Error("Token alınamadı: " + (err || out)));
      }
    });
  });
}

async function setCors(token: string): Promise<void> {
  const body = JSON.stringify({ cors: CORS_CONFIG });

  return new Promise((resolve, reject) => {
    const options = {
      hostname: "storage.googleapis.com",
      path: `/storage/v1/b/${encodeURIComponent(BUCKET)}?fields=cors`,
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(body),
      },
    };

    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        if (res.statusCode === 200) {
          console.log("✅ CORS başarıyla ayarlandı!");
          console.log("Response:", data);
          resolve();
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

async function main() {
  console.log("🔑 Firebase token alınıyor...");
  const token = await getAccessToken();
  console.log("✓ Token alındı.");

  console.log(`\n🌐 CORS ayarlanıyor: gs://${BUCKET}`);
  await setCors(token);
  console.log("\n🎉 Artık resim yükleyebilirsin!");
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Hata:", err.message || err);
  process.exit(1);
});
