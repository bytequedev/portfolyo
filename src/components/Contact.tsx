export default function Contact() {
  return (
    <section id="contact" className="fade-in">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Let's Create Together</h2>
          <p className="section-subtitle">Ready to bring your ideas to life? Let's start a conversation</p>
        </div>
        <div className="contact-content">
          <div className="contact-info">
            <h3>Get In Touch</h3>
            <p>I'm always excited to work on new projects and collaborate with amazing people. Whether you have a specific project in mind or just want to explore possibilities, I'd love to hear from you.</p>
            <div className="contact-details">
              <h4>💼 Available for:</h4>
              <ul>
                <li>Freelance Projects</li>
                <li>Full-time Opportunities</li>
                <li>Consulting & Code Reviews</li>
                <li>Speaking & Workshops</li>
              </ul>
            </div>
            <div className="contact-details">
              <h4>📍 Based in:</h4>
              <p>San Francisco, CA (Open to Remote)</p>
            </div>
          </div>
          <div className="contact-form-container">
            <form className="contact-form">
              <div className="form-group">
                <input type="text" className="form-input" placeholder="Your Name" required />
              </div>
              <div className="form-group">
                <input type="email" className="form-input" placeholder="Your Email" required />
              </div>
              <div className="form-group">
                <input type="text" className="form-input" placeholder="Project Type" required />
              </div>
              <div className="form-group">
                <textarea className="form-textarea" rows={5} placeholder="Tell me about your project..." required></textarea>
              </div>
              <button type="submit" className="submit-btn">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
