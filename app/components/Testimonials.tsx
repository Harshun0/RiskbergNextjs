'use client';

import { useEffect, useRef, useCallback } from 'react';

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */
const items = [
  {
    id: 'c1', avatar: 'CIO', role: 'Chief Information Officer', org: 'Leading FinTech Company',
    text: '"RiskBerg\'s team brought unmatched clarity and structure to our cybersecurity posture. Their VAPT and compliance support helped us confidently meet both regulatory and internal audit expectations — on time and with precision."',
  },
  {
    id: 'c2', avatar: 'VP', role: 'VP – Information Security', org: 'Automotive OEM',
    text: '"From penetration testing to TISAX and ISO 21434 consulting, RiskBerg has been instrumental in helping us meet strict automotive cybersecurity requirements. They understand the stakes — and deliver with maturity and speed."',
  },
  {
    id: 'c3', avatar: 'CRO', role: 'Chief Risk Officer', org: 'Insurance Sector Client',
    text: '"Their support in managing third-party risk and vendor assessments helped us uncover gaps we didn\'t even know existed. With RiskBerg, we now have a proactive risk management culture."',
  },
  {
    id: 'c4', avatar: 'HC', role: 'Head of Compliance', org: 'BFSI Organization',
    text: '"We\'ve worked with several consulting firms, but RiskBerg stood out for their depth of knowledge, responsiveness, and client-first approach. Their strategic insights on DPDP and ISO 27001 gave us a clear competitive edge."',
  },
  {
    id: 'c5', avatar: 'CISO', role: 'Chief Information Security Officer', org: 'Healthcare Enterprise',
    text: '"RiskBerg guided us through our ISO 27001 certification with remarkable efficiency. Their structured gap assessment and hands-on remediation support made what felt like a daunting task completely manageable."',
  },
];

/* Blue shade cycled per testimonial — colorful, on-brand */
const TESTI_PALETTE = [
  { a: '#539AD2', b: '#1A3562' }, // light blue → navy
  { a: '#2E6DA4', b: '#0D2547' }, // mid blue → deep navy
  { a: '#7BB3E0', b: '#1A3562' }, // sky blue → navy
  { a: '#3D7AB8', b: '#12264A' }, // steel blue → navy
  { a: '#539AD2', b: '#2E6DA4' }, // light blue → mid blue
];

const AUTOPLAY_MS = 4500;
const LAYERS = [
  { y: '0%',    scale: 1,    rotate:  0, zIndex: 20, opacity: 1   },
  { y: '-5%',   scale: 0.84, rotate: -1, zIndex:  5, opacity: 0.9 },
  { y: '-7.5%', scale: 0.72, rotate:  1, zIndex:  0, opacity: 0.7 },
];

export default function Testimonials() {
  const viewportRef   = useRef<HTMLDivElement>(null);
  const sectionRef    = useRef<HTMLElement>(null);
  const detailTextRef = useRef<HTMLParagraphElement>(null);
  const detailAvatarRef = useRef<HTMLDivElement>(null);
  const detailNameRef = useRef<HTMLHeadingElement>(null);
  const detailOrgRef  = useRef<HTMLSpanElement>(null);
  const progressRef   = useRef<HTMLDivElement>(null);
  const dotsRef       = useRef<HTMLDivElement>(null);
  const quoteIconRef  = useRef<HTMLDivElement>(null);

  const listRef       = useRef([...items]);
  const animRef       = useRef(false);
  const timerRef      = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progTimerRef  = useRef<ReturnType<typeof setTimeout> | null>(null);

  const paletteFor = (id: string) => {
    const idx = items.findIndex(it => it.id === id);
    return TESTI_PALETTE[idx % TESTI_PALETTE.length];
  };

  const buildStack = useCallback(() => {
    const vp = viewportRef.current;
    if (!vp) return;
    vp.innerHTML = '';
    const depth = Math.min(3, listRef.current.length);
    for (let i = depth - 1; i >= 0; i--) {
      const item = listRef.current[i];
      const pal  = paletteFor(item.id);
      const l = LAYERS[i] || LAYERS[LAYERS.length - 1];
      const card = document.createElement('div');
      card.className = 'cs-card';
      card.dataset.id = item.id;
      card.dataset.stackIndex = String(i);
      card.style.setProperty('--cs-accent', pal.a);
      card.style.setProperty('--cs-accent-deep', pal.b);
      card.style.minHeight = '440px';
      card.style.width = '100%';
      card.style.padding = '40px';
      card.style.boxSizing = 'border-box';
      card.style.transform = `translateY(${l.y}) scale(${l.scale}) rotate(${l.rotate}deg)`;
      card.style.zIndex = String(l.zIndex);
      card.style.opacity = String(l.opacity);
      card.innerHTML = `
        <div style="display:flex;align-items:center;gap:16px;">
          <div class="cs-card-avatar" style="width:64px;height:64px;font-size:17px;background:linear-gradient(135deg, ${pal.b}, ${pal.a});">${item.avatar}</div>
          <div class="cs-card-meta">
            <p class="cs-card-role" style="font-size:17px;">${item.role}</p>
            <p class="cs-card-org" style="font-size:15px;">${item.org}</p>
          </div>
        </div>
        <p class="cs-card-preview" style="font-size:17px;line-height:1.75;margin-top:22px;">${item.text}</p>
        ${i === 0 ? `<div class="cs-card-hint" style="color:${pal.a};"><svg viewBox="0 0 24 24" fill="none" width="14" height="14"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2"/></svg></div>` : ''}`;
      if (i === 0) {
        card.addEventListener('click', advance);
      }
      vp.appendChild(card);
    }
  }, []);

  const updateDetail = useCallback((animate: boolean) => {
    const item = listRef.current[0];
    if (!item) return;
    const pal = paletteFor(item.id);
    function set() {
      if (detailTextRef.current)   detailTextRef.current.textContent   = item.text;
      if (detailAvatarRef.current) {
        detailAvatarRef.current.textContent = item.avatar;
        detailAvatarRef.current.style.background = `linear-gradient(135deg, ${pal.b}, ${pal.a})`;
      }
      if (detailNameRef.current)   detailNameRef.current.textContent   = item.role;
      if (detailOrgRef.current)    detailOrgRef.current.textContent    = item.org;
      if (progressRef.current)     progressRef.current.style.background = `linear-gradient(90deg, ${pal.b}, ${pal.a})`;
      if (quoteIconRef.current)    quoteIconRef.current.style.color = pal.a;
    }
    if (animate && detailTextRef.current) {
      detailTextRef.current.classList.add('is-changing');
      setTimeout(() => { set(); detailTextRef.current?.classList.remove('is-changing'); }, 300);
    } else {
      set();
    }
  }, []);

  const updateDots = useCallback(() => {
    const activeIdx = items.indexOf(listRef.current[0]);
    dotsRef.current?.querySelectorAll('.csd-dot').forEach((d, i) => {
      d.classList.toggle('is-active', i === activeIdx);
      (d as HTMLElement).style.background = i === activeIdx
        ? TESTI_PALETTE[i % TESTI_PALETTE.length].a
        : '';
    });
  }, []);

  const stopProgress = useCallback(() => {
    if (progTimerRef.current) clearTimeout(progTimerRef.current);
    if (progressRef.current) { progressRef.current.style.transition = 'none'; progressRef.current.style.width = '0%'; }
  }, []);

  const startProgress = useCallback(() => {
    stopProgress();
    const bar = progressRef.current;
    if (!bar) return;
    bar.style.transition = 'none';
    bar.style.width = '0%';
    bar.offsetWidth; // reflow
    bar.style.transition = `width ${AUTOPLAY_MS}ms linear`;
    bar.style.width = '100%';
  }, [stopProgress]);

  const scheduleAutoplay = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => advance(), AUTOPLAY_MS);
    startProgress();
  }, [startProgress]);

  const cancelAutoplay = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    stopProgress();
  }, [stopProgress]);

  function advance() {
    if (animRef.current || listRef.current.length <= 1) return;
    cancelAutoplay();
    animRef.current = true;
    const top = viewportRef.current?.querySelector('[data-stack-index="0"]') as HTMLElement | null;
    if (top) {
      const drift = (Math.random() - 0.5) * 7;
      const rot   = drift + (Math.random() - 0.5) * 1.5;
      top.style.transition = 'transform 0.32s cubic-bezier(0.22,1,0.36,1), opacity 0.18s ease';
      top.style.transform  = `translateY(200%) translateX(${drift}%) scale(0.9) rotate(${rot}deg)`;
      top.style.opacity    = '0';
      top.style.zIndex     = '30';
    }
    listRef.current.push(listRef.current.shift()!);
    updateDetail(true);
    updateDots();
    setTimeout(() => {
      animRef.current = false;
      buildStack();
      scheduleAutoplay();
    }, 360);
  }

  useEffect(() => {
    const section = sectionRef.current;
    if (section) {
      const revealObs = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) {
          section.querySelectorAll('.animate-scroll').forEach(el => el.classList.add('visible'));
          section.classList.add('testi-visible');
          revealObs.disconnect();
        }
      }, { threshold: 0.1 });
      revealObs.observe(section);
    }

    const dots = dotsRef.current;
    if (dots) {
      dots.innerHTML = '';
      items.forEach((_, i) => {
        const btn = document.createElement('button');
        btn.className = 'csd-dot' + (i === 0 ? ' is-active' : '');
        if (i === 0) btn.style.background = TESTI_PALETTE[0].a;
        btn.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
        btn.addEventListener('click', () => {
          const cur = items.indexOf(listRef.current[0]);
          const steps = ((i - cur) + items.length) % items.length;
          for (let s = 0; s < steps; s++) advance();
        });
        dots.appendChild(btn);
      });
    }

    buildStack();
    updateDetail(false);
    scheduleAutoplay();

    const vp = viewportRef.current;
    vp?.addEventListener('mouseenter', cancelAutoplay);
    vp?.addEventListener('mouseleave', scheduleAutoplay);

    return () => {
      cancelAutoplay();
      vp?.removeEventListener('mouseenter', cancelAutoplay);
      vp?.removeEventListener('mouseleave', scheduleAutoplay);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section ref={sectionRef} className="rb-section testimonials-section" id="testimonials">
      {/* Ambient glow wash */}
      <div className="test-glow-wash" aria-hidden="true">
        <div className="test-glow-blob test-glow-blob-1" />
        <div className="test-glow-blob test-glow-blob-2" />
      </div>

      {/* ── Cybersecurity icon background (blue shades only) ── */}
      <div className="test-cyber-bg" aria-hidden="true">
        <svg className="test-cyber-icon ci-shield-1" viewBox="0 0 48 48" fill="none">
          <path d="M24 4L8 11v11c0 11 6.8 18.6 16 21 9.2-2.4 16-10 16-21V11L24 4z" stroke="#1A3562" strokeWidth="3.5"/>
          <path d="M17 24l5 5 10-11" stroke="#539AD2" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

        <svg className="test-cyber-icon ci-lock-1" viewBox="0 0 40 40" fill="none">
          <rect x="9" y="18" width="22" height="16" rx="3" stroke="#539AD2" strokeWidth="3.5"/>
          <path d="M14 18v-5a6 6 0 0112 0v5" stroke="#2E6DA4" strokeWidth="3.5"/>
          <circle cx="20" cy="26" r="3" fill="#1A3562"/>
        </svg>

        <svg className="test-cyber-icon ci-node-1" viewBox="0 0 100 60" fill="none">
          <circle cx="12" cy="12" r="6" fill="#539AD2"/>
          <circle cx="50" cy="30" r="7" fill="#1A3562"/>
          <circle cx="88" cy="10" r="6" fill="#2E6DA4"/>
          <circle cx="70" cy="50" r="5" fill="#539AD2"/>
          <path d="M12 12L50 30L88 10M50 30L70 50" stroke="#1A3562" strokeWidth="2.5" opacity="0.9"/>
        </svg>

        <svg className="test-cyber-icon ci-shield-2" viewBox="0 0 48 48" fill="none">
          <path d="M24 4L8 11v11c0 11 6.8 18.6 16 21 9.2-2.4 16-10 16-21V11L24 4z" stroke="#2E6DA4" strokeWidth="3.5"/>
        </svg>

        <svg className="test-cyber-icon ci-fingerprint-1" viewBox="0 0 40 40" fill="none">
          <path d="M20 8c-6.6 0-12 5.4-12 12v6" stroke="#539AD2" strokeWidth="3" strokeLinecap="round"/>
          <path d="M20 12c-4.4 0-8 3.6-8 8v6" stroke="#1A3562" strokeWidth="3" strokeLinecap="round"/>
          <path d="M20 16c-2.2 0-4 1.8-4 4v8" stroke="#2E6DA4" strokeWidth="3" strokeLinecap="round"/>
          <path d="M20 8c6.6 0 12 5.4 12 12v3" stroke="#539AD2" strokeWidth="3" strokeLinecap="round"/>
          <path d="M20 12c4.4 0 8 3.6 8 8v4" stroke="#1A3562" strokeWidth="3" strokeLinecap="round"/>
        </svg>

        <svg className="test-cyber-icon ci-binary-1" viewBox="0 0 90 30" fill="none">
          <text x="0" y="14" fill="#1A3562" fontSize="13" fontFamily="monospace" letterSpacing="2" fontWeight="700">01001</text>
          <text x="0" y="28" fill="#539AD2" fontSize="13" fontFamily="monospace" letterSpacing="2" fontWeight="700">11010</text>
        </svg>

        <svg className="test-cyber-icon ci-lock-2" viewBox="0 0 40 40" fill="none">
          <rect x="9" y="18" width="22" height="16" rx="3" stroke="#1A3562" strokeWidth="3.5"/>
          <path d="M14 18v-5a6 6 0 0112 0v5" stroke="#539AD2" strokeWidth="3.5"/>
        </svg>

        <svg className="test-cyber-icon ci-hex-1" viewBox="0 0 40 46" fill="none">
          <path d="M20 2 L37 12 V34 L20 44 L3 34 V12 Z" stroke="#2E6DA4" strokeWidth="3"/>
          <path d="M20 14 L28 19 V29 L20 34 L12 29 V19 Z" stroke="#539AD2" strokeWidth="2.5"/>
        </svg>

        <svg className="test-cyber-icon ci-node-2" viewBox="0 0 100 60" fill="none">
          <circle cx="10" cy="30" r="5.5" fill="#2E6DA4"/>
          <circle cx="45" cy="10" r="6" fill="#539AD2"/>
          <circle cx="80" cy="35" r="6.5" fill="#1A3562"/>
          <path d="M10 30L45 10L80 35" stroke="#539AD2" strokeWidth="2.5" opacity="0.9"/>
        </svg>
      </div>

      <div className="rb-container">
        <div className="card-stack-layout">
          {/* Left – stacked cards */}
          <div className="card-stack-viewport-wrap">
            <div className="card-stack-viewport-glow" aria-hidden="true" />
            <div
              ref={viewportRef}
              className="card-stack-viewport"
              style={{ minHeight: '500px' }}
              aria-live="polite"
              aria-atomic="true"
            />
          </div>

          {/* Right – heading centered above detail panel, then the panel itself */}
          <div className="card-stack-right" style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              className="section-header animate-scroll"
              style={{ textAlign: 'center', marginBottom: '32px' }}
            >
              <span className="section-tag">Client Success</span>
              <h2 className="section-title testi-title">
                What Our <span className="section-title-wrap">
                  <span className="text-gradient">Clients Say</span>
                  <span className="section-title-underline" />
                </span>
              </h2>
            </div>

            <div className="card-stack-detail">
              <div ref={quoteIconRef} className="csd-quote-icon">
                <svg viewBox="0 0 40 40" fill="none" width="42" height="42">
                  <path d="M5 25C5 17 10 10 17 7L18.5 10C12 13 10 18 10 20H15C15 22.8 12.8 25 10 25H7.5C6.1 25 5 23.9 5 22.5V25ZM22 25C22 17 27 10 34 7L35.5 10C29 13 27 18 27 20H32C32 22.8 29.8 25 27 25H24.5C23.1 25 22 23.9 22 22.5V25Z" fill="currentColor" />
                </svg>
              </div>
              <p ref={detailTextRef} className="csd-text" />
              <div className="csd-author">
                <div ref={detailAvatarRef} className="csd-avatar" />
                <div className="csd-author-info">
                  <h4 ref={detailNameRef} />
                  <span ref={detailOrgRef} />
                </div>
              </div>
              <div className="csd-progress">
                <div ref={progressRef} className="csd-progress-bar" />
              </div>
              <div className="csd-controls">
                <div ref={dotsRef} className="csd-dots" />
                <button className="csd-btn" onClick={advance} aria-label="Next testimonial">
                  <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}