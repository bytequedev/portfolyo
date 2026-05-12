/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState, useRef } from 'react';
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
} from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../../../firebaseConfig';
import './content.css';

/* ─── Types ──────────────────────────────────────────── */
interface Project {
  id: string;
  order: number;
  image: string;
  title: string;
  description: string;
  tags: string[];
  category: 'web' | 'mobile';
  createdAt?: any;
}

interface FormState {
  title: string;
  description: string;
  image: string;          // URL (Storage ya da manuel)
  category: 'web' | 'mobile';
  tags: string;
}

const EMPTY_FORM: FormState = {
  title: '',
  description: '',
  image: '',
  category: 'web',
  tags: '',
};

/* ─── Toast ───────────────────────────────────────────── */
interface ToastMsg {
  id: number;
  type: 'success' | 'error';
  text: string;
}

/* ─── Main Component ─────────────────────────────────── */
export default function ContentPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState<'all' | 'web' | 'mobile'>('all');

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Project | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  // Upload state
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadPreview, setUploadPreview] = useState<string>('');
  const [uploadProgress, setUploadProgress] = useState<number>(-1); // -1 = idle
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Delete confirm
  const [deleteTarget, setDeleteTarget] = useState<Project | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState<ToastMsg[]>([]);
  const toastIdRef = useRef(0);

  /* ── Firestore listener ────────────────────────────── */
  useEffect(() => {
    const q = query(collection(db, 'projects'), orderBy('id', 'asc'));
    const unsub = onSnapshot(q, (snap) => {
      const data: Project[] = snap.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<Project, 'id'>),
      }));
      setProjects(data);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  /* ── Toast helpers ─────────────────────────────────── */
  const pushToast = (type: 'success' | 'error', text: string) => {
    const id = ++toastIdRef.current;
    setToasts((prev) => [...prev, { id, type, text }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3500);
  };

  /* ── Filtered list ─────────────────────────────────── */
  const displayed = projects.filter((p) => {
    const matchCat = catFilter === 'all' || p.category === catFilter;
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q));
    return matchCat && matchSearch;
  });

  /* ── Reset upload state ────────────────────────────── */
  const resetUpload = () => {
    setUploadFile(null);
    setUploadPreview('');
    setUploadProgress(-1);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  /* ── Open add modal ────────────────────────────────── */
  const openAdd = () => {
    setEditTarget(null);
    setForm(EMPTY_FORM);
    resetUpload();
    setModalOpen(true);
  };

  /* ── Open edit modal ───────────────────────────────── */
  const openEdit = (p: Project) => {
    setEditTarget(p);
    setForm({
      title: p.title,
      description: p.description,
      image: p.image,
      category: p.category,
      tags: p.tags.join(', '),
    });
    resetUpload();
    setModalOpen(true);
  };

  /* ── Handle file select ────────────────────────────── */
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // Validate type
    if (!file.type.startsWith('image/')) {
      pushToast('error', 'Sadece resim dosyası yükleyebilirsiniz.');
      return;
    }
    // Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      pushToast('error', 'Dosya boyutu 5MB\'dan küçük olmalıdır.');
      return;
    }
    setUploadFile(file);
    setUploadProgress(-1);
    // Local preview
    const reader = new FileReader();
    reader.onload = (ev) => setUploadPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
    // Clear manual URL when file is selected
    setForm((prev) => ({ ...prev, image: '' }));
  };

  /* ── Upload to Storage ─────────────────────────────── */
  const uploadToStorage = (): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!uploadFile) return resolve(form.image);
      const ext = uploadFile.name.split('.').pop();
      const filename = `projects/${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;
      const storageRef = ref(storage, filename);
      const task = uploadBytesResumable(storageRef, uploadFile);

      task.on(
        'state_changed',
        (snapshot) => {
          const pct = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setUploadProgress(pct);
        },
        (err) => reject(err),
        async () => {
          const url = await getDownloadURL(task.snapshot.ref);
          resolve(url);
        }
      );
    });
  };

  /* ── Save (add or update) ──────────────────────────── */
  const handleSave = async () => {
    if (!form.title.trim() || !form.description.trim()) {
      pushToast('error', 'Başlık ve açıklama zorunludur.');
      return;
    }
    setSaving(true);
    try {
      // Upload image first if a file is selected
      let imageUrl = form.image.trim();
      if (uploadFile) {
        imageUrl = await uploadToStorage();
      }
      if (!imageUrl) imageUrl = '/images/placeholder.png';

      const payload = {
        title: form.title.trim(),
        description: form.description.trim(),
        image: imageUrl,
        category: form.category,
        tags: form.tags
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
      };

      if (editTarget) {
        await updateDoc(doc(db, 'projects', editTarget.id), payload);
        pushToast('success', 'Proje başarıyla güncellendi.');
      } else {
        const maxId =
          projects.length > 0 ? Math.max(...projects.map((p) => Number(p.order) || 0)) : 0;
        await addDoc(collection(db, 'projects'), {
          ...payload,
          id: maxId + 1,
          order: maxId + 1,
          createdAt: new Date(),
        });
        pushToast('success', 'Proje başarıyla eklendi.');
      }
      setModalOpen(false);
      resetUpload();
    } catch (err: any) {
      pushToast('error', 'Hata oluştu: ' + (err?.message || 'Bilinmeyen hata'));
    } finally {
      setSaving(false);
      setUploadProgress(-1);
    }
  };

  /* ── Delete ────────────────────────────────────────── */
  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      // Storage'dan da sil (URL firebase storage ise)
      if (deleteTarget.image.includes('firebasestorage.googleapis.com')) {
        try {
          const imgRef = ref(storage, deleteTarget.image);
          await deleteObject(imgRef);
        } catch {
          // Storage'dan silinemese bile Firestore'dan sil
        }
      }
      await deleteDoc(doc(db, 'projects', deleteTarget.id));
      pushToast('success', `"${deleteTarget.title}" silindi.`);
      setDeleteTarget(null);
    } catch (err: any) {
      pushToast('error', 'Silme hatası: ' + (err?.message || ''));
    } finally {
      setDeleting(false);
    }
  };

  /* ── Active image preview (file or URL) ────────────── */
  const activePreview = uploadPreview || form.image;

  /* ─── Render ─────────────────────────────────────── */
  return (
    <div className="cm-wrapper">
      {/* ── Header Bar ───────────────────────────────── */}
      <div className="cm-topbar">
        <div className="cm-topbar-left">
          <h2 className="cm-title">
            <span className="cm-title-icon">🗂️</span> İçerik Yönetimi
          </h2>
          <span className="cm-badge">{projects.length} Proje</span>
        </div>
        <button className="cm-add-btn" onClick={openAdd} id="btn-add-project">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Yeni Proje
        </button>
      </div>

      {/* ── Filter Row ───────────────────────────────── */}
      <div className="cm-filterbar">
        <div className="cm-search-wrap">
          <svg className="cm-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            id="input-search-projects"
            className="cm-search"
            type="text"
            placeholder="Başlık veya tag ile ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button className="cm-search-clear" onClick={() => setSearch('')} aria-label="Aramayı temizle">✕</button>
          )}
        </div>
        <div className="cm-cat-tabs">
          {(['all', 'web', 'mobile'] as const).map((c) => (
            <button
              key={c}
              className={`cm-cat-tab${catFilter === c ? ' active' : ''}`}
              onClick={() => setCatFilter(c)}
            >
              {c === 'all' ? '⚡ Tümü' : c === 'web' ? '🌐 Web' : '📱 Mobil'}
            </button>
          ))}
        </div>
      </div>

      {/* ── Stats Row ────────────────────────────────── */}
      <div className="cm-stats">
        <div className="cm-stat">
          <span className="cm-stat-num">{projects.length}</span>
          <span className="cm-stat-label">Toplam</span>
        </div>
        <div className="cm-stat">
          <span className="cm-stat-num">{projects.filter((p) => p.category === 'web').length}</span>
          <span className="cm-stat-label">Web</span>
        </div>
        <div className="cm-stat">
          <span className="cm-stat-num">{projects.filter((p) => p.category === 'mobile').length}</span>
          <span className="cm-stat-label">Mobil</span>
        </div>
        <div className="cm-stat">
          <span className="cm-stat-num">{displayed.length}</span>
          <span className="cm-stat-label">Görüntülenen</span>
        </div>
      </div>

      {/* ── Cards Grid ───────────────────────────────── */}
      {loading ? (
        <div className="cm-grid">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="cm-card cm-skeleton-card">
              <div className="cm-sk-img" />
              <div className="cm-sk-body">
                <div className="cm-sk-line cm-sk-title" />
                <div className="cm-sk-line cm-sk-desc" />
                <div className="cm-sk-line cm-sk-desc short" />
                <div className="cm-sk-tags">
                  <div className="cm-sk-tag" /><div className="cm-sk-tag" /><div className="cm-sk-tag" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : displayed.length === 0 ? (
        <div className="cm-empty">
          <div className="cm-empty-icon">📭</div>
          <p>Sonuç bulunamadı.</p>
          {search && <button className="cm-clear-link" onClick={() => setSearch('')}>Aramayı temizle</button>}
        </div>
      ) : (
        <div className="cm-grid">
          {displayed.map((p) => (
            <div key={p.id} className="cm-card">
              <div
                className="cm-card-img"
                style={{ backgroundImage: `url('${p.image}')` }}
              >
                <span className={`cm-cat-badge ${p.category}`}>
                  {p.category === 'web' ? '🌐 Web' : '📱 Mobil'}
                </span>
              </div>
              <div className="cm-card-body">
                <h3 className="cm-card-title">{p.title}</h3>
                <p className="cm-card-desc">{p.description}</p>
                <div className="cm-card-tags">
                  {p.tags.map((t) => (
                    <span key={t} className="cm-tag">{t}</span>
                  ))}
                </div>
                <div className="cm-card-actions">
                  <button
                    className="cm-btn-edit"
                    onClick={() => openEdit(p)}
                    id={`btn-edit-${p.id}`}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                    Düzenle
                  </button>
                  <button
                    className="cm-btn-delete"
                    onClick={() => setDeleteTarget(p)}
                    id={`btn-delete-${p.id}`}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                      <path d="M10 11v6" /><path d="M14 11v6" /><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                    </svg>
                    Sil
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Add / Edit Modal ──────────────────────────── */}
      {modalOpen && (
        <div className="cm-modal-overlay" onClick={() => !saving && setModalOpen(false)}>
          <div className="cm-modal" onClick={(e) => e.stopPropagation()}>
            <div className="cm-modal-header">
              <h3 className="cm-modal-title">
                {editTarget ? '✏️ Proje Düzenle' : '➕ Yeni Proje Ekle'}
              </h3>
              <button className="cm-modal-close" onClick={() => setModalOpen(false)} disabled={saving}>✕</button>
            </div>

            <div className="cm-modal-body">

              {/* ── Image Upload Section ─────────────────── */}
              <div className="cm-upload-section">
                <label className="cm-label">Proje Görseli</label>

                {/* Preview area */}
                <div
                  className={`cm-upload-dropzone${uploadFile || activePreview ? ' has-image' : ''}`}
                  onClick={() => !saving && fileInputRef.current?.click()}
                  onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add('dragging'); }}
                  onDragLeave={(e) => e.currentTarget.classList.remove('dragging')}
                  onDrop={(e) => {
                    e.preventDefault();
                    e.currentTarget.classList.remove('dragging');
                    const file = e.dataTransfer.files[0];
                    if (file) {
                      const fakeEvent = { target: { files: [file] } } as any;
                      handleFileSelect(fakeEvent);
                    }
                  }}
                >
                  {activePreview ? (
                    <img src={activePreview} alt="önizleme" className="cm-upload-preview-img" />
                  ) : (
                    <div className="cm-upload-placeholder">
                      <div className="cm-upload-icon">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="17 8 12 3 7 8" />
                          <line x1="12" y1="3" x2="12" y2="15" />
                        </svg>
                      </div>
                      <p className="cm-upload-hint">Tıkla veya sürükle &amp; bırak</p>
                      <span className="cm-upload-sub">PNG, JPG, WebP — maks. 5MB</span>
                    </div>
                  )}

                  {/* Overlay on hover when image exists */}
                  {activePreview && (
                    <div className="cm-upload-overlay">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                      </svg>
                      <span>Değiştir</span>
                    </div>
                  )}
                </div>

                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  id="file-upload-input"
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleFileSelect}
                  disabled={saving}
                />

                {/* Upload progress bar */}
                {uploadProgress >= 0 && (
                  <div className="cm-progress-wrap">
                    <div className="cm-progress-bar">
                      <div
                        className="cm-progress-fill"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                    <span className="cm-progress-label">{uploadProgress}%</span>
                  </div>
                )}

                {/* File info + clear button */}
                {uploadFile && uploadProgress < 0 && (
                  <div className="cm-file-info">
                    <span className="cm-file-name">📎 {uploadFile.name}</span>
                    <button
                      className="cm-file-clear"
                      onClick={(e) => { e.stopPropagation(); resetUpload(); }}
                      disabled={saving}
                    >
                      ✕ Kaldır
                    </button>
                  </div>
                )}

                {/* Divider */}
                <div className="cm-upload-divider">
                  <span>ya da URL gir</span>
                </div>

                {/* Manual URL input */}
                <input
                  id="fm-img"
                  className="cm-input"
                  type="text"
                  placeholder="/images/projem.png veya https://..."
                  value={form.image}
                  onChange={(e) => {
                    setForm({ ...form, image: e.target.value });
                    if (e.target.value) resetUpload();
                  }}
                  disabled={saving}
                />
              </div>

              {/* ── Other fields ─────────────────────────── */}
              <div className="cm-form-group">
                <label className="cm-label" htmlFor="fm-title">Proje Adı *</label>
                <input
                  id="fm-title"
                  className="cm-input"
                  type="text"
                  placeholder="ör. ReadHub – Kitap Takip Uygulaması"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  disabled={saving}
                />
              </div>

              <div className="cm-form-group">
                <label className="cm-label" htmlFor="fm-desc">Açıklama *</label>
                <textarea
                  id="fm-desc"
                  className="cm-input cm-textarea"
                  placeholder="Projeyi kısaca anlat..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={4}
                  disabled={saving}
                />
              </div>

              <div className="cm-form-row">
                <div className="cm-form-group">
                  <label className="cm-label" htmlFor="fm-cat">Kategori</label>
                  <select
                    id="fm-cat"
                    className="cm-input cm-select"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value as 'web' | 'mobile' })}
                    disabled={saving}
                  >
                    <option value="web">🌐 Web</option>
                    <option value="mobile">📱 Mobil</option>
                  </select>
                </div>
                <div className="cm-form-group">
                  <label className="cm-label" htmlFor="fm-tags">Etiketler (virgülle ayır)</label>
                  <input
                    id="fm-tags"
                    className="cm-input"
                    type="text"
                    placeholder="ör. Flutter, Firebase, Android"
                    value={form.tags}
                    onChange={(e) => setForm({ ...form, tags: e.target.value })}
                    disabled={saving}
                  />
                </div>
              </div>

              {form.tags && (
                <div className="cm-tag-preview">
                  {form.tags.split(',').map((t) => t.trim()).filter(Boolean).map((t) => (
                    <span key={t} className="cm-tag">{t}</span>
                  ))}
                </div>
              )}
            </div>

            <div className="cm-modal-footer">
              <button className="cm-btn-cancel" onClick={() => setModalOpen(false)} disabled={saving}>
                İptal
              </button>
              <button className="cm-btn-save" onClick={handleSave} disabled={saving} id="btn-modal-save">
                {saving ? (
                  <><span className="cm-spinner" /> {uploadProgress >= 0 ? `${uploadProgress}%` : 'Kaydediliyor...'}</>
                ) : editTarget ? (
                  'Güncelle'
                ) : (
                  'Ekle'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete Confirm Dialog ─────────────────────── */}
      {deleteTarget && (
        <div className="cm-modal-overlay" onClick={() => !deleting && setDeleteTarget(null)}>
          <div className="cm-modal cm-confirm-modal" onClick={(e) => e.stopPropagation()}>
            <div className="cm-confirm-icon">🗑️</div>
            <h3 className="cm-confirm-title">Projeyi Sil</h3>
            <p className="cm-confirm-text">
              <strong>&quot;{deleteTarget.title}&quot;</strong> projesini kalıcı olarak silmek istediğine emin misin?
            </p>
            <div className="cm-confirm-actions">
              <button className="cm-btn-cancel" onClick={() => setDeleteTarget(null)} disabled={deleting}>
                Vazgeç
              </button>
              <button className="cm-btn-danger" onClick={handleDelete} disabled={deleting} id="btn-confirm-delete">
                {deleting ? <span className="cm-spinner" /> : 'Evet, Sil'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Toast Container ───────────────────────────── */}
      <div className="cm-toasts" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className={`cm-toast cm-toast-${t.type}`}>
            <span className="cm-toast-icon">{t.type === 'success' ? '✅' : '❌'}</span>
            {t.text}
          </div>
        ))}
      </div>
    </div>
  );
}
