'use client';

import { forwardRef, useEffect, useRef } from 'react';
import Image from 'next/image';
import { AnimatedBeam } from './ui/AnimatedBeam';
import Stepper, { Step } from './ui/Stepper';

/* ─────────────────────────────────────────────
   Reusable node circle
───────────────────────────────────────────── */
const Node = forwardRef<HTMLDivElement, { className?: string; children?: React.ReactNode }>(
  ({ className = '', children }, ref) => (
    <div ref={ref} className={`abm-node ${className}`}>
      {children}
    </div>
  )
);
Node.displayName = 'Node';

/* Left-side feature pills */
const FEATURES = [
  { icon: '🏆', label: 'CERT-In Empanelled' },
  { icon: '📋', label: '20+ Years Experience' },
  { icon: '🌐', label: '12+ Industry Verticals' },
  { icon: '🔒', label: 'ISO 27001 Certified' },
  { icon: '⚡', label: 'IDDEI Methodology' },
  { icon: '✅', label: '500+ Engagements' },
];
const LEFT_NODES = [
  { label: 'Cybersecurity', url: 'https://img.icons8.com/?size=100&id=T6rdkKsmmaor&format=png&color=228BE6' },
  { label: 'Compliance',    url: 'https://img.icons8.com/?size=100&id=CzxQOmkOyoVX&format=png&color=228BE6' },
  { label: 'Risk Mgmt',     url: 'https://img.icons8.com/?size=100&id=sPoDBmxhUNOG&format=png&color=228BE6' },
];

const RIGHT_NODES = [
  { label: 'Audit',    url: 'https://img.icons8.com/?size=100&id=a3X7rM3nVXC8&format=png&color=228BE6' },
  { label: 'Advisory', url: 'https://img.icons8.com/?size=100&id=W0nfkuu3J6xP&format=png&color=228BE6' },
  { label: 'Training', url: 'https://img.icons8.com/?size=100&id=Z7l6pKEs9Ydy&format=png&color=228BE6' },
];

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */
export default function AboutBeam() {
  const sectionRef   = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Left column refs
  const leftRef0 = useRef<HTMLDivElement>(null);
  const leftRef1 = useRef<HTMLDivElement>(null);
  const leftRef2 = useRef<HTMLDivElement>(null);
  const leftRefs = [leftRef0, leftRef1, leftRef2];

  // Centre node
  const centreRef = useRef<HTMLDivElement>(null);

  // Right column refs
  const rightRef0 = useRef<HTMLDivElement>(null);
  const rightRef1 = useRef<HTMLDivElement>(null);
  const rightRef2 = useRef<HTMLDivElement>(null);
  const rightRefs = [rightRef0, rightRef1, rightRef2];

  /* Scroll-reveal */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        el.querySelectorAll('.animate-scroll').forEach(n => n.classList.add('visible'));
        obs.disconnect();
      }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const curvatures = [-65, 0, 65];
  const yOffsets   = [-12, 0, 12];

  return (
    <section ref={sectionRef} className="rb-section abm-section">
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
        {/* ── Section heading (Image 2) ── */}
        <div className="section-header animate-scroll" style={{ marginBottom: '3rem' }}>
          <h2 className="section-title" style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 800 }}>
            Trusted Risk Advisors.<br />
            Not Just{' '}
            <span className="section-title-wrap">
              <span className="text-gradient">Auditors.</span>
              <span className="section-title-underline" />
            </span>
          </h2>
          <p className="section-description">
            RiskBerg Consulting is a CERT-In empanelled security auditor bringing 20+ years of
            combined expertise across enterprise risk, cybersecurity, regulatory compliance,
            and emerging technology risk management — all under one roof.
          </p>
        </div>

        <div className="abm-layout animate-scroll">

          {/* ── LEFT: story content (Image 1) ── */}
          <div className="abm-content">
            <span className="section-tag">Our Story</span>

            <h3 className="abm-title">
              Born from a Belief That<br />
              Risk is{' '}
              <span className="text-gradient">Manageable</span>
            </h3>

            <p className="abm-body">
              RiskBerg was founded on a simple conviction: that every business risk,
              no matter how complex, can be understood, managed, and turned into
              a strategic opportunity. In an era of relentless digital disruption and
              regulatory complexity, we saw too many organisations struggling to
              navigate their security challenges — not from a lack of effort, but from
              a lack of the right partner.
            </p>

            <p className="abm-body">
              Today, we stand as one of India's trusted CERT-In empanelled security
              auditors, serving leading enterprises across BFSI, Automotive,
              Manufacturing, Healthcare, Telecom, and IT sectors. Our people hold
              the most rigorous certifications in the industry — CISA, CISM, CRISC,
              CISSP, CEH, ISO 27001 LA, TISAX, and more.
            </p>

            <p className="abm-body" style={{ marginBottom: 0 }}>
              Everything we do is powered by our proprietary IDDEI Framework:{' '}
              <strong style={{ color: '#1A3562' }}>
                Identify, Demystify, Design &amp; Develop, Execute, Improve
              </strong>{' '}
              — ensuring every engagement is structured, measurable, and business-aligned.
            </p>
          </div>

          {/* ── RIGHT: beam diagram (shifted up) + Stepper below ── */}
          <div className="abm-diagram-col">

            {/* Beam diagram */}
            <div ref={containerRef} className="abm-diagram">

              {/* Left column */}
              <div className="abm-col abm-col-left">
                {LEFT_NODES.map((n, i) => (
                  <Node key={n.label} ref={leftRefs[i]} className="abm-node-sm">
                    <img src={n.url} alt={n.label} className="abm-node-img" />
                    <span className="abm-node-label">{n.label}</span>
                  </Node>
                ))}
              </div>

              {/* Centre node — logo */}
              <div className="abm-col abm-col-center">
                <Node ref={centreRef} className="abm-node-lg">
                  <Image
                    src="/logoriskberg.png"
                    alt="RiskBerg"
                    width={56}
                    height={56}
                    className="abm-node-logo"
                  />
                </Node>
              </div>

              {/* Right column */}
              <div className="abm-col abm-col-right">
                {RIGHT_NODES.map((n, i) => (
                  <Node key={n.label} ref={rightRefs[i]} className="abm-node-sm">
                    <img src={n.url} alt={n.label} className="abm-node-img" />
                    <span className="abm-node-label">{n.label}</span>
                  </Node>
                ))}
              </div>

              {/* Beams: left → centre */}
              {leftRefs.map((ref, i) => (
                <AnimatedBeam
                  key={`l${i}`}
                  containerRef={containerRef}
                  fromRef={ref}
                  toRef={centreRef}
                  curvature={curvatures[i]}
                  endYOffset={yOffsets[i]}
                  pathColor="rgba(83,154,210,0.45)"
                  pathWidth={2}
                  pathOpacity={0.55}
                  gradientStartColor="#7BB3E0"
                  gradientStopColor="#1A3562"
                  duration={1.8}
                  delay={i * 0.3}
                  repeatDelay={0.1}
                />
              ))}

              {/* Beams: centre → right */}
              {rightRefs.map((ref, i) => (
                <AnimatedBeam
                  key={`r${i}`}
                  containerRef={containerRef}
                  fromRef={centreRef}
                  toRef={ref}
                  curvature={curvatures[i]}
                  endYOffset={yOffsets[i]}
                  pathColor="rgba(83,154,210,0.45)"
                  pathWidth={2}
                  pathOpacity={0.55}
                  gradientStartColor="#539AD2"
                  gradientStopColor="#0D2547"
                  duration={1.8}
                  delay={i * 0.3 + 0.15}
                  repeatDelay={0.1}
                  reverse
                />
              ))}
            </div>

            {/* Stepper — below the beam diagram */}
            <div className="abm-stepper-wrap">
              <Stepper
                initialStep={1}
                autoplay
                autoplayDelay={3200}
                disableStepIndicators={false}
                onFinalStepCompleted={() => {}}
              >
                <Step>
                  <h4 className="stp-step-title">Our Mission</h4>
                  <p className="stp-step-body">
                    To empower organizations with intelligent, agile, and business-aligned
                    risk solutions that ensure secure, sustainable growth in an increasingly
                    complex digital landscape.
                  </p>
                </Step>
                <Step>
                  <h4 className="stp-step-title">Our Vision</h4>
                  <p className="stp-step-body">
                    To be a globally trusted leader in cybersecurity and compliance —
                    driving innovation, trust, and resilience across the digital landscape
                    for organizations worldwide.
                  </p>
                </Step>
                <Step>
                  <h4 className="stp-step-title">Our Values</h4>
                  <p className="stp-step-body">
                    Integrity, Innovation, Customer-Centricity, and Accountability guide
                    everything we do. We combine expertise with agility to deliver real
                    impact — always putting client success first.
                  </p>
                </Step>
              </Stepper>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
