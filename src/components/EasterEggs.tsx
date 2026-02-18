import { useEffect, useRef, useState } from 'react';

// ASCII art printed to console on load
const CONSOLE_ART = `
%c
  ███████╗███████╗███████╗ █████╗ ████████╗
  ██╔════╝╚══███╔╝╚══███╔╝██╔══██╗╚══██╔══╝
  █████╗    ███╔╝   ███╔╝ ███████║   ██║
  ██╔══╝   ███╔╝   ███╔╝  ██╔══██║   ██║
  ███████╗███████╗███████╗██║  ██║   ██║
  ╚══════╝╚══════╝╚══════╝╚═╝  ╚═╝   ╚═╝

  B O U K H A R Y  ·  UCF CS '25  ·  Builder-Class Engineer
  ──────────────────────────────────────────────────────────
  → ezzatboukhary03@gmail.com
  → github.com/EzzatBoukhary

  psst — triple-click the EB logo for a secret
`;

const LINES = [
  '> ACCESSING DEVELOPER PROFILE...',
  '> LOADING STATS...',
  '> users_reached: 250,000+',
  '> servers_deployed: 600+',
  '> firebase_reads_saved: ~90%',
  '> first_bot: age 14',
  '> graduation: Summa Cum Laude · 3.96 GPA',
  '> current_status: building something better',
  '> ─────────────────────────────────────────',
  '> PROFILE UNLOCKED. Welcome.',
];

function TypewriterLine({ text, delay }: { text: string; delay: number }) {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    let i = 0;
    const t = setTimeout(() => {
      const id = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) clearInterval(id);
      }, 28);
      return () => clearInterval(id);
    }, delay);
    return () => clearTimeout(t);
  }, [text, delay]);
  return <div className="easter-line">{displayed}<span className="easter-cursor" aria-hidden="true" /></div>;
}

export default function EasterEggs() {
  const [active, setActive] = useState(false);
  const clickCountRef = useRef(0);
  const timerRef      = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Console ASCII art on mount
  useEffect(() => {
    console.log(
      CONSOLE_ART,
      'color: #e8ff38; font-family: monospace; font-size: 11px; line-height: 1.45; text-shadow: 0 0 8px #e8ff38;'
    );
  }, []);

  // Expose trigger so the nav logo can call it (via custom event)
  useEffect(() => {
    const handler = () => {
      setActive(true);
      setTimeout(() => setActive(false), 8000);
    };
    window.addEventListener('easter-egg:trigger', handler);
    return () => window.removeEventListener('easter-egg:trigger', handler);
  }, []);

  // Also keep a global triple-click fallback on the logo element by tracking clicks
  useEffect(() => {
    const handleLogoClick = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (!el.closest('.nav__logo')) return;
      clickCountRef.current += 1;
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => { clickCountRef.current = 0; }, 600);
      if (clickCountRef.current >= 3) {
        clickCountRef.current = 0;
        window.dispatchEvent(new CustomEvent('easter-egg:trigger'));
      }
    };
    window.addEventListener('click', handleLogoClick);
    return () => window.removeEventListener('click', handleLogoClick);
  }, []);

  if (!active) return null;

  return (
    <div
      className="easter-overlay"
      role="dialog"
      aria-label="Easter egg"
      onClick={() => setActive(false)}
    >
      <div className="easter-scanlines" aria-hidden="true" />
      <div className="easter-box" onClick={(e) => e.stopPropagation()}>
        <div className="easter-terminal">
          {LINES.map((line, i) => (
            <TypewriterLine key={i} text={line} delay={i * 320} />
          ))}
        </div>
        <button
          type="button"
          className="easter-close"
          onClick={() => setActive(false)}
          aria-label="Close"
        >
          [ ESC ]
        </button>
      </div>
    </div>
  );
}
