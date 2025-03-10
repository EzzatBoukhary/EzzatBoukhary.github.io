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
  Modal for Full Project Details
****************************************************************************/
const projectDetails = {
  p1: `
    <h2>Gesture-Based Puppetry</h2>
    <p><strong>Date:</strong> Jan 2025 - Present</p>
    
    <p><strong>Graphics Lead | Senior Design Project</strong></p>
    <ul>
      <li>Leads real-time 3D rendering and animation for TeachLivE using Three.js, WebGL, and React.</li>
      <li>Develops lifelike facial expressions, head movement, and procedural blinking.</li>
      <li>Optimizes WebGL with IndexedDB caching to cut load times by 40%.</li>
    </ul>
    <p><strong>Skills:</strong> Three.js, WebGL, TypeScript, React.js, WebSocket</p>
    <p><a href="https://sites.google.com/view/teachlive/home" target="_blank">About TeachLivE</a></p>
    <div class="image-gallery">
      <img src="https://www.ucf.edu/wp-content/blogs.dir/4/files/2017/02/StoryHeader_Avatars-1600x900.jpg" alt="Gesture-Based Puppetry Screenshot 1">
    </div>
  `,

  p2: `
    <h2>Campus Critters</h2>
    <p><strong>Date:</strong> Nov 2024 - Dec 2024</p>
    
    <ul>
      <li>Developed a MERN-stack web platform & Flutter app for wildlife tracking at UCF.</li>
      <li>Managed authentication, image uploads, and interactive maps using Node.js, React, and DigitalOcean.</li>
    </ul>
    <p><strong>Skills:</strong> MERN Stack, Flutter, DigitalOcean, React, Node.js</p>
    <p><a href="https://github.com/EzzatBoukhary/animal-tracker" target="_blank">GitHub Repo</a></p>
    <div class="image-gallery">
      <img src="https://github.com/EzzatBoukhary/animal-tracker/raw/main/web_app_post.png" alt="Campus Critters Screenshot 1">
      <img src="https://github.com/EzzatBoukhary/animal-tracker/raw/main/web_app_auth.png" alt="Campus Critters Screenshot 2">
    </div>
  `,

  p3: `
    <h2>Bubble Buddy Book</h2>
    <p><strong>Date:</strong> Aug 2024 - Sept 2024</p>
    <ul>
      <li>Led backend development for a LAMP-based contact manager.</li>
      <li>Designed and tested APIs using Postman and SwaggerHub.</li>
    </ul>
    <p><strong>Skills:</strong> PHP, MySQL, LAMP Stack, DigitalOcean</p>
    <p><a href="https://github.com/SloanKeller/COP4331-G19" target="_blank">GitHub Repo</a></p>
  `,

  p4: `
    <h2>Dragonotchi</h2>
    <p><strong>Date:</strong> Oct 2023</p>
    
    <ul>
      <li>Winner of KnightHacks VI - Best Design Award.</li>
      <li>Developed an interactive virtual pet using Kotlin, Jetpack Compose, and ESP8266.</li>
    </ul>
    <p><strong>Skills:</strong> Kotlin, Jetpack Compose, ESP8266, Firebase</p>
    <p><a href="https://devpost.com/software/dragonotchi" target="_blank">Devpost Page</a></p>
    <div class="image-gallery">
      <img src="https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/002/613/881/datas/gallery.jpg" alt="Dragonotchi Screenshot 1">
      <img src="https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/002/613/842/datas/gallery.jpg" alt="Dragonotchi Screenshot 2">
    </div>
  `,

  p5: `
    <h2>KillerBot</h2>
    <p><strong>Date:</strong> Apr 2019 - Aug 2022</p>
    
    <ul>
      <li>Developed a Discord bot serving 250K+ users across 600+ servers.</li>
      <li>Implemented an economy system, moderation tools, and utility commands.</li>
    </ul>
    <p><strong>Skills:</strong> C#, Discord.NET, APIs, Webhooks</p>
    <p><a href="https://github.com/EzzatBoukhary/KillerBot" target="_blank">GitHub Repo</a></p>
    <div class="image-gallery">
      <img src="https://github.com/EzzatBoukhary/KillerBot/raw/master/Discord_WctbanG82J.png" alt="KillerBot Screenshot 1">
      <img src="https://github.com/EzzatBoukhary/KillerBot/raw/master/Discord_O1jBmRCiJq.png" alt="KillerBot Screenshot 2">
    </div>
  `
};

const modal = document.getElementById('modal');
const modalBody = document.getElementById('modal-body');
const modalClose = document.querySelector('.modal-close');

// listen for clicks on each .project-card
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', () => {
    const projId = card.getAttribute('data-project');
    modalBody.innerHTML = projectDetails[projId] || "<p>No details available.</p>";
    modal.classList.remove('hidden');
  });
});

// close the modal on close button click
modalClose.addEventListener('click', () => {
  modal.classList.add('hidden');
});

// close if clicking outside modal content
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.add('hidden');
  }
});


/****************************************************************************
  Audio Controls: Background Music & Click Sound
****************************************************************************/
const bgMusic = document.getElementById('bg-music');
const clickSound = document.getElementById('click-sound');
const toggleSoundBtn = document.getElementById('toggle-sound');
let musicEnabled = false;
toggleSoundBtn.addEventListener('click', () => {
  musicEnabled = !musicEnabled;
  if (musicEnabled) {
    bgMusic.volume = 0.2;
    bgMusic.play();
  } else {
    bgMusic.pause();
  }
});
function playClickSound() {
  clickSound.currentTime = 0;
  clickSound.play().catch(() => {});
}
document.querySelectorAll('.nav-links a, .btn, .btn-card').forEach(el => {
  el.addEventListener('click', () => { playClickSound(); });
});

/****************************************************************************
  UFO Easter Egg (Hidden Mini-Game)
****************************************************************************/
function spawnUFO() {
  const ufo = document.createElement('div');
  ufo.className = 'ufo';

  // Ensure UFO starts at a visible height
  ufo.style.top = Math.random() * (window.innerHeight * 0.5) + 'px';  
  ufo.style.left = '-100px';  // starts just off-screen

  console.log("🛸 UFO has appeared! Click it before it disappears!");

  // On click, unlock the Easter egg
  ufo.addEventListener('click', (e) => {
    e.stopPropagation();
    showFunFact("🛸 Easter Egg Unlocked! You've discovered a secret UFO! 🚀");
    ufo.remove();
    playClickSound();
  });

  document.body.appendChild(ufo);

  // Remove the UFO after its animation completes
  ufo.addEventListener('animationend', () => {
    console.log("🛸 UFO disappeared...");
    ufo.remove();
  });
}

spawnUFO();

setInterval(() => {
  if (Math.random() < 0.5) {
    spawnUFO();
  }
}, Math.random() * 120 + 180000);  

/****************************************************************************
  Interactive Planet Navigation
****************************************************************************/
document.querySelectorAll('.planet').forEach(planet => {
  planet.addEventListener('click', () => {
    const targetId = planet.getAttribute('data-target');
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
      playClickSound();
    }
  });
});
