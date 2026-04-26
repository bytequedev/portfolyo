import { FaLightbulb, FaBullseye } from "react-icons/fa";
export default function About() {
  return (
    <section id="about" className="fade-in">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Hakkımızda</h2>
          <p className="section-subtitle">Byteque: Dijital dönüşümde çözüm ortağınız</p>
        </div>
        <div className="about-content">
          <div className="about-intro">
            <div className="about-image"></div>
            <div className="about-text">
              <h3>Byteque Kimdir?</h3>
              <p>Byteque, web sitesi, admin paneli ve mobil uygulama geliştirme alanlarında uzmanlaşmış bir startup stüdyosudur. Müşterilerimizin dijital ihtiyaçlarına özel, yenilikçi ve ölçeklenebilir çözümler sunuyoruz.</p>
              <p>Ekibimiz; modern teknolojiler, kullanıcı deneyimi ve yaratıcı problem çözme konularında deneyimlidir. Dijital dönüşüm yolculuğunuzda güvenilir çözüm ortağınız olmaktan mutluluk duyarız.</p>
            </div>
          </div>
          <div className="about-cards">
            <div className="about-card">
              <h4><span style={{verticalAlign:'middle'}}><FaBullseye /></span> Misyonumuz</h4>
              <p>İşletmelere ve girişimcilere, dijital dünyada fark yaratacak ürünler geliştirmek.</p>
            </div>
            <div className="about-card">
              <h4><span style={{verticalAlign:'middle'}}><FaLightbulb /></span> Vizyonumuz</h4>
              <p>Teknolojiyi herkes için erişilebilir ve faydalı kılmak.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
