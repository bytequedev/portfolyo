'use client';

import { useState, useEffect, useCallback } from 'react';

type Category = 'all' | 'web' | 'mobile';

interface Project {
  id: number;
  image: string;
  title: string;
  description: string;
  tags: string[];
  category: 'web' | 'mobile';
}

const projects: Project[] = [
  {
    id: 1,
    image: '/images/ek.png',
    title: 'Profesyonel Kuaför Sitesi + Admin Panel',
    description: 'Kuaför salonları için müşteri kazandıran, modern ve mobil uyumlu bir web sitesi geliştirdik. Online randevu sistemi ve güçlü admin panel sayesinde işletme sahipleri tüm içerikleri kolayca yönetebilir.',
    tags: ['Next.js', 'Firebase', 'Web'],
    category: 'web',
  },
  {
    id: 2,
    image: '/images/dı.png',
    title: 'Yapay Zeka Destekli Diş Hastalıkları Tespit Uygulaması',
    description: 'Ağız içi görüntülerden diş hastalıklarını tespit etmek için geliştirilmiş bir mobil uygulamadır. Kullanıcılar, ağız içi fotoğraflarını uygulamaya yükleyerek, yapay zeka desteğiyle 5 farklı hastalık sınıfından birine dair olası teşhis alabilir.',
    tags: ['Flutter', 'Firebase', 'Android'],
    category: 'mobile',
  },
  {
    id: 3,
    image: '/images/rkm.png',
    title: 'Eğlenceli Sayı Oyunu: Rakamio',
    description: 'Uygulama içerisinde seviye sistemi, puanlama yapısı ve ilerleme takibi bulunmaktadır. Modern arayüz tasarımı ve akıcı performans ile kullanıcıların keyifli vakit geçirmesi hedeflenmiştir.',
    tags: ['Dart', 'Flutter', 'Android'],
    category: 'mobile',
  },
  {
    id: 4,
    image: '/images/kp.jpeg',
    title: 'Kampüste Paylaş',
    description: 'Kampüste Paylaş, üniversite öğrencileri için özel olarak geliştirilmiş bir mobil uygulamadır. Amacı, öğrencilerin kampüs hayatını daha sosyal, verimli ve keyifli hale getirmektir.',
    tags: ['Flutter', 'Firebase', 'Android'],
    category: 'mobile',
  },
  {
    id: 5,
    image: '/images/yt.png',
    title: 'Yurt İçi İletişim ve Takip Mobil Uygulaması',
    description: 'Yurttaş, öğrenci yurtlarında kalan bireylerin hem birbiriyle iletişim kurmasını hem de günlük yaşamlarını organize etmesini kolaylaştırmak için geliştirilmiş bir mobil uygulamadır.',
    tags: ['React Native', 'Firebase', 'Android'],
    category: 'mobile',
  },
  {
    id: 6,
    image: '/images/kk.png',
    title: 'Mahalle Dayanışma ve Yardımlaşma Uygulaması',
    description: 'Kapı Komşum, mahalle sakinlerinin birbirine yardım edebileceği, iletişim kurabileceği ve topluluk etkinliklerine katılabileceği kapsamlı bir mobil uygulamadır.',
    tags: ['React Native', 'Firebase', 'Node.js'],
    category: 'mobile',
  },
  {
    id: 7,
    image: '/images/motf.png',
    title: 'Görev Takibi ve Mini Oyunlarla Gelişim Uygulaması',
    description: 'Kullanıcılar kendi görevlerini tanımlayıp tamamlarken XP kazanabilir, seviyelerini artırabilir, arkadaşlarıyla etkileşime geçebilir ve mini oyunlarla gelişimlerini destekleyebilir.',
    tags: ['React Native', 'Firebase', 'Android'],
    category: 'mobile',
  },
  {
    id: 8,
    image: '/images/rh.jpeg',
    title: 'ReadHub - Kitap Severlerin Buluşma Noktası',
    description: 'ReadHub, modern bir kitap takip ve topluluk uygulamasıdır. Kullanıcılar kitap arayabilir, okuma durumlarını takip edebilir, diğer okuyucularla spoilerli veya spoilersiz yorumlar paylaşabilir ve kişiselleştirilmiş kitap önerileri alabilir.',
    tags: ['Flutter', 'Firebase', 'Android'],
    category: 'mobile',
  },
  {
    id: 9,
    image: '/images/pg.jpeg',
    title: 'PingBox – Akıllı Mesajlama, Bildirim & Kişisel Asistan',
    description: 'PingBox, kullanıcıların ileri tarihe mesaj planlayabildiği, bildirim alabileceği, sessiz saatler tanımlayabileceği, kullanıcı davranışı analizi ve AI destekli öneri sistemi sunan modern bir kişisel iletişim asistanıdır.',
    tags: ['Flutter', 'Firebase', 'Android'],
    category: 'mobile',
  },
  {
    id: 10,
    image: '/images/ww.jpeg',
    title: 'WardrobeWizard - Akıllı Gardırop',
    description: 'WardrobeWizard, kullanıcıların gardıroplarını daha akıllı, düzenli ve verimli şekilde yönetmelerini sağlayan bir mobil uygulamadır.',
    tags: ['Flutter', 'Firebase', 'Android'],
    category: 'mobile',
  },
  {
    id: 11,
    image: '/images/hng.png',
    title: 'Hangisi? – Karar Verme ve Topluluk Oylama Uygulaması',
    description: 'Hangisi?, kararsız kaldığınız konuları topluluğa sorabileceğiniz, oylama veya yorum sistemi ile fikir alabileceğiniz sosyal bir mobil uygulamadır.',
    tags: ['React Native', 'Firebase', 'Android'],
    category: 'mobile',
  },
  {
    id: 12,
    image: '/images/pz.png',
    title: 'Planzy – Etkinlik Oluşturma ve Sosyal Etkileşim Uygulaması',
    description: 'Planzy, kullanıcıların etkinlik oluşturup katılabileceği, yorum yapabileceği ve etkinliklerin harita üzerinde gösterileceği kapsamlı bir sosyal etkinlik uygulamasıdır.',
    tags: ['React Native', 'Google Maps API', 'Node.js'],
    category: 'mobile',
  },
  {
    id: 13,
    image: '/images/wtr.png',
    title: 'Water Reminder — Su İçme Hatırlatıcısı Uygulaması',
    description: 'Bu proje, kullanıcıların su içme alışkanlıklarını takip etmelerini ve sağlıklı bir şekilde su tüketimini düzenlemelerini sağlayan bir mobil uygulamadır.',
    tags: ['React Native', 'Firebase', 'Android'],
    category: 'mobile',
  },
  {
    id: 14,
    image: '/images/wd.jpeg',
    title: 'WorkdayApp - Günlük Çalışma Takibi',
    description: 'WorkdayApp, çalışanların günlük çalışma durumlarını, izinlerini, avanslarını ve maaş hesaplamalarını kolayca takip edebileceği bir mobil uygulamadır.',
    tags: ['Flutter', 'Firebase', 'Android'],
    category: 'mobile',
  },
  {
    id: 15,
    image: '/images/mh.jpeg',
    title: 'MovieHub - Film Keyfinin Yeni Adresi',
    description: 'MovieHub, popüler filmleri keşfetmenizi, detaylarını incelemenizi ve favorilerinizi yönetmenizi sağlayan modern ve kullanıcı dostu bir mobil uygulamadır.',
    tags: ['Flutter', 'Firebase', 'ML Kit'],
    category: 'mobile',
  },
  {
    id: 16,
    image: '/images/ko.png',
    title: 'Kelime Oyunu Web Sitesi',
    description: 'Bu proje, kullanıcıların seviye seçerek kelime oyunu oynayabileceği eğlenceli bir web platformudur.',
    tags: ['Next.js', 'TypeScript', 'Web'],
    category: 'web',
  },
  {
    id: 17,
    image: '/images/trf.png',
    title: 'Tarif Web Sitesi',
    description: 'Bu proje, kullanıcıların farklı yemek tariflerini keşfedebileceği, favorileyebileceği ve kendi tariflerini paylaşabileceği bir tarif platformudur.',
    tags: ['React', 'Node.js', 'Web'],
    category: 'web',
  },
  {
    id: 18,
    image: '/images/flm.png',
    title: 'Film Öneri Sitesi',
    description: 'Bu proje, kullanıcıların film keşfetmesini kolaylaştıran bir film öneri platformudur.',
    tags: ['React', 'REST API', 'Web'],
    category: 'web',
  },
  {
    id: 19,
    image: '/images/tt.jpeg',
    title: 'TaskTeam – Takımlar için Görev & Proje Yönetim Sistemi',
    description: 'TaskTeam, ekiplerin proje, görev ve personel yönetimini tek bir platform üzerinden kolayca yapabilmesi için geliştirilmiş tam entegre bir web uygulamasıdır.',
    tags: ['Angular', '.Net', 'PostgreSQL'],
    category: 'web',
  },
  {
    id: 20,
    image: '/images/cl.jpeg',
    title: 'CornLeafAI - Mısır Yaprağı Hastalık Tespit Uygulaması',
    description: 'CornLeafAI, mısır yapraklarındaki hastalıkları tespit eden yapay zekâ destekli mobil uygulamadır.',
    tags: ['Flutter', 'TensorFlow Lite', 'Firebase'],
    category: 'mobile',
  },
];

const FILTERS: { label: string; value: Category; icon: string }[] = [
  { label: 'Tümü', value: 'all', icon: '⚡' },
  { label: 'Mobil Uygulamalar', value: 'mobile', icon: '📱' },
  { label: 'Web Uygulamaları', value: 'web', icon: '🌐' },
];

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState<Category>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Filtered projects based on active category
  const filtered = activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  const openLightbox = (indexInFiltered: number) => setLightboxIndex(indexInFiltered);
  const closeLightbox = () => setLightboxIndex(null);

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + filtered.length) % filtered.length : null
    );
  }, [filtered.length]);

  const goNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % filtered.length : null
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
    return () => { document.body.style.overflow = ''; };
  }, [lightboxIndex]);

  // Close lightbox when filter changes
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

        {/* Filter Tabs */}
        <div className="portfolio-filters">
          {FILTERS.map((f) => {
            const count = f.value === 'all'
              ? projects.length
              : projects.filter((p) => p.category === f.value).length;
            return (
              <button
                key={f.value}
                className={`portfolio-filter-btn${activeFilter === f.value ? ' active' : ''}`}
                onClick={() => setActiveFilter(f.value)}
                aria-pressed={activeFilter === f.value}
              >
                <span className="pf-icon">{f.icon}</span>
                <span className="pf-label">{f.label}</span>
                <span className="pf-count">{count}</span>
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div className="portfolio-grid">
          {filtered.map((project, index) => (
            <div
              key={project.id}
              className="portfolio-card"
              onClick={() => openLightbox(index)}
              role="button"
              tabIndex={0}
              aria-label={`${project.title} projesini büyüt`}
              onKeyDown={(e) => e.key === 'Enter' && openLightbox(index)}
            >

              <div
                className="portfolio-image"
                style={{ backgroundImage: `url('${project.image}')` }}
              >
                <div className="portfolio-zoom-hint">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                    <line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" />
                  </svg>
                </div>
              </div>
              <div className="portfolio-content">
                <h3 className="portfolio-title">{project.title}</h3>
                <p className="portfolio-description">{project.description}</p>
                <div className="portfolio-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
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
            <button className="lightbox-close" onClick={closeLightbox} aria-label="Kapat">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <button className="lightbox-nav lightbox-prev" onClick={goPrev} aria-label="Önceki proje">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <div className="lightbox-image-wrap">
              <img src={active.image} alt={active.title} className="lightbox-img" />
            </div>

            <button className="lightbox-nav lightbox-next" onClick={goNext} aria-label="Sonraki proje">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            <div className="lightbox-info">
              <span className={`portfolio-badge ${active.category}`} style={{ marginBottom: '0.8rem', display: 'inline-block' }}>
                {active.category === 'web' ? '🌐 Web' : '📱 Mobil'}
              </span>
              <h3 className="lightbox-title">{active.title}</h3>
              <p className="lightbox-desc">{active.description}</p>
              <div className="portfolio-tags">
                {active.tags.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
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
