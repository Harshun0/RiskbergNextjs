'use client';

import { useEffect, useRef, useState } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

type FormState = 'idle' | 'submitting' | 'success';

export default function ConsultationModal({ isOpen, onClose }: Props) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const [formState, setFormState] = useState<FormState>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [fields, setFields] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    company: '', service: '', message: '',
  });

  /* Lock body scroll when open */
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('cta-modal-open');
    } else {
      document.body.classList.remove('cta-modal-open');
      // reset form when closed
      setTimeout(() => {
        setFormState('idle');
        setErrors({});
        setFields({ firstName: '', lastName: '', email: '', phone: '', company: '', service: '', message: '' });
      }, 300);
    }
    return () => document.body.classList.remove('cta-modal-open');
  }, [isOpen]);

  /* Close on backdrop click */
  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === backdropRef.current) onClose();
  }

  /* Close on Escape */
  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') onClose(); }
    if (isOpen) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  function change(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFields(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(er => { const n = { ...er }; delete n[name]; return n; });
  }

  function validate() {
    const errs: Record<string, string> = {};
    if (!fields.firstName.trim()) errs.firstName = 'First name is required';
    if (!fields.lastName.trim())  errs.lastName  = 'Last name is required';
    if (!fields.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
      errs.email = 'A valid work email is required';
    if (!fields.company.trim()) errs.company = 'Company name is required';
    if (!fields.service)        errs.service = 'Please select a service area';
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setFormState('submitting');
    /* Simulate submission — replace with your API call */
    await new Promise(r => setTimeout(r, 1200));
    setFormState('success');
  }

  return (
    <div
      ref={backdropRef}
      className={`cta-modal-backdrop${isOpen ? ' is-open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="ctaModalTitle"
      onClick={handleBackdropClick}
    >
      <div className="cta-modal">

        {/* ── Header ── */}
        <div className="cta-modal-header">
          <button className="cta-modal-close" aria-label="Close" onClick={onClose}>
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          <div className="cta-modal-header-content">
            <h2 id="ctaModalTitle">Get a Free Expert Consultation</h2>
            <p>One of our senior consultants will respond within one business day — no sales pitch, no obligation.</p>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="cta-modal-body">

          {/* LEFT sidebar */}
          <div className="cta-modal-sidebar">
            <p className="cta-sidebar-heading">Why RiskBerg</p>
            <div className="cta-sidebar-perks">
              {[
                {
                  icon: <path d="M12 2L20 6V12C20 17 16.5 20.5 12 22C7.5 20.5 4 17 4 12V6L12 2Z" stroke="currentColor" strokeWidth="1.6"/>,
                  title: 'CERT-In Empanelled',
                  sub: 'Govt-recognised security auditor',
                },
                {
                  icon: <><circle cx="12" cy="8" r="5" stroke="currentColor" strokeWidth="1.6"/><path d="M4 22C4 17.5 7.5 15 12 15C16.5 15 20 17.5 20 22" stroke="currentColor" strokeWidth="1.6"/></>,
                  title: '50+ Certified Experts',
                  sub: 'CISA, CISSP, ISO lead auditors',
                },
                {
                  icon: <><rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.6"/><path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></>,
                  title: '2M+ Assets Secured',
                  sub: 'Across 20+ sectors globally',
                },
                {
                  icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.6"/>,
                  title: '150+ Years of Excellence',
                  sub: 'Trusted by Fortune 500 clients',
                },
              ].map(p => (
                <div key={p.title} className="cta-sidebar-perk">
                  <div className="cta-sidebar-perk-icon">
                    <svg viewBox="0 0 24 24" fill="none">{p.icon}</svg>
                  </div>
                  <div className="cta-sidebar-perk-text">
                    <strong>{p.title}</strong>
                    <span>{p.sub}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="cta-sidebar-promise">
              <p>⚡ All enquiries receive a personalised response from a <strong>senior consultant</strong> within one business day.</p>
            </div>
          </div>

          {/* RIGHT form panel */}
          <div className="cta-modal-form-panel">
            <h3>Schedule Your Free Consultation</h3>

            {formState === 'success' ? (
              <div className="cta-success-state show">
                <div className="cta-success-icon">✓</div>
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out. A senior RiskBerg consultant will respond within one business day.</p>
              </div>
            ) : (
              <form className="cta-form-grid" id="ctaModalForm" onSubmit={handleSubmit} noValidate>

                <div className="cta-form-row">
                  <div className={`cta-form-group${errors.firstName ? ' has-error' : ''}`}>
                    <label htmlFor="ctaFirstName">First Name *</label>
                    <input type="text" id="ctaFirstName" name="firstName" placeholder="Rahul"
                      autoComplete="given-name" value={fields.firstName} onChange={change}/>
                    <span className="cta-field-error">{errors.firstName}</span>
                  </div>
                  <div className={`cta-form-group${errors.lastName ? ' has-error' : ''}`}>
                    <label htmlFor="ctaLastName">Last Name *</label>
                    <input type="text" id="ctaLastName" name="lastName" placeholder="Sharma"
                      autoComplete="family-name" value={fields.lastName} onChange={change}/>
                    <span className="cta-field-error">{errors.lastName}</span>
                  </div>
                </div>

                <div className="cta-form-row">
                  <div className={`cta-form-group${errors.email ? ' has-error' : ''}`}>
                    <label htmlFor="ctaEmail">Work Email *</label>
                    <input type="email" id="ctaEmail" name="email" placeholder="you@company.com"
                      autoComplete="email" value={fields.email} onChange={change}/>
                    <span className="cta-field-error">{errors.email}</span>
                  </div>
                  <div className="cta-form-group">
                    <label htmlFor="ctaPhone">Phone Number</label>
                    <input type="tel" id="ctaPhone" name="phone" placeholder="+91 98765 43210"
                      autoComplete="tel" value={fields.phone} onChange={change}/>
                    <span className="cta-field-error"/>
                  </div>
                </div>

                <div className={`cta-form-group${errors.company ? ' has-error' : ''}`}>
                  <label htmlFor="ctaCompany">Company / Organisation *</label>
                  <input type="text" id="ctaCompany" name="company" placeholder="Your Company Ltd."
                    autoComplete="organization" value={fields.company} onChange={change}/>
                  <span className="cta-field-error">{errors.company}</span>
                </div>

                <div className={`cta-form-group${errors.service ? ' has-error' : ''}`}>
                  <label htmlFor="ctaService">Service You&apos;re Interested In *</label>
                  <select id="ctaService" name="service" value={fields.service} onChange={change}>
                    <option value="" disabled>Select a service area…</option>
                    <optgroup label="Cybersecurity Advisory">
                      <option>VAPT — Web / Mobile / Network</option>
                      <option>Red Team / Blue Team Exercise</option>
                      <option>Incident Response &amp; Forensics</option>
                      <option>Cloud Security Advisory</option>
                      <option>OT / ICS Security</option>
                      <option>DevSecOps</option>
                      <option>SOC Services</option>
                    </optgroup>
                    <optgroup label="Governance, Risk &amp; Compliance">
                      <option>GRC Framework &amp; IT Risk Management</option>
                      <option>Virtual CISO Services</option>
                      <option>Third-Party Risk Management</option>
                      <option>Enterprise Risk Management</option>
                      <option>Business Continuity &amp; DR Planning</option>
                    </optgroup>
                    <optgroup label="Regulatory Compliance">
                      <option>CERT-In / DPDP / GDPR Compliance</option>
                      <option>RBI / SEBI / IRDAI Compliance</option>
                      <option>PCI DSS / SOC 2 / HIPAA / SOX</option>
                    </optgroup>
                    <optgroup label="Certification Support">
                      <option>ISO 27001 / 27701 / 42001</option>
                      <option>ISO 21434 / TISAX (Automotive)</option>
                      <option>HITRUST / CMMI / ISA-IEC 62443</option>
                    </optgroup>
                    <option>Not Sure — Need Expert Advice</option>
                  </select>
                  <span className="cta-field-error">{errors.service}</span>
                </div>

                <div className="cta-form-group">
                  <label htmlFor="ctaMessage">Tell Us About Your Challenge (optional)</label>
                  <textarea id="ctaMessage" name="message"
                    placeholder="Briefly describe what you're trying to achieve or the challenge you're facing…"
                    value={fields.message} onChange={change}/>
                </div>

                <div className="cta-response-note">
                  <svg viewBox="0 0 24 24" fill="none" width="14" height="14">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6"/>
                    <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                  </svg>
                  <span>We typically respond within <strong>1 business day</strong>. All submissions are confidential.</span>
                </div>

              </form>
            )}
          </div>
        </div>

        {/* ── Footer ── */}
        {formState !== 'success' && (
          <div className="cta-modal-footer">
            <p className="cta-privacy-note">
              By submitting you agree to our <a href="#">Privacy Policy</a>. We never share your data with third parties.
            </p>
            <button
              type="submit"
              form="ctaModalForm"
              className="cta-submit-btn"
              disabled={formState === 'submitting'}
            >
              {formState === 'submitting' ? (
                <span>Sending…</span>
              ) : (
                <>
                  <span>Send My Request</span>
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </>
              )}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
