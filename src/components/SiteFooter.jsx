import { Link } from 'react-router-dom';
import { profile, links } from '../data/siteData.js';

export default function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <span className="footer__name">{profile.name}</span>
        <span className="footer__copy">
          © {new Date().getFullYear()} · Built with React + Vite ·{' '}
          <a href={links.github} target="_blank" rel="noreferrer">GitHub</a>
        </span>
      </div>
    </footer>
  );
}
