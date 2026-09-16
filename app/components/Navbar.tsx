'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */

const aboutLinks = [
  { href: '/about', label: 'Our Story' },
  { href: '/about#leadership', label: 'Leadership' },
  { href: '/about#team', label: 'Our Team' },
  { href: '/about#partners', label: 'Partners' },
];

type SubService = { href: string; label: string };
type ServiceCategory = {
  id: string;
  href: string;
  label: string;
  icon: React.ReactNode;
  subServices: SubService[];
};

const serviceCategories: ServiceCategory[] = [
  {
    id: 'cyber',
    href: '/services#cybersecurity-advisory-services',
    label: 'Cybersecurity Advisory Services',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <path d="M12 2L20 6V12C20 17 16.5 20.5 12 22C7.5 20.5 4 17 4 12V6L12 2Z" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
    subServices: [
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
    href: '/services#governance-risk-and-compliance-grc',
    label: 'Governance, Risk & Compliance (GRC)',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M8 9H16M8 13H13" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
    subServices: [
      { href: '/services/governance-risk-and-compliance-grc/it-risk-management', label: 'IT Risk Management' },
      { href: '/services/governance-risk-and-compliance-grc/ssae18-soc-1-soc-2-soc-3', label: 'SSAE18 SOC 1 / SOC 2 / SOC 3' },
      { href: '/services/governance-risk-and-compliance-grc/pci-dss', label: 'PCI DSS' },
      { href: '/services/governance-risk-and-compliance-grc/it-is-audits-and-privacy-audits', label: 'IT/IS Audits & Privacy Audits' },
      { href: '/services/governance-risk-and-compliance-grc/business-continuity-disaster-recovery-dr-plan', label: 'Business Continuity / Disaster Recovery (DR) Plan' },
      { href: '/services/governance-risk-and-compliance-grc/ai-security-and-risk-framework', label: 'AI Security & Risk Framework' },
      { href: '/services/governance-risk-and-compliance-grc/nist-and-cis-frameworks', label: 'NIST & CIS Frameworks' },
      { href: '/services/governance-risk-and-compliance-grc/third-party-risk-management', label: 'Third Party Risk Management' },
      { href: '/services/governance-risk-and-compliance-grc/enterprise-risk-management', label: 'Enterprise Risk Management' },
      { href: '/services/governance-risk-and-compliance-grc/operational-risk-management-framework', label: 'Operational Risk Management Framework' },
      { href: '/services/governance-risk-and-compliance-grc/business-continuity-and-resilience', label: 'Business Continuity and Resilience' },
      { href: '/services/governance-risk-and-compliance-grc/virtual-ciso-services', label: 'Virtual CISO Services' },
      { href: '/services/governance-risk-and-compliance-grc/environmental-social-and-governance-esg', label: 'Environmental, Social, and Governance (ESG)' },
      { href: '/services/governance-risk-and-compliance-grc/erp-security-risk-and-controls', label: 'ERP Security Risk & Controls' },
    ],
  },
  {
    id: 'regulatory',
    href: '/services#regulatory-compliance-services',
    label: 'Regulatory Compliance Services',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <path d="M12 2L21 6V11C21 16.5 17.4 20.7 12 22C6.6 20.7 3 16.5 3 11V6L12 2Z" stroke="currentColor" strokeWidth="1.6" />
        <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
    subServices: [
      { href: '/services/regulatory-compliance-services/it-and-cyber-regulatory-compliance', label: 'IT & Cyber Regulatory Compliance' },
      { href: '/services/regulatory-compliance-services/cert-in-compliance', label: 'CERT-In Compliance' },
      { href: '/services/regulatory-compliance-services/dpdp', label: 'DPDP' },
      { href: '/services/regulatory-compliance-services/gdpr', label: 'GDPR' },
      { href: '/services/regulatory-compliance-services/ccpa-compliance', label: 'CCPA Compliance' },
      { href: '/services/regulatory-compliance-services/rbi-and-irdai-audit-and-assurance', label: 'RBI & IRDAI Audit & Assurance' },
      { href: '/services/regulatory-compliance-services/uidai-npci-and-aadhaar-compliance', label: 'UIDAI, NPCI & Aadhaar Compliance' },
      { href: '/services/regulatory-compliance-services/cea-nciipc-compliance', label: 'CEA/NCIIPC Compliance' },
      { href: '/services/regulatory-compliance-services/sebi-compliance', label: 'SEBI Compliance' },
      { href: '/services/regulatory-compliance-services/hipaa-compliance', label: 'HIPAA Compliance' },
      { href: '/services/regulatory-compliance-services/sec-and-nydfs-compliance', label: 'SEC & NYDFS Compliance' },
      { href: '/services/regulatory-compliance-services/sox-sarbanes-oxley-act-compliance', label: 'SOX (Sarbanes-Oxley Act) Compliance' },
    ],
  },
  {
    id: 'cert',
    href: '/services#certification-support-services',
    label: 'Certification Support Services',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <circle cx="12" cy="8" r="5" stroke="currentColor" strokeWidth="1.6" />
        <path d="M4 22C4 17.5 7.5 15 12 15C16.5 15 20 17.5 20 22" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
    subServices: [
      { href: '/services/certification-support-services/tisax', label: 'TISAX' },
      { href: '/services/certification-support-services/cmmi-l3-and-l5', label: 'CMMI L3 & L5' },
      { href: '/services/certification-support-services/hitrust', label: 'HITRUST' },
      { href: '/services/certification-support-services/isa-iec-62443', label: 'ISA/IEC 62443' },
      { href: '/services/certification-support-services/iso-27001', label: 'ISO 27001' },
      { href: '/services/certification-support-services/iso-27701', label: 'ISO 27701' },
      { href: '/services/certification-support-services/iso-42001', label: 'ISO 42001' },
      { href: '/services/certification-support-services/iso-9001', label: 'ISO 9001' },
      { href: '/services/certification-support-services/iso-20000', label: 'ISO 20000' },
      { href: '/services/certification-support-services/iso-21434', label: 'ISO 21434' },
      { href: '/services/certification-support-services/iso-22301', label: 'ISO 22301' },
      { href: '/services/certification-support-services/iso-27017', label: 'ISO 27017' },
      { href: '/services/certification-support-services/iso-27018', label: 'ISO 27018' },
      { href: '/services/certification-support-services/iso-31000', label: 'ISO 31000' },
      { href: '/services/certification-support-services/iso-14001', label: 'ISO 14001' },
    ],
  },
  {
    id: 'software',
    href: '/services#security-software-solutions',
    label: 'Security Software Solutions',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <rect x="3" y="4" width="18" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
        <path d="M8 20H16M12 16V20" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
    subServices: [
      { href: '/services/security-software-solutions/endpoint-security-edr-xdr', label: 'Endpoint Security, EDR/XDR' },
      { href: '/services/security-software-solutions/patch-management-tool', label: 'Patch Management Tool' },
      { href: '/services/security-software-solutions/data-loss-prevention-dlp', label: 'Data Loss Prevention (DLP)' },
      { href: '/services/security-software-solutions/iam-and-pam', label: 'IAM & PAM' },
      { href: '/services/security-software-solutions/mfa-solutions', label: 'MFA Solutions' },
      { href: '/services/security-software-solutions/encryption-solutions', label: 'Encryption Solutions' },
      { href: '/services/security-software-solutions/firewalls', label: 'Firewalls' },
      { href: '/services/security-software-solutions/web-application-firewall-waf', label: 'Web Application Firewall (WAF)' },
      { href: '/services/security-software-solutions/ddos-protection', label: 'DDoS Protection' },
      { href: '/services/security-software-solutions/network-access-control-nac', label: 'Network Access Control (NAC)' },
      { href: '/services/security-software-solutions/mobile-device-management-mdm-mam', label: 'Mobile Device Management (MDM/MAM)' },
      { href: '/services/security-software-solutions/sast-dast-tools', label: 'SAST/DAST Tools' },
      { href: '/services/security-software-solutions/siem-soar', label: 'SIEM / SOAR' },
      { href: '/services/security-software-solutions/email-security-phishing-solutions', label: 'Email Security / Phishing Solutions' },
      { href: '/services/security-software-solutions/e-grc-platforms', label: 'E-GRC Platforms' },
    ],
  },
  {
    id: 'specialized',
    href: '/services#specialized-services',
    label: 'Specialized Services & Training',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <path d="M13 2L4 14H11L10 22L20 9H13L13 2Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    ),
    subServices: [
      { href: '/services/specialized-services/cybersecurity-training-services', label: 'Cybersecurity Training Services' },
      { href: '/services/specialized-services/incident-response', label: 'Incident Response' },
      { href: '/services/specialized-services/breach-attack-simulation-bas', label: 'Breach Attack Simulation (BAS)' },
      { href: '/services/specialized-services/cyber-forensics', label: 'Cyber Forensics' },
    ],
  },
];

/* ─────────────────────────────────────────────
   SVG helpers
───────────────────────────────────────────── */

function ChevronDown({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function ChevronRight({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M4 2L8 6L4 10" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Component
───────────────────────────────────────────── */

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMobileCat, setOpenMobileCat] = useState<string | null>(null);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  /* scroll effect */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* lock body scroll when mobile menu open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const closeMobile = () => {
    setMobileOpen(false);
    setOpenMobileCat(null);
    setMobileAboutOpen(false);
    setMobileServicesOpen(false);
  };

  return (
    <header
      id="navbar"
      className={`navbar-root${scrolled ? ' navbar-scrolled' : ''}`}
    >
      <div className="navbar-container">

        {/* ── Logo ── */}
        <Link href="/" className="navbar-logo-link" onClick={closeMobile}>
          <span className="nav-logo-wrap">
            <img src="/logoriskberg.png" alt="RiskBerg Consulting" className="nav-logo-img" />
          </span>
        </Link>

        {/* ── Desktop nav ── */}
        <nav className="hidden lg:flex items-center" aria-label="Main navigation">
          <ul className="flex items-center gap-1">

            {/* Home */}
            <li>
              <Link href="/" className="nav-link-item">Home</Link>
            </li>

            {/* About Us */}
            <li className="relative group">
              <Link href="/about" className="nav-link-item flex items-center gap-1">
                About Us
                <ChevronDown className="nav-chevron group-hover:rotate-180" />
              </Link>
              <div className="nav-dropdown">
                {aboutLinks.map(l => (
                  <Link key={l.href} href={l.href} className="nav-dropdown-link">{l.label}</Link>
                ))}
              </div>
            </li>

            {/* Services — mega */}
            <li className="relative group services-dropdown-li">
              <Link href="/services" className="nav-link-item flex items-center gap-1">
                Services
                <ChevronDown className="nav-chevron group-hover:rotate-180" />
              </Link>
              {/* Level-1 panel */}
              <div className="services-mega-panel">
                <div className="services-mega-inner">
                  <ul className="list-none m-0 p-0">
                    {serviceCategories.map(cat => (
                      <li key={cat.id} className="services-cat-item">
                        {/* Category row */}
                        <Link href={cat.href} className="services-cat-link">
                          <span className="services-cat-icon">{cat.icon}</span>
                          <span className="flex-1 text-sm font-semibold">{cat.label}</span>
                          <ChevronRight className="services-cat-caret" />
                        </Link>
                        {/* Level-2 flyout */}
                        <div className="services-subflyout">
                          <div className="services-subflyout-header">{cat.label}</div>
                          <div className="services-subflyout-grid">
                            {cat.subServices.map(s => (
                              <Link key={s.href} href={s.href} className="services-sub-link">{s.label}</Link>
                            ))}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>

            {/* Simple links */}
            <li><Link href="/industries" className="nav-link-item">Industries</Link></li>
            <li><Link href="/careers"    className="nav-link-item">Careers</Link></li>
            <li><Link href="/contact"    className="nav-link-item">Contact</Link></li>
          </ul>
        </nav>

        {/* ── Actions ── */}
        <div className="flex items-center gap-4">
          <Link href="/contact" className="btn-primary-nav hidden lg:inline-flex">
            Get Started
          </Link>

          {/* Hamburger — mobile only */}
          <div className="lg:hidden">
            <button
              className={`hamburger-btn${mobileOpen ? ' hamburger-active' : ''}`}
              onClick={() => setMobileOpen(v => !v)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile overlay menu ── */}
      <div
        className={`mobile-menu${mobileOpen ? ' mobile-menu-open' : ''}`}
        aria-hidden={!mobileOpen}
      >
        <nav className="mobile-nav" aria-label="Mobile navigation">
          <ul className="flex flex-col gap-1 w-full">

            <li>
              <Link href="/" className="mobile-nav-link" onClick={closeMobile}>Home</Link>
            </li>

            {/* About — accordion */}
            <li>
              <button
                className="mobile-nav-link w-full flex justify-between items-center"
                onClick={() => setMobileAboutOpen(v => !v)}
              >
                About Us
                <ChevronDown className={`w-4 h-4 transition-transform duration-200${mobileAboutOpen ? ' rotate-180' : ''}`} />
              </button>
              {mobileAboutOpen && (
                <ul className="mobile-accordion-list">
                  {aboutLinks.map(l => (
                    <li key={l.href}>
                      <Link href={l.href} className="mobile-sub-link" onClick={closeMobile}>{l.label}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            {/* Services — accordion */}
            <li>
              <button
                className="mobile-nav-link w-full flex justify-between items-center"
                onClick={() => setMobileServicesOpen(v => !v)}
              >
                Services
                <ChevronDown className={`w-4 h-4 transition-transform duration-200${mobileServicesOpen ? ' rotate-180' : ''}`} />
              </button>
              {mobileServicesOpen && (
                <ul className="mobile-accordion-list">
                  {serviceCategories.map(cat => (
                    <li key={cat.id}>
                      <button
                        className="mobile-cat-btn"
                        onClick={() => setOpenMobileCat(openMobileCat === cat.id ? null : cat.id)}
                      >
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 text-[#539ad2]">{cat.icon}</span>
                          {cat.label}
                        </span>
                        <ChevronRight className={`w-3 h-3 text-[#539ad2] transition-transform duration-200${openMobileCat === cat.id ? ' rotate-90' : ''}`} />
                      </button>
                      {openMobileCat === cat.id && (
                        <ul className="mobile-sub-accordion">
                          {cat.subServices.map(s => (
                            <li key={s.href}>
                              <Link href={s.href} className="mobile-sub-link" onClick={closeMobile}>{s.label}</Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>

            <li><Link href="/industries" className="mobile-nav-link" onClick={closeMobile}>Industries</Link></li>
            <li><Link href="/careers"    className="mobile-nav-link" onClick={closeMobile}>Careers</Link></li>
            <li><Link href="/contact"    className="mobile-nav-link" onClick={closeMobile}>Contact</Link></li>
          </ul>

          <Link href="/contact" className="btn-primary-nav mt-8 self-start" onClick={closeMobile}>
            Get Started
          </Link>
        </nav>
      </div>
    </header>
  );
}
