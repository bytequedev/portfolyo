"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/admin-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      router.refresh();
      router.push("/admin");
    } else {
      setError("Şifre yanlış!");
    }
  };

  return (
    <div className="admin-login-bg" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#101522" }}>
      <form onSubmit={handleSubmit} className="admin-login-form" style={{ background: "#181d2f", padding: "2.5rem 2rem", borderRadius: "16px", boxShadow: "0 8px 32px 0 rgba(0,0,0,0.18)", minWidth: 320 }}>
        <h2 style={{ color: "#76a9fa", textAlign: "center", marginBottom: "2rem", fontWeight: 700, fontSize: "2rem" }}>Admin Girişi</h2>
        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ width: "100%", padding: "0.9rem 1rem", borderRadius: "8px", border: "none", marginBottom: "1.2rem", background: "#23273a", color: "#fff", fontSize: "1.1rem" }}
        />
        {error && <div style={{ color: "#ff6b6b", marginBottom: "1rem", textAlign: "center" }}>{error}</div>}
        <button type="submit" style={{ width: "100%", padding: "0.9rem 1rem", borderRadius: "8px", border: "none", background: "linear-gradient(90deg, #4f83f7 60%, #76a9fa 100%)", color: "#fff", fontWeight: 600, fontSize: "1.1rem", cursor: "pointer" }}>Giriş Yap</button>
      </form>
    </div>
  );
}
