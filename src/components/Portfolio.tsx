'use client';

import { db } from '@/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { useState, useEffect, useCallback } from 'react';
import { FaBolt, FaMobileAlt, FaGlobe, FaRobot } from 'react-icons/fa';

type Category = 'all' | 'web' | 'mobile' | 'ai';

interface Project {
  firestoreId?: string;
  id: number;
  order?: number;
  image: string;
  title: string;
  description: string;
  tags: string[];
  category: ('web' | 'mobile' | 'ai')[];
}

const FILTERS: { label: string; value: Category; icon: React.ReactNode }[] = [
  { label: 'Tümü', value: 'all', icon: <FaBolt /> },
  { label: 'Mobil Uygulamalar', value: 'mobile', icon: <FaMobileAlt /> },
  { label: 'Web Uygulamaları', value: 'web', icon: <FaGlobe /> },
  { label: 'Yapay Zeka Destekli', value: 'ai', icon: <FaRobot /> },
];

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeFilter, setActiveFilter] = useState<Category>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    const getProjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'projects'));

        const data = querySnapshot.docs.map((doc) => {
          const raw = doc.data();
          let cat = raw.category;
          if (typeof cat === 'string') cat = [cat];
          return {
            firestoreId: doc.id,
            ...raw,
            category: cat || [],
          };
        }) as Project[];
        
        // Sort by order ascending (fallback to id if order doesn't exist)
        data.sort((a, b) => (a.order ?? a.id) - (b.order ?? b.id));

        setProjects(data);
      } catch (error) {
        console.error('Veriler çekilemedi:', error);
      }
    };

    getProjects();
  }, []);

  const filtered =
    activeFilter === 'all'
      ? projects
      : projects.filter((p) => p.category?.includes(activeFilter as 'web' | 'mobile' | 'ai'));

  const openLightbox = (indexInFiltered: number) => setLightboxIndex(indexInFiltered);
  const closeLightbox = () => setLightboxIndex(null);

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null && filtered.length > 0
        ? (prev - 1 + filtered.length) % filtered.length
        : null
    );
  }, [filtered.length]);

  const goNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null && filtered.length > 0
        ? (prev + 1) % filtered.length
        : null
    );
  }, [filtered.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;

      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxIndex, goPrev, goNext]);

  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightboxIndex]);

  useEffect(() => {
    setLightboxIndex(null);
  }, [activeFilter]);

  const active = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  return (
    <section id="portfolio" className="fade-in">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Projelerimiz</h2>
          <p className="section-subtitle">
            Byteque ekibinin geliştirdiği web, admin paneli ve mobil uygulama projeleri
          </p>
        </div>

        <div className="portfolio-filters">
          {FILTERS.map((f) => {
            const count =
              f.value === 'all'
                ? projects.length
                : projects.filter((p) => p.category?.includes(f.value as 'web' | 'mobile' | 'ai')).length;

            return (
              <button
                key={f.value}
                className={`portfolio-filter-btn${activeFilter === f.value ? ' active' : ''}`}
                onClick={() => setActiveFilter(f.value)}
                aria-pressed={activeFilter === f.value}
                type="button"
              >
                <span className="pf-icon">{f.icon}</span>
                <span className="pf-label">{f.label}</span>
                <span className="pf-count">{count}</span>
              </button>
            );
          })}
        </div>

        <div className="portfolio-grid">
          {filtered.map((project, index) => (
            <div
              key={project.firestoreId || project.id}
              className="portfolio-card"
              onClick={() => openLightbox(index)}
              role="button"
              tabIndex={0}
              aria-label={`${project.title} projesini büyüt`}
              onKeyDown={(e) => e.key === 'Enter' && openLightbox(index)}
            >
              <div className="portfolio-image">
                <img
                  src={project.image}
                  alt={project.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
                <div className="portfolio-zoom-hint">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    <line x1="11" y1="8" x2="11" y2="14" />
                    <line x1="8" y1="11" x2="14" y2="11" />
                  </svg>
                </div>
              </div>

              <div className="portfolio-content">
                <h3 className="portfolio-title">{project.title}</h3>
                <p className="portfolio-description">{project.description}</p>
                <div className="portfolio-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {active && (
        <div
          className="lightbox-overlay"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Proje büyütülmüş görünüm"
        >
          <div
            className="lightbox-container"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="lightbox-close"
              onClick={closeLightbox}
              aria-label="Kapat"
              type="button"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <button
              className="lightbox-nav lightbox-prev"
              onClick={goPrev}
              aria-label="Önceki proje"
              type="button"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <div
              className="lightbox-image-wrap"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#181d2f',
                width: '80vw',
                height: '60vh',
                maxWidth: '900px',
                maxHeight: '70vh',
                margin: '0 auto',
                borderRadius: '12px',
              }}
            >
              <img
                src={active.image}
                alt={active.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  display: 'block',
                  borderRadius: '12px',
                  background: '#181d2f',
                }}
              />
            </div>

            <button
              className="lightbox-nav lightbox-next"
              onClick={goNext}
              aria-label="Sonraki proje"
              type="button"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            <div className="lightbox-info">
              <h3 className="lightbox-title">{active.title}</h3>
              <p className="lightbox-desc">{active.description}</p>
              <div className="portfolio-tags">
                {active.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
              <span className="lightbox-counter">
                {(lightboxIndex ?? 0) + 1} / {filtered.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}