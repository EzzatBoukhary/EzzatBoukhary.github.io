import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { links, profile, experience, skillMatrix } from '../data/siteData.js';

export default function ResumePage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  // Convert Drive view URL to embed URL for iframe
  const fileId = '1p4zQ5j1vAa5xzovAew3WFuxcWn7HHd14';
  const embedUrl = `https://drive.google.com/file/d/${fileId}/preview`;

  return (
    <div className="resume-page page-enter">
      {/* ── Hero ── */}
      <header className="resume-hero">
        <div className="container">
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '.5em', fontSize: '.78rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '2rem', transition: 'color .2s', fontFamily: 'var(--font-display)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--yellow)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}
          >
            ← Back
          </Link>
          <p className="section-label">Document</p>
          <h1 className="resume-hero__heading">
            My <em>Résumé</em>
          </h1>
          <p className="resume-hero__sub">
            Full overview of my experience, education, and skills — available to view inline or download as a PDF.
          </p>
          <div className="resume-hero__actions">
            <a href={links.resumeDownload} download className="btn btn--primary btn--lg">
              Download PDF ↓
            </a>
            <a href={links.resumeDrive} target="_blank" rel="noreferrer" className="btn btn--outline">
              Open in Drive ↗
            </a>
          </div>
        </div>
      </header>

      {/* ── Embedded PDF ── */}
      <div className="resume-frame-wrap">
        <div className="container">
          <div className="resume-frame">
            <iframe
              src={embedUrl}
              title="Ezzat Boukhary — Résumé"
              allow="autoplay"
              loading="lazy"
            />
          </div>

          {/* Fallback text if iframe blocked */}
          <p style={{ marginTop: '1rem', fontSize: '.82rem', color: 'rgba(255,255,255,0.25)', textAlign: 'center' }}>
            If the preview doesn't load,{' '}
            <a href={links.resumeDrive} target="_blank" rel="noreferrer" style={{ color: 'var(--yellow)' }}>
              view it on Google Drive ↗
            </a>
          </p>
        </div>
      </div>

      {/* ── Quick highlights ── */}
      <div style={{ paddingBottom: '6rem' }}>
        <div className="container">
          <p className="section-label">Highlights</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(1.75rem, 3.5vw, 3rem)', letterSpacing: '-.04em', marginBottom: '3rem' }}>
            Experience at a glance
          </h2>
          <div className="timeline">
            {experience.map((item, i) => (
              <div key={`${item.org}-${i}`} className="tl-item">
                <div className="tl-item__date">{item.period}</div>
                <div className="tl-item__body">
                  <div className="tl-item__header">
                    <img src={item.logo} alt={item.org} className="tl-item__logo" />
                    <div>
                      <div className="tl-item__role">{item.role}</div>
                      <div className="tl-item__org">{item.org}</div>
                    </div>
                    {item.href && (
                      <a href={item.href} target="_blank" rel="noreferrer" className="tl-item__ext">↗</a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
