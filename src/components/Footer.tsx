import { FaRocket } from "react-icons/fa";
export default function Footer() {
  return (
    <footer>
      <div className="footer-bottom">
        <p className="footer-copyright">
          © 2026 Byteque. Tüm hakları saklıdır.
        </p>
        <div className="footer-credits">
                <span className="footer-credit-icon"><FaRocket /></span>
          <span>Byteque Startup Studio</span>
        </div>
      </div>
    </footer>
  );
}
