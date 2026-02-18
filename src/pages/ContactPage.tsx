import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { profile, links } from '../data/siteData';

export default function ContactPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="contact-page page-enter">
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <header className="contact-page__hero">
        <div className="container">
          <Link
            to="/"
            className="contact-page__back"
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--yellow)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}
          >
            ← Back
          </Link>
          <p className="section-label">Contact</p>
          <h1 className="contact-page__heading">
            Let's build something<br />
            <em>that matters.</em>
          </h1>
          <p className="contact-page__sub">
            Open to full-time roles, interesting collaborations, and products that reach real people.
          </p>
        </div>
      </header>

      {/* ── Contact cards ────────────────────────────────────────────── */}
      <div className="contact-page__body">
        <div className="container">
          <div className="contact-page__grid">

            {/* Email */}
            <a href={`mailto:${profile.email}`} className="contact-card contact-card--primary">
              <div className="contact-card__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="4" width="20" height="16" rx="3" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M2 8l10 6 10-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="contact-card__label">Email</div>
              <div className="contact-card__value">{profile.email}</div>
              <div className="contact-card__cta">Send a message →</div>
            </a>

            {/* LinkedIn */}
            <a href={links.linkedin} target="_blank" rel="noreferrer" className="contact-card">
              <div className="contact-card__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="2" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M7 10v7M7 7v.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
                  <path d="M11 17v-4c0-1.5 1-2 2-2s2 .5 2 2v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M11 13v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="contact-card__label">LinkedIn</div>
              <div className="contact-card__value">ezzatboukhary</div>
              <div className="contact-card__cta">View profile →</div>
            </a>

            {/* GitHub */}
            <a href={links.github} target="_blank" rel="noreferrer" className="contact-card">
              <div className="contact-card__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M9 19c-4 1.5-4-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 00-1.3-3.2 4.2 4.2 0 00-.1-3.2s-1-.3-3.3 1.3a11.4 11.4 0 00-6 0C6.8 3.8 5.8 4.1 5.8 4.1a4.2 4.2 0 00-.1 3.2A4.6 4.6 0 004.4 10.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="contact-card__label">GitHub</div>
              <div className="contact-card__value">ezzatBoukhary</div>
              <div className="contact-card__cta">See my code →</div>
            </a>

            {/* Resume */}
            <a href={links.resumeDownload} download className="contact-card">
              <div className="contact-card__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                  <path d="M14 2v6h6M12 17v-6M9 14l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="contact-card__label">Résumé</div>
              <div className="contact-card__value">Download PDF</div>
              <div className="contact-card__cta">Get my résumé →</div>
            </a>
          </div>

          {/* ── Availability note ── */}
          <div className="contact-page__note">
            <span className="contact-page__note-dot" aria-hidden="true" />
            Currently open to new opportunities — full-time, contract, and interesting side projects.
          </div>
        </div>
      </div>
    </div>
  );
}
