import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { profile, links } from '../data/siteData';
import { IconGitHub, IconLinkedIn } from '../components/Icons';
import SEOHead, { SITE_URL } from '../components/SEOHead';

function shortUrl(url: string) {
  return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
}

export default function ContactPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cp-back',    { x: -18, opacity: 0, duration: 0.45, ease: 'power3.out', delay: 0.05 });
      gsap.from('.cp-eyebrow', { y: 14,  opacity: 0, duration: 0.5,  ease: 'power3.out', delay: 0.15 });
      gsap.from('.cp-heading', { y: 52,  opacity: 0, duration: 0.9,  ease: 'power4.out', delay: 0.22 });
      gsap.from('.cp-sub',     { y: 22,  opacity: 0, duration: 0.65, ease: 'power3.out', delay: 0.38 });
      gsap.from('.cp-note',    { y: 14,  opacity: 0, duration: 0.5,  ease: 'power3.out', delay: 0.44 });
      gsap.from('.cp-item',    { x: -18, opacity: 0, stagger: 0.07, duration: 0.55, ease: 'power3.out', delay: 0.54 });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="contact-page page-enter" ref={pageRef}>
      <SEOHead
        title="Contact - Ezzat Boukhary"
        description="Get in touch with Ezzat Boukhary — open to full-time roles, interesting collaborations, and products that reach real people."
        url={`${SITE_URL}/contact/`}
        ogImage={`${SITE_URL}/og/preview-banner.jpg`}
        ogImageAlt="Contact Ezzat Boukhary"
      />

      <section className="cp-hero">
        <div className="cp-hero__orb cp-hero__orb--1" aria-hidden="true" />
        <div className="cp-hero__orb cp-hero__orb--2" aria-hidden="true" />
        <div className="cp-hero__orb cp-hero__orb--3" aria-hidden="true" />

        <div className="container cp-hero__inner">
          <Link to="/" className="cp-back">← Back</Link>

          <h1 className="cp-heading">
            Let's build<br />
            <em>something real.</em>
          </h1>

          <p className="cp-sub">
            Drop me a line — whether it's a role, a collaboration, or just a good idea worth pursuing.
          </p>

          {/* ── Availability ── */}
          <div className="cp-note">
            <span className="cp-note__dot" aria-hidden="true" />
            {profile.availability}
          </div>

          {/* ── Contact items — single-row, outer div (not a link) ── */}
          <div className="cp-items">

            {/* Email */}
            <div className="cp-item" style={{ '--item-accent': '#e8ff38' } as React.CSSProperties}>
              <span className="cp-item__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%' }}>
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
              </span>
              <span className="cp-item__name">Email</span>
              <a href={`mailto:${profile.email}`} className="cp-item__link">{profile.email}</a>
              <a href={`mailto:${profile.email}`} className="cp-item__btn">Send message →</a>
            </div>

            {/* LinkedIn */}
            <div className="cp-item" style={{ '--item-accent': '#38bdf8' } as React.CSSProperties}>
              <span className="cp-item__icon" aria-hidden="true">
                <IconLinkedIn style={{ width: '100%', height: '100%' }} />
              </span>
              <span className="cp-item__name">LinkedIn</span>
              <a href={links.linkedin} target="_blank" rel="noreferrer" className="cp-item__link">{shortUrl(links.linkedin)}</a>
              <a href={links.linkedin} target="_blank" rel="noreferrer" className="cp-item__btn">View profile →</a>
            </div>

            {/* GitHub */}
            <div className="cp-item" style={{ '--item-accent': '#e8ff38' } as React.CSSProperties}>
              <span className="cp-item__icon" aria-hidden="true">
                <IconGitHub style={{ width: '100%', height: '100%' }} />
              </span>
              <span className="cp-item__name">GitHub</span>
              <a href={links.github} target="_blank" rel="noreferrer" className="cp-item__link">{shortUrl(links.github)}</a>
              <a href={links.github} target="_blank" rel="noreferrer" className="cp-item__btn">View code →</a>
            </div>

            {/* Resume */}
            <div className="cp-item" style={{ '--item-accent': '#00f5d0' } as React.CSSProperties}>
              <span className="cp-item__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%' }}>
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="12" y1="11" x2="12" y2="17"/>
                  <polyline points="9 15 12 18 15 15"/>
                </svg>
              </span>
              <span className="cp-item__name">Resume</span>
              <a href={links.resumeDownload} download className="cp-item__link">Download PDF</a>
              <a href={links.resumeDownload} download className="cp-item__btn">Get file ↓</a>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
