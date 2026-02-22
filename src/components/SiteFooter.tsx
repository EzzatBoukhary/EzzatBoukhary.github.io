import { links, profile } from '../data/siteData';

export default function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <span className="footer__copy">
          &copy; {new Date().getFullYear()} {profile.name}
        </span>
        <div className="footer__links">
          <a href={links.github}   target="_blank" rel="noreferrer" className="footer__link">GitHub</a>
          <a href={links.linkedin} target="_blank" rel="noreferrer" className="footer__link">LinkedIn</a>
          <span className="footer__sep" aria-hidden="true" />
          <a
            href="https://github.com/EzzatBoukhary/EzzatBoukhary.github.io"
            target="_blank"
            rel="noreferrer"
            className="footer__link footer__link--source"
            title="View the source code for this site"
          >
            Site Source
          </a>
        </div>
      </div>
    </footer>
  );
}
