import AdminLayout from "../layout";

export default function SupportPage() {
  return (
      <div style={{ textAlign: "center", marginTop: "5rem" }}>
        <h2 style={{ fontSize: "1.7rem", fontWeight: 600, color: "#76a9fa", marginBottom: "1.5rem" }}>Destek Talepleri</h2>
        <div style={{ color: "#aaa", fontSize: "1.1rem", border: "2px dashed #333", borderRadius: "12px", padding: "3rem 0" }}>
          Henüz destek talebi bulunmamaktadır.
        </div>
      </div>
  );
}
