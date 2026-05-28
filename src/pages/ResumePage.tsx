import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { links } from '../data/siteData';
import SEOHead, { SITE_URL } from '../components/SEOHead';

export default function ResumePage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.resume-back', {
        x: -16, opacity: 0, duration: 0.45, ease: 'power3.out', delay: 0.05,
      });
      gsap.from('.resume-hero__eyebrow', {
        y: 14, opacity: 0, duration: 0.5, ease: 'power3.out', delay: 0.15,
      });
      gsap.from('.resume-hero__heading', {
        clipPath: 'inset(0 100% 0 0)', duration: 0.85, ease: 'power4.out', delay: 0.22,
      });
      gsap.from('.resume-hero__sub', {
        y: 20, opacity: 0, duration: 0.6, ease: 'power3.out', delay: 0.4,
      });
      gsap.from('.resume-hero__actions', {
        y: 16, opacity: 0, duration: 0.55, ease: 'power3.out', delay: 0.52,
      });
      gsap.from('.resume-frame', {
        y: 32, opacity: 0, duration: 0.75, ease: 'power3.out', delay: 0.68,
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  const fileId   = '1p4zQ5j1vAa5xzovAew3WFuxcWn7HHd14';
  const embedUrl = `https://drive.google.com/file/d/${fileId}/preview`;

  return (
    <div className="resume-page page-enter" ref={pageRef}>
      <SEOHead
        title="Resume — Ezzat Boukhary"
        description="Full overview of Ezzat Boukhary's work experience, education, and technical skills. Available to view inline or download as a PDF."
        url={`${SITE_URL}/resume/`}
        ogImage={`${SITE_URL}/og/preview-banner.jpg`}
        ogImageAlt="Ezzat Boukhary — Resume"
        ogType="profile"
      />

      {/* ── Single seamless section: heading + download + embedded viewer ── */}
      <section className="resume-hero">
        <div className="resume-hero__orb resume-hero__orb--1" aria-hidden="true" />
        <div className="resume-hero__orb resume-hero__orb--2" aria-hidden="true" />

        <div className="container resume-hero__inner">
          <Link
            to="/"
            className="resume-back"
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--yellow)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}
          >
            ← Back
          </Link>

          {/* Top row: label + heading left, download right */}
          <div className="resume-hero__top">
            <div>
              <p className="section-label resume-hero__eyebrow">Document</p>
              <h1 className="resume-hero__heading">
                My <em>Resume</em>
              </h1>
              <p className="resume-hero__sub">
                Full overview of my experience, education, and skills,{' '}
                available to view inline or download as a PDF.
              </p>
            </div>
            <div className="resume-hero__actions">
              <a href={links.resumeDownload} download className="btn btn--primary btn--lg">
                Download PDF ↓
              </a>
            </div>
          </div>

          {/* PDF viewer flows directly inside the same section — no gap, no border */}
          <div className="resume-frame">
            <iframe
              src={embedUrl}
              title="Ezzat Boukhary — Resume"
              allow="autoplay"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
