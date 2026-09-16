'use client';

import { useEffect, useRef } from 'react';

/* ─────────────────────────────────────────────
   Blue shade palette — cycles per node
───────────────────────────────────────────── */
const NODE_PALETTE = [
  '#539AD2', // light blue
  '#7BB3E0', // sky blue
  '#FFFFFF', // white (center/large node — stands out)
  '#3D7AB8', // steel blue
  '#A9CBEA', // pale blue
];

/* ─────────────────────────────────────────────
   Node data
───────────────────────────────────────────── */
const nodes = [
  {
    id: 0, x: 90,  label: 'Identify',     step: '01', letter: 'I',
    title: 'Identify',
    body: 'We begin by identifying your risk landscape — mapping assets, processes, and threat vectors to establish a clear baseline of your security and compliance posture.',
  },
  {
    id: 1, x: 252, label: 'Demystify',    step: '02', letter: 'D',
    title: 'Demystify',
    body: 'Complex regulations and technical requirements are translated into clear, actionable insights — making it easy for leadership and technical teams to align on priorities.',
  },
  {
    id: 2, x: 414, label: 'Design & Dev', step: '03', letter: 'D', large: true,
    title: 'Design & Develop',
    body: 'Tailored frameworks, policies, and technical architectures are designed and developed to fit your business context — not generic templates, but purpose-built solutions.',
  },
  {
    id: 3, x: 576, label: 'Execute',      step: '04', letter: 'E',
    title: 'Execute',
    body: 'End-to-end implementation, audit support, and certification readiness — we stay with you through deployment, testing, and the final mile to ensure lasting outcomes.',
  },
  {
    id: 4, x: 738, label: 'Improve',      step: '05', letter: 'I',
    title: 'Improve',
    body: 'We deliver targeted remediation and controls optimisation — closing identified gaps and lifting your overall security maturity in a structured, measurable way.',
  },
];

const traces = [
  { d: 'M 128 100 H 214', mid: 171 },
  { d: 'M 290 100 H 376', mid: 333 },
  { d: 'M 452 100 H 538', mid: 495 },
  { d: 'M 620 100 H 700', mid: 660 },
];

export default function IDDEIFramework() {
  const sectionRef = useRef<HTMLElement>(null);
  const descInnerRef = useRef<HTMLDivElement>(null);
  const activeNode = useRef<number | null>(null);

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

  /* Pulse animation on traces */
  useEffect(() => {
    const pulses = document.querySelectorAll<SVGPathElement>('.cb-pulse');
    const afs: number[] = [];

    pulses.forEach((path, i) => {
      const len = path.getTotalLength ? path.getTotalLength() : 86;
      path.style.strokeDasharray = `${len}`;
      path.style.strokeDashoffset = `${len}`;

      const delay = i * 500;
      const duration = 900;

      function animate(startTime: number) {
        function frame(now: number) {
          const elapsed = (now - startTime - delay) % (duration + 600);
          if (elapsed < 0) { afs[i] = requestAnimationFrame(frame); return; }
          const t = Math.min(elapsed / duration, 1);
          path.style.strokeDashoffset = `${len * (1 - t)}`;
          if (t < 1) { afs[i] = requestAnimationFrame(frame); }
          else { setTimeout(() => { afs[i] = requestAnimationFrame(ts => animate(ts)); }, 600); }
        }
        afs[i] = requestAnimationFrame(frame);
      }
      afs[i] = requestAnimationFrame(ts => animate(ts));
    });

    return () => afs.forEach(cancelAnimationFrame);
  }, []);

  function showNode(id: number) {
    if (activeNode.current === id) return;
    activeNode.current = id;
    const inner = descInnerRef.current;
    if (!inner) return;
    const node = nodes[id];
    inner.classList.add('is-transitioning');
    setTimeout(() => {
      inner.innerHTML = `
        <div class="cb-desc-content">
          <div class="cb-desc-badge" style="border-color:${NODE_PALETTE[id]}66;color:${NODE_PALETTE[id]}">${node.step}</div>
          <div class="cb-desc-text">
            <h4>${node.title}</h4>
            <p>${node.body}</p>
          </div>
        </div>`;
      inner.classList.remove('is-transitioning');
    }, 200);

    // update SVG node highlights
    document.querySelectorAll('.cb-node').forEach(n => n.classList.remove('is-active'));
    document.querySelector(`.cb-node[data-node="${id}"]`)?.classList.add('is-active');
  }

  function clearNode() {
    const inner = descInnerRef.current;
    if (!inner) return;
    activeNode.current = null;
    inner.classList.add('is-transitioning');
    setTimeout(() => {
      inner.innerHTML = `<span class="cb-desc-hint">Hover any node to explore the framework</span>`;
      inner.classList.remove('is-transitioning');
    }, 200);
    document.querySelectorAll('.cb-node').forEach(n => n.classList.remove('is-active'));
  }

  return (
    <section ref={sectionRef} className="rb-section framework-section" id="framework">
      {/* deco shapes */}
      <div className="deco-shapes" aria-hidden="true">
        <svg className="fw-deco fw-blob-tl" viewBox="0 0 200 200" fill="none">
          <path d="M44,-58C56,-48,64,-34,68,-18C72,-2,72,16,65,30C58,44,44,54,29,60C14,66,-2,68,-18,64C-34,60,-50,50,-60,36C-70,22,-74,4,-70,-12C-66,-28,-54,-42,-40,-52C-26,-62,-8,-68,8,-68C24,-68,32,-68,44,-58Z" transform="translate(100 100)" fill="#1A3562" />
        </svg>
        <svg className="fw-deco fw-star-tr deco-spin-slow-rev" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L13.5 10.5L22 12L13.5 13.5L12 22L10.5 13.5L2 12L10.5 10.5Z" fill="#2E6DA4" />
        </svg>
      </div>

      <div className="rb-container">
        <div className="section-header animate-scroll">
          <span className="section-tag">Our Approach</span>
          <h2 className="section-title">
            The RiskBerg <span className="section-title-wrap">
              <span className="text-gradient">IDDEI Framework</span>
              <span className="section-title-underline" />
            </span>
          </h2>
          <p className="section-description">
            A proprietary methodology that aligns risk, compliance, and cybersecurity initiatives
            with business objectives and resilience goals.
          </p>
        </div>

        {/* ── Unified dark-navy curved shell ── */}
        <div className="cb-shell animate-scroll">
          <div className="cb-shell-glow cb-shell-glow-1" />
          <div className="cb-shell-glow cb-shell-glow-2" />

          <div className="cb-board">
            <svg className="cb-svg" viewBox="0 0 800 200" preserveAspectRatio="xMidYMid meet">
              <defs>
                <pattern id="cbGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="10" cy="10" r="0.8" fill="rgba(83,154,210,0.16)" />
                </pattern>
                <filter id="cbGlow" x="-60%" y="-60%" width="220%" height="220%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>
              <rect width="800" height="200" fill="url(#cbGrid)" rx="18" opacity="0.5" />

              {/* Step numbers */}
              {nodes.map(n => (
                <text key={n.id} x={n.x} y="28" className="cb-step-num">{n.step}</text>
              ))}

              {/* Traces */}
              {traces.map((t, i) => (
                <path key={i} className="cb-trace" d={t.d} />
              ))}

              {/* Solder dots */}
              {traces.map((t, i) => (
                <circle key={i} className="cb-dot" cx={t.mid} cy="100" r="3" />
              ))}

              {/* Pulse paths */}
              {traces.map((t, i) => (
                <path key={i} className="cb-pulse" data-pulse={i} d={t.d} />
              ))}

              {/* Nodes */}
              {nodes.map(n => {
                const size = n.large ? 44 : 38;
                const rx = n.large ? 16 : 14;
                const labelY = n.large ? 58 : 52;
                const color = NODE_PALETTE[n.id % NODE_PALETTE.length];
                return (
                  <g
                    key={n.id}
                    className={`cb-node${n.id === 2 ? ' cb-node--processing' : ''}${n.large ? ' cb-node--lg' : ''}`}
                    data-node={n.id}
                    transform={`translate(${n.x},100)`}
                    style={{ ['--node-color' as string]: color }}
                    tabIndex={0}
                    role="button"
                    aria-label={n.title}
                    onMouseEnter={() => showNode(n.id)}
                    onFocus={() => showNode(n.id)}
                    onMouseLeave={clearNode}
                    onBlur={clearNode}
                    onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') showNode(n.id); }}
                  >
                    <rect className="cb-node-bg"     x={-size} y={-size} width={size * 2} height={size * 2} rx={rx} />
                    <rect className="cb-node-border"  x={-size} y={-size} width={size * 2} height={size * 2} rx={rx} />
                    <rect className="cb-node-glow"    x={-size} y={-size} width={size * 2} height={size * 2} rx={rx} />
                    <text className="cb-node-letter" y="8" dominantBaseline="middle" textAnchor="middle">{n.letter}</text>
                    <text className="cb-node-label" y={labelY}>{n.label}</text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="cb-shell-divider" />

          <div className="cb-desc-panel" aria-live="polite">
            <div className="cb-desc-inner" ref={descInnerRef}>
              <span className="cb-desc-hint">Hover any node to explore the framework</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}