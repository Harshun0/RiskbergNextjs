'use client';

import { useEffect, useRef } from 'react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */
const industries = [
  { href: '/industry-bfsi',         label: 'BFSI',                   img: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80', icon: <svg viewBox="0 0 32 32" fill="none"><path d="M16 3V29M3 16H29M9 9L23 23M23 9L9 23" stroke="currentColor" strokeWidth="1.6"/><circle cx="16" cy="16" r="11" stroke="currentColor" strokeWidth="1.6"/></svg> },
  { href: '/industry-itsaas',       label: 'IT / SaaS',              img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80', icon: <svg viewBox="0 0 32 32" fill="none"><rect x="4" y="4" width="24" height="24" rx="3" stroke="currentColor" strokeWidth="1.6"/><path d="M4 12H28M12 4V28" stroke="currentColor" strokeWidth="1.6"/></svg> },
  { href: '/industry-healthcare',   label: 'Healthcare',             img: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=600&q=80', icon: <svg viewBox="0 0 32 32" fill="none"><path d="M16 4a6 6 0 100 12A6 6 0 0016 4zM4 28c0-5.5 5.4-10 12-10s12 4.5 12 10" stroke="currentColor" strokeWidth="1.6"/></svg> },
  { href: '/industry-manufacturing', label: 'Manufacturing',         img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80', icon: <svg viewBox="0 0 32 32" fill="none"><rect x="3" y="8" width="26" height="18" rx="2" stroke="currentColor" strokeWidth="1.6"/><circle cx="16" cy="17" r="3" stroke="currentColor" strokeWidth="1.6"/></svg> },
  { href: '/industry-energy',       label: 'Energy / Power',        img: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600&q=80', icon: <svg viewBox="0 0 32 32" fill="none"><path d="M17 3L7 18H14L14 29L25 13H17L17 3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg> },
  { href: '/industry-telecom',      label: 'Telecom',                img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', icon: <svg viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1.6"/><path d="M16 8V16L21 21" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg> },
  { href: '/industry-retail',       label: 'E-Commerce',            img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80', icon: <svg viewBox="0 0 32 32" fill="none"><rect x="3" y="7" width="26" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.6"/><path d="M5 12l2 13h18l2-13" stroke="currentColor" strokeWidth="1.6"/><path d="M12 12v4a4 4 0 008 0v-4" stroke="currentColor" strokeWidth="1.6"/></svg> },
  { href: '/industry-government',   label: 'Government',            img: 'https://images.unsplash.com/photo-1523292562811-8fa7962a78c8?w=600&q=80', icon: <svg viewBox="0 0 32 32" fill="none"><path d="M4 28V14L16 5L28 14V28H4Z" stroke="currentColor" strokeWidth="1.6"/><path d="M12 28V20h8v8" stroke="currentColor" strokeWidth="1.6"/></svg> },
  { href: '/industry-education',    label: 'Education',             img: 'https://plus.unsplash.com/premium_photo-1682125773446-259ce64f9dd7?w=600&q=80', icon: <svg viewBox="0 0 32 32" fill="none"><path d="M16 4L28 10V14C28 21 22.6 27.2 16 29C9.4 27.2 4 21 4 14V10L16 4Z" stroke="currentColor" strokeWidth="1.6"/></svg> },
  { href: '/industry-logistics',    label: 'Logistics',             img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80', icon: <svg viewBox="0 0 32 32" fill="none"><rect x="2" y="10" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.6"/><path d="M22 14h4l4 5v5h-8V14Z" stroke="currentColor" strokeWidth="1.6"/><circle cx="8" cy="26" r="2.5" stroke="currentColor" strokeWidth="1.6"/><circle cx="24" cy="26" r="2.5" stroke="currentColor" strokeWidth="1.6"/></svg> },
  { href: '/industry-aviation',     label: 'Aviation & Defense',    img: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=600&q=80', icon: <svg viewBox="0 0 32 32" fill="none"><path d="M28 12l-5 2-7-8-3 1 4 8-6 2-2-3-2 1 2 5 2 5 2-1-1-3 6-2 3 8 3-1-3-9 5-2a4 4 0 000-8z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg> },
  { href: '/industry-fintech',      label: 'FinTech & Digital Payments', img: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=600&q=80', icon: <svg viewBox="0 0 32 32" fill="none"><path d="M16 4L28 11V21L16 28L4 21V11L16 4Z" stroke="currentColor" strokeWidth="1.6"/><path d="M16 10v6l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg> },
];

/* Blue-shade palette cycled per card — colorful but strictly on-brand */
const IND_PALETTE = [
  { a: '#539AD2', b: '#1A3562' },
  { a: '#2E6DA4', b: '#0D2547' },
  { a: '#7BB3E0', b: '#1A3562' },
  { a: '#3D7AB8', b: '#12264A' },
  { a: '#539AD2', b: '#2E6DA4' },
];

export default function Industries() {
  const swiperRef  = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  /* Scroll-reveal */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        el.querySelectorAll('.animate-scroll').forEach(n => n.classList.add('visible'));
        el.classList.add('ind-visible');
        obs.disconnect();
      }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* Swiper init */
  useEffect(() => {
    async function init() {
      const { Swiper } = await import('swiper');
      const { Autoplay, Pagination, Navigation, EffectCoverflow } = await import('swiper/modules');
      if (!swiperRef.current) return;
      new Swiper(swiperRef.current, {
        modules: [Autoplay, Pagination, Navigation, EffectCoverflow],
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        loop: true,
        slidesPerView: 'auto',
        speed: 650,
        coverflowEffect: { rotate: 0, stretch: 0, depth: 220, modifier: 2.5, slideShadows: false },
        autoplay: { delay: 2000, disableOnInteraction: false, pauseOnMouseEnter: true },
        pagination: { el: '.industries-pagination', clickable: true },
        navigation: { nextEl: '.industries-next', prevEl: '.industries-prev' },
      });
    }
    init();
  }, []);

  return (
    <section ref={sectionRef} className="rb-section industries-section" id="industries">
      {/* Ambient glow wash */}
      <div className="ind-glow-wash" aria-hidden="true">
        <div className="ind-glow-blob ind-glow-blob-1" />
        <div className="ind-glow-blob ind-glow-blob-2" />
      </div>

      {/* ── Cybersecurity icon background (blue shades only) ── */}
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

      <div className="rb-container">
        {/* Decorative shapes */}
        <div className="deco-shapes deco-industries" aria-hidden="true">
          <svg className="s-blob-br" viewBox="0 0 200 200" fill="none">
            <path d="M38,-52C50,-42,60,-28,66,-12C72,4,74,22,68,37C62,52,48,64,32,70C16,76,-2,76,-18,70C-34,64,-48,52,-56,38C-64,24,-66,8,-62,-6C-58,-20,-48,-32,-36,-42C-24,-52,-10,-60,4,-62C18,-64,26,-62,38,-52Z" transform="translate(100 100)" fill="#539AD2"/>
          </svg>
          <svg className="s-star-tr" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L13.5 10.5L22 12L13.5 13.5L12 22L10.5 13.5L2 12L10.5 10.5Z" fill="#1A3562"/>
          </svg>
          <svg className="s-arch-tl" viewBox="0 0 68 68" fill="none">
            <path d="M8 60 L8 34 Q8 8 34 8 Q60 8 60 34 L60 60" stroke="#1A3562" strokeWidth="2.5" strokeLinecap="round"/>
            <path d="M18 60 L18 36 Q18 18 34 18 Q50 18 50 36 L50 60" stroke="#539AD2" strokeWidth="2" strokeLinecap="round"/>
            <path d="M28 60 L28 38 Q28 28 34 28 Q40 28 40 38 L40 60" stroke="#2E6DA4" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <svg className="s-dots-mr" viewBox="0 0 80 80" fill="none">
            <circle cx="10" cy="10" r="3" fill="#1A3562"/><circle cx="25" cy="10" r="3" fill="#1A3562"/><circle cx="40" cy="10" r="3" fill="#1A3562"/>
            <circle cx="10" cy="25" r="3" fill="#2E6DA4"/><circle cx="25" cy="25" r="4" fill="#2E6DA4"/><circle cx="40" cy="25" r="3" fill="#2E6DA4"/>
            <circle cx="10" cy="40" r="3" fill="#539AD2"/><circle cx="25" cy="40" r="3" fill="#539AD2"/><circle cx="40" cy="40" r="3" fill="#539AD2"/>
          </svg>
          <svg className="s-plus-ml" viewBox="0 0 26 26" fill="none">
            <path d="M13 2V24M2 13H24" stroke="#2E6DA4" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
        </div>

        <div className="section-header animate-scroll">
          <span className="section-tag">Industries We Serve</span>
          <h2 className="section-title">
            Securing Every <span className="section-title-wrap">
              <span className="text-gradient">Industry</span>
              <span className="section-title-underline" />
            </span>
          </h2>
          <p className="section-description">
            Deep domain expertise across diverse industry verticals, delivering sector-specific
            risk management and cybersecurity solutions.
          </p>
        </div>

        <div className="industries-carousel-wrap animate-scroll">
          <div ref={swiperRef} className="swiper industries-swiper">
            <div className="swiper-wrapper">
              {industries.map((ind, i) => {
                const pal = IND_PALETTE[i % IND_PALETTE.length];
                return (
                  <div key={ind.href} className="swiper-slide">
                    <a
                      href={ind.href}
                      className="ind-card"
                      style={{
                        ['--ind-accent' as string]: pal.a,
                        ['--ind-accent-deep' as string]: pal.b,
                      }}
                    >
                      <div className="ind-card-img" style={{ backgroundImage: `url('${ind.img}')` }} />
                      <div
                        className="ind-card-overlay"
                        style={{
                          background: `linear-gradient(to top, ${pal.b}E6 0%, ${pal.b}66 45%, ${pal.b}14 100%)`,
                        }}
                      >
                        <div
                          className="ind-card-icon"
                          style={{
                            background: `rgba(83,154,210,0.25)`,
                            borderColor: pal.a,
                          }}
                        >
                          {ind.icon}
                        </div>
                        <h4>{ind.label}</h4>
                        <div
                          className="ind-card-bar"
                          style={{ background: `linear-gradient(90deg, ${pal.a}, ${pal.b})` }}
                        />
                      </div>
                    </a>
                  </div>
                );
              })}
            </div>
            <div className="swiper-pagination industries-pagination" />
            <div className="swiper-button-prev industries-prev" />
            <div className="swiper-button-next industries-next" />
          </div>
        </div>
      </div>
    </section>
  );
}