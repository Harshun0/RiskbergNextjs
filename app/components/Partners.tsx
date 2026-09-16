'use client';

import { useEffect, useRef, useState } from 'react';

/* ─────────────────────────────────────────────
   Partner images — PartnersKing folder (p1–p25, no p2)
───────────────────────────────────────────── */
const ITEMS = [
  'PartnersKing/p1.png',
  'PartnersKing/p3.png',
  'PartnersKing/p4.png',
  'PartnersKing/p5.jpg',
  'PartnersKing/p6.jpg',
  'PartnersKing/p7.png',
  'PartnersKing/p8.png',
  'PartnersKing/p9.png',
  'PartnersKing/p10.png',
  'PartnersKing/p11.png',
  'PartnersKing/p12.png',
  'PartnersKing/p13.jpg',
  'PartnersKing/p14.png',
  'PartnersKing/p15.png',
  'PartnersKing/p16.png',
  'PartnersKing/p17.jpg',
  'PartnersKing/p18.png',
  'PartnersKing/p19.jpg',
  'PartnersKing/p20.png',
  'PartnersKing/p21.png',
  'PartnersKing/p22.png',
  'PartnersKing/p23.png',
  'PartnersKing/p24.png',
  'PartnersKing/p25.png',
];

/* Config — mirrors main.js exactly */
const COLUMNS   = 4;
const TILE_W    = 148;   // matches --dw-tile-w
const TILE_H    = 98;    // matches --dw-tile-h
const GAP       = 12;
const TILT      = 14;    // rotateX
const TURN      = -12;   // rotateY
const ROLL      = 0;
const DEPTH     = 100;   // translateZ
const SPEED     = 38;
const VARIANCE  = 0.4;
const PARALLAX  = 0.5;
const COPIES    = 6;

/* Blue shade cycled per column — colorful but on-brand */
const COLUMN_PALETTE = ['#539AD2', '#1A3562', '#2E6DA4', '#7BB3E0'];

function colFactor(c: number) {
  const pseudo = ((c * 0.6180339887 + 0.35) % 1) * 2 - 1;
  return 1 + VARIANCE * pseudo;
}

/* Distribute items across columns */
function buildColItems() {
  return Array.from({ length: COLUMNS }, (_, c) =>
    ITEMS.filter((_, i) => i % COLUMNS === c)
  ).map(col => (col.length ? col : [ITEMS[0]]));
}

/* Animated count-up stat */
function StatNum({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      const start = performance.now();
      const dur = 1800;
      const elEl = el;
      function frame(now: number) {
        const t = Math.min((now - start) / dur, 1);
        const ease = 1 - Math.pow(1 - t, 3);
        elEl.textContent = Math.round(ease * target).toString();
        if (t < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
      obs.disconnect();
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);
  return <><span ref={ref}>0</span>{suffix}</>;
}

export default function Partners() {
  const wallRef        = useRef<HTMLDivElement>(null);
  const planeRef       = useRef<HTMLDivElement>(null);
  const trackRefs      = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef         = useRef<number>(0);
  const lastTsRef      = useRef<number | null>(null);
  const offsetsRef     = useRef<number[]>([]);
  const veloRef        = useRef<number[]>([]);
  const ptrRef         = useRef({ x: 0, y: 0 });
  const ptrDampRef     = useRef({ x: 0, y: 0 });
  const activeIdRef    = useRef<string | null>(null);
  const colItemsRef    = useRef(buildColItems());
  const copyHeightsRef = useRef<number[]>([]);

  /* Scroll-reveal for the copy block */
  const copyRef = useRef<HTMLDivElement>(null);
  const [copyVisible, setCopyVisible] = useState(false);
  useEffect(() => {
    const el = copyRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setCopyVisible(true); obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const container = wallRef.current;
    const plane     = planeRef.current;
    if (!container || !plane) return;

    // Capture as non-nullable locals for use inside closures
    const safeContainer = container;
    const safePlane     = plane;

    const reduced  = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const colItems = colItemsRef.current;
    const unit     = TILE_H + GAP;

    // copyHeight = height of ONE set of column items (used for seamless wrap)
    const copyHeights = colItems.map(col => col.length * unit);
    copyHeightsRef.current = copyHeights;
    // Stagger start offsets so columns begin at different scroll positions
    offsetsRef.current = copyHeights.map((ch, c) => ch * ((c * 0.37) % 1));
    veloRef.current    = new Array(COLUMNS).fill(0);

    // Set plane width explicitly so all 4 columns are laid out
    const colWidth = TILE_W + GAP;
    plane.style.width = `${COLUMNS * colWidth}px`;

    // Base velocities — alternating direction per column (mirrors main.js)
    const baseVel = colItems.map((_, c) => {
      const alt = c % 2 === 0 ? 1 : -1;
      return SPEED * colFactor(c) * alt;
    });

    function applyPlane(px: number, py: number) {
      if (!planeRef.current) return;
      planeRef.current.style.transform =
        `translate(-50%, -50%) ` +
        `rotateX(${TILT + py}deg) rotateY(${TURN + px}deg) rotateZ(${ROLL}deg) ` +
        `translateZ(${-DEPTH}px)`;
    }
    applyPlane(0, 0);

    function tick(ts: number) {
      if (lastTsRef.current === null) lastTsRef.current = ts;
      const dt = Math.min(0.05, (ts - lastTsRef.current) / 1000);
      lastTsRef.current = ts;

      // Smooth mouse-parallax tilt
      const maxT  = PARALLAX * 8;
      const targX = ptrRef.current.x * maxT;
      const targY = -ptrRef.current.y * maxT;
      const damp  = 1 - Math.exp(-dt / 0.12);
      ptrDampRef.current.x += (targX - ptrDampRef.current.x) * damp;
      ptrDampRef.current.y += (targY - ptrDampRef.current.y) * damp;
      applyPlane(ptrDampRef.current.x, ptrDampRef.current.y);

      if (!reduced) {
        for (let c = 0; c < COLUMNS; c++) {
          const target = baseVel[c];
          const ease   = 1 - Math.exp(-dt / 0.28);
          veloRef.current[c] += (target - veloRef.current[c]) * ease;
          let next = offsetsRef.current[c] + veloRef.current[c] * dt;
          const ch = copyHeightsRef.current[c];
          next = ((next % ch) + ch) % ch;
          offsetsRef.current[c] = next;
          const track = trackRefs.current[c];
          if (track) track.style.transform = `translate3d(0,${-next}px,0)`;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);

    // Pointer: parallax + tile highlight
    function onMove(e: PointerEvent) {
      const rect = safeContainer.getBoundingClientRect();
      if (PARALLAX > 0 && !reduced) {
        ptrRef.current.x = (e.clientX - rect.left) / rect.width  - 0.5;
        ptrRef.current.y = (e.clientY - rect.top)  / rect.height - 0.5;
      }
      const hit  = document.elementFromPoint(e.clientX, e.clientY);
      const tile = hit && (hit as HTMLElement).closest
        ? (hit as HTMLElement).closest('[data-tile-id]') as HTMLElement | null
        : null;
      if (!tile) return;
      const id = tile.dataset.tileId;
      if (id === activeIdRef.current) return;
      if (activeIdRef.current) {
        safeContainer.querySelector(`[data-tile-id="${activeIdRef.current}"]`)?.classList.remove('is-active');
      }
      activeIdRef.current = id ?? null;
      tile.classList.add('is-active');
    }

    function onLeave() {
      ptrRef.current = { x: 0, y: 0 };
      if (activeIdRef.current) {
        safeContainer.querySelector(`[data-tile-id="${activeIdRef.current}"]`)?.classList.remove('is-active');
        activeIdRef.current = null;
      }
    }

    safeContainer.addEventListener('pointermove', onMove as EventListener);
    safeContainer.addEventListener('pointerleave', onLeave);

    return () => {
      cancelAnimationFrame(rafRef.current);
      safeContainer.removeEventListener('pointermove', onMove as EventListener);
      safeContainer.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  const colItems = colItemsRef.current;
  const unit     = TILE_H + GAP;

  return (
    <section className="rb-section partners-section">
      {/* Professional circuit-board background */}
      <div className="partners-bg" aria-hidden="true">
        <svg className="partners-bg-circuit" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="circuitDots" width="46" height="46" patternUnits="userSpaceOnUse">
              <circle cx="23" cy="23" r="1.4" fill="#0d1f3c" opacity="0.14" />
            </pattern>
          </defs>
          <rect width="1200" height="700" fill="url(#circuitDots)" />

          <g fill="none" strokeLinecap="round">
            <path d="M0 120 H160 V60 H340" stroke="#0d1f3c" strokeWidth="1.4" opacity="0.20" />
            <path d="M0 260 H90 V340 H260 V220 H420" stroke="#1A3562" strokeWidth="1.4" opacity="0.18" />
            <path d="M1200 90 H1040 V180 H900" stroke="#0d1f3c" strokeWidth="1.4" opacity="0.20" />
            <path d="M1200 400 H1060 V320 H880 V440 H700" stroke="#12264a" strokeWidth="1.4" opacity="0.16" />
            <path d="M1200 600 H980 V560 H760" stroke="#1A3562" strokeWidth="1.4" opacity="0.18" />
            <path d="M0 560 H140 V620 H320" stroke="#0d1f3c" strokeWidth="1.4" opacity="0.18" />
          </g>

          <g fill="#1A3562" opacity="0.28">
            <circle cx="340" cy="60"  r="3" />
            <circle cx="420" cy="220" r="3" />
            <circle cx="900" cy="180" r="3" />
            <circle cx="700" cy="440" r="3" />
            <circle cx="760" cy="560" r="3" />
            <circle cx="320" cy="620" r="3" />
          </g>
        </svg>
      </div>

      {/* Decorative shapes */}
      <div className="deco-shapes" aria-hidden="true">
        <svg className="cmp-deco cmp-ring-tl" viewBox="0 0 70 70" fill="none">
          <circle cx="35" cy="35" r="30" stroke="#1A3562" strokeWidth="4"/>
          <circle cx="35" cy="35" r="20" stroke="#539AD2" strokeWidth="3" strokeDasharray="4 4"/>
        </svg>
        <svg className="cmp-deco cmp-star-br deco-spin-slow" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L13.5 10.5L22 12L13.5 13.5L12 22L10.5 13.5L2 12L10.5 10.5Z" fill="#539AD2"/>
        </svg>
        <svg className="cmp-deco cmp-wave-tr" viewBox="0 0 80 28" fill="none">
          <path d="M2 8 Q10 2 18 8 Q26 14 34 8 Q42 2 50 8 Q58 14 66 8 Q74 2 78 8" stroke="#2E6DA4" strokeWidth="3.5" strokeLinecap="round"/>
          <path d="M2 20 Q10 14 18 20 Q26 26 34 20 Q42 14 50 20 Q58 26 66 20 Q74 14 78 20" stroke="#539AD2" strokeWidth="3" strokeLinecap="round"/>
        </svg>
      </div>

      <div className="rb-container">
        <div className="partners-layout">

          {/* ── LEFT: DriftWall ── */}
          <div className="drift-wall-outer" aria-label="Partner logos" role="group">
            <div className="drift-wall-outer-glow" aria-hidden="true" />
            <div className="drift-wall" ref={wallRef}>
              <div className="drift-wall__plane" ref={planeRef}>
                {colItems.map((col, c) => {
                  const copyHeight = Math.max(unit, col.length * unit);
                  const totalCopies = Math.max(COPIES, col.length < 4 ? 10 : 5);
                  const allTiles: string[] = [];
                  for (let i = 0; i < totalCopies; i++) col.forEach(img => allTiles.push(img));
                  const colColor = COLUMN_PALETTE[c % COLUMN_PALETTE.length];

                  return (
                    <div
                      key={c}
                      className="drift-wall__col"
                      style={{ ['--col-color' as string]: colColor }}
                    >
                      <div
                        className="drift-wall__track"
                        ref={el => { trackRefs.current[c] = el; }}
                        /* copyHeight kept in data attr so the RAF loop can read it */
                        data-copy-height={copyHeight}
                      >
                        {allTiles.map((img, i) => {
                          const tileId = `${c}-${i}`;
                          return (
                            <div
                              key={tileId}
                              className="drift-wall__tile"
                              data-tile-id={tileId}
                              data-col={c}
                              tabIndex={0}
                              role="img"
                              aria-label="Partner"
                            >
                              <span className="drift-wall__inner">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={`/${img}`}
                                  alt="Partner"
                                  loading="lazy"
                                  decoding="async"
                                  draggable={false}
                                />
                              </span>
                              <span className="drift-wall__overlay" aria-hidden="true" />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── RIGHT: copy block ── */}
          <div
            ref={copyRef}
            className={`partners-copy animate-scroll${copyVisible ? ' visible' : ''}`}
          >
            <span className="section-tag">Our Network</span>
            <h2 className="section-title">
              Our <span className="section-title-wrap">
                <span className="text-gradient">Partners</span>
                <span className="section-title-underline" />
              </span>
            </h2>
            <p className="partners-desc">
              Trusted by leading enterprises across industries — from Fortune 500 companies
              to fast-growing startups. We bring deep expertise and proven methodology to
              every engagement.
            </p>
            <div className="partners-stats">
              <div className="partners-stat">
                <span className="partners-stat-num partners-stat-num--a">
                  <StatNum target={500} suffix="+" />
                </span>
                <span className="partners-stat-label">Projects Delivered</span>
              </div>
              <div className="partners-stat-divider" />
              <div className="partners-stat">
                <span className="partners-stat-num partners-stat-num--b">
                  <StatNum target={29} suffix="+" />
                </span>
                <span className="partners-stat-label">Enterprise Partners</span>
              </div>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}