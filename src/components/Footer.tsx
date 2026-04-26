export default function Footer() {
  return (
    <footer>
      <div className="footer-bottom">
        <p className="footer-copyright">
          © 2025 Titan Folio. All rights reserved.
        </p>
        <div className="footer-credits">
          <a href="https://www.tooplate.com" target="_blank" rel="noopener noreferrer" className="footer-credit-link tooplate">
            <span className="footer-credit-icon">🎨</span>
            <span>Design by Tooplate</span>
          </a>
          <div className="footer-divider"></div>
          <a href="https://fonts.google.com" target="_blank" rel="noopener noreferrer" className="footer-credit-link">
            <span className="footer-credit-icon">📝</span>
            <span>Google Fonts</span>
          </a>
          <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer" className="footer-credit-link">
            <span className="footer-credit-icon">📸</span>
            <span>Unsplash</span>
          </a>
          <a href="https://cdnjs.com" target="_blank" rel="noopener noreferrer" className="footer-credit-link">
            <span className="footer-credit-icon">⚡</span>
            <span>CDNJS</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
