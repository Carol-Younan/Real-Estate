// Footer.tsx
import React from "react";
import "./Footer.css";
import Thelogo from './assets/red_sea_construction_logo-removebg-preview.png';

// SVG Icons (same as before)
const LinkedInIcon = () => (
  <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.611-3.197-1.558-.749-.947-.949-2.153-.549-3.317s1.147-2.103 2.197-2.68c1.049-.577 2.297-.677 3.447-.297 1.149.38 2.047 1.258 2.447 2.377.4 1.119.2 2.377-.549 3.255-.748.878-1.897 1.42-3.196 1.42zm7.718 2.344c-.748 0-1.448-.19-2.097-.53-.649-.34-1.148-.83-1.498-1.42-.35-.59-.499-1.259-.499-1.948 0-.69.149-1.359.499-1.948.35-.59.849-1.08 1.498-1.42.649-.34 1.349-.53 2.097-.53s1.448.19 2.097.53c.649.34 1.148.83 1.498 1.42.35.59.499 1.259.499 1.948 0 .69-.149 1.359-.499 1.948-.35.59-.849 1.08-1.498 1.42-.649.34-1.349.53-2.097.53z"/>
  </svg>
);

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

interface FooterProps {}

function Footer(props: FooterProps, ref: React.Ref<HTMLDivElement>) {
  const currentYear = new Date().getFullYear();

  return (
    <div className="page" ref={ref}>
      <footer className="footer">
        <div className="footer-grid">
          <div className="footer-logo">
            <div className="logo-container">
              <div className="logo-wrapper">
                <img 
                  src={Thelogo} 
                  alt="Red Sea Construction" 
                  className="company-logo"
                />
              </div>
              <div className="company-name">
                <h4>Red Sea Construction</h4>
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
                <span>info@redseaconstruction.com</span>
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
              <li><a href="/careers">Careers</a></li>
              <li><a href="/contact">Contact</a></li>
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
                <LinkedInIcon />
              </a>
              <a 
                href="https://facebook.com/redseaconstruction" 
                className="social-link"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FacebookIcon />
              </a>
              <a 
                href="https://twitter.com/redseaconstruction" 
                className="social-link"
                aria-label="Twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TwitterIcon />
              </a>
              <a 
                href="https://instagram.com/redseaconstruction" 
                className="social-link"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramIcon />
              </a>
            </div>
          </div>
        </div>
        
        <div className="copy">
          © {currentYear} Red Sea Construction. All rights reserved. | Building the future, today.
        </div>
      </footer>
    </div>
  );
}

const ForwardedFooter = React.forwardRef(Footer);
export default ForwardedFooter;