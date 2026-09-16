'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

/* ─────────────────────────────────────────────
   Logo data
───────────────────────────────────────────── */
const logos = [
  { src: '/Clientlogos/PhonePe-Logo.wine-removebg-preview.png', alt: 'PhonePe',        lg: true  },
  { src: '/Clientlogos/23a1569f-8841-43bc-aecd-a146183a58b6.png', alt: 'Jindal Stainless' },
  { src: '/Clientlogos/36ae3649-2802-4fa4-851d-53dee10af0da.png', alt: 'Tata'           },
  { src: '/Clientlogos/39d9f08c-2cf0-4b05-b316-d24c42901e04.png', alt: 'Cisco',         lg: true  },
  { src: '/Clientlogos/hero-removebg-preview.png',               alt: 'Hero Motors'    },
  { src: '/Clientlogos/749299aa-d932-494c-8f26-cc346ea4fcf6.png', alt: 'NPS Trust'      },
  { src: '/Clientlogos/7d2aa3fc-17f7-46b8-b5a2-f56c2dc620d8.png', alt: 'Sinch'         },
  { src: '/Clientlogos/8472b39f-b680-4134-bad8-0fd26f0863a0.png', alt: 'Evalueserve'   },
  { src: '/Clientlogos/94f9bb65-3846-40ea-a900-c597af7dac8d.png', alt: 'Jio'           },
  { src: '/Clientlogos/sk-removebg-preview.png',                 alt: 'SK Finance',    lg: true  },
  { src: '/Clientlogos/fa1bf2b1-4abb-480b-bbfb-76f7c94c3d57.png', alt: 'Cigna Healthcare' },
];

/* ─────────────────────────────────────────────
   Component
───────────────────────────────────────────── */
export default function TrustBar() {
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef   = useRef<number>(0);
  const posRef   = useRef(0);
  // pixels per second — matches the original data-speed="80"
  const SPEED    = 80;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // We duplicate the list once inside the track (done in JSX).
    // When half the track has scrolled past, reset seamlessly.
    let lastTime = performance.now();

    function step(now: number) {
      const dt = (now - lastTime) / 1000; // seconds
      lastTime = now;

      // half-width = width of one copy of the list
      const halfW = track!.scrollWidth / 2;
      posRef.current += SPEED * dt;
      if (posRef.current >= halfW) posRef.current -= halfW;

      track!.style.transform = `translateX(-${posRef.current}px)`;
      rafRef.current = requestAnimationFrame(step);
    }

    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  /* Pause on hover */
  function pause() { cancelAnimationFrame(rafRef.current); }
  function resume() {
    const track = trackRef.current;
    if (!track) return;
    let lastTime = performance.now();
    function step(now: number) {
      const dt = (now - lastTime) / 1000;
      lastTime = now;
      const halfW = track!.scrollWidth / 2;
      posRef.current += SPEED * dt;
      if (posRef.current >= halfW) posRef.current -= halfW;
      track!.style.transform = `translateX(-${posRef.current}px)`;
      rafRef.current = requestAnimationFrame(step);
    }
    rafRef.current = requestAnimationFrame(step);
  }

  const logoList = (
    <ul className="logoloop-list" aria-hidden="true">
      {logos.map((logo, i) => (
        <li key={i} className="logoloop-item">
          <span className={`logoloop-logo${logo.lg ? ' logoloop-logo--lg' : ''}`}>
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.lg ? 260 : 160}
              height={logo.lg ? 100 : 60}
              style={{ objectFit: 'contain', width: 'auto', height: logo.lg ? '100px' : '60px' }}
              unoptimized
            />
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <section className="trust-bar-section">
      <div className="trust-bar-container">
        <div className="trust-bar-flex">

          {/* ── Left label block ── */}
          <div className="trust-bar-partners">
            <span className="trust-bar-title">Our Network</span>
            <span className="trust-bar-eyebrow">
              Trusted by leading<br />enterprises across<br />industries
            </span>
          </div>

          {/* ── Infinite scroll loop ── */}
          <div
            className="logoloop"
            onMouseEnter={pause}
            onMouseLeave={resume}
            onFocus={pause}
            onBlur={resume}
          >
            {/* Edge fade overlays */}
            <div className="logoloop-fade logoloop-fade-left"  aria-hidden="true" />
            <div className="logoloop-fade logoloop-fade-right" aria-hidden="true" />

            {/* Track — rendered twice for seamless loop */}
            <div className="logoloop-track" ref={trackRef}>
              {logoList}
              {/* Duplicate for seamless wrap */}
              {logoList}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
