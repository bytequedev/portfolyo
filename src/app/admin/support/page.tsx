/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useEffect, useState } from "react";
import { db } from "../../../firebaseConfig";
import { collection, getDocs, query, orderBy, deleteDoc, doc } from "firebase/firestore";
import "../content/content.css";

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
  const [deleting, setDeleting] = useState<string | null>(null);

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

  const handleDelete = async (id: string) => {
    if (!window.confirm("Bu destek talebini silmek istediğinize emin misiniz?")) return;
    setDeleting(id);
    try {
      await deleteDoc(doc(db, "contacts", id));
      setSupports(prev => prev.filter(s => s.id !== id));
    } catch (err) {
      console.error("Silme hatası", err);
    } finally {
      setDeleting(null);
    }
  };

  const filtered = supports.filter(s => {
    const matchSearch = search ? (
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      s.message.toLowerCase().includes(search.toLowerCase())
    ) : true;
    return matchSearch;
  });

  return (
    <div className="cm-wrapper">
      {/* Header Bar */}
      <div className="cm-topbar">
        <div className="cm-topbar-left">
          <h2 className="cm-title">
            Destek Talepleri
          </h2>
          <span className="cm-badge">{supports.length} Talep</span>
        </div>
      </div>

      {/* Filter Row */}
      <div className="cm-filterbar">
        <div className="cm-search-wrap">
          <svg className="cm-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            className="cm-search"
            type="text"
            placeholder="Ara (isim, e-posta, mesaj)..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && (
            <button className="cm-search-clear" onClick={() => setSearch('')} aria-label="Aramayı temizle">✕</button>
          )}
        </div>
      </div>

      {/* Cards Grid */}
      {loading ? (
        <div className="cm-grid">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="cm-card cm-skeleton-card">
              <div className="cm-sk-body">
                <div className="cm-sk-line cm-sk-title" />
                <div className="cm-sk-line cm-sk-desc" />
                <div className="cm-sk-line cm-sk-desc short" />
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="cm-empty">
          <div className="cm-empty-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <rect x="3" y="4" width="18" height="16" rx="2"></rect>
              <path d="M3 8l9 6 9-6"></path>
            </svg>
          </div>
          <h3>Talep Bulunamadı</h3>
          <p>Seçtiğiniz kriterlere uygun destek talebi bulunmuyor.</p>
        </div>
      ) : (
        <div className="cm-grid">
          {filtered.map(s => {
            const dateStr = s.createdAt instanceof Date
              ? s.createdAt.toLocaleString("tr-TR")
              : s.createdAt 
                ? new Date((s.createdAt as any).seconds * 1000).toLocaleString("tr-TR")
                : "Bilinmiyor";

            return (
              <div key={s.id} className="cm-card">
                <div className="cm-card-body" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <h3 className="cm-card-title" style={{ marginBottom: '0.2rem' }}>{s.name}</h3>
                      <a href={`mailto:${s.email}`} style={{ color: '#93c5fd', fontSize: '0.85rem', textDecoration: 'none' }}>
                        {s.email}
                      </a>
                    </div>
                    {s.projectType && (
                      <span className="cm-cat-badge web" style={{ position: 'relative', top: 0, right: 0 }}>
                        {s.projectType}
                      </span>
                    )}
                  </div>
                  
                  <div style={{ background: 'rgba(15, 23, 42, 0.4)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(148, 163, 184, 0.1)', fontSize: '0.9rem', color: '#e2e8f0', lineHeight: 1.5 }}>
                    {s.message}
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '0.5rem' }}>
                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{dateStr}</span>
                    <button 
                      className="cm-btn-delete"
                      onClick={() => handleDelete(s.id)}
                      disabled={deleting === s.id}
                      style={{ position: 'relative', top: 0, right: 0, opacity: 1, padding: '0.4rem', border: 'none', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: '6px', cursor: 'pointer' }}
                    >
                      {deleting === s.id ? '...' : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                          <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
