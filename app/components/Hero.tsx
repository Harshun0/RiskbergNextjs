'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import ConsultationModal from './ConsultationModal';

/* ─────────────────────────────────────────────
   Stats data
───────────────────────────────────────────── */
const stats = [
  { count: 2000000, suffix: '+', label: 'Assets Secured' },
  { count: 150,     suffix: '+', label: 'Years of Excellence' },
  { count: 50,      suffix: '+', label: 'Certified Experts' },
  { count: 20,      suffix: '+', label: 'Sectors Served' },
];

/* ─────────────────────────────────────────────
   Decorative background shapes
───────────────────────────────────────────── */
function DecoShapes() {
  return (
    <div className="deco-shapes" aria-hidden="true">
      {/* Blob — top right */}
      <svg className="hero-deco hero-deco-blob-tr" viewBox="0 0 200 200" fill="none">
        <path
          d="M47.5,-62.5C60.5,-53.5,69.5,-38.5,74.5,-22C79.5,-5.5,80.5,12.5,74,27.5C67.5,42.5,53.5,54.5,38,62.5C22.5,70.5,5.5,74.5,-12,73C-29.5,71.5,-47.5,64.5,-59.5,52C-71.5,39.5,-77.5,21.5,-76,4C-74.5,-13.5,-65.5,-30.5,-53,-44C-40.5,-57.5,-24.5,-67.5,-6.5,-70C11.5,-72.5,34.5,-71.5,47.5,-62.5Z"
          transform="translate(100 100)"
          fill="#1A3562"
        />
      </svg>

      {/* 4-point star — top left */}
      <svg className="hero-deco hero-deco-star-tl deco-spin-slow" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L13.5 10.5L22 12L13.5 13.5L12 22L10.5 13.5L2 12L10.5 10.5Z" fill="#539AD2"/>
      </svg>

      {/* 4-point star — mid right */}
      <svg className="hero-deco hero-deco-star-mr deco-spin-slow-rev" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L13.5 10.5L22 12L13.5 13.5L12 22L10.5 13.5L2 12L10.5 10.5Z" fill="#2E6DA4"/>
      </svg>

      {/* Arch outline — bottom left */}
      <svg className="hero-deco hero-deco-arch-bl" viewBox="0 0 80 80" fill="none">
        <path d="M10 70 L10 40 Q10 10 40 10 Q70 10 70 40 L70 70" stroke="#1A3562" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M22 70 L22 42 Q22 22 40 22 Q58 22 58 42 L58 70" stroke="#539AD2" strokeWidth="2" strokeLinecap="round"/>
      </svg>

      {/* Dot cluster — bottom right */}
      <svg className="hero-deco hero-deco-dots-br" viewBox="0 0 90 90" fill="none">
        <circle cx="10" cy="10" r="3" fill="#1A3562"/><circle cx="25" cy="10" r="3" fill="#1A3562"/><circle cx="40" cy="10" r="3" fill="#1A3562"/>
        <circle cx="10" cy="25" r="3" fill="#539AD2"/><circle cx="25" cy="25" r="4" fill="#539AD2"/> <circle cx="40" cy="25" r="3" fill="#539AD2"/>
        <circle cx="10" cy="40" r="3" fill="#2E6DA4"/><circle cx="25" cy="40" r="3" fill="#2E6DA4"/><circle cx="40" cy="40" r="3" fill="#2E6DA4"/>
        <circle cx="55" cy="10" r="3" fill="#1A3562"/><circle cx="55" cy="25" r="3" fill="#539AD2"/><circle cx="55" cy="40" r="3" fill="#2E6DA4"/>
      </svg>

      {/* Wavy lines — top mid */}
      <svg className="hero-deco hero-deco-wave-tm" viewBox="0 0 80 28" fill="none">
        <path d="M2 8 Q10 2 18 8 Q26 14 34 8 Q42 2 50 8 Q58 14 66 8 Q74 2 78 8" stroke="#539AD2" strokeWidth="2" strokeLinecap="round"/>
        <path d="M2 20 Q10 14 18 20 Q26 26 34 20 Q42 14 50 20 Q58 26 66 20 Q74 14 78 20" stroke="#2E6DA4" strokeWidth="2" strokeLinecap="round"/>
      </svg>

      {/* Cube outline — mid left */}
      <svg className="hero-deco hero-deco-cube-ml deco-float" viewBox="0 0 32 32" fill="none">
        <path d="M16 3L28 9V22L16 28L4 22V9L16 3Z" stroke="#1A3562" strokeWidth="1.8" strokeLinejoin="round"/>
        <path d="M16 3L16 16M4 9L16 16M28 9L16 16" stroke="#539AD2" strokeWidth="1.4"/>
      </svg>

      {/* Triangle — mid bottom */}
      <svg className="hero-deco hero-deco-tri-bm deco-float-rev" viewBox="0 0 22 22" fill="none">
        <path d="M11 2L21 20H1L11 2Z" stroke="#2E6DA4" strokeWidth="2" strokeLinejoin="round"/>
      </svg>

      {/* Ring — mid right */}
      <svg className="hero-deco hero-deco-ring-mr" viewBox="0 0 60 60" fill="none">
        <circle cx="30" cy="30" r="26" stroke="#539AD2" strokeWidth="2.5"/>
        <circle cx="30" cy="30" r="18" stroke="#1A3562" strokeWidth="1.5" strokeDasharray="4 4"/>
      </svg>

      {/* Starburst — mid */}
      <svg className="hero-deco hero-deco-burst-tr deco-spin-xslow" viewBox="0 0 44 44" fill="none">
        <path d="M22 2L24.5 18L38 8L28 20L44 22L28 24L38 36L24.5 26L22 42L19.5 26L6 36L16 24L0 22L16 20L6 8L19.5 18Z" fill="#1A3562"/>
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Animated stat counter (single item)
───────────────────────────────────────────── */
function StatItem({
  count, suffix, label, started,
}: {
  count: number; suffix: string; label: string; started: boolean;
}) {
  const numRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!started || !numRef.current) return;
    const el = numRef.current;
    const duration = 2000;
    const startTime = performance.now();

    function easeOut(t: number) { return 1 - Math.pow(1 - t, 3); }
    function fmt(v: number) {
      if (v >= 1_000_000) return (v / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
      return v.toLocaleString();
    }

    function tick(now: number) {
      const t = Math.min((now - startTime) / duration, 1);
      el.textContent = fmt(Math.round(easeOut(t) * count));
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [started, count]);

  return (
    <div className="text-center">
      <div className="leading-none">
        <span ref={numRef} className="hero-stat-num">0</span>
        <span className="text-lg font-bold text-[#1a3562]">{suffix}</span>
      </div>
      <span className="block text-[0.7rem] text-[#4a6e8e] mt-1">{label}</span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Hero section
───────────────────────────────────────────── */
export default function Hero() {
  const itemRefs    = useRef<(HTMLElement | null)[]>([]);
  const statsRef    = useRef<HTMLDivElement>(null);
  const [statsOn, setStatsOn] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  /* Scroll-reveal for content items + stats trigger */
  useEffect(() => {
    const obs: IntersectionObserver[] = [];

    itemRefs.current.forEach(el => {
      if (!el) return;
      const o = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) { el.classList.add('hero-visible'); o.disconnect(); }
      }, { threshold: 0.1 });
      o.observe(el);
      obs.push(o);
    });

    if (statsRef.current) {
      const o = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) { setStatsOn(true); o.disconnect(); }
      }, { threshold: 0.3 });
      o.observe(statsRef.current);
      obs.push(o);
    }

    return () => obs.forEach(o => o.disconnect());
  }, []);

  function setRef(i: number) {
    return (el: HTMLElement | null) => { itemRefs.current[i] = el; };
  }

  return (
    <section id="hero" className="hero-section">
      <DecoShapes />

      {/* ── Background video ── */}
      <video
        className="hero-video-bg"
        autoPlay muted loop playsInline preload="auto"
        aria-hidden="true"
      >
        <source
          src="https://res.cloudinary.com/drvug594q/video/upload/v1789513895/Update_cybersecurity_website_bac__1080p_20260916042514_erasio_gugtzn.mp4"
          type="video/mp4"
        />
      </video>
      {/* White scrim so text stays readable */}
      <div className="hero-video-overlay" aria-hidden="true" />

      {/* ── Main content ── */}
      <div className="hero-content-wrap">

        {/* Badge */}
        <div
          ref={setRef(0)}
          className="hero-animate inline-flex items-center gap-2 px-4 py-1.5 mb-4 rounded-full
                     text-xs font-medium text-[#1a3562]
                     bg-[rgba(108,164,212,0.08)] border border-[rgba(108,164,212,0.2)]"
        >
          <span className="badge-pulse" />
          CERT-In Empanelled Security Auditor
        </div>

        {/* Heading */}
        <h1
          ref={setRef(1)}
          className="hero-animate hero-title mb-4"
        >
          <span className="block">De-Risking Your</span>
          <span className="block hero-gradient-text">Digital Transformation</span>
          <span className="block">Journey</span>
        </h1>

        {/* Sub-tagline */}
        <p
          ref={setRef(2)}
          className="hero-animate text-sm font-medium text-[#2d5272] mb-2 tracking-wide"
        >
          RISK &amp; COMPLIANCE · AI GOVERNANCE · CYBERSECURITY · DATA PRIVACY
        </p>

        {/* Body copy */}
        <p
          ref={setRef(3)}
          className="hero-animate text-sm text-[#4a6e8e] max-w-[600px] mb-6 leading-relaxed"
        >
          Empowering organizations with end-to-end risk management and cybersecurity solutions.
          Powered by our proprietary IDDEI Framework, we deliver tailored, business-aligned
          solutions for secure, sustainable growth.
        </p>

        {/* CTAs */}
        <div
          ref={setRef(4)}
          className="hero-animate flex flex-wrap items-center gap-4 mb-8"
        >
          <button className="hero-btn-primary" onClick={() => setModalOpen(true)}>
            <span>Schedule a Consultation</span>
            <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] shrink-0" aria-hidden="true">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" fill="none"/>
            </svg>
          </button>
          <Link href="/about" className="hero-btn-glass">Why RiskBerg?</Link>
        </div>

        {/* Stats */}
        <div
          ref={el => { statsRef.current = el; itemRefs.current[5] = el; }}
          className="hero-animate flex flex-wrap items-center gap-6 sm:gap-8"
        >
          {stats.map((s, i) => (
            <div key={s.label} className="flex items-center gap-6 sm:gap-8">
              <StatItem {...s} started={statsOn} />
              {i < stats.length - 1 && (
                <div className="hidden sm:block w-px h-8 bg-[rgba(27,58,92,0.1)]" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
      </div>

      <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
