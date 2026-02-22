import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE_URL   = 'https://ezzatboukhary.github.io';
const BANNER_IMG = `${SITE_URL}/og/preview-banner.jpg`;

// per-route meta for static HTML stubs
// GitHub Pages serves these files directly so social-media crawlers
// (Discord, Slackbot, LinkedIn, Twitterbot) that do NOT run JavaScript
// still get rich OG/Twitter meta for every sub-page.
const ROUTES = [
  {
    path: 'resume',
    title: 'Resume \u2014 Ezzat Boukhary',
    description:
      "Full overview of Ezzat Boukhary's work experience, education, and technical skills. Available to view inline or download as a PDF.",
    image:      BANNER_IMG,
    imageType:  'image/jpeg',
    imageAlt:   'Ezzat Boukhary \u2014 Resume',
    url:        `${SITE_URL}/resume/`,
    themeColor: '#e8ff38',
  },
  {
    path: 'contact',
    title: 'Contact \u2014 Ezzat Boukhary',
    description:
      'Get in touch with Ezzat Boukhary \u2014 open to full-time roles, interesting collaborations, and products that reach real people.',
    image:      BANNER_IMG,
    imageType:  'image/jpeg',
    imageAlt:   'Contact Ezzat Boukhary',
    url:        `${SITE_URL}/contact/`,
    themeColor: '#e8ff38',
  },
  {
    path: 'project/gesture-based-puppetry',
    title: 'Gesture-Based Puppetry \u2014 Ezzat Boukhary',
    description:
      'Realtime 3D puppeteering for live simulation classrooms at UCF TeachLivE. Built with Three.js, animation blending, and IndexedDB.',
    image:      `${SITE_URL}/og/project-gesture-based-puppetry.png`,
    imageType:  'image/png',
    imageAlt:   'Gesture-Based Puppetry project by Ezzat Boukhary',
    url:        `${SITE_URL}/project/gesture-based-puppetry/`,
    themeColor: '#a855f7',
  },
  {
    path: 'project/college-event-platform',
    title: 'College Event Platform \u2014 Ezzat Boukhary',
    description:
      'Constraint-driven event management for universities with role-aware permissions and scheduling constraints enforced at the DB layer.',
    image:      `${SITE_URL}/og/project-college-event-platform.png`,
    imageType:  'image/png',
    imageAlt:   'College Event Platform project by Ezzat Boukhary',
    url:        `${SITE_URL}/project/college-event-platform/`,
    themeColor: '#0ea5e9',
  },
  {
    path: 'project/dragonotchi',
    title: 'Dragonotchi \u2014 Ezzat Boukhary',
    description:
      'Award-winning virtual pet built in 36 hours at KnightHacks VI \u2014 Best Design out of ~50 competing teams.',
    image:      `${SITE_URL}/og/project-dragonotchi.jpg`,
    imageType:  'image/jpeg',
    imageAlt:   'Dragonotchi project by Ezzat Boukhary',
    url:        `${SITE_URL}/project/dragonotchi/`,
    themeColor: '#f97316',
  },
  {
    path: 'project/killerbot',
    title: 'KillerBot \u2014 Ezzat Boukhary',
    description:
      'A Discord bot platform serving 250,000+ users across 600+ servers \u2014 built entirely solo from age 14 over three years.',
    image:      `${SITE_URL}/og/project-killerbot.png`,
    imageType:  'image/png',
    imageAlt:   'KillerBot project by Ezzat Boukhary',
    url:        `${SITE_URL}/project/killerbot/`,
    themeColor: '#e8ff38',
  },
  {
    path: 'project/campus-critters',
    title: 'Campus Critters \u2014 Ezzat Boukhary',
    description:
      'A social wildlife-spotting platform across MERN web and Flutter mobile \u2014 map-based sightings with JWT auth and media uploads.',
    image:      `${SITE_URL}/og/project-campus-critters.png`,
    imageType:  'image/png',
    imageAlt:   'Campus Critters project by Ezzat Boukhary',
    url:        `${SITE_URL}/project/campus-critters/`,
    themeColor: '#22c55e',
  },
];

// patches a meta tag's content= value in the HTML string
function escRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
function escHtml(s) { return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;'); }

function setMeta(html, selector, value) {
  // property="og:..." or name="..."  followed by  content="..."
  let out = html.replace(
    new RegExp(`(<meta[^>]*(?:name|property)="${escRe(selector)}"[^>]*content=")([^"]*)(")`, 'i'),
    (_, pre, _old, close) => `${pre}${escHtml(value)}${close}`,
  );
// also handle content= before name/property=
  out = out.replace(
    new RegExp(`(<meta[^>]*content=")([^"]*)("[^>]*(?:name|property)="${escRe(selector)}"[^>]*)`, 'i'),
    (_, pre, _old, tail) => `${pre}${escHtml(value)}${tail}`,
  );
  return out;
}

// copies dist/index.html to dist/404.html so GitHub Pages falls back to the SPA
function copyIndexAs404() {
  return {
    name: 'copy-index-as-404',
    closeBundle() {
      const src  = path.resolve(__dirname, 'dist/index.html');
      const dest = path.resolve(__dirname, 'dist/404.html');
      if (fs.existsSync(src)) fs.copyFileSync(src, dest);
    },
  };
}

// generates per-route index.html files so social crawlers get correct OG meta
// without running JS. GitHub Pages serves these before falling back to 404.html.
function generateRouteHTML() {
  return {
    name: 'generate-route-html',
    closeBundle() {
      const distDir  = path.resolve(__dirname, 'dist');
      const indexSrc = path.join(distDir, 'index.html');
      if (!fs.existsSync(indexSrc)) return;
      const base = fs.readFileSync(indexSrc, 'utf-8');

      for (const route of ROUTES) {
        let html = base;

        // <title>
        html = html.replace(/<title>[^<]*<\/title>/, `<title>${escHtml(route.title)}</title>`);

        // canonical
        html = html.replace(
          /(<link\s+rel="canonical"\s+href=")[^"]*(")/,
          `$1${escHtml(route.url)}$2`,
        );

        // standard meta
        html = setMeta(html, 'description',  route.description);
        html = setMeta(html, 'theme-color',  route.themeColor);

        // Open Graph
        html = setMeta(html, 'og:title',           route.title);
        html = setMeta(html, 'og:description',      route.description);
        html = setMeta(html, 'og:url',              route.url);
        html = setMeta(html, 'og:image',            route.image);
        html = setMeta(html, 'og:image:secure_url', route.image);
        html = setMeta(html, 'og:image:type',       route.imageType);
        html = setMeta(html, 'og:image:alt',        route.imageAlt);

        // Twitter / X
        html = setMeta(html, 'twitter:title',       route.title);
        html = setMeta(html, 'twitter:description', route.description);
        html = setMeta(html, 'twitter:image',       route.image);
        html = setMeta(html, 'twitter:image:alt',   route.imageAlt);

        const outDir = path.join(distDir, route.path);
        fs.mkdirSync(outDir, { recursive: true });
        fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf-8');
        console.log(`[seo-stubs] dist/${route.path}/index.html`);
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), copyIndexAs404(), generateRouteHTML()],
});
