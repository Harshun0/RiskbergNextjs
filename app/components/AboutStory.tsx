'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'motion/react';

/* ─────────────────────────────────────────────
   Slide data — image + right-panel content
───────────────────────────────────────────── */
const SLIDES = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
    tag: 'MD & CEO',
    title: 'Rohit Agrawal',
    role: 'Founder, Managing Director & CEO',
    body: 'Founder and Managing Director & CEO of RiskBerg. Drives enterprise risk and cybersecurity strategy across Fortune 500 organisations in India and globally, bringing deep expertise in risk management, compliance, and digital transformation.',
    stat: { value: 'CEO', label: 'MD & CEO — RiskBerg' },
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
    tag: 'Managing Director',
    title: 'Avinash G. Bendke',
    role: 'Managing Director (MD)',
    body: 'Managing Director at RiskBerg with extensive experience across enterprise security, governance, and risk management programmes. Instrumental in shaping RiskBerg\'s service delivery and strategic growth.',
    stat: { value: 'MD', label: 'Managing Director — RiskBerg' },
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80',
    tag: 'Chief Growth Officer',
    title: 'Love Mendiratta',
    role: 'Chief Growth Officer',
    body: 'Chief Growth Officer responsible for driving RiskBerg\'s market expansion, client relationships, and business development across key industry verticals and geographies.',
    stat: { value: 'CGO', label: 'Chief Growth Officer — RiskBerg' },
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80',
    tag: 'Chief Advisor',
    title: 'Ravi Bindal',
    role: 'Chief Advisor',
    body: 'Chief Advisor bringing decades of senior leadership experience across cybersecurity and risk domains. Provides strategic counsel and deep industry expertise that underpins RiskBerg\'s advisory excellence.',
    stat: { value: 'CA', label: 'Chief Advisor — RiskBerg' },
  },
];

/* ─────────────────────────────────────────────
   Carousel constants
───────────────────────────────────────────── */
const DRAG_BUFFER        = 0;
const VELOCITY_THRESHOLD = 500;
const GAP                = 14;
const SPRING             = { type: 'spring', stiffness: 320, damping: 32 } as const;
const AUTOPLAY_DELAY     = 3500;

/* ─────────────────────────────────────────────
   Single carousel card
───────────────────────────────────────────── */
function CarouselCard({
  slide, index, itemWidth, trackItemOffset, x, transition,
}: {
  slide: (typeof SLIDES)[0];
  index: number;
  itemWidth: number;
  trackItemOffset: number;
  x: ReturnType<typeof useMotionValue<number>>;
  transition: object;
}) {
  const range      = [-(index + 1) * trackItemOffset, -index * trackItemOffset, -(index - 1) * trackItemOffset];
  const outputRange = [70, 0, -70];
  const rotateY    = useTransform(x, range, outputRange, { clamp: false });

  return (
    <motion.div
      className="ast-card"
      style={{ width: itemWidth, height: itemWidth, rotateY }}
      transition={transition}
    >
      {/* Image fills the card */}
      <div
        className="ast-card-img"
        style={{ backgroundImage: `url('${slide.image}')` }}
      />
      {/* Gradient overlay + tag */}
      <div className="ast-card-overlay">
        <span className="ast-card-tag">{slide.tag}</span>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */
export default function AboutStory() {
  const BASE_WIDTH      = 480;
  const CONTAINER_PAD   = 16;
  const itemWidth       = BASE_WIDTH - CONTAINER_PAD * 2;
  const trackItemOffset = itemWidth + GAP;

  /* Loop: prepend last, append first */
  const itemsForRender = useMemo(() => [
    SLIDES[SLIDES.length - 1],
    ...SLIDES,
    SLIDES[0],
  ], []);

  const [position,   setPosition]   = useState(1);
  const [isJumping,  setIsJumping]  = useState(false);
  const [isAnimating,setIsAnimating]= useState(false);
  const x = useMotionValue(-trackItemOffset);

  const sectionRef  = useRef<HTMLElement>(null);
  const containerRef= useRef<HTMLDivElement>(null);

  /* Active slide index (0-based into SLIDES) */
  const activeIndex = (position - 1 + SLIDES.length) % SLIDES.length;
  const activeSlide = SLIDES[activeIndex];

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

  /* Autoplay — only advance if not currently mid-jump */
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isJumping) {
        setPosition(p => {
          // Stay within renderable bounds; loop-jump handled by onAnimationComplete
          const next = p + 1;
          return next <= itemsForRender.length - 1 ? next : 1;
        });
      }
    }, AUTOPLAY_DELAY);
    return () => clearInterval(timer);
  }, [isJumping, itemsForRender.length]);

  const effectiveTransition = isJumping ? { duration: 0 } : SPRING;

  function handleAnimationStart() { setIsAnimating(true); }

  function handleAnimationComplete() {
    const lastClone = itemsForRender.length - 1;
    if (position === lastClone) {
      setIsJumping(true);
      setPosition(1);
      x.set(-1 * trackItemOffset);
      requestAnimationFrame(() => { setIsJumping(false); setIsAnimating(false); });
      return;
    }
    if (position === 0) {
      setIsJumping(true);
      setPosition(SLIDES.length);
      x.set(-SLIDES.length * trackItemOffset);
      requestAnimationFrame(() => { setIsJumping(false); setIsAnimating(false); });
      return;
    }
    setIsAnimating(false);
  }

  function handleDragEnd(_: unknown, info: { offset: { x: number }; velocity: { x: number } }) {
    const { offset, velocity } = info;
    const dir =
      offset.x < -DRAG_BUFFER || velocity.x < -VELOCITY_THRESHOLD ? 1
      : offset.x > DRAG_BUFFER || velocity.x > VELOCITY_THRESHOLD ? -1
      : 0;
    if (dir === 0) return;
    setPosition(p => Math.max(0, Math.min(p + dir, itemsForRender.length - 1)));
  }

  return (
    <section ref={sectionRef} className="rb-section ast-section">
      {/* Same white background layers as Industries */}
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

      <div className="rb-container">
        {/* Section header */}
        <div className="section-header animate-scroll">
          <span className="section-tag">Leadership</span>
          <h2 className="section-title">
            The Minds Behind{' '}
            <span className="section-title-wrap">
              <span className="text-gradient">RiskBerg</span>
              <span className="section-title-underline" />
            </span>
          </h2>
          <p className="section-description">
            Practitioners, strategists, and growth leaders — each bringing decades of
            real-world expertise to every client engagement.
          </p>
        </div>

        {/* ── Two-column layout ── */}
        <div className="ast-layout animate-scroll">

          {/* LEFT — Carousel */}
          <div className="ast-carousel-col">
            {/* Light-blue glow behind the circle */}
            <div className="ast-circle-glow" aria-hidden="true" />
            <div
              ref={containerRef}
              className="ast-carousel-container"
              style={{ width: `${BASE_WIDTH}px` }}
            >
              <motion.div
                className="ast-track"
                drag={isAnimating ? false : 'x'}
                dragConstraints={{
                  left:  -(trackItemOffset * (itemsForRender.length - 1)),
                  right: 0,
                }}
                style={{
                  width: itemWidth,
                  gap: `${GAP}px`,
                  perspective: 1000,
                  perspectiveOrigin: `${position * trackItemOffset + itemWidth / 2}px 50%`,
                  x,
                }}
                onDragEnd={handleDragEnd}
                animate={{ x: -(position * trackItemOffset) }}
                transition={effectiveTransition}
                onAnimationStart={handleAnimationStart}
                onAnimationComplete={handleAnimationComplete}
              >
                {itemsForRender.map((slide, index) => (
                  <CarouselCard
                    key={`${slide.id}-${index}`}
                    slide={slide}
                    index={index}
                    itemWidth={itemWidth}
                    trackItemOffset={trackItemOffset}
                    x={x}
                    transition={effectiveTransition}
                  />
                ))}
              </motion.div>
            </div>

            {/* Dot indicators */}
            <div className="ast-dots">
              {SLIDES.map((_, i) => (
                <motion.button
                  key={i}
                  type="button"
                  className={`ast-dot ${activeIndex === i ? 'ast-dot-active' : ''}`}
                  aria-label={`Go to slide ${i + 1}`}
                  animate={{ scale: activeIndex === i ? 1.25 : 1 }}
                  transition={{ duration: 0.15 }}
                  onClick={() => setPosition(i + 1)}
                />
              ))}
            </div>
          </div>

          {/* RIGHT — Synced content panel */}
          <div className="ast-content-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide.id}
                className="ast-content-panel"
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Progress bar */}
                <div className="ast-progress-track" aria-hidden="true">
                  <motion.div
                    className="ast-progress-fill"
                    key={activeSlide.id}
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: AUTOPLAY_DELAY / 1000, ease: 'linear' }}
                  />
                </div>

                {/* Tag */}
                <span className="ast-content-tag">{activeSlide.tag}</span>

                {/* Slide counter */}
                <div className="ast-slide-counter">
                  <span className="ast-slide-current">{String(activeIndex + 1).padStart(2, '0')}</span>
                  <span className="ast-slide-sep">/</span>
                  <span className="ast-slide-total">{String(SLIDES.length).padStart(2, '0')}</span>
                </div>

                {/* Title */}
                <h3 className="ast-content-title">{activeSlide.title}</h3>

                {/* Role */}
                <p className="ast-content-role">{activeSlide.role}</p>

                {/* Body */}
                <p className="ast-content-body">{activeSlide.body}</p>

                {/* Stat callout */}
                <div className="ast-stat-callout">
                  <div className="ast-stat-value">{activeSlide.stat.value}</div>
                  <div className="ast-stat-label">{activeSlide.stat.label}</div>
                </div>

                {/* Prev / Next nav */}
                <div className="ast-nav-row">
                  <button
                    type="button"
                    className="ast-nav-btn"
                    aria-label="Previous slide"
                    onClick={() => setPosition(p => p - 1 <= 0 ? SLIDES.length : p - 1)}
                  >
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="ast-nav-btn"
                    aria-label="Next slide"
                    onClick={() => setPosition(p => p + 1 >= itemsForRender.length ? 1 : p + 1)}
                  >
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>{/* /ast-layout */}
      </div>
    </section>
  );
}
