'use client';

import { useEffect, useRef } from 'react';
import TiltedCard from './TiltedCard';

const DNA_CARDS = [
  {
    num: '01',
    title: 'Globally Certified',
    body: 'CISA, CISM, CRISC, COBIT, CEH, CPISI, CISSP, ISO 27001 LA/LI, ISO 31000, ISO 42001, TISAX — the full constellation of elite credentials.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M11 16l3.5 3.5L21 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="16" cy="16" r="6" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" opacity="0.4"/>
      </svg>
    ),
    accent: '#539AD2',
  },
  {
    num: '02',
    title: 'Disruptive Thinkers',
    body: 'We challenge conventional security thinking and build strategies for tomorrow\'s threats — not yesterday\'s frameworks.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M16 4L20 12H28L22 17L24 26L16 21L8 26L10 17L4 12H12L16 4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
      </svg>
    ),
    accent: '#2E6DA4',
  },
  {
    num: '03',
    title: 'Proven Practitioners',
    body: 'Every consultant has delivered real-world programmes at enterprise scale — not just theoretical knowledge from certification manuals.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect x="4" y="6" width="24" height="20" rx="3" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M4 12h24" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M10 18h4M10 22h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <circle cx="22" cy="20" r="3" stroke="currentColor" strokeWidth="1.8"/>
      </svg>
    ),
    accent: '#1A3562',
  },
  {
    num: '04',
    title: 'Client-First Always',
    body: 'We measure ourselves by your success. Every recommendation, every deliverable, every interaction is designed around your outcomes — not ours.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M16 6L4 12v8c0 6 4.8 10.4 12 12 7.2-1.6 12-6 12-12v-8L16 6z" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M11 16l3.5 3.5L21 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    accent: '#7BB3E0',
  },
  {
    num: '05',
    title: 'Industry Veterans',
    body: 'Decades of combined experience across BFSI, Automotive, Healthcare, IT, and critical infrastructure sectors in India and globally.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <circle cx="12" cy="10" r="4" stroke="currentColor" strokeWidth="1.8"/>
        <circle cx="22" cy="10" r="4" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M4 28c0-4.4 3.6-8 8-8h8c4.4 0 8 3.6 8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    accent: '#3D7AB8',
  },
  {
    num: '06',
    title: 'Global Standards, Local Insight',
    body: 'We combine mastery of global frameworks (ISO, NIST, GDPR) with deep nuanced knowledge of Indian regulatory requirements (RBI, SEBI, IRDAI, DPDP).',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M4 16h24M16 4c-3 4-4 8-4 12s1 8 4 12M16 4c3 4 4 8 4 12s-1 8-4 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    accent: '#0D2547',
  },
];

export default function TeamDNA() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observers: IntersectionObserver[] = [];

    // Reveal section-header (.animate-scroll)
    const header = el.querySelector('.section-header');
    if (header) {
      const obs = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) {
          header.classList.add('visible');
          obs.disconnect();
        }
      }, { threshold: 0.1 });
      obs.observe(header);
      observers.push(obs);
    }

    // Reveal cards with stagger
    const cards = el.querySelectorAll('.tdna-card-wrap');
    cards.forEach((card, i) => {
      const obs = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => card.classList.add('tdna-visible'), i * 80);
          obs.disconnect();
        }
      }, { threshold: 0.1 });
      obs.observe(card);
      observers.push(obs);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  return (
    <section ref={sectionRef} className="rb-section tdna-section">
      {/* White background — same glow wash as Industries */}
      <div className="ind-glow-wash" aria-hidden="true">
        <div className="ind-glow-blob ind-glow-blob-1" />
        <div className="ind-glow-blob ind-glow-blob-2" />
      </div>

      {/* Cybersecurity icon background — same SVGs as Industries */}
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

      {/* Deco shapes */}
      <div className="deco-shapes" aria-hidden="true">
        <svg className="tdna-deco tdna-deco-blob" viewBox="0 0 200 200" fill="none">
          <path d="M44,-58C56,-48,64,-34,68,-18C72,-2,72,16,65,30C58,44,44,54,29,60C14,66,-2,68,-18,64C-34,60,-50,50,-60,36C-70,22,-74,4,-70,-12C-66,-28,-54,-42,-40,-52C-26,-62,-8,-68,8,-68C24,-68,32,-68,44,-58Z" transform="translate(100 100)" fill="#1A3562" opacity="0.6"/>
        </svg>
        <svg className="tdna-deco tdna-deco-star deco-spin-slow" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L13.5 10.5L22 12L13.5 13.5L12 22L10.5 13.5L2 12L10.5 10.5Z" fill="#539AD2"/>
        </svg>
        <svg className="tdna-deco tdna-deco-dots" viewBox="0 0 80 80" fill="none">
          <circle cx="10" cy="10" r="3" fill="#1A3562"/><circle cx="25" cy="10" r="3" fill="#1A3562"/><circle cx="40" cy="10" r="3" fill="#1A3562"/>
          <circle cx="10" cy="25" r="3" fill="#2E6DA4"/><circle cx="25" cy="25" r="4" fill="#2E6DA4"/><circle cx="40" cy="25" r="3" fill="#2E6DA4"/>
          <circle cx="10" cy="40" r="3" fill="#539AD2"/><circle cx="25" cy="40" r="3" fill="#539AD2"/><circle cx="40" cy="40" r="3" fill="#539AD2"/>
        </svg>
      </div>

      <div className="rb-container">
        {/* Header */}
        <div className="section-header animate-scroll">
          <span className="section-tag">Our Team</span>
          <h2 className="section-title">
            The DNA of<br />
            Every{' '}
            <span className="section-title-wrap">
              <span className="text-gradient">RiskBerg Professional</span>
              <span className="section-title-underline" />
            </span>
          </h2>
          <p className="section-description">
            We hire differently. Every team member brings world-class credentials,
            practitioner-level experience, and a genuine passion for protecting our clients.
          </p>
        </div>

        {/* Cards grid */}
        <div className="tdna-grid">
          {DNA_CARDS.map((card) => (
            <div key={card.num} className="tdna-card-wrap">
              <TiltedCard rotateAmplitude={10} scaleOnHover={1.04}>
                <div
                  className="tdna-card"
                  style={{ ['--tdna-accent' as string]: card.accent }}
                >
                  {/* Top accent bar */}
                  <div className="tdna-card-bar" />

                  {/* Number + icon row */}
                  <div className="tdna-card-head">
                    <span className="tdna-card-num">{card.num}</span>
                    <div className="tdna-card-icon">{card.icon}</div>
                  </div>

                  <h3 className="tdna-card-title">
                    <span className="tdna-title-underline">{card.title}</span>
                  </h3>
                  <p className="tdna-card-body">{card.body}</p>

                  {/* Bottom glow */}
                  <div className="tdna-card-glow" aria-hidden="true" />
                </div>
              </TiltedCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
