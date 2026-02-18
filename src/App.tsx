import { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import CustomCursor from './components/CustomCursor.jsx';
import SiteNav      from './components/SiteNav.jsx';
import SiteFooter   from './components/SiteFooter.jsx';
import MusicPlayer  from './components/MusicPlayer';

import Home          from './pages/Home.jsx';
import ProjectPage   from './pages/ProjectPage.jsx';
import ResumePage    from './pages/ResumePage.jsx';
import ContactPage   from './pages/ContactPage';

import { projectCases } from './data/siteData';

gsap.registerPlugin(ScrollTrigger);

// Default curtain color: yellow dimmed heavily into the dark background
const DEFAULT_CURTAIN = 'color-mix(in srgb, #e8ff38 35%, #090b16)';

function getTransitionColor(pathname: string): string {
  const match = pathname.match(/^\/project\/(.+)$/);
  if (match) {
    const project = projectCases.find(p => p.slug === match[1]);
    if (project?.accentColor) {
      // Mix accent at 35% into dark bg — vivid enough to read, not blinding
      return `color-mix(in srgb, ${project.accentColor} 35%, #090b16)`;
    }
  }
  return DEFAULT_CURTAIN;
}

// ─── Smooth scroll + GSAP integration ────────────────────────────────────
function SmoothScroll({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    (window as any).__lenis = lenis;

    // Tell GSAP ScrollTrigger to use Lenis scroll
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      (window as any).__lenis = undefined;
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  return children;
}

// ─── Animated routes: holds the old page while curtain covers, then swaps ─
const COVER_MS  = 480;
const REVEAL_MS = 480;

function AnimatedRoutes() {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [phase, setPhase] = useState<'in' | 'out' | null>(null);
  const [curtainColor, setCurtainColor] = useState(DEFAULT_CURTAIN);
  const busy = useRef(false);

  // Scroll to top tied to the display location swap, not the real location
  useEffect(() => {
    const scrollTo = (displayLocation.state as any)?.scrollTo;
    if (displayLocation.pathname === '/' && scrollTo) return;
    const lenis = (window as any).__lenis as Lenis | undefined;
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else { window.scrollTo(0, 0); }
  }, [displayLocation]);

  useEffect(() => {
    if (location.key === displayLocation.key) return;
    if (busy.current) return;
    busy.current = true;

    // Pick color for the destination before animating
    setCurtainColor(getTransitionColor(location.pathname));
    setPhase('in');

    const t1 = setTimeout(() => {
      setDisplayLocation(location);
      setPhase('out');
    }, COVER_MS);

    const t2 = setTimeout(() => {
      setPhase(null);
      busy.current = false;
    }, COVER_MS + REVEAL_MS);

    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [location]);

  return (
    <>
      {phase && (
        <div
          className={`route-curtain route-curtain--${phase}`}
          style={{ '--curtain-color': curtainColor } as React.CSSProperties}
          aria-hidden="true"
        />
      )}

      {/* Routes rendered with displayLocation so old page persists during cover */}
      <Routes location={displayLocation}>
        <Route path="/"              element={<Home />} />
        <Route path="/project/:slug" element={<ProjectPage />} />
        <Route path="/resume"        element={<ResumePage />} />
        <Route path="/contact"       element={<ContactPage />} />
        <Route path="*"              element={<Home />} />
      </Routes>
    </>
  );
}

// ─── Layout wrapper ────────────────────────────────────────────────────────
function Layout() {
  return (
    <>
      <CustomCursor />
      <SiteNav />
      <AnimatedRoutes />
      <SiteFooter />
      <MusicPlayer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <SmoothScroll>
        <Layout />
      </SmoothScroll>
    </BrowserRouter>
  );
}
