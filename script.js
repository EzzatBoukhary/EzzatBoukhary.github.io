/****************************************************************************
  Dual-Layer Parallax Starfields
****************************************************************************/
const starsBack = document.getElementById('stars-back');
const ctxBack = starsBack.getContext('2d');
const starsFront = document.getElementById('stars-front');
const ctxFront = starsFront.getContext('2d');

let backStarArray = [];
let frontStarArray = [];

function resizeCanvas() {
  starsBack.width = window.innerWidth;
  starsBack.height = window.innerHeight;
  starsFront.width = window.innerWidth;
  starsFront.height = window.innerHeight;
}
window.addEventListener('resize', () => {
  resizeCanvas();
  initStars();
});
resizeCanvas();

class Star {
  constructor(speedModifier) {
    this.speedModifier = speedModifier;
    this.reset();
  }
  reset() {
    this.x = Math.random() * starsBack.width;
    this.y = Math.random() * starsBack.height;
    this.size = Math.random() * 2 + 0.3;
    this.speedY = (Math.random() * 0.5 + 0.2) * this.speedModifier;
    this.alpha = Math.random() * 0.6 + 0.4;
  }
  update(canvas) {
    this.y += this.speedY;
    if (this.y > canvas.height) {
      this.y = 0 - this.size;
      this.x = Math.random() * canvas.width;
    }
  }
  draw(ctx) {
    ctx.fillStyle = `rgba(155, 230, 78, ${this.alpha})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }
}

function initStars() {
  const totalBackStars = Math.floor((starsBack.width * starsBack.height) / 9000);
  const totalFrontStars = Math.floor((starsFront.width * starsFront.height) / 8000);
  backStarArray = [];
  for (let i = 0; i < totalBackStars; i++) {
    backStarArray.push(new Star(0.5));
  }
  frontStarArray = [];
  for (let i = 0; i < totalFrontStars; i++) {
    frontStarArray.push(new Star(1.0));
  }
}
initStars();

function animateStars() {
  ctxBack.clearRect(0, 0, starsBack.width, starsBack.height);
  ctxFront.clearRect(0, 0, starsFront.width, starsFront.height);
  backStarArray.forEach(star => {
    star.update(starsBack);
    star.draw(ctxBack);
  });
  frontStarArray.forEach(star => {
    star.update(starsFront);
    star.draw(ctxFront);
  });
  requestAnimationFrame(animateStars);
}
animateStars();



/****************************************************************************
  Floating Star Icon
****************************************************************************/
const floatingStar = document.getElementById('floating-star');
document.addEventListener('mousemove', (e) => {
  const x = e.clientX + 10;
  const y = e.clientY + 10;
  floatingStar.style.transform = `translate(${x}px, ${y}px)`;
});

/****************************************************************************
  Scroll-Triggered Fade-Ins
****************************************************************************/
const faders = document.querySelectorAll('.fade-in');
const appearOptions = { threshold: 0.1 };
const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('show');
    observer.unobserve(entry.target);
  });
}, appearOptions);
faders.forEach(fader => { appearOnScroll.observe(fader); });


/****************************************************************************
  Audio Controls: Background Music & Click Sound
****************************************************************************/
const bgMusic = document.getElementById('bg-music');
const clickSound = document.getElementById('click-sound');
const toggleSoundBtn = document.getElementById('toggle-sound');
let musicEnabled = false;
toggleSoundBtn.addEventListener('click', () => {
  musicEnabled = !musicEnabled;
  console.log(`Music enabled: ${musicEnabled}`);
  if (musicEnabled) {
    bgMusic.volume = 0.2;

    // Try to resume playback safely
    bgMusic.play().catch((err) => {
      console.log('Playback failed:', err);
    });
  } else {
    bgMusic.pause();
  }
});

function playClickSound() {
  clickSound.currentTime = 0;
  clickSound.play().catch(() => { });
}
document.querySelectorAll('.nav-links a, .btn, .btn-card').forEach(el => {
  el.addEventListener('click', () => { playClickSound(); });
});


/****************************************************************************
  UFO Easter Egg 
****************************************************************************/
function spawnUFO() {
  const ufo = document.createElement('div');
  ufo.className = 'ufo';

  // randomize size
  const ufoSize = Math.floor(Math.random() * 40) + 60;
  ufo.style.width = ufoSize + 'px';
  ufo.style.height = (ufoSize * 0.5) + 'px';

  ufo.style.top = Math.random() * (window.innerHeight * 0.5) + 'px';
  ufo.style.left = '-100px';

  console.log("🛸 UFO has appeared! Click it before it disappears!");

  if (!firstHintShown) {
    showUFOHint();
  }

  document.body.appendChild(ufo);

  // Handle UFO click with randomized outcomes
  ufo.addEventListener('click', (e) => {
    e.stopPropagation();

    const eventChance = Math.random();
    if (eventChance < 0.5) {
      showUFOHint();
    } else if (eventChance < 0.8) {
      triggerCosmicDustEffect();
    } else {
      triggerAlienEncounter();
    }

    playUFOSound();
    ufo.remove();
  });

  // Remove the UFO when its animation ends
  ufo.addEventListener('animationend', () => {
    console.log("🛸 UFO disappeared...");
    ufo.remove();
  });
}



/****************************************************************************
  Alien Encounter - Wormhole Effect
****************************************************************************/
function triggerAlienEncounter() {
  const wormhole = document.createElement('div');
  wormhole.className = 'wormhole-effect';
  document.body.appendChild(wormhole);

  setTimeout(() => {
    wormhole.remove();
  }, 2000);

  showUFOHint();
}

/****************************************************************************
  UFO Hint System
****************************************************************************/
const ufoHints = [
  "👀 Did you see that? A UFO just flew by! Try clicking one…",
  "📱 I transformed Reel Talk's Android app into something production-ready.",
  "🎮 I built Dragonotchi—Best Design at KnightHacks VI.",
  "🔧 At BudgetWise I shipped Vue features and sped up onboarding 50%.",
  "🖥️ Full-stack chops: React, Node, Mongo, AWS.",
  "⚙️ I like turning blank repos into working systems.",
  "📊 My Discord bot served 250,000+ users across 600 servers.",
  "🛰️ I improved accessibility and performance in production UIs.",
  "🚀 Curious devs click UFOs. That's you.",
  "🎯 I build for real-world impact and speed."
];


let firstHintShown = false;

function showUFOHint() {
  const existingHint = document.querySelector('.ufo-hint');
  if (existingHint) existingHint.remove();

  const hintPopup = document.createElement('div');
  hintPopup.className = 'ufo-hint';

  if (!firstHintShown) {
    hintPopup.textContent = ufoHints[0];
    firstHintShown = true;
  } else {
    hintPopup.textContent = ufoHints[Math.floor(Math.random() * (ufoHints.length - 1)) + 1];
  }

  hintPopup.style.top = "20px";
  document.body.appendChild(hintPopup);

  setTimeout(() => {
    hintPopup.remove();
  }, 10000);
}

setTimeout(() => {
  spawnUFO();
}, Math.random() * 5000 + 5000);

let ufoSpawnInterval;

function startUfoInterval() {
  clearInterval(ufoSpawnInterval);
  ufoSpawnInterval = setInterval(() => {
    if (Math.random() < 0.6) {
      spawnUFO();
    }
  }, Math.random() * 30000 + 15000);
}

function stopUfoInterval() {
  clearInterval(ufoSpawnInterval);
}

startUfoInterval();

// listen for page visibility changes
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    stopUfoInterval();
  } else {
    startUfoInterval();
  }
});



/****************************************************************************
  Play UFO Sound Effect
****************************************************************************/
function playUFOSound() {
  const audio = new Audio('https://example.com/ufo_sound.mp3');
  audio.volume = 0.5;
  audio.play();
}

/****************************************************************************
  Typewriter Effect with Blinking Cursor
****************************************************************************/
const headingText = "Innovating Experiences That Matter";
const headingEl = document.getElementById('hero-heading');
if (headingEl) {
  headingEl.textContent = "";
  let index = 0;
  let cursorVisible = true;

  function typeWriter() {
    if (index < headingText.length) {
      headingEl.textContent = headingText.substring(0, index) + "_";
      index++;
      setTimeout(typeWriter, 60);
    } else {
      blinkCursor();
    }
  }
  function blinkCursor() {
    setInterval(() => {
      headingEl.textContent = cursorVisible ? headingText : headingText + "_";
      cursorVisible = !cursorVisible;
    }, 500);
  }
  document.addEventListener('DOMContentLoaded', typeWriter);
}

/****************************************************************************
  Scroll Progress
****************************************************************************/
const scrollProgress = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  if (!scrollProgress) return;
  const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  scrollProgress.style.width = scrolled + "%";
});