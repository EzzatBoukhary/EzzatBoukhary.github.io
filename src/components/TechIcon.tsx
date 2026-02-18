/**
 * TechIcon — Inline SVG icons for common tech stack entries.
 * Each icon is a 1em × 1em viewBox SVG for easy sizing via font-size / width/height.
 */

import type { CSSProperties } from 'react';

interface IconProps {
  style?: CSSProperties;
  className?: string;
}

/* ── Individual icons ─────────────────────────────────────────────────── */

export const IcoTypeScript = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...p}>
    <rect width="24" height="24" rx="3" fill="#3178c6"/>
    <path d="M13.5 12.5H16v1c0 1.1-.9 2-2 2s-2-.9-2-2v-3c0-1.1.9-2 2-2s2 .9 2 2v.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M2 12h6M5 9v6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const IcoJavaScript = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...p}>
    <rect width="24" height="24" rx="3" fill="#f7df1e"/>
    <path d="M7 17c0 1.657 1.343 3 3 3s3-1.343 3-3V9" stroke="#000" strokeWidth="1.6" strokeLinecap="round"/>
    <path d="M14 15.5c0 1.381 1.119 2.5 2.5 2.5S19 16.881 19 15.5V9" stroke="#000" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);

export const IcoKotlin = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...p}>
    <rect width="24" height="24" rx="3" fill="#7f52ff"/>
    <path d="M5 5h7l-7 7 7 7H5V5z" fill="#fff"/>
    <path d="M12 5h7l-7 7 7 7h-7L5 12l7-7z" fill="rgba(255,255,255,0.55)"/>
  </svg>
);

export const IcoJava = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...p}>
    <rect width="24" height="24" rx="3" fill="#f89820"/>
    <path d="M8 16s1 1 4 1 4-1 4-1M9 13.5c0 0 3.5 2 5.5 0" stroke="#fff" strokeWidth="1.4" strokeLinecap="round"/>
    <ellipse cx="12" cy="9" rx="2.5" ry="3" stroke="#fff" strokeWidth="1.4"/>
  </svg>
);

export const IcoPython = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...p}>
    <rect width="24" height="24" rx="3" fill="#3776ab"/>
    <path d="M12 4c-3.3 0-3 1.5-3 1.5V8h6v1H7S4 8.7 4 12s3 4.5 3 4.5H8V14s-.1-3 3-3h5s3 .1 3-3V5.5S19.3 4 12 4z" fill="#fff" opacity=".9"/>
    <path d="M12 20c3.3 0 3-1.5 3-1.5V16H9v-1h8S20 15.3 20 12s-3-4.5-3-4.5H16v2.5s.1 3-3 3H8s-3-.1-3 3V18.5S4.7 20 12 20z" fill="#ffd343" opacity=".9"/>
    <circle cx="10" cy="6.5" r=".8" fill="#3776ab"/>
    <circle cx="14" cy="17.5" r=".8" fill="#3776ab"/>
  </svg>
);

export const IcoCSharp = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...p}>
    <rect width="24" height="24" rx="3" fill="#9b4f96"/>
    <path d="M14 7.5A4.5 4.5 0 1 0 14 16.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M17 11h3M17 13h3M18.5 10v6" stroke="#fff" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);

export const IcoCpp = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...p}>
    <rect width="24" height="24" rx="3" fill="#00599c"/>
    <path d="M11 7.5A4.5 4.5 0 1 0 11 16.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M14.5 11h3M14.5 13h3M16 10v6M18.5 11h3M18.5 13h3M20 10v6" stroke="#fff" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
);

export const IcoSwift = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...p}>
    <rect width="24" height="24" rx="3" fill="#f05138"/>
    <path d="M18 7.5c-2-2-5.5-2.5-8.5-.5C6.5 9 5.5 12.5 7 15l-2 2.5 3.5-.5c1.5 1.5 4 2 6 1 1.5-.7 2.5-2 2.5-2s-2 .5-4-.5c3-2 5-5.5 5-8z" fill="#fff" opacity=".9"/>
  </svg>
);

export const IcoDart = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...p}>
    <rect width="24" height="24" rx="3" fill="#0175c2"/>
    <path d="M5 8l3-3h7.5L20 9.5v7l-5 5-3-3v-5L5 8z" fill="#fff" opacity=".9"/>
    <path d="M5 8l6.5 6.5M20 9.5l-5.5 5" stroke="#0175c2" strokeWidth="1"/>
  </svg>
);

export const IcoSQL = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...p}>
    <rect width="24" height="24" rx="3" fill="#336791"/>
    <ellipse cx="12" cy="7" rx="6" ry="2.5" fill="#fff" opacity=".9"/>
    <path d="M6 7v10c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5V7" stroke="#fff" strokeWidth="1.3" opacity=".9"/>
    <path d="M6 12c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5" stroke="#fff" strokeWidth="1.3" opacity=".6"/>
  </svg>
);

export const IcoReact = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...p}>
    <rect width="24" height="24" rx="3" fill="#20232a"/>
    <ellipse cx="12" cy="12" rx="2" ry="2" fill="#61dafb"/>
    <ellipse cx="12" cy="12" rx="8.5" ry="3.5" stroke="#61dafb" strokeWidth="1.3" fill="none"/>
    <ellipse cx="12" cy="12" rx="8.5" ry="3.5" stroke="#61dafb" strokeWidth="1.3" fill="none" transform="rotate(60 12 12)"/>
    <ellipse cx="12" cy="12" rx="8.5" ry="3.5" stroke="#61dafb" strokeWidth="1.3" fill="none" transform="rotate(120 12 12)"/>
  </svg>
);

export const IcoVue = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...p}>
    <rect width="24" height="24" rx="3" fill="#35495e"/>
    <path d="M12 18.5L4 6h4l4 6.5L16 6h4L12 18.5z" fill="#41b883"/>
    <path d="M12 18.5L8 11h2.5L12 14l1.5-3H16L12 18.5z" fill="#35495e"/>
  </svg>
);

export const IcoSvelte = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...p}>
    <rect width="24" height="24" rx="3" fill="#ff3e00"/>
    <path d="M18.5 6.5C17 4.5 14 4 12 5.5L7 9c-2 1.5-2.5 4-.5 5.5 1.5 1.2 0 0 0 0C4 15.5 4 18 6 19.5c2 1.5 5 1 7-.5l5-3.5c2-1.5 2.5-4 .5-5.5-1.5-1.2 0 0 0 0C20 9 20 7 18.5 6.5z" fill="#fff" opacity=".9"/>
  </svg>
);

export const IcoNodeJS = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...p}>
    <rect width="24" height="24" rx="3" fill="#339933"/>
    <path d="M12 4L5 8v8l7 4 7-4V8L12 4z" stroke="#fff" strokeWidth="1.3" fill="none"/>
    <path d="M12 4v16M5 8l7 4 7-4" stroke="#fff" strokeWidth="1" opacity=".5"/>
  </svg>
);

export const IcoExpress = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...p}>
    <rect width="24" height="24" rx="3" fill="#000"/>
    <path d="M4 12h8M4 8h14M4 16h10" stroke="#fff" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);

export const IcoFlutter = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...p}>
    <rect width="24" height="24" rx="3" fill="#0175c2"/>
    <path d="M13.5 5L5 13.5l3 3L20 3l-6.5 2z" fill="#54c5f8"/>
    <path d="M8 16.5L13.5 22 20 15.5l-5.5-5.5L8 16.5z" fill="#01579b"/>
    <path d="M8 16.5l2.8-2.8 2.7 2.8L11 19.5 8 16.5z" fill="#29b6f6"/>
  </svg>
);

export const IcoThreeJS = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...p}>
    <rect width="24" height="24" rx="3" fill="#000"/>
    <path d="M12 4L4 18h16L12 4z" stroke="#fff" strokeWidth="1.4" fill="none"/>
    <path d="M8 18L12 4l4 14M8 11h8" stroke="#fff" strokeWidth="1" opacity=".45"/>
  </svg>
);

export const IcoTensorFlow = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...p}>
    <rect width="24" height="24" rx="3" fill="#ff6f00"/>
    <path d="M12 3v18M6 6.5l6-3.5 6 3.5M6 12l6-3 6 3M6 17.5l6-3 6 3" stroke="#fff" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);

export const IcoAWS = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...p}>
    <rect width="24" height="24" rx="3" fill="#232f3e"/>
    <path d="M7 14c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2zM13 14c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2z" fill="#ff9900"/>
    <path d="M4 9.5C4 8.1 5.1 7 6.5 7h11C18.9 7 20 8.1 20 9.5" stroke="#ff9900" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
  </svg>
);

export const IcoFirebase = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...p}>
    <rect width="24" height="24" rx="3" fill="#1c1c1c"/>
    <path d="M6 20L8.5 5l4 6.5L15 2l3 18H6z" fill="#ffa000"/>
    <path d="M6 20l4-7.5 2.5 4L15 2l3 18H6z" fill="#f57c00" opacity=".6"/>
    <path d="M6 20h12l-2.5-5L13.5 11.5 12 17 10.5 13 6 20z" fill="#ffca28" opacity=".9"/>
  </svg>
);

export const IcoMySQL = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...p}>
    <rect width="24" height="24" rx="3" fill="#4479a1"/>
    <ellipse cx="12" cy="8" rx="6" ry="2.5" fill="#fff" opacity=".9"/>
    <path d="M6 8v8c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5V8" stroke="#fff" strokeWidth="1.2" opacity=".9"/>
    <path d="M6 12c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5" stroke="#fff" strokeWidth="1.2" opacity=".55"/>
  </svg>
);

export const IcoMongoDB = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...p}>
    <rect width="24" height="24" rx="3" fill="#13aa52"/>
    <path d="M12 4c0 0-4.5 4.5-4.5 9 0 2.5 2 4.5 4.5 4.5s4.5-2 4.5-4.5C16.5 8.5 12 4 12 4z" fill="#fff" opacity=".9"/>
    <path d="M12 17.5v3" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" opacity=".7"/>
  </svg>
);

export const IcoDocker = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...p}>
    <rect width="24" height="24" rx="3" fill="#2496ed"/>
    <rect x="4" y="10" width="3" height="2.5" rx=".5" fill="#fff"/>
    <rect x="8" y="10" width="3" height="2.5" rx=".5" fill="#fff"/>
    <rect x="12" y="10" width="3" height="2.5" rx=".5" fill="#fff"/>
    <rect x="8" y="7" width="3" height="2.5" rx=".5" fill="#fff"/>
    <rect x="12" y="7" width="3" height="2.5" rx=".5" fill="#fff"/>
    <path d="M4 14.5c0 0 1-.5 3 0 1.5.4 3 .5 5.5-.5 2.5-1 3.5-3.5 7.5-2" stroke="#fff" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

export const IcoLinux = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...p}>
    <rect width="24" height="24" rx="3" fill="#2c2c2c"/>
    <ellipse cx="12" cy="10" rx="4" ry="5" fill="#f5c518"/>
    <circle cx="10.5" cy="9" r=".7" fill="#2c2c2c"/>
    <circle cx="13.5" cy="9" r=".7" fill="#2c2c2c"/>
    <path d="M10.5 11.5 Q12 12.5 13.5 11.5" stroke="#2c2c2c" strokeWidth=".9" fill="none" strokeLinecap="round"/>
    <path d="M8 16c0 0 1-3 4-3s4 3 4 3" stroke="#f5c518" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
  </svg>
);

export const IcoPrisma = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...p}>
    <rect width="24" height="24" rx="3" fill="#0c344b"/>
    <path d="M12 3L5 19l7-3 7 3L12 3z" fill="#4db6ac"/>
    <path d="M12 3L19 19l-7-3V3z" fill="#26a69a" opacity=".6"/>
  </svg>
);

export const IcoGitHub = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...p}>
    <rect width="24" height="24" rx="3" fill="#24292f"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M12 4a8 8 0 0 0-2.528 15.59c.4.073.546-.173.546-.385 0-.19-.007-.693-.01-1.36-2.226.483-2.695-1.073-2.695-1.073-.364-.924-.888-1.17-.888-1.17-.726-.496.055-.486.055-.486.803.056 1.226.824 1.226.824.713 1.222 1.872.869 2.328.665.072-.517.279-.869.508-1.068-1.776-.202-3.644-.888-3.644-3.953 0-.873.312-1.587.823-2.147-.083-.202-.357-1.015.078-2.117 0 0 .67-.215 2.2.82A7.66 7.66 0 0 1 12 8.352 7.659 7.659 0 0 1 14.013 8.6c1.528-1.035 2.197-.82 2.197-.82.436 1.102.162 1.915.08 2.117.512.56.822 1.274.822 2.147 0 3.074-1.871 3.749-3.652 3.946.287.248.543.735.543 1.48 0 1.068-.01 1.93-.01 2.19 0 .213.144.462.55.384A8 8 0 0 0 12 4z" fill="#fff"/>
  </svg>
);

export const IcoGitHubActions = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...p}>
    <rect width="24" height="24" rx="3" fill="#2088ff"/>
    <path d="M12 4a8 8 0 1 0 0 16A8 8 0 0 0 12 4z" stroke="#fff" strokeWidth="1.3" fill="none"/>
    <path d="M10 8.5l4 3.5-4 3.5V8.5z" fill="#fff"/>
  </svg>
);

// Generic "badge" for anything unrecognized
export const IcoGeneric = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...p}>
    <rect x="2" y="2" width="20" height="20" rx="4" fill="rgba(0,0,0,0.12)"/>
    <circle cx="12" cy="12" r="4" fill="rgba(0,0,0,0.25)"/>
  </svg>
);

/* ── Tech lookup map ──────────────────────────────────────────────────── */

const TECH_ICON_MAP: Record<string, (p: IconProps) => JSX.Element> = {
  'TypeScript':      IcoTypeScript,
  'JavaScript':      IcoJavaScript,
  'Kotlin':          IcoKotlin,
  'Java':            IcoJava,
  'Python':          IcoPython,
  'C#':              IcoCSharp,
  'C++':             IcoCpp,
  'Swift':           IcoSwift,
  'Dart':            IcoDart,
  'SQL':             IcoSQL,
  'React':           IcoReact,
  'Vue':             IcoVue,
  'SvelteKit':       IcoSvelte,
  'Node.js':         IcoNodeJS,
  'Express':         IcoExpress,
  'Flutter':         IcoFlutter,
  'Three.js':        IcoThreeJS,
  'TensorFlow':      IcoTensorFlow,
  'AWS':             IcoAWS,
  'Firebase':        IcoFirebase,
  'MySQL':           IcoMySQL,
  'MongoDB':         IcoMongoDB,
  'Docker':          IcoDocker,
  'Linux':           IcoLinux,
  'Prisma':          IcoPrisma,
  'GitHub Actions':  IcoGitHubActions,
};

/* ── Public API: <TechIcon name="React" /> ────────────────────────────── */

interface TechIconProps extends IconProps {
  name: string;
}

export function TechIcon({ name, style, className }: TechIconProps) {
  const Icon = TECH_ICON_MAP[name] ?? IcoGeneric;
  return (
    <Icon
      style={{ width: '1em', height: '1em', flexShrink: 0, borderRadius: 3, ...style }}
      className={className}
    />
  );
}
