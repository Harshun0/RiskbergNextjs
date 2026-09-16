'use client';

import { useEffect, useRef, useState } from 'react';

export default function Preloader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [count, setCount] = useState(0);
  const [barWidth, setBarWidth] = useState(0);
  const [phase, setPhase] = useState<'visible' | 'exiting' | 'gone'>('visible');

  /* ── particle canvas ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let W = 0, H = 0;
    let raf: number;

    type Particle = { x: number; y: number; r: number; vx: number; vy: number; alpha: number; color: string };
    let particles: Particle[] = [];

    function rand(a: number, b: number) { return a + Math.random() * (b - a); }

    function resize() {
      W = canvas!.width = window.innerWidth;
      H = canvas!.height = window.innerHeight;
    }

    window.addEventListener('resize', resize);
    resize();

    for (let i = 0; i < 55; i++) {
      particles.push({
        x: rand(0, W), y: rand(0, H),
        r: rand(1, 3.2),
        vx: rand(-0.25, 0.25), vy: rand(-0.4, -0.1),
        alpha: rand(0.15, 0.7),
        color: Math.random() > 0.5 ? '83,154,210' : '26,53,98',
      });
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
        ctx.fill();
        p.x += p.vx; p.y += p.vy;
        if (p.y < -10) { p.y = H + 5; p.x = rand(0, W); }
        if (p.x < -10) p.x = W + 5;
        if (p.x > W + 10) p.x = -5;
      });
      raf = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  /* ── counter + bar ── */
  useEffect(() => {
    const steps = [
      { pct: 30, dur: 600 },
      { pct: 60, dur: 700 },
      { pct: 85, dur: 500 },
      { pct: 100, dur: 400 },
    ];
    let stepIdx = 0;
    let current = 0;
    let cancelled = false;
    let stepRaf: number;

    function runStep() {
      if (cancelled) return;
      if (stepIdx >= steps.length) return finish();
      const s = steps[stepIdx++];
      const from = current;
      const to = s.pct;
      const start = performance.now();

      function tick(now: number) {
        if (cancelled) return;
        const t = Math.min((now - start) / s.dur, 1);
        const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        const val = Math.round(from + (to - from) * ease);
        setCount(val);
        setBarWidth(val);
        if (t < 1) {
          stepRaf = requestAnimationFrame(tick);
        } else {
          current = to;
          setTimeout(runStep, 80);
        }
      }
      stepRaf = requestAnimationFrame(tick);
    }

    function finish() {
      if (cancelled) return;
      setPhase('exiting');
      setTimeout(() => {
        if (!cancelled) setPhase('gone');
      }, 950);
    }

    const initTimer = setTimeout(runStep, 200);
    const safetyTimer = setTimeout(finish, 5000);

    // also finish on window load
    function onLoad() { finish(); }
    window.addEventListener('load', onLoad);

    return () => {
      cancelled = true;
      clearTimeout(initTimer);
      clearTimeout(safetyTimer);
      cancelAnimationFrame(stepRaf);
      window.removeEventListener('load', onLoad);
    };
  }, []);

  if (phase === 'gone') return null;

  const isExiting = phase === 'exiting';

  return (
    <div
      id="preloader"
      className={`preloader-root${isExiting ? ' exiting' : ''}`}
    >
      {/* scan-line + vignette are handled via ::before / ::after in CSS */}

      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />


      {/* Centre content */}
      <div className={`loader-center${isExiting ? ' exiting-child' : ''}`}>
        {/* Logo */}
        <img
          src="/logoriskberg.png"
          alt="RiskBerg"
          className="loader-logo"
        />

        {/* Counter */}
        <div className="loader-count-wrap">
          <span className="loader-count">{count}</span>
          <span className="loader-pct">%</span>
        </div>

        {/* Tagline */}
        <div className="loader-tagline">SECURING YOUR FUTURE</div>

        {/* Progress bar */}
        <div className="loader-bar-wrap">
          <div
            className="loader-bar-fill"
            style={{ width: `${barWidth}%` }}
          />
          <div
            className="loader-bar-glow"
            style={{ left: `${Math.max(0, barWidth - 1)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
