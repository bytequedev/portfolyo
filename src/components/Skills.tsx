import Image from "next/image";
import { FaPalette, FaGlobe, FaMobileAlt, FaCog, FaRocket, FaShieldAlt } from "react-icons/fa";

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
                <div className="skill-node"><div className="skill-icon"><FaGlobe /></div><div className="skill-name">Web</div></div>
                <div className="skill-node"><div className="skill-icon"><FaMobileAlt /></div><div className="skill-name">Mobil</div></div>
                <div className="skill-node"><div className="skill-icon"><FaCog /></div><div className="skill-name">Backend</div></div>
                <div className="skill-node"><div className="skill-icon"><FaRocket /></div><div className="skill-name">Yayınlama</div></div>
                <div className="skill-node"><div className="skill-icon"><FaShieldAlt /></div><div className="skill-name">Güvenlik</div></div>
                <div className="skills-center"></div>
              </div>
            </div>
            <div className="skills-list">
              <div className="skill-item">
                <h4>Web Geliştirme</h4>
                <p>Markanızı yansıtan, her cihazda hızlı ve etkileyici web siteleriyle müşterilerinize en iyi ilk izlenimi sunuyoruz.</p>
                <div className="skill-progress"><div className="skill-progress-bar" style={{ width: "95%" }}></div></div>
              </div>
              <div className="skill-item">
                <h4>UI/UX Tasarım</h4>
                <p>Müşterilerinizin kolayca kullanabileceği, şık ve erişilebilir arayüzler ile dijital varlığınızı güçlendiriyoruz.</p>
                <div className="skill-progress"><div className="skill-progress-bar" style={{ width: "90%" }}></div></div>
              </div>
              <div className="skill-item">
                <h4>Mobil Uygulama</h4>
                <p>iOS ve Android için native performanslı, kullanıcı dostu mobil uygulamalar geliştiriyoruz.</p>
                <div className="skill-progress"><div className="skill-progress-bar" style={{ width: "88%" }}></div></div>
              </div>
              <div className="skill-item">
                <h4>Admin Panel & Backend</h4>
                <p>İş süreçlerinize özel, güvenli ve ölçeklenebilir yönetim paneli ve backend çözümleriyle tüm ihtiyaçlarınıza tek noktadan yanıt veriyoruz.</p>
                <div className="skill-progress"><div className="skill-progress-bar" style={{ width: "85%" }}></div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
