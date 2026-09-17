'use client';

import { useEffect, useRef } from 'react';
import CircularGallery, { GalleryItem } from './CircularGallery';

const GALLERY_ITEMS: GalleryItem[] = [
  {
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
    text: 'Technology Partners',
  },
  {
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
    text: 'Cloud Providers',
  },
  {
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80',
    text: 'Security Vendors',
  },
  {
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80',
    text: 'Compliance Bodies',
  },
  {
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80',
    text: 'Industry Associations',
  },
  {
    image: 'https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?w=800&q=80',
    text: 'Research Partners',
  },
  {
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80',
    text: 'Training Partners',
  },
  {
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',
    text: 'Audit Firms',
  },
];

const CATEGORIES = [
  'Technology Partners',
  'Cloud Providers',
  'Security Vendors',
  'Compliance Bodies',
  'Industry Associations',
  'Research Partners',
  'Training Partners',
  'Audit Firms',
];

export default function AboutPartners() {
  const sectionRef = useRef<HTMLElement>(null);

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

  return (
    <section ref={sectionRef} className="rb-section abp-section">
      {/* White background — same glow wash as Industries */}
      <div className="ind-glow-wash" aria-hidden="true">
        <div className="ind-glow-blob ind-glow-blob-1" />
        <div className="ind-glow-blob ind-glow-blob-2" />
      </div>

      {/* Cybersecurity icon background — same SVGs as Industries */}
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

      {/* Deco shapes */}
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
        {/* Section header */}
        <div className="section-header animate-scroll">
          <span className="section-tag">Ecosystem</span>
          <h2 className="section-title">
            Our{' '}
            <span className="section-title-wrap">
              <span className="text-gradient">Partners &amp; Alliances</span>
              <span className="section-title-underline" />
            </span>
          </h2>
          <p className="section-description">
            We collaborate with leading technology vendors, industry associations, and
            regulatory bodies to deliver comprehensive, integrated solutions to our clients.
          </p>
        </div>

        {/* Category pills */}
        <div className="abp-categories animate-scroll">
          {CATEGORIES.map(cat => (
            <span key={cat} className="abp-cat-pill">{cat}</span>
          ))}
        </div>

        {/* Circular Gallery canvas */}
        <div className="abp-gallery-wrap animate-scroll">
          <CircularGallery
            items={GALLERY_ITEMS}
            bend={2}
            textColor="#1A3562"
            borderRadius={0.05}
            font="bold 28px Figtree"
            scrollSpeed={2}
            scrollEase={0.05}
          />
        </div>
      </div>
    </section>
  );
}