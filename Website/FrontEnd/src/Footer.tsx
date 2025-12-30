// Footer.tsx
import React from "react";
import "./Footer.css";
import Thelogo from './assets/realEstate-removebg-preview.png';
import { useNavigate } from "react-router-dom";

const EmailIcon = () => (
  <svg className="contact-icon" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
);

const PhoneIcon = () => (
  <svg className="contact-icon" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.59l2.2-2.21c.28-.26.36-.65.25-1C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z"/>
  </svg>
);

const LocationIcon = () => (
  <svg className="contact-icon" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
  </svg>
);

const Footer = React.forwardRef<HTMLDivElement, {}>((props, ref) => {
  const currentYear = new Date().getFullYear();

    const handleFooterClick = (label: string, path?: string) => {
    if (path) {
      window.location.href = path;
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  return (
    <div className="page" ref={ref}>
      <footer className="footer">
        <div className="footer-grid">
          <div className="footer-logo">
            <div className="logo-container">
              <div className="logo-wrapper">
                <img 
                  src={Thelogo}
                  onClick={() => handleFooterClick("Home", "/")} 
                  alt="Real Estate Construction" 
                  className="company-logo"
                  style={{ cursor: 'pointer' }}
                />
              </div>
              <div className="company-name">
                <h4>Real Estate Construction</h4>
                <span>Building Excellence Since 1998</span>
              </div>
            </div>
            <p className="company-description">
              Building excellence for over 25 years with superior quality construction 
              and engineering services across Egypt, Oman, Montenegro, and Morocco.
            </p>
            <div className="contact-info">
              <div className="contact-item">
                <EmailIcon />
                <span>info@realestateconstruction.com</span>
              </div>
              <div className="contact-item">
                <PhoneIcon />
                <span>+20 2 1234 5678</span>
              </div>
              <div className="contact-item">
                <LocationIcon />
                <span>Cairo, Egypt</span>
              </div>
            </div>
          </div>

          <div>
            <h3>Company</h3>
            <ul>
              <li><a href="/about">About Us</a></li>
              <li><a href="/projects">Projects</a></li>
              <li><a href="/career">Careers</a></li>
            </ul>
          </div>

          <div>
            <h3>Support</h3>
            <ul>
              <li><a href="/help">Help Center</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/terms">Terms of Service</a></li>
              <li><a href="/faq">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h3>Connect With Us</h3>
            <div className="newsletter">
              <p style={{ color: '#cbd5e1', fontSize: '0.9rem', marginBottom: '1rem' }}>
                Subscribe to our newsletter for updates
              </p>
              <div className="newsletter-input">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  aria-label="Email for newsletter"
                />
                <button type="button">Subscribe</button>
              </div>
            </div>
            <div className="socials">
              <a 
                href="https://linkedin.com/company/red-sea-construction" 
                className="social-link"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
        
        <div className="copy">
          © {currentYear} Real Estate Construction. All rights reserved. | Building the future, today.
        </div>
      </footer>
    </div>
  );
});

Footer.displayName = 'Footer';

export default Footer;