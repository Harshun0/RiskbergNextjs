'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

/* ─────────────────────────────────────────────
   Blue shade palette — cycles per card
───────────────────────────────────────────── */
const BLUE_PALETTE = [
  { accent: '#539AD2', glow: 'rgba(83,154,210,0.18)',  soft: 'rgba(83,154,210,0.10)'  }, // light blue
  { accent: '#1A3562', glow: 'rgba(26,53,98,0.14)',    soft: 'rgba(26,53,98,0.07)'    }, // navy
  { accent: '#2E6DA4', glow: 'rgba(46,109,164,0.20)',  soft: 'rgba(46,109,164,0.09)'  }, // mid blue
  { accent: '#3D7AB8', glow: 'rgba(61,122,184,0.18)',  soft: 'rgba(61,122,184,0.09)'  }, // steel blue
  { accent: '#0D2547', glow: 'rgba(13,37,71,0.16)',    soft: 'rgba(13,37,71,0.07)'    }, // deep navy
  { accent: '#7BB3E0', glow: 'rgba(123,179,224,0.22)', soft: 'rgba(123,179,224,0.12)' }, // sky blue
];

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */
type ServiceCard = {
  id: string;
  title: string;
  desc: string;
  lottie: string;
  links: { href: string; label: string }[];
};

const services: ServiceCard[] = [
  {
    id: 'cyber',
    title: 'Cybersecurity Advisory Services',
    desc: 'Enhance cyber resilience through security assessments, penetration testing, continuous monitoring, incident readiness, and strategic advisory tailored to evolving threats.',
    lottie: '/icons/doodle-motif-500-fingerprint-circle-hover-pinch.json',
    links: [
      { href: '/services/cybersecurity-advisory-services/vulnerability-assessment-and-penetration-testing-vapt', label: 'Vulnerability Assessment & Penetration Testing (VAPT)' },
      { href: '/services/cybersecurity-advisory-services/source-code-review', label: 'Source Code Review' },
      { href: '/services/cybersecurity-advisory-services/application-and-network-infrastructure-security-assessment', label: 'Application & Network Infrastructure Security Assessment' },
      { href: '/services/cybersecurity-advisory-services/cloud-security', label: 'Cloud Security' },
      { href: '/services/cybersecurity-advisory-services/supply-chain-sc-security-audit', label: 'Supply Chain (SC) Security Audit' },
      { href: '/services/cybersecurity-advisory-services/red-and-blue-teaming', label: 'Red and Blue Teaming' },
      { href: '/services/cybersecurity-advisory-services/cyber-security-maturity-assessment', label: 'Cyber Security Maturity Assessment' },
      { href: '/services/cybersecurity-advisory-services/devsecops', label: 'DevSecOps' },
      { href: '/services/cybersecurity-advisory-services/cyber-risk-management', label: 'Cyber Risk Management' },
      { href: '/services/cybersecurity-advisory-services/ot-security-and-risk-management', label: 'OT Security & Risk Management' },
      { href: '/services/cybersecurity-advisory-services/digital-security-operations-center-soc', label: 'Digital Security Operations Center (SOC)' },
    ],
  },
  {
    id: 'grc',
    title: 'Governance, Risk & Compliance (GRC)',
    desc: 'Strengthen governance, manage enterprise and technology risks, and enhance regulatory readiness through integrated GRC frameworks, controls, and AI governance practices.',
    lottie: '/icons/doodle-motif-478-desktop-hover-pinch.json',
    links: [
      { href: '/services/governance-risk-and-compliance-grc/it-risk-management', label: 'IT Risk Management' },
      { href: '/services/governance-risk-and-compliance-grc/ssae18-soc-1-soc-2-soc-3', label: 'SSAE18 SOC 1 / SOC 2 / SOC 3' },
      { href: '/services/governance-risk-and-compliance-grc/pci-dss', label: 'PCI DSS' },
      { href: '/services/governance-risk-and-compliance-grc/it-is-audits-and-privacy-audits', label: 'IT/IS Audits & Privacy Audits' },
      { href: '/services/governance-risk-and-compliance-grc/business-continuity-disaster-recovery-dr-plan', label: 'Business Continuity / Disaster Recovery (DR) Plan' },
      { href: '/services/governance-risk-and-compliance-grc/ai-security-and-risk-framework', label: 'AI Security & Risk Framework' },
      { href: '/services/governance-risk-and-compliance-grc/nist-and-cis-frameworks', label: 'NIST & CIS Frameworks' },
      { href: '/services/governance-risk-and-compliance-grc/third-party-risk-management', label: 'Third Party Risk Management' },
      { href: '/services/governance-risk-and-compliance-grc/enterprise-risk-management', label: 'Enterprise Risk Management' },
      { href: '/services/governance-risk-and-compliance-grc/virtual-ciso-services', label: 'Virtual CISO Services' },
      { href: '/services/governance-risk-and-compliance-grc/environmental-social-and-governance-esg', label: 'Environmental, Social & Governance (ESG)' },
      { href: '/services/governance-risk-and-compliance-grc/erp-security-risk-and-controls', label: 'ERP Security Risk & Controls' },
    ],
  },
  {
    id: 'regulatory',
    title: 'Regulatory Compliance Services',
    desc: 'Navigate evolving regulatory requirements with structured compliance assessments, gap analysis, remediation support, and independent assurance aligned with global standards.',
    lottie: '/icons/doodle-motif-946-lock-dollar-hover-pinch.json',
    links: [
      { href: '/services/regulatory-compliance-services/it-and-cyber-regulatory-compliance', label: 'IT & Cyber Regulatory Compliance' },
      { href: '/services/regulatory-compliance-services/cert-in-compliance', label: 'CERT-In Compliance' },
      { href: '/services/regulatory-compliance-services/dpdp', label: 'DPDP' },
      { href: '/services/regulatory-compliance-services/gdpr', label: 'GDPR' },
      { href: '/services/regulatory-compliance-services/ccpa-compliance', label: 'CCPA Compliance' },
      { href: '/services/regulatory-compliance-services/rbi-and-irdai-audit-and-assurance', label: 'RBI & IRDAI Audit & Assurance' },
      { href: '/services/regulatory-compliance-services/sebi-compliance', label: 'SEBI Compliance' },
      { href: '/services/regulatory-compliance-services/hipaa-compliance', label: 'HIPAA Compliance' },
      { href: '/services/regulatory-compliance-services/sox-sarbanes-oxley-act-compliance', label: 'SOX (Sarbanes-Oxley Act) Compliance' },
    ],
  },
  {
    id: 'cert',
    title: 'Certification Support Services',
    desc: 'Achieve certification readiness through end-to-end implementation, control optimization, documentation, and audit support for globally recognised standards and frameworks.',
    lottie: '/icons/doodle-motif-27-globe-hover-rotate.json',
    links: [
      { href: '/services/certification-support-services/iso-27001', label: 'ISO 27001' },
      { href: '/services/certification-support-services/iso-27701', label: 'ISO 27701' },
      { href: '/services/certification-support-services/iso-42001', label: 'ISO 42001' },
      { href: '/services/certification-support-services/iso-9001', label: 'ISO 9001' },
      { href: '/services/certification-support-services/iso-22301', label: 'ISO 22301' },
      { href: '/services/certification-support-services/tisax', label: 'TISAX' },
      { href: '/services/certification-support-services/hitrust', label: 'HITRUST' },
      { href: '/services/certification-support-services/cmmi-l3-and-l5', label: 'CMMI L3 & L5' },
      { href: '/services/certification-support-services/isa-iec-62443', label: 'ISA/IEC 62443' },
    ],
  },
  {
    id: 'software',
    title: 'Security Software Solutions',
    desc: 'Deploy intelligent security technologies that improve visibility, automate risk management, strengthen controls, and protect critical business assets across digital environments.',
    lottie: '/icons/ss.json',
    links: [
      { href: '/services/security-software-solutions/endpoint-security-edr-xdr', label: 'Endpoint Security, EDR/XDR' },
      { href: '/services/security-software-solutions/iam-and-pam', label: 'IAM & PAM' },
      { href: '/services/security-software-solutions/siem-soar', label: 'SIEM / SOAR' },
      { href: '/services/security-software-solutions/data-loss-prevention-dlp', label: 'Data Loss Prevention (DLP)' },
      { href: '/services/security-software-solutions/web-application-firewall-waf', label: 'Web Application Firewall (WAF)' },
      { href: '/services/security-software-solutions/firewalls', label: 'Firewalls' },
      { href: '/services/security-software-solutions/ddos-protection', label: 'DDoS Protection' },
      { href: '/services/security-software-solutions/email-security-phishing-solutions', label: 'Email Security / Phishing Solutions' },
    ],
  },
  {
    id: 'specialized',
    title: 'Specialized Services & Training',
    desc: 'Build organisational capability through specialised advisory, AI governance, cybersecurity awareness, and role-based training programs tailored to business and regulatory needs.',
    lottie: '/icons/specialised.json',
    links: [
      { href: '/services/specialized-services/cybersecurity-training-services', label: 'Cybersecurity Training Services' },
      { href: '/services/specialized-services/incident-response', label: 'Incident Response' },
      { href: '/services/specialized-services/breach-attack-simulation-bas', label: 'Breach Attack Simulation (BAS)' },
      { href: '/services/specialized-services/cyber-forensics', label: 'Cyber Forensics' },
    ],
  },
];

/* ─────────────────────────────────────────────
   Small geometric accent (top-right of each card)
   — clean, technical, NOT hand-drawn
───────────────────────────────────────────── */
function CardMotif({ color }: { color: string }) {
  return (
    <svg className="card-motif" viewBox="0 0 64 48" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="2.5" fill={color} opacity="0.55" />
      <circle cx="18" cy="8" r="2.5" fill={color} opacity="0.3" />
      <circle cx="28" cy="8" r="2.5" fill={color} opacity="0.15" />
      <line x1="0" y1="20" x2="40" y2="20" stroke={color} strokeWidth="1.5" opacity="0.18" />
      <line x1="0" y1="25" x2="28" y2="25" stroke={color} strokeWidth="1.5" opacity="0.12" />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Single flip card
───────────────────────────────────────────── */
function FlipCard({ svc, palette }: { svc: ServiceCard; palette: typeof BLUE_PALETTE[number] }) {
  const [flipped, setFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={cardRef} className={`flip-card${flipped ? ' is-flipped' : ''}`}>
      <div className="flip-card-inner">
        {/* ── Front ── */}
        <div className="flip-card-front">
          <div className="flip-card-glow" style={{ background: palette.glow }} />
          <div className="flip-card-accent-bar" style={{ background: `linear-gradient(90deg, ${palette.accent}, transparent)` }} />
          <CardMotif color={palette.accent} />

          <div className="flip-card-header">
            <div className="flip-icon" style={{ background: palette.soft }}>
              {/* @ts-expect-error custom element */}
              <dotlottie-player src={svc.lottie} autoplay loop style={{ width: '100%', height: '100%' }} />
            </div>

            <div className="flip-title-wrap">
              <h3 className="flip-title">{svc.title}</h3>
              <span className="flip-title-underline" style={{ background: palette.accent }} />
            </div>
          </div>

          <p className="flip-desc">{svc.desc}</p>

          <button
            className="flip-trigger"
            style={{ borderColor: `${palette.accent}88`, background: palette.soft, ['--trigger-hover' as string]: palette.accent }}
            onClick={() => setFlipped(true)}
            aria-expanded={flipped}
          >
            <span>View All Services</span>
            <svg viewBox="0 0 24 24">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
          </button>
        </div>

        {/* ── Back ── */}
        <div
          className="flip-card-back"
          style={{
            background: `radial-gradient(130% 85% at 100% 0%, ${palette.accent}45 0%, transparent 55%),
                         radial-gradient(110% 75% at 0% 100%, ${palette.accent}55 0%, transparent 50%),
                         linear-gradient(155deg, #1E3E75 0%, #1A3562 48%, #12234A 100%)`,
          }}
        >
          <div className="flip-back-header">
            <h4 className="flip-back-title">{svc.title}</h4>
            <button className="flip-close" onClick={() => setFlipped(false)} aria-label="Close">
              <svg viewBox="0 0 24 24">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </button>
          </div>
          <ul className="flip-sub-list">
            {svc.links.map(l => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Section
───────────────────────────────────────────── */
export default function Services() {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('visible'); obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="rb-section services-section" id="services">
      {/* decorative shapes */}
      <div className="deco-shapes" aria-hidden="true">
        <svg className="svc-deco svc-star-tl deco-spin-slow" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L13.5 10.5L22 12L13.5 13.5L12 22L10.5 13.5L2 12L10.5 10.5Z" fill="#539AD2" />
        </svg>
        <svg className="svc-deco svc-burst-tr deco-spin-xslow" viewBox="0 0 44 44" fill="none">
          <path d="M22 2L24.5 18L38 8L28 20L44 22L28 24L38 36L24.5 26L22 42L19.5 26L6 36L16 24L0 22L16 20L6 8L19.5 18Z" fill="#1A3562" />
        </svg>
        <svg className="svc-deco svc-ring-bl" viewBox="0 0 56 56" fill="none">
          <circle cx="28" cy="28" r="24" stroke="#2E6DA4" strokeWidth="2.5" />
        </svg>
        <svg className="svc-deco svc-dot-mr deco-float" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="4" fill="#7BB3E0" opacity="0.6" />
          <circle cx="32" cy="10" r="2.5" fill="#539AD2" opacity="0.5" />
        </svg>
      </div>

      {/* Cybersecurity icon background */}
      <div className="svc-cyber-bg" aria-hidden="true">
        <svg className="svc-cyber-icon sci-shield-1" viewBox="0 0 48 48" fill="none">
          <path d="M24 4L8 11v11c0 11 6.8 18.6 16 21 9.2-2.4 16-10 16-21V11L24 4z" stroke="#1A3562" strokeWidth="3.5"/>
          <path d="M17 24l5 5 10-11" stroke="#539AD2" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <svg className="svc-cyber-icon sci-lock-1" viewBox="0 0 40 40" fill="none">
          <rect x="9" y="18" width="22" height="16" rx="3" stroke="#539AD2" strokeWidth="3.5"/>
          <path d="M14 18v-5a6 6 0 0112 0v5" stroke="#2E6DA4" strokeWidth="3.5"/>
          <circle cx="20" cy="26" r="3" fill="#1A3562"/>
        </svg>
        <svg className="svc-cyber-icon sci-node-1" viewBox="0 0 100 60" fill="none">
          <circle cx="12" cy="12" r="6" fill="#539AD2"/>
          <circle cx="50" cy="30" r="7" fill="#1A3562"/>
          <circle cx="88" cy="10" r="6" fill="#2E6DA4"/>
          <circle cx="70" cy="50" r="5" fill="#539AD2"/>
          <path d="M12 12L50 30L88 10M50 30L70 50" stroke="#1A3562" strokeWidth="2.5" opacity="0.9"/>
        </svg>
        <svg className="svc-cyber-icon sci-hex-1" viewBox="0 0 40 46" fill="none">
          <path d="M20 2 L37 12 V34 L20 44 L3 34 V12 Z" stroke="#2E6DA4" strokeWidth="3"/>
          <path d="M20 14 L28 19 V29 L20 34 L12 29 V19 Z" stroke="#539AD2" strokeWidth="2.5"/>
        </svg>
        <svg className="svc-cyber-icon sci-binary-1" viewBox="0 0 90 30" fill="none">
          <text x="0" y="14" fill="#1A3562" fontSize="13" fontFamily="monospace" letterSpacing="2" fontWeight="700">01001</text>
          <text x="0" y="28" fill="#539AD2" fontSize="13" fontFamily="monospace" letterSpacing="2" fontWeight="700">11010</text>
        </svg>
        <svg className="svc-cyber-icon sci-fingerprint-1" viewBox="0 0 40 40" fill="none">
          <path d="M20 8c-6.6 0-12 5.4-12 12v6" stroke="#539AD2" strokeWidth="3" strokeLinecap="round"/>
          <path d="M20 12c-4.4 0-8 3.6-8 8v6" stroke="#1A3562" strokeWidth="3" strokeLinecap="round"/>
          <path d="M20 16c-2.2 0-4 1.8-4 4v8" stroke="#2E6DA4" strokeWidth="3" strokeLinecap="round"/>
          <path d="M20 8c6.6 0 12 5.4 12 12v3" stroke="#539AD2" strokeWidth="3" strokeLinecap="round"/>
          <path d="M20 12c4.4 0 8 3.6 8 8v4" stroke="#1A3562" strokeWidth="3" strokeLinecap="round"/>
        </svg>
        <svg className="svc-cyber-icon sci-shield-2" viewBox="0 0 48 48" fill="none">
          <path d="M24 4L8 11v11c0 11 6.8 18.6 16 21 9.2-2.4 16-10 16-21V11L24 4z" stroke="#2E6DA4" strokeWidth="3.5"/>
        </svg>
        <svg className="svc-cyber-icon sci-node-2" viewBox="0 0 100 60" fill="none">
          <circle cx="10" cy="30" r="5.5" fill="#2E6DA4"/>
          <circle cx="45" cy="10" r="6" fill="#539AD2"/>
          <circle cx="80" cy="35" r="6.5" fill="#1A3562"/>
          <path d="M10 30L45 10L80 35" stroke="#539AD2" strokeWidth="2.5" opacity="0.9"/>
        </svg>
      </div>

      <div className="rb-container">
        {/* Header */}
        <div ref={headerRef} className="section-header animate-scroll">
          <span className="section-tag">Our Expertise</span>
          <h2 className="section-title">
            Integrated Risk &amp; <br />
            <span className="section-title-wrap">
              <span className="text-gradient">Cybersecurity Solutions</span>
              <span className="section-title-underline" />
            </span>
          </h2>
          <p className="section-description">
            We offer end-to-end risk management and cybersecurity services tailored to your business needs,
            powered by certified professionals and our proprietary IDDEI frameworks.
          </p>
        </div>

        {/* Cards grid */}
        <div className="flip-services-grid">
          {services.map((svc, i) => (
            <FlipCard key={svc.id} svc={svc} palette={BLUE_PALETTE[i % BLUE_PALETTE.length]} />
          ))}
        </div>
      </div>
    </section>
  );
}