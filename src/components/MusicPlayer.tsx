import { useEffect, useRef, useState } from 'react';

// ── Ambient track ────────────────────────────────────────────────────────
// Drop your MP3 into /public/ambient.mp3 — no imports needed, Vite serves
// the public/ folder as-is at the root path.
// The player silently stays disabled if the file cannot be loaded.
const TRACK_URL = '/ambient.mp3';

export default function MusicPlayer() {
  const [playing, setPlaying]   = useState(false);
  const [ready, setReady]       = useState(false);
  const [visible, setVisible]   = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!TRACK_URL) return;
    const audio = new Audio(TRACK_URL);
    audio.loop   = true;
    audio.volume = 0.45;
    audioRef.current = audio;

    const onCanPlay = () => setReady(true);
    const onEnded   = () => setPlaying(false);
    const onError   = () => { /* file missing — stay in disabled state */ };
    audio.addEventListener('canplaythrough', onCanPlay);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);
    audio.load();

    return () => {
      audio.removeEventListener('canplaythrough', onCanPlay);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio || !ready) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  const dismiss = () => {
    audioRef.current?.pause();
    setPlaying(false);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className={`music-player${playing ? ' music-player--playing' : ''}`}
      aria-label="Ambient music player"
    >
      <button
        type="button"
        className="music-player__btn"
        onClick={toggle}
        disabled={!ready}
        aria-label={playing ? 'Pause music' : 'Play ambient music'}
        title={playing ? 'Pause ambient music' : 'Play ambient music'}
      >
        {playing ? (
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ width: '1rem', height: '1rem' }}>
            <rect x="6"  y="5" width="4" height="14" rx="1.5" fill="currentColor" />
            <rect x="14" y="5" width="4" height="14" rx="1.5" fill="currentColor" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ width: '1rem', height: '1rem' }}>
            <path d="M7 4.5l13 7.5-13 7.5V4.5z" fill="currentColor" />
          </svg>
        )}
      </button>

      <div className="music-player__label">
        {playing && (
          <span className="music-player__eq" aria-hidden="true">
            <span /><span /><span /><span />
          </span>
        )}
        <span className="music-player__track">Ambient</span>
        <span className="music-player__sub">lofi · chill</span>
      </div>

      <button
        type="button"
        className="music-player__close"
        onClick={dismiss}
        aria-label="Dismiss music player"
      >
        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}

