import React from "react";
import "./Footer.css";
import Thelogo from './assets/red_sea_construction_logo-removebg-preview.png';
interface FooterProps {
  
}

function Footer(props: FooterProps, ref: React.Ref<HTMLDivElement>) {
  return (
    <div className="page" ref={ref}>
      <footer className="footer">
        <div className="footer-grid">
          <div>
            <img src={Thelogo} style={{height:"180px"}}/>
          </div>
          <div>
            <h3>Company</h3>
            <ul>
              <li><a href="/about">About Us</a></li>
              <li><a href="#">Projects</a></li>
              <li><a href="#">Career</a></li>
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
const footer = React.forwardRef(Footer);

export default footer;