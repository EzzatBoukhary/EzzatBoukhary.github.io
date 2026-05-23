import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SEOHead, { SITE_URL, PROFILE_IMAGE } from '../components/SEOHead';
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

// typing animation that cycles through role titles
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

// splits a string into individually animatable spans for GSAP
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

// hero section
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
            {profile.educationBadge}
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
          <p className="hero__source">
            <span aria-hidden="true">// </span>built with React + Vite · <a
              href="https://github.com/EzzatBoukhary/EzzatBoukhary.github.io"
              target="_blank"
              rel="noreferrer"
              className="hero__source-link"
            >view source</a>
          </p>
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

// projects / work section
const GENRE_SHORT = {
  'Realtime Graphics / Simulation':       'Graphics',
  'Full-Stack Product System':            'Full-Stack',
  'Hackathon / Game UX':                  'Hackathon',
  'Platform / Community Infrastructure':  'Platform',
  'Web + Mobile Product':                 'Mobile/Web',
};

function resolveVisibleStackIndex(root: HTMLElement | null, selector: string) {
  if (!root) return 0;

  const cards = Array.from(root.querySelectorAll(selector)) as HTMLElement[];
  if (cards.length === 0) return 0;

  const focusY = Math.min(Math.max(window.innerHeight * 0.42, 1), window.innerHeight - 1);

  const spanningCards = cards
    .map((card, index) => ({ card, index, rect: card.getBoundingClientRect() }))
    .filter(({ rect }) => rect.top <= focusY && rect.bottom >= focusY);

  if (spanningCards.length > 0) {
    return spanningCards[spanningCards.length - 1].index;
  }

  let bestIndex = 0;
  let bestDistance = Number.POSITIVE_INFINITY;

  cards.forEach((card, index) => {
    const rect = card.getBoundingClientRect();
    const distance = Math.min(Math.abs(rect.top - focusY), Math.abs(rect.bottom - focusY), Math.abs(rect.top + rect.height / 2 - focusY));

    if (distance < bestDistance) {
      bestDistance = distance;
      bestIndex = index;
    }
  });

  return bestIndex;
}

function buildProjectCarouselTexts(project: typeof projectCases[number]) {
  const frames = [
    { label: 'Impact Delivered', copy: project.signatureWin },
    ...(project.outcomes ?? []).slice(0, 2).map((copy) => ({ label: 'Outcome', copy })),
    { label: 'Core Challenge', copy: project.challenge },
    ...(project.objectives ?? []).slice(0, 2).map((copy) => ({ label: 'What I Owned', copy })),
    { label: 'Role', copy: `${project.role} · ${project.team}` },
  ].filter((frame) => Boolean(frame.copy));

  return project.gallery.map((_, index) => frames[index] ?? frames[index % frames.length] ?? { label: 'About', copy: project.tagline });
}

function ProjectStackCard({
  project,
  index,
  isActive,
  frameIndex,
  onSelectFrame,
}: {
  project: typeof projectCases[number];
  index: number;
  isActive: boolean;
  frameIndex: number;
  onSelectFrame: (frameIndex: number) => void;
}) {
  const navigate = useNavigate();
  const imageCount = project.gallery.length;
  const focusFrames = buildProjectCarouselTexts(project);

  const mediaIndex = isActive ? frameIndex % imageCount : 0;
  const storyIndex = isActive ? frameIndex % focusFrames.length : 0;
  const activeStory = focusFrames[storyIndex];

  return (
    <article
      className={`project-card project-card--stack${isActive ? ' project-card--active' : ''}`}
      style={{ '--project-accent': project.accentColor ?? '#e8ff38', '--story-index': index } as React.CSSProperties}
      onClick={() => navigate(`/project/${project.slug}`)}
    >
      <div className="project-card__visual">
        <div className="project-card__media">
          {/* blurred ambient fill — handles any aspect ratio gracefully */}
          <img src={project.gallery[mediaIndex]} alt="" aria-hidden="true" className="project-card__img-blur" />
          <img src={project.gallery[mediaIndex]} alt={project.name} className="project-card__img" />
          <span className="project-card__num" aria-hidden="true">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        <div className="project-card__carousel" aria-label={`${project.name} carousel items`}>
          {project.gallery.map((_, dotIndex) => (
            <button
              key={dotIndex}
              type="button"
              className={`project-card__carousel-dot${dotIndex === mediaIndex ? ' project-card__carousel-dot--active' : ''}`}
              onClick={(e) => { e.stopPropagation(); onSelectFrame(dotIndex); }}
              aria-label={`Show slide ${dotIndex + 1}: ${project.galleryCaptions[dotIndex] ?? project.name}`}
              aria-pressed={dotIndex === mediaIndex}
            >
              <span className="project-card__carousel-dot-inner" aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>

      <div className="project-card__body">
        <div className="project-card__body-top">
          <div className="project-card__meta-row">
            <span className="project-card__pill">{GENRE_SHORT[project.genre] ?? project.genre}</span>
            <span className="project-card__difficulty">{project.difficulty}</span>
          </div>
          <h3 className="project-card__name">{project.name}</h3>
          <p className="project-card__tagline">{project.tagline}</p>
        </div>

        <div className="project-card__focus">
          <span className="project-card__focus-label">{activeStory.label}</span>
          <p className="project-card__focus-copy">{activeStory.copy}</p>
        </div>

        {project.stats && project.stats.length > 0 && (
          <div className="project-card__stats">
            {project.stats.slice(0, 4).map((s) => (
              <div key={s.label} className="project-card__stat">
                <span className="project-card__stat-val">{s.value}</span>
                <span className="project-card__stat-lbl">{s.label}</span>
              </div>
            ))}
          </div>
        )}

        <div className="project-card__body-bottom">
          <div className="project-card__stack">
            {project.stack.slice(0, 4).map((t) => (
              <span key={t} className="project-card__chip">{t}</span>
            ))}
          </div>
          <div className="project-card__footer">
            <span className="project-card__period">{project.period}</span>
            <Link
              to={`/project/${project.slug}`}
              className="project-card__link"
              onClick={(e) => e.stopPropagation()}
            >
              View details <IconArrowRight style={{ width: '1em', height: '1em' }} />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

function WorkSection() {
  const [ref, revealed] = useReveal(0.05);
  const stackRef = useRef(null);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [projectFrames, setProjectFrames] = useState<number[]>(() => projectCases.map(() => 0));
  const [projectAutoplayPaused, setProjectAutoplayPaused] = useState<boolean[]>(() => projectCases.map(() => false));

  const setProjectFrame = (projectIndex: number, frameIndex: number) => {
    setProjectFrames((current) => {
      const next = [...current];
      const project = projectCases[projectIndex];
      next[projectIndex] = frameIndex % project.gallery.length;
      return next;
    });

    setProjectAutoplayPaused((current) => {
      const next = [...current];
      next[projectIndex] = true;
      return next;
    });
  };

  useEffect(() => {
    if (!revealed) return;
    const project = projectCases[activeProjectIndex];
    if (!project || projectAutoplayPaused[activeProjectIndex] || project.gallery.length <= 1) return;

    const timer = window.setInterval(() => {
      setProjectFrames((current) => {
        const next = [...current];
        next[activeProjectIndex] = (next[activeProjectIndex] + 1) % project.gallery.length;
        return next;
      });
    }, 2600);

    return () => {
      window.clearInterval(timer);
    };
  }, [revealed, activeProjectIndex, projectAutoplayPaused]);

  useEffect(() => {
    if (!revealed) return;
    const cards = stackRef.current?.querySelectorAll('.project-card--stack');
    if (!cards || cards.length === 0) return;

    const ctx = gsap.context(() => {
      Array.from(cards).forEach((card, index) => {
        gsap.fromTo(card as Element,
          { y: 64, scale: 0.98, rotate: index % 2 === 0 ? -0.8 : 0.8 },
          {
            y: 0,
            scale: 1,
            rotate: 0,
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card as Element,
              start: 'top 82%',
              once: true,
            },
          }
        );
      });

      let rafId = 0;
      const syncActiveProject = () => {
        window.cancelAnimationFrame(rafId);
        rafId = window.requestAnimationFrame(() => {
          const nextIndex = resolveVisibleStackIndex(stackRef.current as HTMLElement, '.project-card--stack');
          setActiveProjectIndex(nextIndex);
        });
      };

      syncActiveProject();
      ScrollTrigger.addEventListener('refresh', syncActiveProject);
      window.addEventListener('scroll', syncActiveProject, { passive: true });
      window.addEventListener('resize', syncActiveProject);

      return () => {
        ScrollTrigger.removeEventListener('refresh', syncActiveProject);
        window.removeEventListener('scroll', syncActiveProject);
        window.removeEventListener('resize', syncActiveProject);
        window.cancelAnimationFrame(rafId);
      };
    }, stackRef);

    return () => ctx.revert();
  }, [revealed]);

  return (
    <section className="work-section work-section--stacked" id="projects" ref={ref}>
      <div className={`container reveal ${revealed ? 'revealed' : ''}`}>
        <p className="section-label">Selected Projects</p>
        <h2 className="work-section__heading">Featured Projects</h2>

        <div className="project-stack" ref={stackRef}>
          {projectCases.map((project, index) => {
            return (
              <ProjectStackCard
                key={project.slug}
                project={project}
                index={index}
                isActive={index === activeProjectIndex}
                frameIndex={projectFrames[index] ?? 0}
                onSelectFrame={(frameIndex) => setProjectFrame(index, frameIndex)}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

// about section
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
                <span>{profile.educationFact}</span>
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

// experience section
const TYPE_COLOR: Record<string, string> = {
  'Full-Time':  '#e8ff38',
  'Part-Time':  '#00f5d0',
  'Internship': '#a78bfa',
  'Research':   '#fb923c',
  'Teaching':   '#38bdf8',
};

function ExperienceSection() {
  const [ref, revealed] = useReveal(0.05);
  const stackRef = useRef(null);
  const [activeExperienceIndex, setActiveExperienceIndex] = useState(0);

  useEffect(() => {
    if (!revealed) return;
    const cards = stackRef.current?.querySelectorAll('.story-card--experience');
    if (!cards || cards.length === 0) return;

    const ctx = gsap.context(() => {
      Array.from(cards).forEach((card, index) => {
        gsap.fromTo(card as Element,
          { y: 64, scale: 0.98, rotate: index % 2 === 0 ? -0.8 : 0.8 },
          {
            y: 0,
            scale: 1,
            rotate: 0,
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card as Element,
              start: 'top 82%',
              once: true,
            },
          }
        );
      });

      let rafId = 0;
      const syncActiveExperience = () => {
        window.cancelAnimationFrame(rafId);
        rafId = window.requestAnimationFrame(() => {
          setActiveExperienceIndex(resolveVisibleStackIndex(stackRef.current as HTMLElement, '.story-card--experience'));
        });
      };

      syncActiveExperience();
      ScrollTrigger.addEventListener('refresh', syncActiveExperience);
      window.addEventListener('scroll', syncActiveExperience, { passive: true });
      window.addEventListener('resize', syncActiveExperience);

      return () => {
        ScrollTrigger.removeEventListener('refresh', syncActiveExperience);
        window.removeEventListener('scroll', syncActiveExperience);
        window.removeEventListener('resize', syncActiveExperience);
        window.cancelAnimationFrame(rafId);
      };
    }, stackRef);

    return () => ctx.revert();
  }, [revealed]);

  return (
    <section className="exp-section exp-section--stacked" id="experience" ref={ref}>
      <div className={`container reveal ${revealed ? 'revealed' : ''}`}>
        <p className="section-label">Career</p>
        <h2 className="exp-section__heading">Work Experience</h2>

        <div className="story-stack story-stack--experience" ref={stackRef}>
          {experience.map((item, i) => {
            const typeColor = TYPE_COLOR[item.type] ?? '#e8ff38';
            const isActive = i === activeExperienceIndex;
            return (
              <article
                key={`${item.org}-${i}`}
                className={`story-card story-card--experience${item.current ? ' story-card--current' : ''}${isActive ? ' story-card--active' : ''}`}
                style={{ '--story-accent': typeColor, '--story-index': i } as React.CSSProperties}
              >
                <div className="story-card__topline" />

                <div className="story-card__header">
                  <img src={item.logo} alt={item.org} className="story-card__logo" />
                  <div className="story-card__heading-block">
                    <div className="story-card__eyebrow">
                      <span className="story-card__role">{item.role}</span>
                      {item.current && <span className="story-card__live">Now</span>}
                    </div>
                    <div className="story-card__meta">
                      <span>{item.org}</span>
                      <span>·</span>
                      <span>{item.type}</span>
                      <span>·</span>
                      <span>{item.period}</span>
                    </div>
                  </div>
                  {item.href && (
                    <a href={item.href} target="_blank" rel="noreferrer" className="story-card__ext" aria-label={`${item.org} website`}>
                      <IconExternalLink style={{ width: '1em', height: '1em' }} />
                    </a>
                  )}
                </div>

                <p className="story-card__summary">{item.summary}</p>

                <ul className="story-card__bullets">
                  {item.highlights.map((pt) => (
                    <li key={pt} className="story-card__bullet">
                      <span className="story-card__bullet-dot" aria-hidden="true" />
                      <span dangerouslySetInnerHTML={{ __html: pt.replace(/(~?\d+[\d,+%x²]*([\+%\-]?\w*)?)/g, '<strong>$1</strong>') }} />
                    </li>
                  ))}
                </ul>

                <div className="story-card__chips">
                  {item.stack?.map((t) => (
                    <span key={t} className="story-card__chip">{t}</span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// skills section

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

// recommendations section
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

// contact section
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
          {profile.availability}
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

  const personLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Ezzat Boukhary',
    url: SITE_URL,
    image: PROFILE_IMAGE,
    jobTitle: 'Software Engineer',
    description: 'Software engineer building full-stack platforms, mobile apps, internal tools, and projects that people actually use.',
    worksFor: { '@type': 'Organization', name: 'yHere' },
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'University of Central Florida' },
    knowsAbout: ['TypeScript', 'React', 'Flutter', 'Full-Stack Development', 'Mobile Development', 'Kotlin', 'Firebase', 'AWS'],
    sameAs: [
      'https://github.com/ezzatBoukhary',
      'https://linkedin.com/in/ezzatboukhary',
    ],
    email: 'ezzatboukhary03@gmail.com',
  };

  return (
    <main className="page-enter">
      <SEOHead
        title="Ezzat Boukhary | Software Engineer"
        description="Software engineer building full-stack platforms, mobile apps, internal tools, and projects that people actually use. Based in Florida."
        url={`${SITE_URL}/`}
        ogImage={`${SITE_URL}/og/preview-banner.jpg`}
        ogImageAlt="Ezzat Boukhary — Software Engineer portfolio"
        jsonLd={personLd}
      />
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
