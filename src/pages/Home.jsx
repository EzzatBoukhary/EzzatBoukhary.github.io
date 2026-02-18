import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Marquee from '../components/Marquee.jsx';
import { useReveal } from '../hooks/useReveal.js';
import { IconGitHub, IconLinkedIn, LinkIcon, IconArrowRight } from '../components/Icons.jsx';
import {
  profile, links, gameStats, achievements,
  experience, recommendations, projectCases, skillMatrix,
} from '../data/siteData.js';

gsap.registerPlugin(ScrollTrigger);

// ─── Typing role animation ─────────────────────────────────────────────────
const ROLES = ['Software Engineer', 'Mobile Developer', 'Full-Stack Builder', 'Open Source Author'];

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
      <div className="hero__mono" aria-hidden="true">EB</div>

      <div className="container hero__inner">
        {/* Left — text */}
        <div>
          <div className="hero__pill">
            <span className="hero__pill-dot" aria-hidden="true" />
            Builder-Class Engineer · UCF CS
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
            <a href={`mailto:${profile.email}`} className="btn btn--outline">
              Get In Touch
            </a>
          </div>
        </div>

        {/* Right — stat card */}
        <div className="hero__card">
          <div className="hero__card-label">Character Stats</div>
          <div className="hero__stat-grid">
            {gameStats.map((s) => (
              <div key={s.label} className="hero__stat">
                <span className="hero__stat-val">{s.value}</span>
                <span className="hero__stat-lbl">{s.label}</span>
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
// Genre type abbreviations — no emoji (emoji rendering differs per platform)
const GENRE_SHORT = {
  'Realtime Graphics / Simulation':       'Graphics',
  'Full-Stack Product System':            'Full-Stack',
  'Hackathon / Game UX':                  'Hackathon',
  'Platform / Community Infrastructure':  'Platform',
  'Web + Mobile Product':                 'Mobile/Web',
};

// Bento grid – first project spans 2 rows, rest fill in
function ProjectBento() {
  return (
    <div className="project-bento">
      {projectCases.map((p) => (
        <Link key={p.slug} to={`/project/${p.slug}`} className="project-bento__item">
          <img src={p.gallery[0]} alt={p.name} className="project-bento__img" />
          <div className="project-bento__overlay">
            <p className="project-bento__title">{p.name}</p>
            <p className="project-bento__tag">{GENRE_SHORT[p.genre] ?? p.genre}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

function WorkSection() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [activeSlug, setActiveSlug]   = useState(null);
  const sectionRef = useRef(null);
  const listRef    = useRef(null);
  const [ref, revealed] = useReveal(0.05);

  // Update floating image position
  const onMouseMove = (e) => setCursorPos({ x: e.clientX, y: e.clientY });

  // GSAP stagger for work items once revealed
  useEffect(() => {
    if (!revealed) return;
    const ctx = gsap.context(() => {
      gsap.from('.work-item', {
        opacity: 0,
        y: 30,
        stagger: 0.08,
        duration: 0.7,
        ease: 'power3.out',
      });
    }, listRef);
    return () => ctx.revert();
  }, [revealed]);

  const activeProject = projectCases.find((p) => p.slug === activeSlug);

  return (
    <section
      className="work-section"
      id="projects"
      ref={(el) => { sectionRef.current = el; ref.current = el; }}
      onMouseMove={onMouseMove}
    >
      {/* Floating cursor image */}
      <div
        className={`work-cursor-img ${activeSlug ? 'work-cursor-img--visible' : ''}`}
        style={{ left: cursorPos.x + 28, top: cursorPos.y - 130, position: 'fixed' }}
        aria-hidden="true"
      >
        {activeProject && (
          <img src={activeProject.gallery[0]} alt={activeProject.name} />
        )}
      </div>

      <div className={`container reveal ${revealed ? 'revealed' : ''}`}>
        <div className="work-section__top">
          <div>
            <p className="section-label">Selected Work</p>
            <h2 className="work-section__heading">Featured Quests</h2>
          </div>
          <Link to="/resume" className="btn btn--outline">
            Full Résumé ↗
          </Link>
        </div>

        {/* Screenshot bento grid */}
        <ProjectBento />

        <ol className="work-list" ref={listRef}>
          {projectCases.map((project, i) => (
            <li key={project.slug} className="work-item">
              <Link
                to={`/project/${project.slug}`}
                className="work-item__inner"
                onMouseEnter={() => setActiveSlug(project.slug)}
                onMouseLeave={() => setActiveSlug(null)}
                style={{ display: 'flex' }}
              >
                <span className="work-item__num">0{i + 1}</span>
                <img
                  src={project.gallery[0]}
                  alt=""
                  className="work-item__thumb"
                  aria-hidden="true"
                />
                <div className="work-item__text">
                  <h3 className="work-item__name">{project.name}</h3>
                  <div className="work-item__meta">
                    <span className="work-item__tag">
                      {GENRE_SHORT[project.genre] ?? project.genre}
                    </span>
                    <span>{project.period}</span>
                  </div>
                </div>
                <span className="work-item__arrow">→</span>
              </Link>
            </li>
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
                <span className="about-section__fact-icon">📍</span>
                <span>Florida · UCF Computer Science</span>
              </div>
              <div className="about-section__fact">
                <span className="about-section__fact-icon">🎮</span>
                <span>Video games, TV shows, and building things I'd actually use</span>
              </div>
              <div className="about-section__fact">
                <span className="about-section__fact-icon">🏆</span>
                <span>Best Design Award · KnightHacks VI</span>
              </div>
              <div className="about-section__fact">
                <span className="about-section__fact-icon">📧</span>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </div>
            </div>
            <div style={{ marginTop: '2rem', display: 'flex', gap: '.75rem', flexWrap: 'wrap' }}>
              <a href={links.github} target="_blank" rel="noreferrer" className="btn btn--outline">
                GitHub ↗
              </a>
              <a href={links.linkedin} target="_blank" rel="noreferrer" className="btn btn--outline">
                LinkedIn ↗
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
function ExperienceSection() {
  const [ref, revealed] = useReveal(0.05);
  return (
    <section className="exp-section" id="experience" ref={ref}>
      <div className={`container reveal ${revealed ? 'revealed' : ''}`}>
        <p className="section-label">Career</p>
        <h2 className="exp-section__heading">Campaign Log</h2>
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
                    <a href={item.href} target="_blank" rel="noreferrer" className="tl-item__ext" aria-label={`${item.org} site`}>
                      ↗
                    </a>
                  )}
                </div>
                <p className="tl-item__summary">{item.summary}</p>
                <ul className="tl-item__bullets">
                  {item.highlights.map((pt) => <li key={pt}>{pt}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Skills ─────────────────────────────────────────────────────────────────
const SKILL_CAT_TAG = {
  'Languages':        'Lang',
  'Frameworks':       'UI/API',
  'Platforms':        'Infra',
  'Engineering Style':'Process',
};

function SkillsSection() {
  const [ref, revealed] = useReveal(0.05);
  return (
    <section className="skills-section" id="skills" ref={ref}>
      <div className={`container reveal ${revealed ? 'revealed' : ''}`}>
        <p className="section-label">Loadout</p>
        <h2 className="skills-section__heading">Tech Stack</h2>

        <div className="skills-grid">
          {skillMatrix.map((group) => (
            <div key={group.category} className="skills-group">
              <div className="skills-group__cat">
                {SKILL_CAT_TAG[group.category] ? (
                  <span className="skills-group__tag-badge">{SKILL_CAT_TAG[group.category]}</span>
                ) : null}
                {group.category}
              </div>
              <ul className="skills-pills">
                {group.values.map((skill) => (
                  <li key={skill} className="skills-pill">{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="section-label" style={{ marginTop: '4rem' }}>Unlocked</p>
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
        <p className="section-label">Allies</p>
        <h2 className="rec-section__heading">Party Approved</h2>
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
          Open to full-time roles, interesting collaborations, and products that reach real people.
        </p>
        <a href={`mailto:${profile.email}`} className="btn btn--primary btn--lg">
          {profile.email}
        </a>
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
        </div>
      </div>
    </section>
  );
}

// ─── Home page ────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <main className="page-enter">
      <HeroSection />
      <Marquee />
      <WorkSection />
      <AboutSection />
      <StatsSection />
      <ExperienceSection />
      <SkillsSection />
      <RecSection />
      <ContactSection />
    </main>
  );
}
