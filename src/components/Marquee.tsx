const ITEMS = [
  '250K+ Users Reached',
  'Best Design · KnightHacks VI',
  'Flutter · Kotlin · React',
  'Firebase · AWS · Node.js',
  'B.S. Computer Science · UCF',
  '6+ Years Building',
  'Mobile + Full-Stack',
  'Open to Full-Time Roles',
];

export default function Marquee({ reversed = false }) {
  // Duplicate for seamless loop
  const all = [...ITEMS, ...ITEMS];

  return (
    <div className="marquee" style={reversed ? { '--dir': 'reverse' } : {}}>
      <div className="marquee__track" style={reversed ? { animationDirection: 'reverse' } : {}}>
        {/* Two full segments for seamless loop */}
        {[0, 1].map((seg) => (
          <span key={seg} className="marquee__segment">
            {ITEMS.map((item, i) => (
              <span key={`${seg}-${i}`} className="marquee__item">
                {item}
                <span className="marquee__dot" aria-hidden="true"> ✦ </span>
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}
