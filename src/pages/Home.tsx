import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Marquee from '../components/Marquee';
import { useReveal } from '../hooks/useReveal';
import { IconGitHub, IconLinkedIn, LinkIcon, IconArrowRight, IconExternalLink, IconPin, IconGamepad, IconTrophy, IconEmail } from '../components/Icons';
import { TechIcon } from '../components/TechIcon';
import {
  profile, links, gameStats, achievements,
  experience, recommendations, projectCases, skillMatrix,
} from '../data/siteData';

gsap.registerPlugin(ScrollTrigger);

// ─── Typing role animation ─────────────────────────────────────────────────
const ROLES = ['Software Engineer', 'Mobile Developer', 'Full-Stack Developer', 'Product Engineer'];

function TypingRole() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [text, setText]       = useState('');
  const [del, setDel]         = useState(false);

  useEffect(() => {
    const full = ROLES[roleIdx];
    let t;
    if (!del && text.length < full.length) {
      t = setTimeout(() => setText(full.slice(0, text.length + 1)), 70);
    } else if (!del && text.length === full.length) {
      t = setTimeout(() => setDel(true), 2000);
    } else if (del && text.length > 0) {
      t = setTimeout(() => setText(text.slice(0, -1)), 36);
    } else {
      setDel(false);
      setRoleIdx((i) => (i + 1) % ROLES.length);
    }
    return () => clearTimeout(t);
  }, [text, del, roleIdx]);

  return (
    <span className="hero__role">
      <span className="hero__role-text">{text}</span>
      <span className="hero__cursor" aria-hidden="true">|</span>
    </span>
  );
}

// ─── Split characters for GSAP animation ──────────────────────────────────
function SplitName({ text }) {
  return (
    <>
      {text.split('').map((ch, i) => (
        <span key={i} className="char-wrap" aria-hidden="true">
          <span className="hero-char" style={{ display: 'inline-block', '--ci': i }}>
            {ch === ' ' ? '\u00A0' : ch}
          </span>
        </span>
      ))}
    </>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────
function HeroSection() {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Characters animate up from beneath clip wrappers
      gsap.from('.hero-char', {
        yPercent: 110,
        opacity: 0,
        stagger: 0.04,
        duration: 0.85,
        ease: 'power4.out',
        delay: 0.2,
      });
      // Sub elements fade in after
      gsap.from(['.hero__pill', '.hero__bio', '.hero__actions'], {
        opacity: 0,
        y: 22,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.95,
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" id="home" ref={heroRef}>
      <div className="hero__bg" aria-hidden="true" />
      <div className="hero__orb hero__orb--1" aria-hidden="true" />
      <div className="hero__orb hero__orb--2" aria-hidden="true" />

      <div className="container hero__inner">
        {/* Left — text */}
        <div>
          <div className="hero__pill">
            <span className="hero__pill-dot" aria-hidden="true" />
            UCF Computer Science · Class of 2025
          </div>

          <h1 className="hero__name" aria-label="Ezzat Boukhary">
            <span className="hero__name-line hero__name-line--outline">
              <SplitName text="EZZAT" />
            </span>
            <span className="hero__name-line hero__name-line--fill">
              <SplitName text="BOUKHARY" />
            </span>
          </h1>

          <TypingRole />

          <p className="hero__bio">{profile.summary}</p>

          <div className="hero__actions">
            <button
              type="button"
              className="btn btn--primary"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View My Work
            </button>
            <Link to="/contact" className="btn btn--outline">
              Get In Touch
            </Link>
          </div>
        </div>

        {/* Right — stat card */}
        <div className="hero__card">
          <div className="hero__card-label">Character Stats</div>
          <div className="hero__stat-grid">
            {gameStats.map((s, i) => (
              <div key={s.label} className="hero__stat">
                <div className="hero__stat-header">
                  <span className="hero__stat-lbl">{s.label}</span>
                  <span className="hero__stat-val">{s.value}</span>
                </div>
                <div className="hero__stat-track">
                  <div
                    className="hero__stat-fill"
                    style={{ width: `${s.fill}%`, '--sd': `${0.3 + i * 0.12}s` } as React.CSSProperties}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="hero__card-links">
            <a href={links.github}   target="_blank" rel="noreferrer" className="hero__card-link">
              <IconGitHub style={{ width: '1em', height: '1em' }} /> GitHub
            </a>
            <a href={links.linkedin} target="_blank" rel="noreferrer" className="hero__card-link">
              <IconLinkedIn style={{ width: '1em', height: '1em' }} /> LinkedIn
            </a>
            <Link to="/resume" className="hero__card-link">
              <IconArrowRight style={{ width: '1em', height: '1em' }} /> Resume
            </Link>
          </div>
        </div>
      </div>

      <div className="scroll-hint" aria-hidden="true">
        <span>scroll</span>
        <div className="scroll-hint__line" />
      </div>
    </section>
  );
}

// ─── Work / Projects ───────────────────────────────────────────────────────
const GENRE_SHORT = {
  'Realtime Graphics / Simulation':       'Graphics',
  'Full-Stack Product System':            'Full-Stack',
  'Hackathon / Game UX':                  'Hackathon',
  'Platform / Community Infrastructure':  'Platform',
  'Web + Mobile Product':                 'Mobile/Web',
};

function WorkCard({ project, index }: { project: typeof projectCases[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const accent = project.accentColor ?? '#e8ff38';
  return (
    <li
      className={`work-card${hovered ? ' work-card--hovered' : ''}`}
      style={{ '--wc-accent': accent } as React.CSSProperties}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link to={`/project/${project.slug}`} className="work-card__link">
        {/* Image fill */}
        <div className="work-card__img-wrap">
          <img src={project.gallery[0]} alt={project.name} className="work-card__img" />
          <div className="work-card__img-overlay" />
        </div>

        {/* Index badge */}
        <span className="work-card__num" aria-hidden="true">
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Accent glow behind card on hover */}
        <div className="work-card__glow" aria-hidden="true" />

        {/* Bottom content */}
        <div className="work-card__body">
          <div className="work-card__tags">
            <span className="work-card__tag">{GENRE_SHORT[project.genre] ?? project.genre}</span>
          </div>
          <h3 className="work-card__name">{project.name}</h3>
          <p className="work-card__tagline">{project.tagline}</p>

          {/* Stack pills — shown on hover */}
          <div className="work-card__stack">
            {project.stack.slice(0, 4).map((t) => (
              <span key={t} className="work-card__stack-pill">{t}</span>
            ))}
          </div>

          <div className="work-card__footer">
            <span className="work-card__period">{project.period}</span>
            <span className="work-card__cta">
              View Project <IconArrowRight style={{ width: '1em', height: '1em' }} />
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
}

function WorkSection() {
  const gridRef = useRef(null);
  const [ref, revealed] = useReveal(0.05);

  useEffect(() => {
    if (!revealed) return;
    const ctx = gsap.context(() => {
      gsap.from('.work-card', {
        opacity: 0, y: 40, scale: 0.97,
        stagger: 0.1, duration: 0.75, ease: 'power3.out',
      });
    }, gridRef);
    return () => ctx.revert();
  }, [revealed]);

  return (
    <section className="work-section" id="projects" ref={ref}>
      <div className={`container reveal ${revealed ? 'revealed' : ''}`}>
        <div className="work-section__top">
          <div>
            <p className="section-label">Selected Projects</p>
            <h2 className="work-section__heading">Featured Projects</h2>
          </div>
          <Link to="/resume" className="btn btn--outline">
            Full Resume <IconExternalLink style={{ width: '1em', height: '1em', marginLeft: '.25em' }} />
          </Link>
        </div>
        <ol className="work-grid" ref={gridRef}>
          {projectCases.map((project, i) => (
            <WorkCard key={project.slug} project={project} index={i} />
          ))}
        </ol>
      </div>
    </section>
  );
}

// ─── About ─────────────────────────────────────────────────────────────────
function AboutSection() {
  const [ref, revealed] = useReveal(0.1);
  return (
    <section className="about-section" id="about" ref={ref}>
      <div className={`container reveal ${revealed ? 'revealed' : ''}`}>
        <div className="about-section__grid">
          <div>
            <div className="about-section__img-wrap">
              <img src={profile.heroImage} alt="Ezzat Boukhary" className="about-section__img" />
            </div>
          </div>
          <div className="about-section__content">
            <p className="section-label">About Me</p>
            <p className="about-section__quote">
              I build products <span>end-to-end</span> and optimize them until they feel fast, reliable, and{' '}
              <span>genuinely useful</span>.
            </p>
            <p className="about-section__bio">{profile.mission}</p>
            <div className="about-section__facts">
              <div className="about-section__fact">
                <IconPin className="about-section__fact-icon" style={{ width: '1.1rem', height: '1.1rem' }} />
                <span>Florida · UCF Computer Science · Graduated Dec 2025, Summa Cum Laude</span>
              </div>
              <div className="about-section__fact">
                <IconGamepad className="about-section__fact-icon" style={{ width: '1.1rem', height: '1.1rem' }} />
                <span>Video games, TV shows, and building things I'd actually use</span>
              </div>
              <div className="about-section__fact">
                <IconTrophy className="about-section__fact-icon" style={{ width: '1.1rem', height: '1.1rem' }} />
                <span>Best Design Award · KnightHacks VI</span>
              </div>
              <div className="about-section__fact">
                <IconEmail className="about-section__fact-icon" style={{ width: '1.1rem', height: '1.1rem' }} />
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </div>
            </div>
            <div style={{ marginTop: '2rem', display: 'flex', gap: '.75rem', flexWrap: 'wrap' }}>
              <a href={links.github} target="_blank" rel="noreferrer" className="btn btn--outline">
                <IconGitHub style={{ width: '1em', height: '1em' }} /> GitHub
              </a>
              <a href={links.linkedin} target="_blank" rel="noreferrer" className="btn btn--outline">
                <IconLinkedIn style={{ width: '1em', height: '1em' }} /> LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Stats ─────────────────────────────────────────────────────────────────
function StatsSection() {
  const [ref, revealed] = useReveal(0.2);
  return (
    <section className="stats-section" ref={ref}>
      <div className={`container reveal ${revealed ? 'revealed' : ''}`}>
        <div className="stats-section__grid">
          {gameStats.map((s) => (
            <div key={s.label} className="stats-section__item">
              <div className="stats-section__val">{s.value}</div>
              <div className="stats-section__lbl">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Experience ────────────────────────────────────────────────────────────
const TYPE_COLOR: Record<string, string> = {
  'Full-Time':  '#e8ff38',
  'Part-Time':  '#00f5d0',
  'Internship': '#a78bfa',
  'Research':   '#fb923c',
  'Teaching':   '#38bdf8',
};

function ExperienceSection() {
  const [ref, revealed] = useReveal(0.05);
  return (
    <section className="exp-section" id="experience" ref={ref}>
      <div className={`container reveal ${revealed ? 'revealed' : ''}`}>
        <div className="exp-section__top">
          <div>
            <p className="section-label">Career</p>
            <h2 className="exp-section__heading">Work Experience</h2>
          </div>
        </div>
        <div className="exp-grid">
          {experience.map((item, i) => {
            const typeColor = TYPE_COLOR[item.type] ?? '#e8ff38';
            return (
              <div
                key={`${item.org}-${i}`}
                className={`exp-card${item.current ? ' exp-card--featured' : ''}`}
                style={{ '--exp-accent': typeColor } as React.CSSProperties}
              >
                {/* Top accent strip */}
                <div className="exp-card__strip" />

                <div className="exp-card__content">
                  {/* Top row: logo + title + link */}
                  <div className="exp-card__top">
                    <img src={item.logo} alt={item.org} className="exp-card__logo" />
                    <div className="exp-card__title-block">
                      <div className="exp-card__role-row">
                        <span className="exp-card__role">{item.role}</span>
                        {item.current && (
                          <span className="exp-card__now">● Now</span>
                        )}
                      </div>
                      <div className="exp-card__org-row">
                        <span className="exp-card__org">{item.org}</span>
                        <span className="exp-card__sep">·</span>
                        <span className="exp-card__type" style={{ color: typeColor }}>{item.type}</span>
                        <span className="exp-card__sep">·</span>
                        <span className="exp-card__period">{item.period}</span>
                      </div>
                    </div>
                    {item.href && (
                      <a href={item.href} target="_blank" rel="noreferrer"
                         className="exp-card__ext" aria-label={`${item.org} website`}>
                        <IconExternalLink style={{ width: '1em', height: '1em' }} />
                      </a>
                    )}
                  </div>

                  {/* Summary */}
                  <p className="exp-card__summary">{item.summary}</p>

                  {/* Highlights */}
                  <ul className="exp-card__bullets">
                    {item.highlights.map((pt) => (
                      <li key={pt} className="exp-card__bullet">
                        <span className="exp-card__bullet-dot" aria-hidden="true" />
                        <span dangerouslySetInnerHTML={{ __html: pt.replace(/(~?\d+[\d,+%x²]*([\+%\-]?\w*)?)/g, '<strong>$1</strong>') }} />
                      </li>
                    ))}
                  </ul>

                  {/* Stack chips */}
                  {item.stack && item.stack.length > 0 && (
                    <div className="exp-card__stack">
                      {item.stack.map((t) => (
                        <span key={t} className="exp-card__chip">{t}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Skills ─────────────────────────────────────────────────────────────────

function SkillsSection() {
  const [ref, revealed] = useReveal(0.05);
  return (
    <section className="skills-section" id="skills" ref={ref}>
      <div className={`container reveal ${revealed ? 'revealed' : ''}`}>
        <p className="section-label">Skills</p>
        <h2 className="skills-section__heading">Tech Stack</h2>

        <div className="skills-grid">
          {skillMatrix.map((group) => (
            <div key={group.category} className="skills-group">
              <div className="skills-group__cat">
                {group.category}
              </div>
              <ul className="skills-pills">
                {group.values.map((skill) => (
                  <li key={skill} className="skills-pill">
                    <TechIcon name={skill} style={{ fontSize: '1.1rem' }} />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="section-label" style={{ marginTop: '4rem' }}>Honors</p>
        <h3 className="skills-section__heading" style={{ fontSize: 'clamp(1.5rem,3vw,2.5rem)', marginBottom: '2rem' }}>
          Achievements
        </h3>
        <div className="achievements-grid">
          {achievements.map((a) => (
            <div key={a.title} className="achievement-card">
              <div className="achievement-card__title">{a.title}</div>
              <div className="achievement-card__detail">{a.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ──────────────────────────────────────────────────────────
function RecSection() {
  const [ref, revealed] = useReveal(0.1);
  return (
    <section className="rec-section" id="recommendations" ref={ref}>
      <div className={`container reveal ${revealed ? 'revealed' : ''}`}>
        <p className="section-label">From Colleagues</p>
        <h2 className="rec-section__heading">Recommendations</h2>
        <div className="rec-grid">
          {recommendations.map((rec) => (
            <blockquote key={rec.name} className="rec-card">
              <div className="rec-card__header">
                <img src={rec.avatar} alt={rec.name} className="rec-card__avatar" />
                <div>
                  <div className="rec-card__name">{rec.name}</div>
                  <div className="rec-card__role">{rec.role}</div>
                </div>
              </div>
              <p className="rec-card__quote">"{rec.quote}"</p>
              <div className="rec-card__links">
                {rec.links.map((l) => (
                  <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="rec-card__link">
                    <LinkIcon label={l.label} href={l.href} style={{ width: '.95em', height: '.95em', flexShrink: 0 }} />
                    {l.label}
                  </a>
                ))}
              </div>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────
function ContactSection() {
  const [ref, revealed] = useReveal(0.1);
  return (
    <section className="contact-section" id="contact" ref={ref}>
      <div className={`container reveal ${revealed ? 'revealed' : ''}`}>
        <p className="section-label contact-section__label">Contact</p>
        <h2 className="contact-section__heading">
          Let's build something<br />
          <em>that matters.</em>
        </h2>
        <p className="contact-section__sub">
          Primarily looking for full-time roles. Open to side projects or contracts if they're a good fit.
        </p>
        <Link to="/contact" className="btn btn--primary btn--lg">
          Let's Talk →
        </Link>
        <div className="contact-section__links">
          <a href={links.github}      target="_blank" rel="noreferrer" className="contact-section__link">
            <IconGitHub style={{ width: '1.15em', height: '1.15em' }} />
            GitHub
          </a>
          <a href={links.linkedin}    target="_blank" rel="noreferrer" className="contact-section__link">
            <IconLinkedIn style={{ width: '1.15em', height: '1.15em' }} />
            LinkedIn
          </a>
          <Link to="/resume" className="contact-section__link">
            <IconArrowRight style={{ width: '1.15em', height: '1.15em' }} />
            Resume
          </Link>
          <a href="/portfolio.html" target="_blank" rel="noreferrer" className="contact-section__link">
            <IconArrowRight style={{ width: '1.15em', height: '1.15em' }} />
            Portfolio PDF
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Home page ────────────────────────────────────────────────────────────
export default function Home() {
  const location = useLocation();

  // Handle SPA deep-link navigation (e.g. from nav when on another page)
  useEffect(() => {
    const scrollTo = (location.state as any)?.scrollTo;
    if (scrollTo) {
      // Wait for page to render, then scroll
      const timer = setTimeout(() => {
        const el = document.getElementById(scrollTo);
        if (el) {
          const lenis = (window as any).__lenis;
          lenis
            ? lenis.scrollTo(el, { offset: -80, duration: 1.2 })
            : el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 120);
      return () => clearTimeout(timer);
    }
    // Also handle direct URL hash (e.g. ezzatboukhary.github.io/#projects)
    const hash = window.location.hash.slice(1);
    if (hash) {
      const timer = setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          const lenis = (window as any).__lenis;
          lenis
            ? lenis.scrollTo(el, { offset: -80, duration: 1.2 })
            : el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 120);
      return () => clearTimeout(timer);
    }
  }, [location]);

  return (
    <main className="page-enter">
      <HeroSection />
      <Marquee />
      <ExperienceSection />
      <WorkSection />
      <AboutSection />
      <SkillsSection />
      <RecSection />
      <ContactSection />
    </main>
  );
}
