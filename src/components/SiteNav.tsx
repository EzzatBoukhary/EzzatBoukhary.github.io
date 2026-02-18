import { useEffect, useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NAV_LINKS = [
  { to: '/#about',       label: 'About'      },
  { to: '/#experience',  label: 'Experience' },
  { to: '/#projects',    label: 'Work'       },
  { to: '/#skills',      label: 'Skills'     },
  { to: '/resume',       label: 'Resume'     },
];

export default function SiteNav() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Smooth-scroll to home hash targets; navigate to separate pages normally
  const handleLink = useCallback((e, to) => {
    if (to.startsWith('/#')) {
      e.preventDefault();
      // If we're not on home, go home first then scroll after load
      if (pathname !== '/') {
        window.location.href = to;
        return;
      }
      const id = to.slice(2);
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
    } else {
      setMenuOpen(false);
    }
  }, [pathname]);

  // Close menu on ESC
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
        <div className="nav__inner">
          <Link to="/" className="nav__logo" aria-label="Home">EB</Link>

          <ul className="nav__links">
            {NAV_LINKS.map(({ to, label }) => (
              <li key={to}>
                {to.startsWith('/#') ? (
                  <a
                    href={to}
                    className="nav__link"
                    onClick={(e) => handleLink(e, to)}
                  >
                    {label}
                  </a>
                ) : (
                  <Link
                    to={to}
                    className={`nav__link ${pathname === to ? 'nav__link--active' : ''}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <a href="mailto:ezzatboukhary03@gmail.com" className="nav__cta">
            Let's Talk
          </a>

          {/* Hamburger */}
          <button
            type="button"
            className={`nav__burger ${menuOpen ? 'nav__burger--open' : ''}`}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="nav__burger-line" />
            <span className="nav__burger-line" />
            <span className="nav__burger-line" />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div className={`nav__overlay ${menuOpen ? 'nav__overlay--open' : ''}`} aria-hidden={!menuOpen}>
        {NAV_LINKS.map(({ to, label }) => (
          to.startsWith('/#') ? (
            <a
              key={to}
              href={to}
              className="nav__overlay-link"
              onClick={(e) => handleLink(e, to)}
            >
              {label}
            </a>
          ) : (
            <Link
              key={to}
              to={to}
              className="nav__overlay-link"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          )
        ))}
        <a href="mailto:ezzatboukhary03@gmail.com" className="nav__overlay-link" onClick={() => setMenuOpen(false)}>
          Contact
        </a>
      </div>
    </>
  );
}
