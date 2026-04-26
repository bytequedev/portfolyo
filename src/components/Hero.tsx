export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-bg-animation">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
        <div className="geo-shape geo-1"></div>
        <div className="geo-shape geo-2"></div>
        <div className="particles">
          {[...Array(10)].map((_, i) => (
            <span className="particle" key={i}></span>
          ))}
        </div>
      </div>
      <div className="hero-content">
        <h1>Byteque</h1>
        <p className="subtitle">Startup Studio: Web, Admin Panel & Mobile</p>
        <p>Yenilikçi dijital çözümler, güçlü yönetim panelleri ve mobil uygulamalar geliştiriyoruz.</p>
        <div className="cta-buttons">
          <a href="#portfolio" className="cta-primary">Projelerimiz</a>
          <a href="#contact" className="cta-secondary">İletişime Geçin</a>
        </div>
        <div className="stats-section">
          <div className="stat-card">
            <span className="stat-number">30+</span>
            <span className="stat-label">Kurumsal Proje</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">10+</span>
            <span className="stat-label">Mobil Uygulama</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">20+</span>
            <span className="stat-label">Müşteri</span>
          </div>
        </div>
      </div>
    </section>
  );
}
