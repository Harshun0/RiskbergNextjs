'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function AboutCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        el.querySelectorAll('.animate-scroll').forEach(n => n.classList.add('visible'));
        obs.disconnect();
      }
    }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="rb-section acta-section">
      {/* White background — same as AboutPartners */}
      <div className="ind-glow-wash" aria-hidden="true">
        <div className="ind-glow-blob ind-glow-blob-1" />
        <div className="ind-glow-blob ind-glow-blob-2" />
      </div>
      <div className="ind-cyber-bg" aria-hidden="true">
        <svg className="ind-cyber-icon ici-shield-1" viewBox="0 0 48 48" fill="none">
          <path d="M24 4L8 11v11c0 11 6.8 18.6 16 21 9.2-2.4 16-10 16-21V11L24 4z" stroke="#1A3562" strokeWidth="3.5"/>
          <path d="M17 24l5 5 10-11" stroke="#539AD2" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <svg className="ind-cyber-icon ici-lock-1" viewBox="0 0 40 40" fill="none">
          <rect x="9" y="18" width="22" height="16" rx="3" stroke="#539AD2" strokeWidth="3.5"/>
          <path d="M14 18v-5a6 6 0 0112 0v5" stroke="#2E6DA4" strokeWidth="3.5"/>
          <circle cx="20" cy="26" r="3" fill="#1A3562"/>
        </svg>
        <svg className="ind-cyber-icon ici-node-1" viewBox="0 0 100 60" fill="none">
          <circle cx="12" cy="12" r="6" fill="#539AD2"/>
          <circle cx="50" cy="30" r="7" fill="#1A3562"/>
          <circle cx="88" cy="10" r="6" fill="#2E6DA4"/>
          <path d="M12 12L50 30L88 10" stroke="#1A3562" strokeWidth="2.5" opacity="0.9"/>
        </svg>
        <svg className="ind-cyber-icon ici-hex-1" viewBox="0 0 40 46" fill="none">
          <path d="M20 2 L37 12 V34 L20 44 L3 34 V12 Z" stroke="#2E6DA4" strokeWidth="3"/>
          <path d="M20 14 L28 19 V29 L20 34 L12 29 V19 Z" stroke="#539AD2" strokeWidth="2.5"/>
        </svg>
        <svg className="ind-cyber-icon ici-binary-1" viewBox="0 0 90 30" fill="none">
          <text x="0" y="14" fill="#1A3562" fontSize="13" fontFamily="monospace" letterSpacing="2" fontWeight="700">10110</text>
          <text x="0" y="28" fill="#539AD2" fontSize="13" fontFamily="monospace" letterSpacing="2" fontWeight="700">01101</text>
        </svg>
        <svg className="ind-cyber-icon ici-fingerprint-1" viewBox="0 0 40 40" fill="none">
          <path d="M20 8c-6.6 0-12 5.4-12 12v6" stroke="#539AD2" strokeWidth="3" strokeLinecap="round"/>
          <path d="M20 12c-4.4 0-8 3.6-8 8v6" stroke="#1A3562" strokeWidth="3" strokeLinecap="round"/>
          <path d="M20 16c-2.2 0-4 1.8-4 4v8" stroke="#2E6DA4" strokeWidth="3" strokeLinecap="round"/>
        </svg>
        <svg className="ind-cyber-icon ici-shield-2" viewBox="0 0 48 48" fill="none">
          <path d="M24 4L8 11v11c0 11 6.8 18.6 16 21 9.2-2.4 16-10 16-21V11L24 4z" stroke="#2E6DA4" strokeWidth="3.5"/>
        </svg>
        <svg className="ind-cyber-icon ici-node-2" viewBox="0 0 100 60" fill="none">
          <circle cx="10" cy="30" r="5.5" fill="#2E6DA4"/>
          <circle cx="45" cy="10" r="6" fill="#539AD2"/>
          <circle cx="80" cy="35" r="6.5" fill="#1A3562"/>
          <path d="M10 30L45 10L80 35" stroke="#539AD2" strokeWidth="2.5" opacity="0.9"/>
        </svg>
      </div>
      <div className="deco-shapes" aria-hidden="true">
        <svg className="abp-deco abp-deco-ring" viewBox="0 0 70 70" fill="none">
          <circle cx="35" cy="35" r="30" stroke="#1A3562" strokeWidth="3"/>
          <circle cx="35" cy="35" r="20" stroke="#539AD2" strokeWidth="2" strokeDasharray="4 4"/>
        </svg>
        <svg className="abp-deco abp-deco-star deco-spin-slow" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L13.5 10.5L22 12L13.5 13.5L12 22L10.5 13.5L2 12L10.5 10.5Z" fill="#539AD2"/>
        </svg>
        <svg className="abp-deco abp-deco-plus" viewBox="0 0 26 26" fill="none">
          <path d="M13 2V24M2 13H24" stroke="#2E6DA4" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      </div>

      <div className="rb-container">
        {/* ── Dark navy curved shell — same as IDDEI ── */}
        <div className="cb-shell acta-shell animate-scroll">
          {/* Ambient glows */}
          <div className="cb-shell-glow cb-shell-glow-1" />
          <div className="cb-shell-glow cb-shell-glow-2" />

          {/* Floating cyber SVG accents inside the shell */}
          <div className="acta-shell-decos" aria-hidden="true">
            <svg className="acta-sd acta-sd-shield" viewBox="0 0 48 48" fill="none">
              <path d="M24 4L8 11v11c0 11 6.8 18.6 16 21 9.2-2.4 16-10 16-21V11L24 4z" stroke="#539AD2" strokeWidth="2.5" opacity="0.18"/>
            </svg>
            <svg className="acta-sd acta-sd-ring" viewBox="0 0 60 60" fill="none">
              <circle cx="30" cy="30" r="26" stroke="#539AD2" strokeWidth="1.8" opacity="0.12"/>
              <circle cx="30" cy="30" r="17" stroke="#7BB3E0" strokeWidth="1.2" strokeDasharray="4 4" opacity="0.10"/>
            </svg>
            <svg className="acta-sd acta-sd-hex" viewBox="0 0 40 46" fill="none">
              <path d="M20 2 L37 12 V34 L20 44 L3 34 V12 Z" stroke="#2E6DA4" strokeWidth="2" opacity="0.14"/>
            </svg>
            <svg className="acta-sd acta-sd-burst deco-spin-xslow" viewBox="0 0 44 44" fill="none">
              <path d="M22 2L24.5 18L38 8L28 20L44 22L28 24L38 36L24.5 26L22 42L19.5 26L6 36L16 24L0 22L16 20L6 8L19.5 18Z" fill="#1A3562" opacity="0.22"/>
            </svg>
          </div>

          {/* Content */}
          <div className="acta-inner">
            {/* Top tag */}
            <span className="acta-tag">Let&apos;s Talk</span>

            {/* Heading */}
            <h2 className="acta-title">
              Ready to Work with a<br />
              Team That <span className="acta-title-accent">Delivers?</span>
            </h2>

            {/* Sub-copy */}
            <p className="acta-body">
              Whether you have a specific challenge in mind or simply want to explore
              how we can strengthen your security posture — let&apos;s talk.
            </p>

            {/* CTA buttons */}
            <div className="acta-btn-row">
              <Link href="/contact" className="acta-btn-primary">
                Book a Free Consultation
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
