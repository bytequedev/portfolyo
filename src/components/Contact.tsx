"use client"
import { FaBriefcase, FaMapMarkerAlt } from "react-icons/fa";
import { useState } from "react";
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    projectType: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    projectType: false,
    message: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched({ name: true, email: true, projectType: true, message: true });
    setSuccess("");
    setError("");
    // Basit doğrulama
    if (!form.name || !form.email || !form.message) {
      setError("Lütfen tüm zorunlu alanları doldurun.");
      return;
    }
    setLoading(true);
    try {
      await addDoc(collection(db, "contacts"), {
        name: form.name,
        email: form.email,
        projectType: form.projectType,
        message: form.message,
        createdAt: new Date()
      });
      setSuccess("Mesajınız başarıyla gönderildi!");
      setForm({ name: "", email: "", projectType: "", message: "" });
      setTouched({ name: false, email: false, projectType: false, message: false });
    } catch (err) {
      setError("Mesaj gönderilemedi. Lütfen daha sonra tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="fade-in">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">İletişim</h2>
          <p className="section-subtitle">Fikriniz mi var? Hemen iletişime geçin, birlikte hayata geçirelim!</p>
        </div>
        <div className="contact-content">
          <div className="contact-info">
            <h3>Bize Ulaşın</h3>
            <p>Yeni projeler ve iş birlikleri için her zaman açığız. Web sitesi, admin paneli veya mobil uygulama ihtiyaçlarınız için bize ulaşın.</p>
            <div className="contact-details">
              <h4><span style={{verticalAlign:'middle'}}><FaBriefcase /></span> Hizmetlerimiz:</h4>
              <ul>
                <li>Kurumsal Web Sitesi</li>
                <li>Admin Paneli</li>
                <li>Mobil Uygulama</li>
                <li>Danışmanlık</li>
              </ul>
            </div>
            <div className="contact-details">
              <h4><span style={{verticalAlign:'middle'}}><FaMapMarkerAlt /></span> Konum:</h4>
              <p>İstanbul, Türkiye</p>
            </div>
          </div>
          <div className="contact-form-container">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className={`form-input${touched.name && !form.name ? " form-error" : ""}`}
                  placeholder="Adınız *"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
                {touched.name && !form.name && <span className="field-error">Adınızı giriniz.</span>}
              </div>
              <div className="form-group">
                <input
                  type="email"
                  className={`form-input${touched.email && !form.email ? " form-error" : ""}`}
                  placeholder="E-posta adresiniz *"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
                {touched.email && !form.email && <span className="field-error">E-posta adresinizi giriniz.</span>}
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className={`form-input${touched.projectType && !form.projectType ? " form-error" : ""}`}
                  placeholder="Proje Türü"
                  name="projectType"
                  value={form.projectType}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
              </div>
              <div className="form-group">
                <textarea
                  className={`form-textarea${touched.message && !form.message ? " form-error" : ""}`}
                  rows={5}
                  placeholder="Projenizden bahsedin *"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                ></textarea>
                {touched.message && !form.message && <span className="field-error">Mesajınızı yazınız.</span>}
              </div>
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? "Gönderiliyor..." : "Mesaj Gönder"}
              </button>
              {success && <p className="success-message">{success}</p>}
              {error && <p className="error-message">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
