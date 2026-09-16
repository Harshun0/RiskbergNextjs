'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

/* ─────────────────────────────────────────────
   Stats
───────────────────────────────────────────── */
const stats = [
  { count: 500,  suffix: '+', label: 'Projects Delivered' },
  { count: 20,   suffix: '+', label: 'Years Experience'   },
  { count: 12,   suffix: '+', label: 'Industry Verticals' },
  { count: 50,   suffix: '+', label: 'Certified Experts'  },
];

/* ─────────────────────────────────────────────
   Certifications / badges strip
───────────────────────────────────────────── */
const certs = [
  'CISA', 'CISM', 'CRISC', 'CISSP', 'CEH', 'ISO 27001 LA', 'TISAX',
];

/* ─────────────────────────────────────────────
   Three pillars (mission / vision / values)
───────────────────────────────────────────── */
const pillars = [
  {
    num: '01',
    title: 'Our Mission',
    body: 'To empower organizations with intelligent, agile, and business-aligned risk solutions that ensure secure, sustainable growth in an increasingly complex digital landscape.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="2"/>
        <circle cx="16" cy="16" r="7"  stroke="currentColor" strokeWidth="2"/>
        <circle cx="16" cy="16" r="2"  fill="currentColor"/>
        <line x1="16" y1="3"  x2="16" y2="7"  stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <line x1="16" y1="25" x2="16" y2="29" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <line x1="3"  y1="16" x2="7"  y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <line x1="25" y1="16" x2="29" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Our Vision',
    body: 'To be a globally trusted leader in cybersecurity and compliance — driving innovation, trust, and resilience across the digital landscape for organizations worldwide.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M16 6L4 12v8c0 6 4.8 10.4 12 12 7.2-1.6 12-6 12-12v-8L16 6z" stroke="currentColor" strokeWidth="2"/>
        <path d="M11 16l3.5 3.5L21 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Our Values',
    body: 'Integrity, Innovation, Customer-Centricity, and Accountability guide everything we do. We combine expertise with agility to deliver real impact — always putting client success first.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M16 4L19.5 12.5L29 13.5L22 20L24 29L16 24.5L8 29L10 20L3 13.5L12.5 12.5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

/* ─────────────────────────────────────────────
   Animated counter
───────────────────────────────────────────── */
function StatCounter({
  count, suffix, label, started,
}: {
  count: number; suffix: string; label: string; started: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!started || !ref.current) return;
    const el = ref.current;
    const duration = 1800;
    const start = performance.now();
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    function tick(now: number) {
      const t = Math.min((now - start) / duration, 1);
      el.textContent = String(Math.round(easeOut(t) * count));
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [started, count]);

  return (
    <div className="abh-stat">
      <div className="abh-stat-num-wrap">
        <span ref={ref} className="abh-stat-num">0</span>
        <span className="abh-stat-suffix">{suffix}</span>
      </div>
      <span className="abh-stat-label">{label}</span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Decorative background shapes
───────────────────────────────────────────── */
function DecoShapes() {
  return (
    <div className="deco-shapes" aria-hidden="true">
      {/* Blob top-right */}
      <svg className="hero-deco abh-deco-blob-tr" viewBox="0 0 200 200" fill="none">
        <path
          d="M44,-58C56.5,-48.5,65.5,-34,71.5,-18C77.5,-2,80,15.5,74,30C68,44.5,53.5,56,37.5,63.5C21.5,71,-6,74.5,-24,68.5C-42,62.5,-51,47,-60,30C-69,13,-78.5,-5,-76.5,-22.5C-74.5,-40,-61,-57,-45,-63C-29,-69,-10.5,-64,7.5,-64.5C25.5,-65,31.5,-67.5,44,-58Z"
          transform="translate(100 100)"
          fill="#1A3562"
        />
      </svg>

      {/* Star top-left */}
      <svg className="hero-deco abh-deco-star-tl deco-spin-slow" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L13.5 10.5L22 12L13.5 13.5L12 22L10.5 13.5L2 12L10.5 10.5Z" fill="#539AD2"/>
      </svg>

      {/* Ring mid-right */}
      <svg className="hero-deco abh-deco-ring-mr" viewBox="0 0 60 60" fill="none">
        <circle cx="30" cy="30" r="26" stroke="#539AD2" strokeWidth="2"/>
        <circle cx="30" cy="30" r="17" stroke="#1A3562" strokeWidth="1.5" strokeDasharray="4 4"/>
      </svg>

      {/* Cube mid-left */}
      <svg className="hero-deco abh-deco-cube-ml deco-float" viewBox="0 0 32 32" fill="none">
        <path d="M16 3L28 9V22L16 28L4 22V9L16 3Z" stroke="#2E6DA4" strokeWidth="1.8" strokeLinejoin="round"/>
        <path d="M16 3L16 16M4 9L16 16M28 9L16 16" stroke="#539AD2" strokeWidth="1.4"/>
      </svg>

      {/* Dot cluster bottom-right */}
      <svg className="hero-deco abh-deco-dots-br" viewBox="0 0 90 90" fill="none">
        {[10,25,40,55].map(x =>
          [10,25,40].map(y => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="3" fill={x % 30 === 10 ? '#1A3562' : x % 30 === 25 ? '#539AD2' : '#2E6DA4'}/>
          ))
        )}
      </svg>

      {/* Wavy lines top-mid */}
      <svg className="hero-deco abh-deco-wave-tm" viewBox="0 0 80 28" fill="none">
        <path d="M2 8 Q10 2 18 8 Q26 14 34 8 Q42 2 50 8 Q58 14 66 8 Q74 2 78 8"  stroke="#539AD2" strokeWidth="2" strokeLinecap="round"/>
        <path d="M2 20 Q10 14 18 20 Q26 26 34 20 Q42 14 50 20 Q58 26 66 20 Q74 14 78 20" stroke="#2E6DA4" strokeWidth="2" strokeLinecap="round"/>
      </svg>

      {/* Triangle bottom-mid */}
      <svg className="hero-deco abh-deco-tri-bm deco-float-rev" viewBox="0 0 22 22" fill="none">
        <path d="M11 2L21 20H1L11 2Z" stroke="#2E6DA4" strokeWidth="2" strokeLinejoin="round"/>
      </svg>

      {/* Starburst */}
      <svg className="hero-deco abh-deco-burst deco-spin-xslow" viewBox="0 0 44 44" fill="none">
        <path d="M22 2L24.5 18L38 8L28 20L44 22L28 24L38 36L24.5 26L22 42L19.5 26L6 36L16 24L0 22L16 20L6 8L19.5 18Z" fill="#1A3562"/>
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */
export default function AboutHero() {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const statsRef    = useRef<HTMLDivElement>(null);
  const pillarRefs  = useRef<(HTMLDivElement | null)[]>([]);
  const itemRefs    = useRef<(HTMLElement | null)[]>([]);
  const [statsOn, setStatsOn] = useState(false);

  function setItemRef(i: number) {
    return (el: HTMLElement | null) => { itemRefs.current[i] = el; };
  }

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    /* Reveal hero content items */
    itemRefs.current.forEach(el => {
      if (!el) return;
      const obs = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) { el.classList.add('abh-visible'); obs.disconnect(); }
      }, { threshold: 0.1 });
      obs.observe(el);
      observers.push(obs);
    });

    /* Stats counter trigger */
    if (statsRef.current) {
      const obs = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) { setStatsOn(true); obs.disconnect(); }
      }, { threshold: 0.3 });
      obs.observe(statsRef.current);
      observers.push(obs);
    }

    /* Pillar cards staggered reveal */
    pillarRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => el.classList.add('abh-pillar-visible'), i * 120);
          obs.disconnect();
        }
      }, { threshold: 0.15 });
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  return (
    <section className="abh-section" ref={sectionRef}>
      <DecoShapes />

      {/* ── Gradient background ── */}
      <div className="abh-bg-gradient" aria-hidden="true" />

      {/* ══════════════════════════════════════════
          TOP: breadcrumb + eyebrow tag
      ══════════════════════════════════════════ */}
      <div className="rb-container">

        {/* Breadcrumb */}
        <nav
          ref={setItemRef(0)}
          className="abh-animate abh-breadcrumb"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="abh-breadcrumb-link">Home</Link>
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="abh-breadcrumb-sep">
            <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="abh-breadcrumb-current">About Us</span>
        </nav>

        {/* ── Two-column layout ── */}
        <div className="abh-top-grid">

          {/* LEFT: headline block */}
          <div className="abh-headline-col">

            <div ref={setItemRef(1)} className="abh-animate abh-tag-wrap">
              <span className="section-tag">About RiskBerg</span>
            </div>

            <h1 ref={setItemRef(2)} className="abh-animate abh-title">
              <span className="block">Trusted Risk Advisors.</span>
              <span className="block abh-title-gradient">Not Just Auditors.</span>
            </h1>

            <p ref={setItemRef(3)} className="abh-animate abh-lead">
              RiskBerg Consulting is a{' '}
              <strong className="abh-lead-strong">CERT-In empanelled</strong> security auditor
              bringing <strong className="abh-lead-strong">20+ years</strong> of combined expertise
              across enterprise risk, cybersecurity, regulatory compliance, and emerging technology
              risk management — all under one roof.
            </p>

            {/* Cert badges */}
            <div ref={setItemRef(4)} className="abh-animate abh-cert-strip">
              {certs.map(c => (
                <span key={c} className="abh-cert-badge">{c}</span>
              ))}
            </div>

            {/* CTA row */}
            <div ref={setItemRef(5)} className="abh-animate abh-cta-row">
              <Link href="/services" className="hero-btn-primary">
                <span>Explore Services</span>
                <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" aria-hidden="true">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
              </Link>
              <Link href="/contact" className="hero-btn-glass">Contact Us</Link>
            </div>
          </div>

          {/* RIGHT: story card */}
          <div ref={setItemRef(6)} className="abh-animate abh-story-card">
            {/* Glowing accent bar */}
            <div className="abh-story-accent-bar" aria-hidden="true"/>

            {/* Corner motif */}
            <svg className="abh-story-motif" viewBox="0 0 64 48" fill="none" aria-hidden="true">
              <circle cx="8"  cy="8" r="2.5" fill="#539AD2" opacity="0.5"/>
              <circle cx="18" cy="8" r="2.5" fill="#539AD2" opacity="0.3"/>
              <circle cx="28" cy="8" r="2.5" fill="#539AD2" opacity="0.15"/>
              <line x1="0" y1="20" x2="40" y2="20" stroke="#539AD2" strokeWidth="1.5" opacity="0.18"/>
              <line x1="0" y1="25" x2="28" y2="25" stroke="#539AD2" strokeWidth="1.5" opacity="0.12"/>
            </svg>

            <div className="abh-story-eyebrow">Our Story</div>
            <h2 className="abh-story-title">
              Born from a Belief That<br/>
              <span className="abh-story-title-accent">Risk is Manageable</span>
            </h2>
            <p className="abh-story-body">
              RiskBerg was founded on a simple conviction: that every business risk, no matter how
              complex, can be understood, managed, and turned into a strategic opportunity. In an
              era of relentless digital disruption and regulatory complexity, we saw too many
              organisations struggling to navigate their security challenges — not from a lack of
              effort, but from a lack of the right partner.
            </p>
            <p className="abh-story-body">
              Today, we stand as one of India's trusted CERT-In empanelled security auditors,
              serving leading enterprises across BFSI, Automotive, Manufacturing, Healthcare,
              Telecom, and IT sectors.
            </p>

            {/* IDDEI callout */}
            <div className="abh-iddei-callout">
              <div className="abh-iddei-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M12 3L20 7.5V16.5L12 21L4 16.5V7.5L12 3Z" stroke="#539AD2" strokeWidth="2"/>
                  <path d="M12 8V16M8 10l4 2 4-2" stroke="#539AD2" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <div className="abh-iddei-label">Proprietary Framework</div>
                <div className="abh-iddei-name">IDDEI — Identify · Demystify · Design &amp; Develop · Execute · Improve</div>
              </div>
            </div>
          </div>

        </div>{/* /abh-top-grid */}

        {/* ── Stats bar ── */}
        <div
          ref={el => { statsRef.current = el; itemRefs.current[7] = el; }}
          className="abh-animate abh-stats-bar"
        >
          {stats.map((s, i) => (
            <div key={s.label} className="abh-stat-wrap">
              <StatCounter {...s} started={statsOn} />
              {i < stats.length - 1 && <div className="abh-stat-divider" aria-hidden="true"/>}
            </div>
          ))}
        </div>

        {/* ── Pillar cards (Mission / Vision / Values) ── */}
        <div className="abh-pillars-grid">
          {pillars.map((p, i) => (
            <div
              key={p.num}
              ref={el => { pillarRefs.current[i] = el; }}
              className="abh-pillar-card"
            >
              {/* Top accent */}
              <div className="abh-pillar-top-bar" aria-hidden="true"/>

              {/* Number + icon row */}
              <div className="abh-pillar-head">
                <span className="abh-pillar-num">{p.num}</span>
                <div className="abh-pillar-icon">{p.icon}</div>
              </div>

              <h3 className="abh-pillar-title">{p.title}</h3>
              <p className="abh-pillar-body">{p.body}</p>

              {/* Bottom glow dot */}
              <div className="abh-pillar-glow-dot" aria-hidden="true"/>
            </div>
          ))}
        </div>

      </div>{/* /rb-container */}

      {/* ── Wave divider ── */}
      <div className="section-wave" aria-hidden="true">
        <svg viewBox="0 0 1440 72" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,40 C240,72 480,8 720,40 C960,72 1200,8 1440,40 L1440,72 L0,72 Z" fill="#ffffff"/>
        </svg>
      </div>
    </section>
  );
}
