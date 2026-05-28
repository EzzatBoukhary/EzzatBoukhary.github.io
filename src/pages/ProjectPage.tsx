import { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projectCases } from '../data/siteData';
import {
  LinkIcon, IconArrowLeft, IconArrowRight,
} from '../components/Icons';
import { TechIcon } from '../components/TechIcon';
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

/** Scales the opacity component of a rgba() string by a factor */
function scaleOpacity(rgba: string, factor: number): string {
  return rgba.replace(/,\s*([\d.]+)\)$/, (_, o) => `, ${(parseFloat(o) * factor).toFixed(3)})`);
}

/** Full-page ambient gradient — visible continuation of the hero palette */
function buildPageBg(slug: string): string {
  const t = PROJECT_THEME[slug];
  if (!t) return '#06060a';
  return [
    // Main spotlight — echoes the hero's top-right bloom, but taller
    `radial-gradient(ellipse 90% 40% at 75% 0%,   ${scaleOpacity(t.a, 0.40)} 0%, transparent 65%)`,
    // Bottom-left secondary fill
    `radial-gradient(ellipse 60% 35% at 10% 100%, ${scaleOpacity(t.b, 0.28)} 0%, transparent 60%)`,
    // Wide mid-page ambient tint
    `radial-gradient(ellipse 80% 55% at 50% 55%,  ${scaleOpacity(t.c, 0.22)} 0%, transparent 70%)`,
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
  const prevProject = projectCases[(currentIdx - 1 + projectCases.length) % projectCases.length];

  const accent      = project?.accentColor ?? '#e8ff38';
  const heroBg      = buildHeroBg(slug ?? '');
  const pageBg      = buildPageBg(slug ?? '');
  const dotColor    = PROJECT_DOTS[slug ?? ''] ?? 'rgba(255,255,255,0.07)';
  const patternSlug = PROJECT_PATTERN[slug ?? ''];

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
      // Hero entrance
      gsap.from('.pp-hero__back', { x: -18, opacity: 0, duration: 0.5, ease: 'power3.out', delay: 0.08 });
      gsap.from('.pp-hero__counter', { opacity: 0, duration: 0.6, ease: 'power2.out', delay: 0.12 });
      gsap.from('.pp-hero__genre', { y: 14, opacity: 0, duration: 0.5, ease: 'power3.out', delay: 0.18 });
      gsap.from('.pp-hero__name', { clipPath: 'inset(0 100% 0 0)', duration: 1.0, ease: 'power4.out', delay: 0.28 });
      gsap.from('.pp-hero__tagline', { y: 24, opacity: 0, duration: 0.65, ease: 'power3.out', delay: 0.48 });
      gsap.from('.pp-hero__links', { y: 16, opacity: 0, duration: 0.55, ease: 'power3.out', delay: 0.6 });
      gsap.from('.pp-hero__chips', { y: 12, opacity: 0, duration: 0.5, ease: 'power3.out', delay: 0.68 });
      gsap.from('.pp-hero__info-strip', { opacity: 0, duration: 0.6, ease: 'power2.out', delay: 0.75 });

      // Photo stack: images fan in from right
      gsap.from('.pp-hero-photos', {
        x: 60, opacity: 0, duration: 0.9, ease: 'power3.out', delay: 0.35,
      });

      // Hero orbs parallax
      gsap.to('.pp-hero__orb--1', { yPercent: 45, ease: 'none', scrollTrigger: { trigger: '.pp-hero', start: 'top top', end: 'bottom top', scrub: 1.2 } });
      gsap.to('.pp-hero__orb--2', { yPercent: 28, ease: 'none', scrollTrigger: { trigger: '.pp-hero', start: 'top top', end: 'bottom top', scrub: 1.8 } });
      gsap.to('.pp-hero__dots', { yPercent: 18, ease: 'none', scrollTrigger: { trigger: '.pp-hero', start: 'top top', end: 'bottom top', scrub: 1 } });

      // Stats bar
      gsap.from('.pp-stat', {
        y: 28, opacity: 0, stagger: 0.08, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: '.pp-stats', start: 'top 88%', once: true },
      });
      document.querySelectorAll('.pp-stat__val').forEach((el) => {
        const htmlEl = el as HTMLElement;
        const raw = htmlEl.dataset.count ?? htmlEl.textContent ?? '';
        const m = raw.match(/^(~?)([\d,.]+)(.*)$/);
        if (!m) return;
        const prefix = m[1];
        const num = parseFloat(m[2].replace(/,/g, ''));
        const suffix = m[3];
        if (isNaN(num) || num === 0) return;
        htmlEl.textContent = prefix + '0' + suffix;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: num, duration: 1.4, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          onUpdate() { const v = Math.round(obj.val); htmlEl.textContent = prefix + (v >= 1000 ? v.toLocaleString() : v) + suffix; },
          onComplete() { htmlEl.textContent = raw; },
        });
      });

      // Summary — simple fade, no clip-path delay
      gsap.from('.pp-summary__text', {
        y: 20, opacity: 0, duration: 0.65, ease: 'power3.out',
        scrollTrigger: { trigger: '.pp-summary', start: 'top 92%', once: true },
      });

      // Narrative cols — subtle fade-in, no big horizontal movement
      const challengeCol = document.querySelector('.pp-narrative__col--challenge');
      const winCol = document.querySelector('.pp-narrative__col--win');
      if (challengeCol) gsap.from(challengeCol, { y: 18, opacity: 0, duration: 0.5, ease: 'power3.out', scrollTrigger: { trigger: '.pp-narrative__grid', start: 'top 92%', once: true } });
      if (winCol) gsap.from(winCol, { y: 18, opacity: 0, duration: 0.5, ease: 'power3.out', delay: 0.07, scrollTrigger: { trigger: '.pp-narrative__grid', start: 'top 92%', once: true } });

      // Objectives — scroll-driven horizontal offset (content readable immediately)
      document.querySelectorAll('.pp-objectives__item').forEach((item, i) => {
        gsap.fromTo(item,
          { x: 0 },
          { x: -8, ease: 'none',
            scrollTrigger: { trigger: item, start: 'top bottom', end: 'bottom top', scrub: 0.6 } }
        );
      });

      // Outcomes — simple staggered fade, fires early
      gsap.from('.pp-outcome', { y: 10, opacity: 0, stagger: 0.05, duration: 0.4, ease: 'power2.out', scrollTrigger: { trigger: '.pp-outcomes', start: 'top 94%', once: true } });

      // Skills pop in — fires early
      gsap.from('.pp-skill-pill', { scale: 0.8, opacity: 0, stagger: 0.025, duration: 0.3, ease: 'back.out(1.4)', scrollTrigger: { trigger: '.pp-all-skills', start: 'top 94%', once: true } });

      // Project navigation
      gsap.from('.pp-project-nav__card', { y: 24, opacity: 0, stagger: 0.08, duration: 0.55, ease: 'power3.out', scrollTrigger: { trigger: '.pp-project-nav', start: 'top 90%', once: true } });
    }, pageRef);
    return () => ctx.revert();
  }, [project, slug]);

  // ── Gallery drag-to-scroll ───────────────────────────────────────────
  const galleryScrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);
  const onGalleryMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    dragStartX.current = e.pageX - (galleryScrollRef.current?.offsetLeft ?? 0);
    dragScrollLeft.current = galleryScrollRef.current?.scrollLeft ?? 0;
    galleryScrollRef.current?.classList.add('is-grabbing');
  };
  const onGalleryMouseLeave = () => {
    isDragging.current = false;
    galleryScrollRef.current?.classList.remove('is-grabbing');
  };
  const onGalleryMouseUp = () => {
    isDragging.current = false;
    galleryScrollRef.current?.classList.remove('is-grabbing');
  };
  const onGalleryMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !galleryScrollRef.current) return;
    e.preventDefault();
    const x    = e.pageX - galleryScrollRef.current.offsetLeft;
    const walk = (x - dragStartX.current) * 1.6;
    galleryScrollRef.current.scrollLeft = dragScrollLeft.current - walk;
  };

  // ── Lightbox ─────────────────────────────────────────────────────────
  const [lightbox, setLightbox] = useState<{ open: boolean; view: 'grid' | 'single'; idx: number }>({ open: false, view: 'grid', idx: 0 });
  const galleryLen    = project?.gallery.length ?? 0;
  const openLightbox  = useCallback(() =>
    setLightbox({ open: true, view: galleryLen <= 1 ? 'single' : 'grid', idx: 0 }),
  [galleryLen]);
  const openSingle    = useCallback((idx: number) => setLightbox({ open: true, view: 'single', idx }), []);
  const backToGrid    = useCallback(() => setLightbox(l => ({ ...l, view: 'grid' })), []);
  const closeLightbox = useCallback(() => setLightbox(l => ({ ...l, open: false })), []);
  const lightboxPrev  = useCallback(() =>
    setLightbox(l => ({ open: true, view: 'single', idx: (l.idx - 1 + galleryLen) % Math.max(galleryLen, 1) })),
  [galleryLen]);
  const lightboxNext  = useCallback(() =>
    setLightbox(l => ({ open: true, view: 'single', idx: (l.idx + 1) % Math.max(galleryLen, 1) })),
  [galleryLen]);

  useEffect(() => {
    if (!lightbox.open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightbox.view === 'single' && galleryLen > 1) backToGrid();
        else closeLightbox();
      }
      if (lightbox.view === 'single') {
        if (e.key === 'ArrowLeft')  lightboxPrev();
        if (e.key === 'ArrowRight') lightboxNext();
      }
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightbox.open, lightbox.view, closeLightbox, backToGrid, lightboxPrev, lightboxNext, galleryLen]);

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

  const hasImages = project.gallery.length > 0;

  return (
    <div className="project-page page-enter" ref={pageRef} style={{ background: pageBg }}>

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

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <header className="pp-hero" style={{ background: heroBg, '--pp-accent': accent, '--pp-dots': dotColor } as React.CSSProperties}>
        <div className="pp-hero__dots" aria-hidden="true" />
        {patternSlug && <div className={`pp-hero__pattern pp-hero__pattern--${patternSlug}`} aria-hidden="true" />}
        <div className="pp-hero__orb pp-hero__orb--1" aria-hidden="true" />
        <div className="pp-hero__orb pp-hero__orb--2" aria-hidden="true" />

        <div className="container pp-hero__inner">
          {/* Top bar */}
          <div className="pp-hero__topbar">
            <Link to="/#projects" className="pp-hero__back">
              <IconArrowLeft style={{ width: '1em', height: '1em' }} />
              All Projects
            </Link>
            <span className="pp-hero__counter">
              {String(currentIdx + 1).padStart(2, '0')} / {String(projectCases.length).padStart(2, '0')}
            </span>
          </div>

          {/* Two-column body */}
          <div className={`pp-hero__body${!hasImages ? ' pp-hero__body--solo' : ''}`}>

            {/* Left: identity */}
            <div className="pp-hero__left">
              <div className="pp-hero__genre">
                <span className="pp-hero__genre-dot" aria-hidden="true" />
                {genreLabel}
              </div>

              <h1 className="pp-hero__name">{project.name}</h1>
              <p className="pp-hero__tagline">{project.tagline}</p>

              {/* Links — top priority */}
              {project.links.length > 0 && (
                <div className="pp-hero__links">
                  {project.links.map((l) => (
                    <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="pp-hero__link">
                      <LinkIcon label={l.label} href={l.href} style={{ width: '1em', height: '1em', flexShrink: 0 }} />
                      {l.label}
                    </a>
                  ))}
                </div>
              )}

              {/* Tech chips */}
              <div className="pp-hero__chips">
                {project.stack.slice(0, 6).map((t) => (
                  <span key={t} className="pp-hero__chip">
                    <TechIcon name={t} style={{ fontSize: '0.75rem', flexShrink: 0 }} />
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: photo stack */}
            {hasImages && (
              <div className="pp-hero__right">
                <div className="pp-hero-photos" onClick={openLightbox} role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && openLightbox()} aria-label="View project images">
                  {project.gallery.slice(0, 3).map((img, i) => (
                    <div key={img + i} className="pp-hero-photos__item">
                      <img src={img} alt={project.galleryCaptions?.[i] ?? `${project.name} screenshot`} />
                    </div>
                  ))}
                </div>
                {project.gallery.length > 1 && (
                  <span className="pp-hero-photos__count">{project.gallery.length} images · click to view</span>
                )}
              </div>
            )}
          </div>

          {/* Info strip */}
          <div className="pp-hero__info-strip">
            <span className="pp-hero__info-item">{project.period}</span>
            {project.role && <span className="pp-hero__info-item">{project.role}</span>}
            {project.team && <span className="pp-hero__info-item">{project.team}</span>}
            <span className="pp-hero__info-item">{project.difficulty}</span>
            <span className="pp-hero__info-item">{genreLabel}</span>
          </div>
        </div>

      </header>

      {/* ── Stats bar ─────────────────────────────────────────────────────── */}
      {project.stats && (
        <div className="pp-stats" style={{ '--pp-accent': accent } as React.CSSProperties}>
          <div className="container">
            <div className="pp-stats__grid">
              {project.stats.map((s) => (
                <div key={s.label} className="pp-stat">
                  <span className="pp-stat__val" data-count={s.value}>{s.value}</span>
                  <span className="pp-stat__lbl">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Summary ───────────────────────────────────────────────────────── */}
      <section className="pp-summary" style={{ '--pp-accent': accent } as React.CSSProperties}>
        <div className="container">
          <p className="pp-summary__text">{project.summary}</p>
        </div>
      </section>

      {/* ── Narrative — challenge / win ────────────────────────────────────── */}
      {(project.challenge || project.signatureWin) && (
        <section className="pp-narrative" style={{ '--pp-accent': accent } as React.CSSProperties}>
          <div className="container">
            <div className="pp-narrative__grid">
              {project.challenge && (
                <div className="pp-narrative__col pp-narrative__col--challenge">
                  <div className="pp-narrative__col-label">Core challenge</div>
                  <p className="pp-narrative__col-text">{project.challenge}</p>
                </div>
              )}
              {project.signatureWin && (
                <div className="pp-narrative__col pp-narrative__col--win">
                  <div className="pp-narrative__col-label">Signature win</div>
                  <p className="pp-narrative__col-text">{project.signatureWin}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}


      {/* ── Body ──────────────────────────────────────────────────────────── */}
      <div className="pp-body" style={{ '--pp-accent': accent } as React.CSSProperties}>
        <div className="container">
          <div className="pp-main">
            <h2 className="pp-section-title">What I built</h2>
            <ul className="pp-objectives">
              {project.objectives.map((o, i) => (
                <li key={i} className="pp-objectives__item">
                  <span className="pp-objectives__num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  <span>{o}</span>
                </li>
              ))}
            </ul>

            <h2 className="pp-section-title">What shipped</h2>
            <ul className="pp-outcomes">
              {project.outcomes.map((o, i) => (
                <li key={i} className="pp-outcome">
                  <span className="pp-outcome__check" aria-hidden="true" />
                  <span>{o}</span>
                </li>
              ))}
            </ul>

            <h2 className="pp-section-title">Stack</h2>
            <div className="pp-all-skills">
              <div className="pp-skills__pills">
                {(project.technicalSkills ?? project.stack).map((s) => (
                  <span key={s} className="pp-skill-pill">
                    <TechIcon name={s} style={{ fontSize: '0.9rem', flexShrink: 0 }} />
                    {s}
                  </span>
                ))}
                {(project.softSkills ?? []).map((s) => (
                  <span key={s} className="pp-skill-pill pp-skill-pill--soft">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Prev / Next project ───────────────────────────────────────────── */}
      <div className="pp-project-nav">
        <div className="container">
          <div className="pp-project-nav__grid">
            <Link
              to={`/project/${prevProject.slug}`}
              className="pp-project-nav__card"
              style={{ '--nav-accent': prevProject.accentColor ?? '#e8ff38' } as React.CSSProperties}
            >
              <div className="pp-project-nav__dir">
                <IconArrowLeft style={{ width: '1em', height: '1em' }} />
                Previous
              </div>
              <div className="pp-project-nav__name">{prevProject.name}</div>
            </Link>
            <Link
              to={`/project/${nextProject.slug}`}
              className="pp-project-nav__card pp-project-nav__card--next"
              style={{ '--nav-accent': nextProject.accentColor ?? '#e8ff38' } as React.CSSProperties}
            >
              <div className="pp-project-nav__dir">
                Next
                <IconArrowRight style={{ width: '1em', height: '1em' }} />
              </div>
              <div className="pp-project-nav__name">{nextProject.name}</div>
            </Link>
          </div>
        </div>
      </div>

      {/* ── Lightbox ──────────────────────────────────────────────────────── */}
      {lightbox.open && createPortal(
        <div
          className={`pp-lb${lightbox.view === 'grid' ? ' pp-lb--grid' : ''}`}
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          <button className="pp-lb__close" onClick={closeLightbox} aria-label="Close">✕</button>

          {lightbox.view === 'grid' ? (
            /* ── Grid view: all images ── */
            <div className="pp-lb__grid-wrap" onClick={e => e.stopPropagation()}>
              <div className="pp-lb__grid-header">
                <span className="pp-lb__grid-title">{project.name}</span>
                <span className="pp-lb__grid-count">{galleryLen} image{galleryLen !== 1 ? 's' : ''}</span>
              </div>
              <div className="pp-lb__grid">
                {project.gallery.map((img, i) => (
                  <div
                    key={img + i}
                    className="pp-lb__grid-item"
                    style={{ '--i': i } as React.CSSProperties}
                    onClick={() => openSingle(i)}
                  >
                    <img src={img} alt={project.galleryCaptions?.[i] ?? `${project.name} screenshot ${i + 1}`} />
                    {project.galleryCaptions?.[i] && (
                      <p className="pp-lb__grid-cap">{project.galleryCaptions[i]}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* ── Single view ── */
            <>
              {galleryLen > 1 && (
                <button className="pp-lb__grid-back" onClick={e => { e.stopPropagation(); backToGrid(); }} aria-label="Back to all images">
                  ← All images
                </button>
              )}
              {galleryLen > 1 && (
                <>
                  <button className="pp-lb__nav pp-lb__nav--prev" onClick={e => { e.stopPropagation(); lightboxPrev(); }} aria-label="Previous image">‹</button>
                  <button className="pp-lb__nav pp-lb__nav--next" onClick={e => { e.stopPropagation(); lightboxNext(); }} aria-label="Next image">›</button>
                </>
              )}
              <div className="pp-lb__inner" onClick={e => e.stopPropagation()}>
                <img
                  className="pp-lb__img"
                  src={project.gallery[lightbox.idx]}
                  alt={project.galleryCaptions?.[lightbox.idx] ?? `${project.name} screenshot ${lightbox.idx + 1}`}
                />
                {project.galleryCaptions?.[lightbox.idx] && (
                  <p className="pp-lb__cap">{project.galleryCaptions[lightbox.idx]}</p>
                )}
                {galleryLen > 1 && <p className="pp-lb__counter">{lightbox.idx + 1} / {galleryLen}</p>}
              </div>
            </>
          )}
        </div>,
        document.body
      )}

    </div>
  );
}
