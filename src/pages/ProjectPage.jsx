import { useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projectCases } from '../data/siteData.js';
import {
  LinkIcon, IconArrowLeft, IconArrowRight,
} from '../components/Icons.jsx';

gsap.registerPlugin(ScrollTrigger);

// ── Per-project hero backgrounds (dark, distinctly themed) ────────────────
const PROJECT_HERO_BG = {
  'gesture-based-puppetry': 'radial-gradient(ellipse 80% 60% at 60% 40%, rgba(168,85,247,0.2) 0%, transparent 70%), #07040f',
  'college-event-platform': 'radial-gradient(ellipse 80% 60% at 60% 40%, rgba(14,165,233,0.18) 0%, transparent 70%), #020c18',
  'dragonotchi':             'radial-gradient(ellipse 80% 60% at 60% 40%, rgba(249,115,22,0.2) 0%, transparent 70%), #120500',
  'killerbot':               'radial-gradient(ellipse 80% 60% at 60% 40%, rgba(232,255,56,0.14) 0%, transparent 70%), #0a0a00',
  'campus-critters':         'radial-gradient(ellipse 80% 60% at 60% 40%, rgba(34,197,94,0.18) 0%, transparent 70%), #021008',
};

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

  const accent = project?.accentColor ?? '#e8ff38';
  const heroBg = PROJECT_HERO_BG[slug] ?? '#06060a';

  useEffect(() => {
    if (!project) { navigate('/'); return; }
    window.scrollTo(0, 0);
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
    }, pageRef);
    return () => ctx.revert();
  }, [project, slug]);

  if (!project) return null;

  const genreLabel = GENRE_SHORT[project.genre] ?? project.genre;

  return (
    <div className="project-page page-enter" ref={pageRef}>

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <header className="pp-hero" style={{ background: heroBg, '--pp-accent': accent }}>
        <div className="pp-hero__dots" aria-hidden="true" />
        <div className="pp-hero__mono" aria-hidden="true">{project.name.split(' ')[0].toUpperCase()}</div>

        <div className="container pp-hero__inner">
          <Link to="/#projects" className="pp-hero__back">
            <IconArrowLeft style={{ width: '1em', height: '1em' }} />
            All Projects
          </Link>

          <div className="pp-hero__tag">
            <span className="pp-hero__tag-dot" aria-hidden="true" />
            {genreLabel} · {project.difficulty}
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
            <h2 className="pp-section-title">Overview</h2>
            <p className="pp-text">{project.summary}</p>

            <h2 className="pp-section-title">Objectives</h2>
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

            <h2 className="pp-section-title">Outcomes</h2>
            <ul className="pp-outcomes">
              {project.outcomes.map((o, i) => (
                <li key={i} className="pp-outcome">
                  <span className="pp-outcome__check" aria-hidden="true" />
                  <span>{o}</span>
                </li>
              ))}
            </ul>
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
            <div className="pp-specs__row">
              <span className="pp-specs__key">Genre</span>
              <span className="pp-specs__val">{genreLabel}</span>
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
        <div className="pp-gallery" style={{ '--pp-accent': accent }}>
          <div className="container">
            <h2 className="pp-gallery__title">Gallery</h2>
            <div className={`pp-gallery__grid pp-gallery__grid--${project.gallery.length}`}>
              {project.gallery.map((img, i) => (
                <div key={i} className="pp-gallery__item">
                  <img
                    src={img}
                    alt={`${project.name} screenshot ${i + 1}`}
                    className="pp-gallery__img"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
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

    </div>
  );
}
