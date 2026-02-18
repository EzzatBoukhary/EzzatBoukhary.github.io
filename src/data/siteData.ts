import profileBanner from '../../assets/preview-banner.jpg';
import yHereLogo from '../../assets/logo_yhere.webp';
import jasLogo from '../../assets/logo_jas.png';
import budgetwiseLogo from '../../assets/logo_budgetwise.jpeg';
import reeltalkLogo from '../../assets/logo_reeltalk.jpeg';
import fsecLogo from '../../assets/logo_fsec.jpg';
import ucfLogo from '../../assets/logo_ucfcs.jpeg';

import puppetry1 from '../../assets/puppetry1.png';
import puppetry2 from '../../assets/puppetry2.png';
import puppetry3 from '../../assets/puppetry3.png';
import cew1 from '../../assets/cew1.png';
import cew2 from '../../assets/cew2.png';
import dragonotchi1 from '../../assets/dragonotchi1.jpg';
import dragonotchi2 from '../../assets/dragonotchi2.jpg';
import killerbot1 from '../../assets/killerbot1.png';
import killerbot2 from '../../assets/killerbot2.png';
import critters1 from '../../assets/critters1.png';
import critters2 from '../../assets/critters2.png';

import chukaAvatar from '../../assets/chuka.jpeg';
import lunaAvatar from '../../assets/luna.jpeg';
import recommendationPdf from '../../assets/recommendation_chuka.pdf';

export const profile = {
  name: 'Ezzat Boukhary',
  role: 'Software Engineer · Mobile + Full-Stack',
  playerTag: 'Builder-Class Engineer',
  location: 'Florida',
  email: 'ezzatboukhary03@gmail.com',
  heroImage: profileBanner,
  summary:
    'I build products end-to-end and optimize them until they feel fast, reliable, and genuinely useful. I enjoy turning rough concepts into polished systems that teams and users trust.',
  mission:
    'Create software that feels as intentional as a well-designed game: clear feedback, low friction, and meaningful progression.'
};

export const links = {
  github: 'https://github.com/ezzatBoukhary',
  linkedin: 'https://linkedin.com/in/ezzatboukhary',
  resumeDrive: 'https://drive.google.com/file/d/1p4zQ5j1vAa5xzovAew3WFuxcWn7HHd14/view',
  resumeDownload: 'https://drive.google.com/uc?export=download&id=1p4zQ5j1vAa5xzovAew3WFuxcWn7HHd14'
};

export const gameStats = [
  { label: 'Career XP', value: '6+ Years Building' },
  { label: 'Users Reached', value: '250K+' },
  { label: 'Communities', value: '600+ Servers' },
  { label: 'Optimization Win', value: '90% Firebase Reduction' }
];

export const achievements = [
  {
    title: 'Scale Commander',
    detail: 'Built and operated KillerBot across 600+ servers and 250K+ users.'
  },
  {
    title: 'Performance Specialist',
    detail: 'Reduced Firebase reads by ~90% through architecture changes.'
  },
  {
    title: 'Design Winner',
    detail: 'Won Best Design at KnightHacks VI with Dragonotchi.'
  },
  {
    title: 'Mentor Support',
    detail: 'Mentored 300+ students as UCF Undergraduate Learning Assistant.'
  }
];

export const experience = [
  {
    role: 'Lead Mobile App Developer',
    org: 'yHere',
    type: 'Full-Time',
    current: true,
    period: 'Aug 2025 — Present',
    logo: yHereLogo,
    stack: ['Flutter', 'Kotlin', 'Firebase', 'AWS'],
    summary:
      'Leading full-stack development of cross-platform applications with Flutter, Kotlin Multiplatform, Firebase, and AWS.',
    highlights: [
      'Architected iOS rollout for an Android-first product',
      'Reduced Firebase reads by ~90%',
      'Built and shipped core platform systems solo'
    ]
  },
  {
    role: 'Web Systems Developer',
    org: 'Jets and Aeronautics Society @ UCF',
    type: 'Part-Time',
    current: true,
    period: 'May 2025 — Present',
    logo: jasLogo,
    stack: ['SvelteKit', 'Prisma', 'TypeScript'],
    summary:
      'Modernizing web architecture and developer workflows for a 400+ member engineering organization.',
    highlights: [
      'Rebuilt systems with SvelteKit + Prisma',
      'Improved CI/CD and internal collaboration tooling',
      'Migrated infrastructure toward maintainable open-source patterns'
    ],
    href: 'https://jas-ucf.com'
  },
  {
    role: 'Frontend Developer Intern',
    org: 'BudgetWise',
    type: 'Internship',
    current: false,
    period: 'Mar 2025 — May 2025',
    logo: budgetwiseLogo,
    stack: ['Vue', 'TypeScript', 'Node.js'],
    summary:
      'Shipped performant Vue + TypeScript features and improved team onboarding quality.',
    highlights: [
      'Cut load times by 25%',
      'Built reusable components with backend integration',
      'Helped reduce onboarding time by 50%'
    ],
    href: 'https://budgetwise.co'
  },
  {
    role: 'Android Developer Intern',
    org: 'Reel Talk',
    type: 'Internship',
    current: false,
    period: 'Jan 2024 — Aug 2024',
    logo: reeltalkLogo,
    stack: ['Kotlin', 'Jetpack Compose', 'Firebase'],
    summary:
      'Owned Android development as the sole mobile developer using Kotlin, Compose, and Firebase.',
    highlights: [
      'Reduced crash rates by ~20%',
      'Improved load speed by ~15%',
      'Published internal near-beta builds to Google Play'
    ]
  },
  {
    role: 'Undergraduate Researcher',
    org: 'Florida Solar Energy Center',
    type: 'Research',
    current: false,
    period: 'May 2025 — Aug 2025',
    logo: fsecLogo,
    stack: ['Python', 'TensorFlow', 'MLP', 'LSTM'],
    summary:
      'Contributed to multimodal deep-learning diagnostics for photovoltaic defects in DARTS.',
    highlights: [
      'Modeled 2,000+ samples with MLP + LSTM',
      'Achieved R² = 0.79',
      'Co-authored and presented research outputs'
    ],
    href: 'https://www.linkedin.com/posts/ezzatboukhary_final-report-activity-7367396011469717504-XK1v'
  },
  {
    role: 'Undergraduate Learning Assistant',
    org: 'University of Central Florida',
    type: 'Part-Time',
    current: false,
    period: 'May 2025 — Aug 2025',
    logo: ucfLogo,
    stack: ['Java', 'OOP'],
    summary:
      'Mentored students at scale in Java OOP with a focus on architecture and debugging habits.',
    highlights: [
      'Supported 300+ students',
      'Led OOP and debugging sessions',
      'Coached practical software problem-solving'
    ]
  }
];

export const recommendations = [
  {
    name: 'Chuka Ikokwu',
    role: 'CEO @ Reel Talk · Formerly WB, Riot, Ubisoft, Unity',
    avatar: chukaAvatar,
    quote:
      'Ezzat consistently demonstrated exceptional technical skills, creativity, and dedication. His ability to solve complex problems and keen attention to detail significantly contributed to our app’s success.',
    links: [
      { label: 'Read full letter', href: recommendationPdf },
      {
        label: 'LinkedIn recommendations',
        href: 'https://www.linkedin.com/in/ezzatboukhary/details/recommendations'
      }
    ]
  },
  {
    name: 'Luna Lu',
    role: 'Backend Developer Colleague @ BudgetWise',
    avatar: lunaAvatar,
    quote:
      'He was eager to learn, diligent, and quick to understand workflows and API endpoints. Communication and collaboration with Ezzat were always smooth.',
    links: [
      {
        label: 'LinkedIn recommendations',
        href: 'https://www.linkedin.com/in/ezzatboukhary/details/recommendations'
      }
    ]
  }
];

export const mediaDeck = [
  {
    type: 'image',
    title: 'Gesture-Based Puppetry',
    source: puppetry2,
    caption: 'Realtime avatar control and animation blending systems.'
  },
  {
    type: 'image',
    title: 'College Event Platform',
    source: cew2,
    caption: 'Production-like event workflows and role-based approvals.'
  },
  {
    type: 'video',
    title: 'KillerBot Trailer',
    source: 'https://www.youtube.com/embed/1D4B9EFbSGk',
    caption: 'Feature showcase from the Discord bot platform era.'
  },
  {
    type: 'video',
    title: 'College Event Platform Demo',
    source: 'https://drive.google.com/file/d/1qpgSiqR47lKek5zrIISIGX-3Nq6m-g6D/preview',
    caption: 'Demo walkthrough covering backend constraints + UX flow.'
  }
];

export const projectCases = [
  {
    slug: 'gesture-based-puppetry',
    name: 'Gesture-Based Puppetry',
    period: 'Jan 2025 — Aug 2025',
    difficulty: 'Expert Quest',
    genre: 'Realtime Graphics / Simulation',
    accentColor: '#a855f7',
    tagline: 'Realtime 3D puppeteering for live simulation classrooms.',
    summary:
      'Built for TeachLivE at the University of Central Florida, this system replaced brittle manual toggle controls with natural expression blending and interpolation-heavy motion control — making live instructor simulation sessions more expressive and reliable.',
    stack: ['Three.js', 'Animation Blending', 'IndexedDB', 'Realtime Rendering'],
    gallery: [puppetry1, puppetry2, puppetry3],
    links: [{ label: 'Learn More', href: 'https://sites.google.com/view/teachlive/home' }],
    stats: [
      { value: '40%+', label: 'Scene Load Reduction' },
      { value: '7mo', label: 'Active Engagement' },
      { value: '3', label: 'Animation Systems Built' },
      { value: 'UCF', label: 'Research Platform' },
    ],
    objectives: [
      'Replace brittle toggle-based controls with a natural expression blending pipeline',
      'Investigate and resolve major legacy animation regressions introduced by the previous team',
      'Reduce scene load times to enable more fluid live classroom interactions',
      'Build a motion interpolation system that handles rapid instructor input without visual glitching',
    ],
    outcomes: [
      'Cut scene load times by 40%+, directly improving instructor workflow cadence',
      'Eliminated critical animation regression bugs that had persisted through prior development cycles',
      'Delivered a new expression-blending pipeline enabling continuous, natural avatar control',
      'System adopted into ongoing live TeachLivE simulation sessions at UCF',
    ]
  },
  {
    slug: 'college-event-platform',
    name: 'College Event Platform',
    period: 'Feb 2025 — Apr 2025',
    difficulty: 'Advanced Quest',
    genre: 'Full-Stack Product System',
    accentColor: '#0ea5e9',
    tagline: 'Constraint-driven event management for universities.',
    summary:
      'A production-grade full-stack platform for managing public, private, and RSO events at a university. Role-aware permissions and strict scheduling constraints are enforced at the database layer via stored procedures — not just frontend validation — ensuring correctness even under adversarial conditions.',
    stack: ['React', 'Node.js', 'Express', 'MySQL', 'Stored Procedures'],
    gallery: [cew1, cew2],
    links: [
      { label: 'GitHub', href: 'https://github.com/EzzatBoukhary/college-event-platform' },
      { label: 'Demo Video', href: 'https://drive.google.com/file/d/1qpgSiqR47lKek5zrIISIGX-3Nq6m-g6D/view?usp=sharing' },
      { label: 'Final Report', href: 'https://docs.google.com/document/d/1BHoFnWYCV6CdFsr2HLNBQ_cU1JYbW8JbvAkqsT4AO3k' }
    ],
    stats: [
      { value: '3', label: 'Distinct Role Types' },
      { value: 'DB-Level', label: 'Constraint Enforcement' },
      { value: 'Full-Stack', label: 'React + Node + MySQL' },
      { value: '10wk', label: 'Build Timeline' },
    ],
    objectives: [
      'Model the full complexity of real university event scheduling constraints',
      'Enforce data integrity with stored procedures and DB-level logic rather than app-layer softchecks',
      'Build a role-aware permission system for admins, RSO members, and public users',
      'Deliver a production-style operator workflow within a student project timeline',
    ],
    outcomes: [
      'Constraint enforcement at the database layer guarantees scheduling integrity even under edge-case inputs',
      'Role-aware approval workflows eliminated categories of manual mistakes common in ad-hoc systems',
      'Architecture mirrors production SaaS event management systems in scope and correctness',
      'Delivered on-time across a 10-week academic cycle with full feature coverage',
    ]
  },
  {
    slug: 'dragonotchi',
    name: 'Dragonotchi',
    period: 'Oct 2023',
    difficulty: 'Speedrun Quest',
    genre: 'Hackathon / Game UX',
    accentColor: '#f97316',
    tagline: 'Award-winning virtual pet built in 36 hours.',
    summary:
      'Dragonotchi took Best Design at KnightHacks VI — UCF\'s flagship hackathon — beating roughly 50 competing teams. The entire product: concept, art direction, interactions, and codebase, was designed and shipped in a single 36-hour session. The focus was intentional: lead with design, then layer in mechanics.',
    stack: ['UX Design', 'Rapid Prototyping', 'Frontend Engineering'],
    gallery: [dragonotchi1, dragonotchi2],
    links: [
      { label: 'Devpost', href: 'https://devpost.com/software/dragonotchi' },
      { label: 'GitHub', href: 'https://github.com/Caitlin-Fabian/dragonotchi' }
    ],
    stats: [
      { value: '#1', label: 'Best Design Award' },
      { value: '36h', label: 'Build Time' },
      { value: '~50', label: 'Competing Teams' },
      { value: '4', label: 'Person Team' },
    ],
    objectives: [
      'Establish a strong, cohesive visual identity within the first few hours',
      'Build memorable, playful interactions that judges would remember',
      'Balance design polish with code correctness under extreme time pressure',
      'Ship a complete experience — not a prototype — before the 36-hour cutoff',
    ],
    outcomes: [
      'Won Best Design at KnightHacks VI out of ~50 competing teams',
      'Delivered a fully functional, polished virtual pet within 36 hours',
      'Validated the design-first hackathon strategy as a competitive differentiator',
      'Project became a reference point in community discussions on hackathon UX quality',
    ]
  },
  {
    slug: 'killerbot',
    name: 'KillerBot',
    period: '2019 — 2022',
    difficulty: 'Endgame Quest',
    genre: 'Platform / Community Infrastructure',
    accentColor: '#e8ff38',
    tagline: 'A Discord bot platform serving 250,000+ users across 600+ servers.',
    summary:
      'Built entirely from scratch at age 14, KillerBot grew from a personal project into a large-scale Discord bot platform used by 250,000+ users across 600+ servers. Moderation, economy, entertainment, and custom API integrations were all built and maintained as a solo developer over three years — no team, no funding.',
    stack: ['C#', 'Discord.NET', 'API Integrations', 'Systems Design'],
    gallery: [killerbot1, killerbot2],
    links: [
      { label: 'GitHub', href: 'https://github.com/EzzatBoukhary/KillerBot' },
      { label: 'Trailer', href: 'https://www.youtube.com/watch?v=1D4B9EFbSGk' },
      { label: 'Top.gg', href: 'https://top.gg/bot/263753726324375572' }
    ],
    stats: [
      { value: '250K+', label: 'Users' },
      { value: '600+', label: 'Servers' },
      { value: '3yr', label: 'Active Lifespan' },
      { value: '20+', label: 'Feature Modules' },
    ],
    objectives: [
      'Design a modular bot architecture that could scale without a full rewrite',
      'Build a feature set spanning moderation, economy, music, and trivia — all solo',
      'Maintain reliability and uptime as the server count grew from hundreds to thousands',
      'Grow the user base organically through Top.gg listings and community word-of-mouth',
    ],
    outcomes: [
      'Scaled to 250,000+ unique users and 600+ Discord servers with no infrastructure team',
      'Operated stably for 3 years through multiple Discord API breaking changes',
      'Shipped 20+ feature modules including economy systems, moderation, and integrations',
      'Built when I was 14 years old — one of the earliest and most formative engineering challenges',
    ]
  },
  {
    slug: 'campus-critters',
    name: 'Campus Critters',
    period: 'Nov 2024',
    difficulty: 'Co-op Quest',
    genre: 'Web + Mobile Product',
    accentColor: '#22c55e',
    tagline: 'A social wildlife-spotting platform spanning web and mobile.',
    summary:
      'Campus Critters is a dual-platform product — a MERN web app and a Flutter mobile companion — for discovering and sharing wildlife sightings on a university campus. Map-based browsing via Leaflet, JWT-authenticated user accounts, and media upload support all ship in a single cohesive product surface.',
    stack: ['MERN', 'Flutter', 'Leaflet.js', 'JWT', 'MongoDB'],
    gallery: [critters1, critters2],
    links: [{ label: 'GitHub', href: 'https://github.com/EzzatBoukhary/animal-tracker' }],
    stats: [
      { value: '2', label: 'Platforms (Web + Mobile)' },
      { value: 'MERN', label: 'Web Stack' },
      { value: 'Flutter', label: 'Mobile Stack' },
      { value: 'Leaflet', label: 'Map Discovery' },
    ],
    objectives: [
      'Deliver a synchronized experience across web and Flutter mobile with shared data',
      'Build a map-first discovery model using Leaflet for interactive geolocation browsing',
      'Implement secure JWT-based authentication with full user account management',
      'Support media upload and retrieval flows for posting wildlife sightings',
    ],
    outcomes: [
      'Shipped a fully functional full-stack web app and a separate Flutter mobile app from the same backend',
      'Map-first discovery UI enables intuitive campus-wide wildlife exploration',
      'Secure auth and media upload flows handle the complete user lifecycle',
      'Demonstrated cross-platform product delivery as a solo contributor in a month',
    ]
  }
];

export const skillMatrix = [
  {
    category: 'Languages',
    values: ['TypeScript', 'JavaScript', 'Kotlin', 'Java', 'Python', 'C#', 'C++', 'Swift', 'Dart', 'SQL']
  },
  {
    category: 'Frameworks',
    values: ['React', 'Vue', 'SvelteKit', 'Node.js', 'Express', 'Flutter', 'Three.js', 'TensorFlow']
  },
  {
    category: 'Platforms',
    values: ['AWS', 'Firebase', 'MySQL', 'MongoDB', 'Docker', 'Linux', 'Prisma', 'GitHub Actions']
  },
  {
    category: 'Engineering Style',
    values: ['Agile', 'Scrum', 'TDD', 'CI/CD', 'Performance-First', 'Accessibility-Aware']
  }
];
