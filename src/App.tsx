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

gsap.registerPlugin(ScrollTrigger);

// ─── Scroll to top on every route change ─────────────────────────────────
function ScrollToTop() {
  const location = useLocation();
  useEffect(() => {
    // Skip scroll-to-top when navigating to home with a section target
    const scrollTo = (location.state as any)?.scrollTo;
    if (location.pathname === '/' && scrollTo) return;

    // Tell Lenis to jump to 0 immediately if it's running
    const lenis = (window as any).__lenis as Lenis | undefined;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, [location]);
  return null;
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

// ─── Route-level page transition overlay ─────────────────────────────────
function TransitionOverlay() {
  const location = useLocation();
  const [phase, setPhase]     = useState(null); // 'in' | 'out' | null
  const prevPath = useRef(location.pathname);

  useEffect(() => {
    if (prevPath.current === location.pathname) return;
    prevPath.current = location.pathname;

    setPhase('in');
    const t1 = setTimeout(() => setPhase('out'), 380);
    const t2 = setTimeout(() => setPhase(null),  750);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [location.pathname]);

  if (!phase) return null;
  return (
    <div
      className={`route-overlay route-overlay--${phase}`}
      aria-hidden="true"
    />
  );
}

// ─── Layout wrapper ────────────────────────────────────────────────────────
function Layout() {
  return (
    <>
      <CustomCursor />
      <SiteNav />
      <ScrollToTop />
      <TransitionOverlay />
      <Routes>
        <Route path="/"                element={<Home />} />
        <Route path="/project/:slug"   element={<ProjectPage />} />
        <Route path="/resume"          element={<ResumePage />} />
        <Route path="/contact"         element={<ContactPage />} />
        {/* Fallback */}
        <Route path="*"               element={<Home />} />
      </Routes>
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
