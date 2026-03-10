import { useEffect } from 'react';
import { profile, links } from '../data/siteData';
import SEOHead, { SITE_URL } from '../components/SEOHead';

const phone = profile.phone?.trim();
const hasPhone = Boolean(phone);
const phoneHref = hasPhone ? `tel:${phone.replace(/[^+\d]/g, '')}` : '';
const siteRootUrl = SITE_URL;
const siteRootLabel = siteRootUrl.replace(/^https?:\/\//, '');
const resumeShortUrl = `${SITE_URL}/resume/`;
const resumeShortLabel = `${siteRootLabel}/resume`;

const qr = {
  website: `https://api.qrserver.com/v1/create-qr-code/?size=320x320&margin=24&data=${encodeURIComponent(siteRootUrl)}`,
  linkedin: `https://api.qrserver.com/v1/create-qr-code/?size=320x320&margin=24&data=${encodeURIComponent(links.linkedin)}`,
  github: `https://api.qrserver.com/v1/create-qr-code/?size=320x320&margin=24&data=${encodeURIComponent(links.github)}`,
  resume: `https://api.qrserver.com/v1/create-qr-code/?size=320x320&margin=24&data=${encodeURIComponent(resumeShortUrl)}`,
};

export default function BusinessCardPage() {
  useEffect(() => {
    document.body.classList.add('business-card-mode');
    return () => {
      document.body.classList.remove('business-card-mode');
    };
  }, []);

  return (
    <main className="business-card-screen" aria-label="Digital business card">
      <SEOHead
        title="Business Card - Ezzat Boukhary"
        description="Static full-screen digital business card for in-person sharing."
        url={`${SITE_URL}/business-card/`}
        ogImage={`${SITE_URL}/og/preview-banner.jpg`}
        ogImageAlt="Ezzat Boukhary business card"
      />

      <article className="business-card" aria-label="Ezzat Boukhary business card">
        <header className="business-card__header">
          <h1 className="business-card__name">{profile.name}</h1>
          <p className="business-card__role">{profile.role}</p>
          <p className="business-card__location">Orlando, Florida</p>
        </header>

        <div className="business-card__content">
          <section className="business-card__details" aria-label="Contact details">
            <p className="business-card__group-label">Direct</p>
            {hasPhone && (
              <a className="business-card__line business-card__line--link" href={phoneHref}>
                Phone: {phone}
              </a>
            )}
            <a className="business-card__line business-card__line--link" href={`mailto:${profile.email}`}>
              Email: {profile.email}
            </a>

            <p className="business-card__group-label business-card__group-label--profiles">Profiles</p>
            <a className="business-card__line business-card__line--link" href={siteRootUrl} target="_blank" rel="noreferrer">
              Website: {siteRootLabel}
            </a>
            <a className="business-card__line business-card__line--link" href={links.linkedin} target="_blank" rel="noreferrer">
              LinkedIn: linkedin.com/in/ezzatboukhary
            </a>
            <a className="business-card__line business-card__line--link" href={links.github} target="_blank" rel="noreferrer">
              GitHub: github.com/ezzatBoukhary
            </a>
            <a className="business-card__line business-card__line--link" href={resumeShortUrl} target="_blank" rel="noreferrer">
              Resume: {resumeShortLabel}
            </a>
          </section>

          <section className="business-card__qr-grid" aria-label="QR codes">
            <figure className="business-card__qr-item">
              <img src={qr.website} alt="Website QR code" width={140} height={140} />
              <figcaption>Website</figcaption>
            </figure>
            <figure className="business-card__qr-item">
              <img src={qr.linkedin} alt="LinkedIn QR code" width={140} height={140} />
              <figcaption>LinkedIn</figcaption>
            </figure>
            <figure className="business-card__qr-item">
              <img src={qr.github} alt="GitHub QR code" width={140} height={140} />
              <figcaption>GitHub</figcaption>
            </figure>
            <figure className="business-card__qr-item">
              <img src={qr.resume} alt="Resume QR code" width={140} height={140} />
              <figcaption>Resume</figcaption>
            </figure>
          </section>
        </div>
      </article>
    </main>
  );
}
