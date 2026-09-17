'use client';

import Link from 'next/link';
import OrbitImages from './OrbitImages';
import ScrollLink from './ui/ScrollLink';

const ISO_IMAGES = [
  '/PartnersKing/iso1.png',
  '/PartnersKing/iso2.png',
  '/PartnersKing/iso3.png',
  '/PartnersKing/iso4.png',
  '/PartnersKing/iso5.png',
];

export default function Footer() {
  return (
    <footer className="site-footer" id="footer">
      <div className="rb-container">
        <div className="footer-outer">
          <div className="footer-left">
          <div className="footer-grid footer-grid-6">

            {/* Brand */}
            <div className="footer-brand">
              <Link href="/" className="footer-logo">
                <img src="/logofooters.png" alt="RiskBerg Consulting" style={{ height: '64px', width: 'auto' }} />
              </Link>
              <p className="footer-tagline">
                De-Risking Digital Transformation Journey to Enable Growth and Innovation
              </p>
              <div className="footer-social">
                <a href="#" className="social-link" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <a href="#" className="social-link" aria-label="Twitter / X">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
              </div>
            </div>

            {/* Company */}
            <div className="footer-links">
              <h4 className="footer-heading">Company</h4>
              <ul>
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/industries">Industries</Link></li>
                <li><Link href="/careers">Career</Link></li>
                <li><Link href="/contact">Contact Us</Link></li>
              </ul>
            </div>

            {/* Quick Links */}
            <div className="footer-links">
              <h4 className="footer-heading">Quick Links</h4>
              <ul>
                <li><ScrollLink sectionId="services">Services</ScrollLink></li>
                <li><ScrollLink sectionId="framework">IDDEI Framework</ScrollLink></li>
                <li><ScrollLink sectionId="partners">Our Partners</ScrollLink></li>
                <li><ScrollLink sectionId="testimonials">Testimonials</ScrollLink></li>
              </ul>
            </div>

            {/* Policies */}
            <div className="footer-links">
              <h4 className="footer-heading">Policies</h4>
              <ul>
                <li><Link href="/#">Privacy Policy</Link></li>
                <li><Link href="/#">Cookie Policy</Link></li>
                <li><Link href="/#">Terms of Use</Link></li>
                <li><Link href="/#">Disclaimer</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div className="footer-contact">
              <h4 className="footer-heading">Contact</h4>
              <address>
                <p>
                  <svg className="footer-contact-icon" viewBox="0 0 24 24" fill="none"><path d="M12 22s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z" stroke="currentColor" strokeWidth="1.6"/><circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.6"/></svg>
                  <span>423-424, Tower B3, Spaze I Tech Park,<br />Sohna Road, Sector 49, Gurugram,<br />India – 122018</span>
                </p>
                <a href="tel:+911244284087">
                  <svg className="footer-contact-icon" viewBox="0 0 24 24" fill="none"><path d="M4 4h4l2 5-2.5 1.5a11 11 0 005 5L14 13l5 2v4a2 2 0 01-2 2A15 15 0 014 6a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>
                  <span>(+91) 124 – 4284087</span>
                </a>
                <a href="mailto:info@riskberg.com">
                  <svg className="footer-contact-icon" viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6"/><path d="M3 7l9 6 9-6" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>
                  <span>info@riskberg.com</span>
                </a>
              </address>
            </div>

            {/* Orbit ISO — extreme right */}
            <div className="footer-orbit-col">
              <p className="footer-heading">Certifications</p>
              <OrbitImages
                images={ISO_IMAGES}
                radiusX={100}
                radiusY={100}
                itemSize={56}
                itemSizes={{ 4: 80 }}
                rotation={0}
                duration={16}
                containerSize={240}
              />
            </div>

          </div>

          <div className="footer-bottom footer-bottom-centered">
            <p>&copy; 2024 RiskBerg Consulting Pvt. Ltd. All rights reserved.</p>
          </div>
          </div>

        </div>
      </div>
    </footer>
  );
}