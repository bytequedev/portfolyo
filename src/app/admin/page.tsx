import AdminLayout from "./layout";

export default function AdminPage() {
  return (
    <AdminLayout>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "60vh" }}>
        <h2 style={{ fontSize: "2rem", fontWeight: 600, marginBottom: "1.5rem", color: "#fff" }}>Yönetim Paneline Hoşgeldiniz</h2>
        <p style={{ color: "#aaa", fontSize: "1.1rem" }}>Sol menüden bir sayfa seçin.</p>
      </div>
    </AdminLayout>
  );
}
