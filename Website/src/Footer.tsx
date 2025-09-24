import "./Footer.css";
import Thelogo from './assets/red_sea_construction_logo-removebg-preview.png';

export default function Footer() {
  return (
    <div className="page">
      <footer className="footer">
        <div className="footer-grid">
          <div>
            <img src={Thelogo} style={{height:"180px"}}/>
          </div>
          <div>
            <h3>Company</h3>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Projects</a></li>
              <li><a href="#">Career</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h3>Support</h3>
            <ul>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h3>Follow Us</h3>
            <div className="socials">
              <a href="https://linkedin.com/company/red-sea-construction">LinkedIn</a>
            </div>
          </div>
        </div>
        
        <div className="copy">
          © 2025 Red Sea Constructions. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
