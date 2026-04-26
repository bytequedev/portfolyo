/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useEffect, useState } from "react";
import { db } from "../../../firebaseConfig";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import "../admin-table.css";

type Support = {
  id: string;
  name: string;
  email: string;
  projectType: string;
  message: string;
  createdAt: { seconds: number; nanoseconds: number } | Date;
};

export default function SupportPage() {
  const [supports, setSupports] = useState<Support[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const q = query(collection(db, "contacts"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      const data: Support[] = snap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as any;
      setSupports(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  // Filtreleme ve arama
  const filtered = supports.filter(s =>
    (typeFilter ? s.projectType === typeFilter : true) &&
    (search ? (
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      s.message.toLowerCase().includes(search.toLowerCase())
    ) : true)
  );

  // Tüm proje türlerini filtre için çıkar
  const allTypes = Array.from(new Set(supports.map(s => s.projectType)));

  return (
    <div className="admin-table-container">
      <div className="admin-table-header">
        <h2>Destek Talepleri</h2>
        <div className="admin-table-filters">
          <input
            type="text"
            placeholder="Ara (isim, e-posta, mesaj)"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
            <option value="">Tümü</option>
            {allTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Ad Soyad</th>
            <th>E-posta</th>
            <th>Proje Türü</th>
            <th>Mesaj</th>
            <th>Tarih</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan={5} className="admin-table-empty">Yükleniyor...</td></tr>
          ) : filtered.length === 0 ? (
            <tr><td colSpan={5} className="admin-table-empty">Kayıt bulunamadı.</td></tr>
          ) : (
            filtered.map(s => (
              <tr key={s.id}>
                <td>{s.name}</td>
                <td>{s.email}</td>
                <td>{s.projectType}</td>
                <td>{s.message}</td>
                <td>{
                  s.createdAt instanceof Date
                    ? s.createdAt.toLocaleString("tr-TR")
                    : new Date((s.createdAt as any).seconds * 1000).toLocaleString("tr-TR")
                }</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
