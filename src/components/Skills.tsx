import { FaPalette, FaReact, FaMobileAlt, FaCog, FaRocket, FaLightbulb } from "react-icons/fa";
export default function Skills() {
  return (
    <section id="skills" className="fade-in">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Sunduğumuz Katma Değer</h2>
          <p className="section-subtitle">İşinizi büyütmek için güçlü dijital çözümler</p>
        </div>
        <div className="skills-container">
          <div className="skills-wrapper">
            <div className="skills-visual">
              <div className="skills-circle">
                          <div className="skill-node"><div className="skill-icon"><FaPalette /></div><div className="skill-name">UI/UX</div></div>
                          <div className="skill-node"><div className="skill-icon"><FaReact /></div><div className="skill-name">React</div></div>
                          <div className="skill-node"><div className="skill-icon"><FaMobileAlt /></div><div className="skill-name">Mobile</div></div>
                          <div className="skill-node"><div className="skill-icon"><FaCog /></div><div className="skill-name">Backend</div></div>
                          <div className="skill-node"><div className="skill-icon"><FaRocket /></div><div className="skill-name">DevOps</div></div>
                          <div className="skill-node"><div className="skill-icon"><FaLightbulb /></div><div className="skill-name">Innovation</div></div>
                <div className="skills-center">⚡</div>
              </div>
            </div>
            <div className="skills-list">
              <div className="skill-item">
                <h4>Ön Yüz Geliştirme</h4>
                <p>Markanızı yansıtan, her cihazda hızlı ve etkileyici web arayüzleriyle müşterilerinize en iyi ilk izlenimi sunuyoruz.</p>
                <div className="skill-progress"><div className="skill-progress-bar" style={{ width: "95%" }}></div></div>
              </div>
              <div className="skill-item">
                <h4>Tasarım</h4>
                <p>Müşterilerinizin kolayca kullanabileceği, şık ve erişilebilir tasarımlar ile dijital varlığınızı güçlendiriyoruz.</p>
                <div className="skill-progress"><div className="skill-progress-bar" style={{ width: "90%" }}></div></div>
              </div>
              <div className="skill-item">
                <h4>Tam Yığın Geliştirme</h4>
                <p>İş süreçlerinize özel, güvenli ve ölçeklenebilir yazılım çözümleriyle tüm ihtiyaçlarınıza tek noktadan yanıt veriyoruz.</p>
                <div className="skill-progress"><div className="skill-progress-bar" style={{ width: "85%" }}></div></div>
              </div>
              <div className="skill-item">
                <h4>Performans & Optimizasyon</h4>
                <p>Müşterilerinizin memnuniyetini artırmak için hızlı, sorunsuz ve her zaman erişilebilir dijital deneyimler sunuyoruz.</p>
                <div className="skill-progress"><div className="skill-progress-bar" style={{ width: "92%" }}></div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
