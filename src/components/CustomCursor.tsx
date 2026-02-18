import { useEffect, useRef, useState } from 'react';

// Don't render on touch/mobile devices — they have no pointer to track
const isTouchDevice =
  typeof window !== 'undefined' &&
  window.matchMedia('(pointer: coarse)').matches;

export default function CustomCursor() {
  if (isTouchDevice) return null;

  const cursorRef = useRef(null);
  const [state, setState] = useState('default'); // default | hover | click | text

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let cx = mx;
    let cy = my;
    let raf;

    // Smooth follow loop
    const loop = () => {
      cx += (mx - cx) * 0.13;
      cy += (my - cy) * 0.13;
      cursor.style.transform = `translate(${Math.round(cx * 100) / 100 - 18}px, ${Math.round(cy * 100) / 100 - 18}px)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onMove = (e) => { mx = e.clientX; my = e.clientY; };
    const onDown = () => setState('click');
    const onUp   = () => setState('default');

    // Track interactive elements
    const onEnter = (e) => {
      const el = e.target.closest('a, button, [data-cursor]');
      if (!el) return;
      const type = el.dataset.cursor;
      if (type === 'text') setState('text');
      else setState('hover');
    };
    const onLeave = () => setState('default');

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);
    document.addEventListener('mouseover', onEnter);
    document.addEventListener('mouseout', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseover', onEnter);
      document.removeEventListener('mouseout', onLeave);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`cursor ${state !== 'default' ? `cursor--${state}` : ''}`}
      aria-hidden="true"
    />
  );
}
