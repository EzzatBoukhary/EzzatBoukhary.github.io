import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { links } from '../data/siteData';
import SEOHead, { SITE_URL } from '../components/SEOHead';

export default function ResumePage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  // Convert Drive view URL to embed URL for iframe
  const fileId = '1p4zQ5j1vAa5xzovAew3WFuxcWn7HHd14';
  const embedUrl = `https://drive.google.com/file/d/${fileId}/preview`;

  return (
    <div className="resume-page page-enter">
      <SEOHead
        title="Resume — Ezzat Boukhary"
        description="Full overview of Ezzat Boukhary's work experience, education, and technical skills. Available to view inline or download as a PDF."
        url={`${SITE_URL}/resume/`}
        ogImage={`${SITE_URL}/og/preview-banner.jpg`}
        ogImageAlt="Ezzat Boukhary — Resume"
        ogType="profile"
      />
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
            My <em>Resume</em>
          </h1>
          <p className="resume-hero__sub">
            Full overview of my experience, education, and skills — available to view inline or download as a PDF.
          </p>
          <div className="resume-hero__actions">
            <a href={links.resumeDownload} download className="btn btn--primary btn--lg">
              Download PDF ↓
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
              title="Ezzat Boukhary — Resume"
              allow="autoplay"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
