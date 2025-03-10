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
    <div class="project-links">
      <a href="https://sites.google.com/view/teachlive/home" target="_blank">
        <i class="fa-solid fa-globe"></i> <span>Learn More</span>
      </a>
    </div>
    <div class="image-gallery">
      <img src="https://www.ucf.edu/wp-content/blogs.dir/4/files/2017/02/StoryHeader_Avatars-1600x900.jpg" alt="Gesture-Based Puppetry Screenshot">
    </div>
    <h3>Overview</h3>
    <p>
      Gesture-Based Puppetry is an interactive animation system for TeachLivE that enables real-time character control through gestures.
    </p>
    <h3>Key Contributions</h3>
    <ul>
      <li>Developed lifelike facial expressions, procedural blinking, and head movement.</li>
      <li>Implemented real-time WebSocket communication for seamless interactions.</li>
      <li>Optimized performance using IndexedDB caching, reducing load times by 40%.</li>
    </ul>
    <h3>Technologies Used</h3>
    <p>Three.js, WebGL, TypeScript, React.js, WebSocket, IndexedDB</p>
  `,

  p2: `
    <h2>Campus Critters</h2>
    <div class="project-links">
      <a href="https://github.com/EzzatBoukhary/animal-tracker" target="_blank">
        <i class="fa-brands fa-github"></i> <span>GitHub Repo</span>
      </a>
    </div>
    <div class="image-gallery">
      <img src="https://github.com/EzzatBoukhary/animal-tracker/raw/main/web_app_post.png" alt="Campus Critters - Post Screen">
      <img src="https://github.com/EzzatBoukhary/animal-tracker/raw/main/web_app_auth.png" alt="Campus Critters - Authentication Screen">
    </div>
    <h3>Overview</h3>
    <p>
      Campus Critters is a web and mobile application designed for the UCF community to report, explore, and interact with real-time wildlife sightings on campus.
    </p>
    <h3>Key Features</h3>
    <ul>
      <li>User Authentication with secure login and email verification.</li>
      <li>Wildlife Reporting: Upload images, provide descriptions, and tag locations.</li>
      <li>Interactive Maps: Visualize sightings with real-time tracking using Leaflet and mobile map libraries.</li>
      <li>Filtering by animal type and seamless mobile app integration.</li>
    </ul>
    <h3>Technologies & Tools</h3>
    <p>React (TypeScript) with Chakra UI, Node.js with Express, MongoDB, Flutter (Dart), Firebase, DigitalOcean, Leaflet, SwaggerHub</p>
  `,

  p3: `
    <h2>Bubble Buddy Book</h2>
    <div class="project-links">
      <a href="https://github.com/SloanKeller/COP4331-G19" target="_blank">
        <i class="fa-brands fa-github"></i> <span>GitHub Repo</span>
      </a>
    </div>
    <h3>Overview</h3>
    <p>
      Bubble Buddy Book is a secure contact management system that allows users to efficiently store and organize personal and professional contacts.
    </p>
    <h3>Key Contributions</h3>
    <ul>
      <li>Led backend development for a LAMP-based solution.</li>
      <li>Designed and rigorously tested RESTful APIs using Postman and SwaggerHub.</li>
    </ul>
    <h3>Technologies Used</h3>
    <p>PHP, MySQL, LAMP Stack, DigitalOcean, SwaggerHub, Postman</p>
  `,

  p4: `
    <h2>Dragonotchi</h2>
    <div class="project-links">
      <a href="https://devpost.com/software/dragonotchi" target="_blank">
        <i class="fa-solid fa-gamepad"></i> <span>Devpost Page</span>
      </a>
      <a href="https://github.com/Caitlin-Fabian/dragonotchi" target="_blank">
        <i class="fa-brands fa-github"></i> <span>GitHub Repo</span>
      </a>
    </div>
    <div class="image-gallery">
      <img src="https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/002/613/881/datas/gallery.jpg" alt="Dragonotchi - Screenshot 1">
      <img src="https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/002/613/842/datas/gallery.jpg" alt="Dragonotchi - Screenshot 2">
    </div>
    <h3>Inspiration</h3>
    <p>
      We wanted to create a virtual pet that you can interact with as it sits at your desk. With an Arduino and an LCD panel at our disposal, we envisioned a digital companion that adds a spark of joy to everyday life.
    </p>
    <h3>What It Does</h3>
    <p>
      Dragonotchi is a virtual pet that you can play with, feed, and care for. It reacts to your interactions—swipe an item to it, and it will respond. But take care: neglecting it means it might just fade away!
    </p>
    <h3>How It Was Built</h3>
    <ul>
      <li>Designed a mobile app using Kotlin and Jetpack Compose for an intuitive interface.</li>
      <li>Connected an ESP8266 to a 16x16 LED panel to create the physical display for the dragon.</li>
      <li>Utilized Firebase Realtime Database to sync the dragon's state, ensuring it operates independently of the app.</li>
    </ul>
    <h3>Challenges We Ran Into</h3>
    <p>
      We fried our first ESP8266—a real scare—but managed to continue with a backup. Initially, we attempted to connect the ESP8266 and the mobile app via WebSockets; however, that approach failed, so we switched to Firebase's Realtime Database, which worked perfectly and stores the dragon's data even when the app is not running.
    </p>
    <h3>Accomplishments</h3>
    <p>
      We are incredibly proud that Dragonotchi works. Users can interact with and care for their pet, and every asset in the project was handmade.
    </p>
    <h3>What We Learned</h3>
    <p>
      We learned the importance of hardware compatibility and careful handling after our initial mishap with the ESP8266. The experience underscored the need for flexibility when facing technical challenges, as we successfully switched from WebSockets to Firebase. Teamwork and perseverance were key to overcoming obstacles.
    </p>
    <h3>What's Next for Dragonotchi</h3>
    <p>
      Our stretch goals include adding more dragons, integrating a light sensor to allow the pet to "sleep" at night, introducing additional interactive items, and even enabling multiplayer functionality so that multiple Dragonotchis can operate independently.
    </p>
    <h3>Built With</h3>
    <p>Android Studio, Arduino, Jetpack Compose, ESP8266, Firebase, Kotlin, WebSockets</p>
  `,

  p5: `
    <h2>KillerBot</h2>
    <div class="project-links">
      <a href="https://github.com/EzzatBoukhary/KillerBot" target="_blank">
        <i class="fa-brands fa-github"></i> <span>GitHub Repo</span>
      </a>
      <a href="https://www.youtube.com/watch?v=1D4B9EFbSGk" target="_blank">
        <i class="fa-brands fa-youtube"></i> <span>Watch Trailer</span>
      </a>
      <a href="https://top.gg/bot/263753726324375572" target="_blank">
        <i class="fa-solid fa-star"></i> <span>Top.gg Listing Page</span>
      </a>
    </div>
    <div class="image-gallery">
      <img src="https://github.com/EzzatBoukhary/KillerBot/raw/master/Discord_WctbanG82J.png" alt="KillerBot - Screenshot 1">
      <img src="https://github.com/EzzatBoukhary/KillerBot/raw/master/Discord_O1jBmRCiJq.png" alt="KillerBot - Screenshot 2">
    </div>
    <h3>Overview</h3>
    <p>
      KillerBot is a versatile Discord bot designed to enhance server functionality and user experience. Developed from April 2019 to August 2022, it gained significant traction in the Discord community, serving over 250,000 users across more than 600 servers.
    </p>
    <h3>Key Features</h3>
    <ul>
      <li><strong>Economy System:</strong> Engage users with a dynamic virtual economy featuring a built-in shop.</li>
      <li><strong>Moderation Tools:</strong> Robust commands for maintaining server order and safety.</li>
      <li><strong>Join-Leave Announcements:</strong> Customizable notifications to foster community engagement.</li>
      <li><strong>Minigames & Fun Commands:</strong> Interactive features that add entertainment and engagement.</li>
      <li><strong>Utility Commands:</strong> Streamlined commands for efficient server management.</li>
      <li><strong>Regular Updates & Support:</strong> Continuous improvements and dedicated maintenance.</li>
    </ul>
    <h3>Technologies Used</h3>
    <p>C#, Discord.NET, JSON, APIs, Webhooks</p>
    <h3>Ratings & Reviews</h3>
    <p>
      KillerBot has received positive feedback from its users, maintaining a 5-star rating on Top.gg. Users have praised its unique commands, including its moderation, fun, and utility commands that enhance server functionality as well as its regular updates and responsive developer who actively addresses user feedback.
    </p>
  `
};




const modal = document.getElementById('modal');
const modalBody = document.getElementById('modal-body');
const modalClose = document.querySelector('.modal-close');

// Listen for clicks on each project card to open the modal with expanded details
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', () => {
    const projId = card.getAttribute('data-project');
    modalBody.innerHTML = projectDetails[projId] || "<p>No details available.</p>";
    modal.classList.add("show");
  });
});

modalClose.addEventListener('click', () => {
  modal.classList.remove("show");
});

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove("show");
  }
});

// close modal with Esc
window.addEventListener('keydown', (e) => {
  if (e.key === "Escape") {
    modal.classList.remove("show");
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
  "👀 Did you see that? A UFO just flew by! Try clicking on one when you see it... You might learn something interesting about me!",
  "🚀 Did you know? I developed an Android app for Reel Talk almost entirely from scratch, using Kotlin, Jetpack Compose, and Firebase!",
  "💡 Fun fact: My 'Campus Critters' project, built with React, Node.js, and Flutter, helps students track and report wildlife on campus.",
  "🎮 I created 'Dragonotchi,' an award-winning virtual pet game that won Best Design at KnightHacks VI!",
  "🛠️ I specialize in Vue.js, TypeScript, and UI/UX design, making front-end interfaces fast, responsive, and intuitive!",
  "🔧 I built and optimized a budgeting platform at BudgetWise, improving load times by 25 percent while refining the user experience.",
  "🖥️ My full-stack expertise spans React, Node.js, MongoDB, and AWS, powering scalable, high-performance web apps.",
  "📊 My work on TeachLivE involved real-time 3D rendering, using WebGL and Three.js to create lifelike character animations.",
  "📌 My Discord bot, KillerBot, reached over 250,000 users and was actively used in more than 600 servers!",
  "🛰️ In my internship at BudgetWise, I helped ship high-impact Vue.js features that improved accessibility and performance!",
  "🔬 I have a passion for machine learning and vision-based applications, explored in my coursework in Robot Vision and ML Algorithms.",
  "🎯 Every project I build focuses on real-world impact, helping users solve problems efficiently and intuitively!"
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

headingEl.textContent = "";
let index = 0;
let cursorVisible = true;

function typeWriter() {
  if (index < headingText.length) {
    headingEl.textContent = headingText.substring(0, index) + "_";
    index++;
    setTimeout(typeWriter, 70);
  } else {
    blinkCursor();
  }
}

function blinkCursor() {
  setInterval(() => {
    if (cursorVisible) {
      headingEl.textContent = headingText;
    } else {
      headingEl.textContent = headingText + "_";
    }
    cursorVisible = !cursorVisible;
  }, 500);
}

document.addEventListener('DOMContentLoaded', typeWriter);


const scrollProgress = document.getElementById('scroll-progress');

window.addEventListener('scroll', () => {
  const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  scrollProgress.style.width = scrolled + "%";
});
