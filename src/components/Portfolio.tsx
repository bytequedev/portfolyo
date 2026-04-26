export default function Portfolio() {
  return (
    <section id="portfolio" className="fade-in">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Featured Work</h2>
          <p className="section-subtitle">A showcase of projects that demonstrate creativity and technical excellence</p>
        </div>
        <div className="portfolio-grid">
          <div className="portfolio-card">
            <div className="portfolio-image ecommerce"></div>
            <div className="portfolio-content">
              <h3 className="portfolio-title">E-Commerce Platform</h3>
              <p className="portfolio-description">A comprehensive e-commerce solution featuring modern design, seamless checkout process, and advanced analytics dashboard.</p>
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
              <h3 className="portfolio-title">Analytics Dashboard</h3>
              <p className="portfolio-description">Interactive data visualization dashboard with real-time updates, custom charts, and advanced filtering capabilities.</p>
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
              <h3 className="portfolio-title">Music Streaming App</h3>
              <p className="portfolio-description">Mobile-first music streaming application with beautiful animations, offline playback, and social features.</p>
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
