/**
 * Firebase Storage CORS ayarlama scripti (v2)
 * Firebase App + signInAnonymously ile token alır ve GCS API'ye PATCH atar
 * 
 * Önce: npm install node-fetch@2 --save-dev
 * Çalıştır: node scripts/set-cors.mjs
 */

import https from "https";

const BUCKET = "portfolyo-259f9.appspot.com";
const API_KEY = "AIzaSyD6_5Zg3A_-niGtAYGSPKhkQlABg01ZDjM";

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

function post(hostname, path, body, headers) {
  return new Promise((resolve, reject) => {
    const data = typeof body === "string" ? body : JSON.stringify(body);
    const req = https.request(
      {
        hostname,
        path,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(data),
          ...headers,
        },
      },
      (res) => {
        let d = "";
        res.on("data", (c) => (d += c));
        res.on("end", () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(JSON.parse(d));
          } else {
            reject(new Error(`HTTP ${res.statusCode}: ${d}`));
          }
        });
      }
    );
    req.on("error", reject);
    req.write(data);
    req.end();
  });
}

function patch(hostname, path, body, token) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const req = https.request(
      {
        hostname,
        path,
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(data),
          Authorization: `Bearer ${token}`,
        },
      },
      (res) => {
        let d = "";
        res.on("data", (c) => (d += c));
        res.on("end", () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(JSON.parse(d));
          } else {
            reject(new Error(`HTTP ${res.statusCode}: ${d}`));
          }
        });
      }
    );
    req.on("error", reject);
    req.write(data);
    req.end();
  });
}

async function main() {
  console.log("🔑 Firebase anonymous token alınıyor...");

  // Anonymous sign-in ile idToken al
  const signIn = await post(
    "identitytoolkit.googleapis.com",
    `/v1/accounts:signUp?key=${API_KEY}`,
    { returnSecureToken: true }
  );

  const idToken = signIn.idToken;
  if (!idToken) throw new Error("idToken alınamadı");
  console.log("✓ idToken alındı.");

  // Exchange idToken for Google OAuth access token via token exchange
  // Firebase Storage uses the project-level OAuth, not user tokens.
  // We need a Service Account or OAuth2 flow for GCS admin operations.
  // 
  // Alternative: use the Firebase Storage REST API with the Firebase ID token
  // Firebase Storage allows uploads with Firebase ID tokens!
  
  console.log("\n⚠️  Firebase anonim token GCS admin API için yeterli değil.");
  console.log("   GCS CORS ayarı için Service Account gerekiyor.");
  console.log("\n📋 Manuel çözüm — Google Cloud Console üzerinden:");
  console.log("   1. https://console.cloud.google.com/storage/browser adresine git");
  console.log("   2. 'portfolyo-259f9.appspot.com' bucket'ını seç");
  console.log("   3. 'Permissions' sekmesine tıkla");
  console.log("   4. CORS ayarı için aşağıdaki komutu PowerShell'de çalıştır:\n");
  
  process.exit(0);
}

main().catch((e) => {
  console.error("❌", e.message);
  process.exit(1);
});
