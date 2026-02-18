import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { projectCases, links } from '../data/siteData';

export default function PortfolioPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="portfolio-page page-enter">
      <header className="portfolio-hero">
        <div className="container">
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '.5em', fontSize: '.78rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '2rem', transition: 'color .2s', fontFamily: 'var(--font-display)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--yellow)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}
          >
            ← Back
          </Link>
          <p className="section-label">Portfolio</p>
          <h1 className="portfolio-hero__heading">
            All my <em>work</em>.
          </h1>
          <p className="portfolio-hero__sub">
            A collection of projects spanning realtime graphics, full-stack systems, mobile apps, and hackathon experiments. Click any project to read the full case study.
          </p>
          <div style={{ display: 'flex', gap: '.75rem', flexWrap: 'wrap' }}>
            <a href={links.resumeDownload} download className="btn btn--primary">
              Download Résumé PDF ↓
            </a>
            <a href={links.github} target="_blank" rel="noreferrer" className="btn btn--outline">
              GitHub ↗
            </a>
          </div>
        </div>
      </header>

      {/* Full project grid */}
      <div style={{ padding: '5rem 0 8rem' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 500px), 1fr))', gap: '1.5rem' }}>
            {projectCases.map((project, i) => (
              <Link
                key={project.slug}
                to={`/project/${project.slug}`}
                style={{
                  display: 'block',
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  transition: 'transform .3s var(--ease), box-shadow .3s',
                  borderTop: '3px solid var(--yellow)',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 20px 48px rgba(232,255,56,0.1)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
              >
                <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden' }}>
                  <img
                    src={project.gallery[0]}
                    alt={project.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .5s var(--ease)' }}
                  />
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '.5rem' }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '.65rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--yellow)' }}>
                      0{i + 1} · {project.genre}
                    </span>
                    <span style={{ fontSize: '.78rem', color: 'rgba(255,255,255,0.3)' }}>{project.period}</span>
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-.02em', color: 'var(--white)', marginBottom: '.5rem' }}>
                    {project.name}
                  </h3>
                  <p style={{ fontSize: '.88rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7 }}>{project.tagline}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.3rem', marginTop: '1rem' }}>
                    {project.stack.slice(0, 5).map(t => (
                      <span key={t} style={{ fontSize: '.7rem', fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--yellow)', background: 'rgba(232,255,56,0.07)', border: '1px solid rgba(232,255,56,0.15)', borderRadius: '4px', padding: '.2em .65em' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
