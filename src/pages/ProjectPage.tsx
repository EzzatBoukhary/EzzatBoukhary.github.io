import { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projectCases } from '../data/siteData';
import {
  LinkIcon, IconArrowLeft, IconArrowRight,
} from '../components/Icons';
import SEOHead, { SITE_URL } from '../components/SEOHead';

const PROJECT_OG_IMAGE: Record<string, string> = {
  'gesture-based-puppetry':  `${SITE_URL}/og/project-gesture-based-puppetry.png`,
  'college-event-platform':  `${SITE_URL}/og/project-college-event-platform.png`,
  'dragonotchi':             `${SITE_URL}/og/project-dragonotchi.jpg`,
  'killerbot':               `${SITE_URL}/og/project-killerbot.png`,
  'campus-critters':         `${SITE_URL}/og/project-campus-critters.png`,
};

const PROJECT_OG_DIMS: Record<string, { w: number; h: number }> = {
  'gesture-based-puppetry':  { w: 1603, h: 901  },
  'college-event-platform':  { w: 1390, h: 758  },
  'dragonotchi':             { w: 1079, h: 1195 },
  'killerbot':               { w: 744,  h: 506  },
  'campus-critters':         { w: 1919, h: 888  },
};

gsap.registerPlugin(ScrollTrigger);

// gradient backgrounds per project
const PROJECT_THEME: Record<string, { a: string; b: string; c: string; base: string }> = {
  // Puppetry: deep theatre — purple spotlight from top-right, dark stage floor
  'gesture-based-puppetry': {
    a: 'rgba(168,85,247,0.65)',
    b: 'rgba(109,40,217,0.30)',
    c: 'rgba(236,72,153,0.12)',
    base: '#04010d',
  },
  // College Event Platform: clean data-centre blues, grid feel
  'college-event-platform': {
    a: 'rgba(14,165,233,0.60)',
    b: 'rgba(6,182,212,0.25)',
    c: 'rgba(99,102,241,0.12)',
    base: '#010a18',
  },
  // Dragonotchi: volcanic fire — deep ember base, orange-gold burst
  'dragonotchi': {
    a: 'rgba(234,88,12,0.70)',
    b: 'rgba(251,191,36,0.35)',
    c: 'rgba(239,68,68,0.14)',
    base: '#160300',
  },
  // KillerBot: CRT phosphor green on pitch black
  'killerbot': {
    a: 'rgba(132,204,22,0.50)',
    b: 'rgba(232,255,56,0.22)',
    c: 'rgba(74,222,128,0.10)',
    base: '#010801',
  },
  // Campus Critters: lush forest canopy — deep emerald, dappled light
  'campus-critters': {
    a: 'rgba(22,163,74,0.55)',
    b: 'rgba(134,239,172,0.22)',
    c: 'rgba(20,184,166,0.10)',
    base: '#010d04',
  },
};

// Map slug → pattern CSS modifier class
const PROJECT_PATTERN: Record<string, string> = {
  'gesture-based-puppetry': 'puppetry',
  'college-event-platform': 'cew',
  'dragonotchi':             'dragonotchi',
  'killerbot':               'killerbot',
  'campus-critters':         'campus-critters',
};

// Per-project dot grid colours for extra distinctiveness
const PROJECT_DOTS: Record<string, string> = {
  'gesture-based-puppetry': 'rgba(168,85,247,0.12)',
  'college-event-platform': 'rgba(14,165,233,0.10)',
  'dragonotchi':             'rgba(251,191,36,0.10)',
  'killerbot':               'rgba(132,204,22,0.12)',
  'campus-critters':         'rgba(34,197,94,0.10)',
};

function buildHeroBg(slug: string): string {
  const t = PROJECT_THEME[slug];
  if (!t) return '#06060a';
  return [
    // Dramatic top-right spotlight bloom
    `radial-gradient(ellipse 90% 70% at 75% 20%, ${t.a} 0%, ${t.b} 45%, transparent 72%)`,
    // Secondary lower-left atmospheric fill
    `radial-gradient(ellipse 60% 50% at 10% 90%, ${t.b} 0%, transparent 60%)`,
    // Subtle colour cast across the whole hero
    `radial-gradient(ellipse 100% 100% at 50% 50%, ${t.c} 0%, transparent 70%)`,
    t.base,
  ].join(', ');
}

const GENRE_SHORT = {
  'Realtime Graphics / Simulation':       'Graphics',
  'Full-Stack Product System':            'Full-Stack',
  'Hackathon / Game UX':                  'Hackathon',
  'Platform / Community Infrastructure':  'Platform',
  'Web + Mobile Product':                 'Mobile/Web',
};

export default function ProjectPage() {
  const { slug }    = useParams();
  const navigate    = useNavigate();
  const pageRef     = useRef(null);

  const project    = projectCases.find((p) => p.slug === slug);
  const currentIdx = projectCases.findIndex((p) => p.slug === slug);
  const nextProject = projectCases[(currentIdx + 1) % projectCases.length];

  const accent      = project?.accentColor ?? '#e8ff38';
  const heroBg      = buildHeroBg(slug);
  const dotColor    = PROJECT_DOTS[slug] ?? 'rgba(255,255,255,0.07)';
  const patternSlug = PROJECT_PATTERN[slug];

  // Scroll to top FIRST — tell Lenis to jump immediately
  useEffect(() => {
    const lenis = (window as any).__lenis;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      window.scrollTo(0, 0);
    }
  }, [slug]);

  useEffect(() => {
    if (!project) { navigate('/'); return; }
  }, [slug, project, navigate]);

  useEffect(() => {
    if (!project) return;
    const ctx = gsap.context(() => {
      gsap.from('.pp-hero__tag, .pp-hero__name, .pp-hero__tagline, .pp-hero__chips, .pp-hero__links', {
        opacity: 0, y: 28, stagger: 0.09, duration: 0.7, ease: 'power3.out', delay: 0.2,
      });
      gsap.from('.pp-stat', {
        opacity: 0, y: 20, stagger: 0.07, duration: 0.55, ease: 'power3.out',
        scrollTrigger: { trigger: '.pp-stats', start: 'top 88%' },
      });
      gsap.from('.pp-objectives__item, .pp-outcome', {
        opacity: 0, x: -16, stagger: 0.06, duration: 0.5, ease: 'power3.out',
        scrollTrigger: { trigger: '.pp-main', start: 'top 80%' },
      });
      gsap.from('.pp-skill-pill, .pp-gallery__item', {
        opacity: 0, y: 18, stagger: 0.05, duration: 0.5, ease: 'power3.out',
        scrollTrigger: { trigger: '.pp-skills, .pp-gallery', start: 'top 86%' },
      });
    }, pageRef);
    return () => ctx.revert();
  }, [project, slug]);

  // ── Lightbox ─────────────────────────────────────────────────────────
  const [lightbox, setLightbox] = useState<{ open: boolean; idx: number }>({ open: false, idx: 0 });
  const galleryLen    = project?.gallery.length ?? 0;
  const openLightbox  = useCallback((idx: number) => setLightbox({ open: true, idx }), []);
  const closeLightbox = useCallback(() => setLightbox(l => ({ ...l, open: false })), []);
  const lightboxPrev  = useCallback(() =>
    setLightbox(l => ({ open: true, idx: (l.idx - 1 + galleryLen) % Math.max(galleryLen, 1) })),
  [galleryLen]);
  const lightboxNext  = useCallback(() =>
    setLightbox(l => ({ open: true, idx: (l.idx + 1) % Math.max(galleryLen, 1) })),
  [galleryLen]);

  useEffect(() => {
    if (!lightbox.open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape')     closeLightbox();
      if (e.key === 'ArrowLeft')  lightboxPrev();
      if (e.key === 'ArrowRight') lightboxNext();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightbox.open, closeLightbox, lightboxPrev, lightboxNext]);

  if (!project) return null;

  const genreLabel = GENRE_SHORT[project.genre] ?? project.genre;
  const galleryClass = `pp-gallery__grid ${
    project.gallery.length === 1
      ? 'pp-gallery__grid--1'
      : project.gallery.length === 2
        ? 'pp-gallery__grid--2'
        : project.gallery.length === 3
          ? 'pp-gallery__grid--3'
          : 'pp-gallery__grid--mosaic'
  }`;
  const projectOgImage = PROJECT_OG_IMAGE[slug] ?? `${SITE_URL}/og/preview-banner.jpg`;
  const projectOgDims  = PROJECT_OG_DIMS[slug] ?? { w: 2846, h: 2846 };
  const projectLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.name,
    description: project.summary,
    url: `${SITE_URL}/project/${project.slug}/`,
    image: projectOgImage,
    keywords: project.stack.join(', '),
    genre: project.genre,
    author: {
      '@type': 'Person',
      name: 'Ezzat Boukhary',
      url: SITE_URL,
    },
  };

  return (
    <div className="project-page page-enter" ref={pageRef}>

      <SEOHead
        title={`${project.name} — Ezzat Boukhary`}
        description={`${project.tagline} ${project.summary}`}
        url={`${SITE_URL}/project/${project.slug}/`}
        ogImage={projectOgImage}
        ogImageAlt={`${project.name} — project by Ezzat Boukhary`}
        ogImageWidth={projectOgDims.w}
        ogImageHeight={projectOgDims.h}
        themeColor={project.accentColor}
        jsonLd={projectLd}
      />

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <header className="pp-hero" style={{ background: heroBg, '--pp-accent': accent, '--pp-dots': dotColor } as React.CSSProperties}>
        {/* Dot grid */}
        <div className="pp-hero__dots" aria-hidden="true" />
        {/* Per-project unique pattern */}
        {patternSlug && (
          <div className={`pp-hero__pattern pp-hero__pattern--${patternSlug}`} aria-hidden="true" />
        )}
        {/* Diagonal accent lines */}
        <div className="pp-hero__lines" aria-hidden="true" />
        {/* Floating orbs */}
        <div className="pp-hero__orb pp-hero__orb--1" aria-hidden="true" />
        <div className="pp-hero__orb pp-hero__orb--2" aria-hidden="true" />
        {/* Corner bracket decorations */}
        <svg className="pp-hero__corner pp-hero__corner--tl" viewBox="0 0 60 60" fill="none" aria-hidden="true">
          <path d="M2 58V2h56" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <svg className="pp-hero__corner pp-hero__corner--br" viewBox="0 0 60 60" fill="none" aria-hidden="true">
          <path d="M58 2v56H2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>

        <div className="container pp-hero__inner">
          <Link to="/#projects" className="pp-hero__back">
            <IconArrowLeft style={{ width: '1em', height: '1em' }} />
            All Projects
          </Link>

          <div className="pp-hero__tag">
            <span className="pp-hero__tag-dot" aria-hidden="true" />
            {genreLabel}
          </div>

          <h1 className="pp-hero__name">{project.name}</h1>
          <p className="pp-hero__tagline">{project.tagline}</p>

          <div className="pp-hero__chips">
            <span className="pp-hero__chip pp-hero__chip--period">{project.period}</span>
            {project.stack.slice(0, 5).map((t) => (
              <span key={t} className="pp-hero__chip">{t}</span>
            ))}
          </div>

          {project.links.length > 0 && (
            <div className="pp-hero__links">
              {project.links.map((l) => (
                <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="pp-hero__link">
                  <LinkIcon label={l.label} href={l.href} style={{ width: '1.1em', height: '1.1em', flexShrink: 0 }} />
                  {l.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* ── Stats bar ─────────────────────────────────────────────────── */}
      {project.stats && (
        <div className="pp-stats" style={{ '--pp-accent': accent }}>
          <div className="container">
            <div className="pp-stats__grid">
              {project.stats.map((s) => (
                <div key={s.label} className="pp-stat">
                  <span className="pp-stat__val">{s.value}</span>
                  <span className="pp-stat__lbl">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Body ──────────────────────────────────────────────────────── */}
      <div className="pp-body" style={{ '--pp-accent': accent }}>
        <div className="container pp-body__grid">

          {/* Left — narrative */}
          <div className="pp-main">
            <h2 className="pp-section-title">Why this mattered</h2>
            <p className="pp-text">{project.summary}</p>

            {project.challenge && (
              <div className="pp-signal">
                <div className="pp-signal__label">Core challenge</div>
                <p className="pp-signal__text">{project.challenge}</p>
              </div>
            )}

            {project.signatureWin && (
              <div className="pp-signal pp-signal--win">
                <div className="pp-signal__label">Signature win</div>
                <p className="pp-signal__text">{project.signatureWin}</p>
              </div>
            )}

            <h2 className="pp-section-title">What I owned</h2>
            <ul className="pp-objectives">
              {project.objectives.map((o, i) => (
                <li key={i} className="pp-objectives__item">
                  <span className="pp-objectives__num" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>{o}</span>
                </li>
              ))}
            </ul>

            <h2 className="pp-section-title">Impact delivered</h2>
            <ul className="pp-outcomes">
              {project.outcomes.map((o, i) => (
                <li key={i} className="pp-outcome">
                  <span className="pp-outcome__check" aria-hidden="true" />
                  <span>{o}</span>
                </li>
              ))}
            </ul>

            <h2 className="pp-section-title">Skills demonstrated</h2>
            <div className="pp-skills">
              <div className="pp-skills__group">
                <div className="pp-skills__title">Technical</div>
                <div className="pp-skills__pills">
                  {(project.technicalSkills ?? project.stack).map((s) => (
                    <span key={s} className="pp-skill-pill">{s}</span>
                  ))}
                </div>
              </div>
              <div className="pp-skills__group">
                <div className="pp-skills__title">Leadership & collaboration</div>
                <div className="pp-skills__pills">
                  {(project.softSkills ?? []).map((s) => (
                    <span key={s} className="pp-skill-pill pp-skill-pill--soft">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right — specs sidebar */}
          <aside className="pp-specs">
            <div className="pp-specs__title">Project Details</div>
            <div className="pp-specs__row">
              <span className="pp-specs__key">Period</span>
              <span className="pp-specs__val">{project.period}</span>
            </div>
            <div className="pp-specs__row">
              <span className="pp-specs__key">Type</span>
              <span className="pp-specs__val">{project.difficulty}</span>
            </div>
            {project.role && (
              <div className="pp-specs__row">
                <span className="pp-specs__key">Role</span>
                <span className="pp-specs__val">{project.role}</span>
              </div>
            )}
            {project.team && (
              <div className="pp-specs__row">
                <span className="pp-specs__key">Team</span>
                <span className="pp-specs__val">{project.team}</span>
              </div>
            )}
            <div className="pp-specs__row">
              <span className="pp-specs__key">Category</span>
              <span className="pp-specs__val">{project.genre}</span>
            </div>
            <div className="pp-specs__row pp-specs__row--stack">
              <span className="pp-specs__key">Stack</span>
              <span className="pp-specs__val">{project.stack.join(', ')}</span>
            </div>
            {project.links.length > 0 && (
              <div className="pp-specs__links">
                {project.links.map((l) => (
                  <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="pp-specs__link">
                    <LinkIcon label={l.label} href={l.href} style={{ width: '1em', height: '1em', flexShrink: 0 }} />
                    {l.label}
                  </a>
                ))}
              </div>
            )}
          </aside>
        </div>
      </div>

      {/* ── Gallery ───────────────────────────────────────────────────── */}
      {project.gallery.length > 0 && (
        <section className="pp-gallery" style={{ '--pp-accent': accent } as React.CSSProperties}>
          <div className="container">
            <h2 className="pp-gallery__title">Project visuals</h2>
            <div className={galleryClass}>
              {project.gallery.map((img, i) => {
                const caption = project.galleryCaptions?.[i] ?? `${project.name} screenshot ${i + 1}`;
                return (
                  <figure
                    key={img + i}
                    className="pp-gallery__item"
                    onClick={() => openLightbox(i)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={e => e.key === 'Enter' && openLightbox(i)}
                    aria-label={`View fullscreen: ${caption}`}
                  >
                    <img src={img} alt={caption} className="pp-gallery__img" loading="lazy" />
                    <figcaption className="pp-gallery__cap">{caption}</figcaption>
                  </figure>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Next project ──────────────────────────────────────────────── */}
      <div className="pp-next" style={{ '--pp-accent': nextProject.accentColor ?? '#e8ff38' }}>
        <div className="container">
          <Link to={`/project/${nextProject.slug}`} className="pp-next__link">
            <div>
              <div className="pp-next__label">Next Project</div>
              <div className="pp-next__name">{nextProject.name}</div>
            </div>
            <span className="pp-next__arrow">
              <IconArrowRight style={{ width: '1.4em', height: '1.4em' }} />
            </span>
          </Link>
        </div>
      </div>

      {/* ── Lightbox (portal → document.body) ───────────────────────── */}
      {lightbox.open && createPortal(
        <div className="pp-lb" onClick={closeLightbox} role="dialog" aria-modal="true" aria-label="Image lightbox">
          <button className="pp-lb__close" onClick={closeLightbox} aria-label="Close">✕</button>
          {galleryLen > 1 && (
            <>
              <button
                className="pp-lb__nav pp-lb__nav--prev"
                onClick={e => { e.stopPropagation(); lightboxPrev(); }}
                aria-label="Previous image"
              >‹</button>
              <button
                className="pp-lb__nav pp-lb__nav--next"
                onClick={e => { e.stopPropagation(); lightboxNext(); }}
                aria-label="Next image"
              >›</button>
            </>
          )}
          <div className="pp-lb__inner" onClick={e => e.stopPropagation()}>
            <img
              className="pp-lb__img"
              src={project.gallery[lightbox.idx]}
              alt={project.galleryCaptions?.[lightbox.idx] ?? `${project.name} screenshot ${lightbox.idx + 1}`}
            />
            <p className="pp-lb__cap">{project.galleryCaptions?.[lightbox.idx] ?? ''}</p>
            {galleryLen > 1 && (
              <p className="pp-lb__counter">{lightbox.idx + 1} / {galleryLen}</p>
            )}
          </div>
        </div>,
        document.body
      )}

    </div>
  );
}
