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
        <h1>Titan Folio</h1>
        <p className="subtitle">Creative Developer & Designer</p>
        <p>Crafting digital experiences with passion and precision</p>
        <div className="cta-buttons">
          <a href="#portfolio" className="cta-primary">View My Work</a>
          <a href="#contact" className="cta-secondary">Let's Talk</a>
        </div>
        <div className="stats-section">
          <div className="stat-card">
            <span className="stat-number">100+</span>
            <span className="stat-label">Projects</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">5+</span>
            <span className="stat-label">Years</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">50+</span>
            <span className="stat-label">Clients</span>
          </div>
        </div>
      </div>
    </section>
  );
}
