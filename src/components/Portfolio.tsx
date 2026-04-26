export default function Portfolio() {
  return (
    <section id="portfolio" className="fade-in">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Projelerimiz</h2>
          <p className="section-subtitle">Byteque ekibinin geliştirdiği bazı web, admin paneli ve mobil uygulama projeleri</p>
        </div>
        <div className="portfolio-grid">
          <div className="portfolio-card">
            <div className="portfolio-image ecommerce"></div>
            <div className="portfolio-content">
              <h3 className="portfolio-title">E-Ticaret Platformu</h3>
              <p className="portfolio-description">Modern tasarıma sahip, kolay yönetilebilir ve gelişmiş raporlama sunan e-ticaret çözümü.</p>
              <div className="portfolio-tags">
                <span className="tag">React</span>
                <span className="tag">Node.js</span>
                <span className="tag">MongoDB</span>
                <span className="tag">Stripe</span>
              </div>
            </div>
          </div>
          <div className="portfolio-card">
            <div className="portfolio-image analytics"></div>
            <div className="portfolio-content">
              <h3 className="portfolio-title">Analitik Panel</h3>
              <p className="portfolio-description">Gerçek zamanlı veri takibi, özel grafikler ve filtreleme özellikleriyle güçlü yönetim paneli.</p>
              <div className="portfolio-tags">
                <span className="tag">Vue.js</span>
                <span className="tag">D3.js</span>
                <span className="tag">Python</span>
                <span className="tag">PostgreSQL</span>
              </div>
            </div>
          </div>
          <div className="portfolio-card">
            <div className="portfolio-image music"></div>
            <div className="portfolio-content">
              <h3 className="portfolio-title">Müzik Dinleme Uygulaması</h3>
              <p className="portfolio-description">Animasyonlu, offline dinleme ve sosyal özelliklere sahip mobil müzik uygulaması.</p>
              <div className="portfolio-tags">
                <span className="tag">React Native</span>
                <span className="tag">Redux</span>
                <span className="tag">AWS</span>
                <span className="tag">WebRTC</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
