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
import puppetry4 from '../../assets/puppetry4.png';
import puppetry5 from '../../assets/puppetry5.png';
import puppetry8 from '../../assets/puppetry8.png';
import cew1 from '../../assets/cew1.png';
import cew2 from '../../assets/cew2.png';
import dragonotchi1 from '../../assets/dragonotchi1.jpg';
import dragonotchi2 from '../../assets/dragonotchi2.jpg';
import dragonotchi3 from '../../assets/dragonotchi3.jpg';
import killerbot1 from '../../assets/killerbot1.png';
import killerbot2 from '../../assets/killerbot2.png';
import killerbot3 from '../../assets/killerbot3.png';
import killerbot4 from '../../assets/killerbot4.png';
import killerbot5 from '../../assets/killerbot5.png';
import killerbot6 from '../../assets/killerbot6.png';
import critters1 from '../../assets/critters1.png';
import critters2 from '../../assets/critters2.png';
import critters3 from '../../assets/critters3.png';

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
    'I build products end-to-end and optimize them until they feel fast, reliable, and genuinely useful.',
  mission:
    'Create software that feels as intentional as a well-designed game: clear feedback, low friction, and meaningful progression.'
};

export const links = {
  github: 'https://github.com/ezzatBoukhary',
  linkedin: 'https://linkedin.com/in/ezzatboukhary',
  resumeDrive: 'https://drive.google.com/file/d/1p4zQ5j1vAa5xzovAew3WFuxcWn7HHd14/view',
  resumeDownload: 'https://drive.google.com/uc?export=download&id=1p4zQ5j1vAa5xzovAew3WFuxcWn7HHd14',
};

export const gameStats = [
  { label: 'Users Reached',      value: '250K+', fill: 100 },
  { label: 'Graduated GPA',      value: '3.96',  fill: 99  },
  { label: 'Firebase Reads Cut', value: '90%↓',  fill: 90  },
  { label: 'Students Mentored',  value: '300+',  fill: 75  },
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
    period: 'Aug 2025 - Present',
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
    current: false,
    period: 'May 2025 - Dec 2025',
    logo: jasLogo,
    stack: ['SvelteKit', 'Prisma', 'TypeScript'],
    summary:
      'Modernized web architecture and developer workflows for a 400+ member engineering organization.',
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
    period: 'Mar 2025 - May 2025',
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
    period: 'Jan 2024 - Aug 2024',
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
    period: 'May 2025 - Aug 2025',
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
    period: 'May 2025 - Dec 2025',
    logo: ucfLogo,
    stack: ['Java', 'OOP'],
    summary:
      'Mentored students at scale in Java OOP and data structures, supporting hundreds of students across multiple course sections.',
    highlights: [
      'Supported 300+ students across multiple sections',
      'Led OOP and debugging sessions'
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
    difficulty: 'Advanced',
    genre: 'Realtime Graphics / Simulation',
    accentColor: '#a855f7',
    tagline: 'Realtime 3D puppeteering for live simulation classrooms.',
    summary:
      'Built for TeachLivE at UCF, this system replaced robotic toggles with fluid expression blending and interpolation-heavy motion control, so instructors could run simulation sessions with believable, responsive avatars.',
    challenge:
      'The legacy pipeline produced stiff transitions, animation regressions, and slow scene loads that broke immersion in live classroom simulations.',
    role: 'Realtime Graphics & Animation Engineer',
    team: '4-person senior design team',
    signatureWin:
      'Turned an unstable legacy animation pipeline into a production-ready interaction layer used in live TeachLivE sessions.',
    stack: ['Three.js', 'Animation Blending', 'IndexedDB', 'Realtime Rendering'],
    gallery: [puppetry2, puppetry1, puppetry3, puppetry5, puppetry4, puppetry8],
    galleryCaptions: [
      'Full TeachLivE classroom overview — multi-character scene showing real-time avatar positioning.',
      'Live 3D classroom environment — TeachLivE simulation scene with virtual students and an avatar under active control.',
      'Character behavior panel — avatar state and expression controls used during puppeteering sessions.',
      'Puppeteer operator toolbar — wide control panel for triggering character actions and pose transitions in real time.',
      'Interactive simulation scene — avatar responsiveness tested live during classroom delivery.',
      'Focused character view — single avatar display for reviewing animation blend quality and motion fidelity.',
    ],
    links: [{ label: 'Learn More', href: 'https://sites.google.com/view/teachlive/home' }],
    stats: [
      { value: '40%+', label: 'Scene Load Reduction' },
      { value: '3', label: 'Animation Systems Rebuilt' },
      { value: 'Live', label: 'TeachLivE Adoption' },
      { value: '7mo', label: 'Delivery Timeline' },
    ],
    objectives: [
      'Designed and implemented expression blending to replace binary 0/1 face states',
      'Rebuilt transition handling to remove long-standing sit/stand and pose regressions',
      'Added IndexedDB caching and load optimizations to improve live-session startup speed',
      'Built interpolation logic that keeps motion natural during rapid puppeteer input bursts',
    ],
    outcomes: [
      'Cut scene load times by 40%+, reducing friction for every simulation run',
      'Resolved critical regressions that had blocked realistic puppet behavior',
      'Shipped natural expression + head-motion blending that improved classroom believability',
      'Adopted into ongoing TeachLivE simulation usage at UCF',
    ],
    technicalSkills: ['3D animation systems', 'Performance tuning', 'State machines', 'Client-side caching'],
    softSkills: ['Cross-discipline collaboration', 'Problem decomposition', 'User empathy', 'Clear technical communication'],
  },
  {
    slug: 'college-event-platform',
    name: 'College Event Platform',
    period: 'Feb 2025 — Apr 2025',
    difficulty: 'Full-Stack',
    genre: 'Full-Stack Product System',
    accentColor: '#0ea5e9',
    tagline: 'Constraint-driven event management for universities.',
    summary:
      'A production-style full-stack platform for public, private, and RSO events with constraints enforced in the database layer, not only in UI forms, so invalid schedules cannot leak into production data.',
    challenge:
      'University event workflows break quickly when permissions and scheduling checks live only in frontend code.',
    role: 'Lead Backend Engineer + Full-Stack Contributor',
    team: '3-person product team',
    signatureWin:
      'Architected DB-level enforcement (procedures + triggers) that preserved data integrity even for edge-case inputs.',
    stack: ['React', 'Node.js', 'Express', 'MySQL', 'Stored Procedures'],
    gallery: [cew2, cew1],
    galleryCaptions: [
      'Event Manager dashboard — event listing with titles and dates ("Tech Talk", "Football Game"), search bar, and multi-role navigation.',
      'Authentication screen — role-based sign-in and registration for students, RSO members, and admins.',
    ],
    links: [
      { label: 'GitHub', href: 'https://github.com/EzzatBoukhary/college-event-platform' },
      { label: 'Demo Video', href: 'https://drive.google.com/file/d/1qpgSiqR47lKek5zrIISIGX-3Nq6m-g6D/view?usp=sharing' },
      { label: 'Final Report', href: 'https://docs.google.com/document/d/1BHoFnWYCV6CdFsr2HLNBQ_cU1JYbW8JbvAkqsT4AO3k' }
    ],
    stats: [
      { value: '3', label: 'Role Types Enforced' },
      { value: 'DB-First', label: 'Constraint Model' },
      { value: '10wk', label: 'End-to-End Delivery' },
      { value: 'E2E', label: 'Backend Ownership' },
    ],
    objectives: [
      'Modeled university scheduling rules in a normalized schema with relational guarantees',
      'Implemented role-aware authorization for admins, super-admins, RSO members, and public users',
      'Built backend endpoints for approvals, conflict checks, and event lifecycle actions',
      'Delivered search/filter UX and dashboard workflows for daily operator usage',
    ],
    outcomes: [
      'Database-level constraints prevented invalid scheduling combinations by design',
      'Approval workflows reduced manual errors common in ad-hoc student systems',
      'Delivered full-stack scope on time in a 10-week cycle with strong feature completeness',
      'Produced a final report + demo showing production-like system architecture',
    ],
    technicalSkills: ['Relational data modeling', 'API architecture', 'Stored procedures/triggers', 'Access control design'],
    softSkills: ['Technical leadership', 'Ownership under deadlines', 'Team coordination', 'Documentation discipline'],
  },
  {
    slug: 'dragonotchi',
    name: 'Dragonotchi',
    period: 'Oct 2023',
    difficulty: 'Hackathon',
    genre: 'Hackathon / Game UX',
    accentColor: '#f97316',
    tagline: 'Award-winning virtual pet built in 36 hours.',
    summary:
      'Dragonotchi won Best Design at KnightHacks VI (about 50 teams). In 36 hours, we shipped concept, art direction, gameplay interactions, and a complete demo instead of an unfinished prototype.',
    challenge:
      'Hackathons reward polish and clarity, but time pressure usually forces teams to cut design quality or product completeness.',
    role: 'Gameplay + Mobile App Developer',
    team: '4-person hackathon team',
    signatureWin:
      'Led implementation for interactive gameplay loops that helped the team win Best Design.',
    stack: ['UX Design', 'Rapid Prototyping', 'Frontend Engineering'],
    gallery: [dragonotchi1, dragonotchi3, dragonotchi2],
    galleryCaptions: [
      'Physical Dragonotchi device — ESP8266 microcontroller driving a 16×16 LED matrix panel displaying the dragon sprite.',
      'In-app minigame — "Toss the ball up to play" interaction screen from the Kotlin Android pet companion app.',
      'Android companion app — the dragon pet rendered in dark mode on the Kotlin-built mobile interface.',
    ],
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
      'Established visual direction early so implementation stayed cohesive under time pressure',
      'Built complete interaction loops (care, feedback, progression) rather than isolated screens',
      'Adapted architecture quickly when backend decisions changed mid-hackathon',
      'Maintained product polish while still shipping on the deadline',
    ],
    outcomes: [
      'Won Best Design at KnightHacks VI against ~50 competing teams',
      'Delivered a complete, polished product in 36 hours',
      'Validated design-first execution as a measurable competitive edge',
      'Showcased calm delivery and decision quality under extreme time constraints',
    ],
    technicalSkills: ['Rapid prototyping', 'Interaction design implementation', 'Realtime state syncing', 'Frontend architecture'],
    softSkills: ['Creativity under pressure', 'Fast decision-making', 'Team alignment', 'Pitch storytelling'],
  },
  {
    slug: 'killerbot',
    name: 'KillerBot',
    period: '2019 — 2022',
    difficulty: 'Solo · 3 Years',
    genre: 'Platform / Community Infrastructure',
    accentColor: '#e8ff38',
    tagline: 'A Discord bot platform serving 250,000+ users across 600+ servers.',
    summary:
      'Built from scratch at age 14, KillerBot evolved into a large-scale Discord platform serving 250,000+ users across 600+ servers with moderation, economy, entertainment, and API-integrated feature modules.',
    challenge:
      'Sustaining product quality and uptime as a solo developer while scope and user load kept growing over multiple years.',
    role: 'Solo Founder + Full-Stack Bot Engineer',
    team: 'Solo project (3-year lifecycle)',
    signatureWin:
      'Scaled and maintained a high-usage community platform solo, through API changes and continuous feature expansion.',
    stack: ['C#', 'Discord.NET', 'API Integrations', 'Systems Design'],
    gallery: [killerbot4, killerbot6, killerbot1, killerbot2, killerbot5, killerbot3],
    galleryCaptions: [
      'k!help output — full command reference spanning Moderation, Basic, and Utils categories across 20+ modules.',
      'Multiple 5-star top.gg reviews — "One of the best multi-purpose bots you\'ll ever find" among repeated community praise.',
      'k!weather command — live weather report for Breckenridge, US: 37°C, haze, 29% cloud coverage pulled from a real-time API.',
      'Economy system — k!bal showing wallet (43,507 coins) and bank balance after a 35,506-coin withdrawal transaction.',
      'k!trivia minigame — category and difficulty selection screen; reaction-based controls let the caller configure their game.',
      '5-star user review — "KillerBot is honestly one of the best bots I\'ve used on Discord, mainly because of how much it does."',
    ],
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
      'Designed a modular architecture to add features without rewriting core systems',
      'Built and maintained moderation, economy, utility, and entertainment modules solo',
      'Handled reliability operations and releases through sustained user growth',
      'Drove organic adoption through product quality and community trust signals',
    ],
    outcomes: [
      'Scaled to 250,000+ users and 600+ servers without an infrastructure team',
      'Operated for 3 years through Discord API changes and ecosystem churn',
      'Shipped 20+ modules that increased retention and day-to-day server utility',
      'Demonstrated long-horizon ownership, resilience, and product thinking early in career',
    ],
    technicalSkills: ['System design', 'Modular architecture', 'API integration', 'Operational reliability'],
    softSkills: ['Entrepreneurial ownership', 'Self-management', 'Community empathy', 'Long-term execution consistency'],
  },
  {
    slug: 'campus-critters',
    name: 'Campus Critters',
    period: 'Nov 2024',
    difficulty: 'Team Project',
    genre: 'Web + Mobile Product',
    accentColor: '#22c55e',
    tagline: 'A social wildlife-spotting platform spanning web and mobile.',
    summary:
      'Campus Critters is a dual-platform product (MERN web + Flutter mobile) for discovering and sharing campus wildlife sightings, with map-first browsing, secure auth, and media-backed posts.',
    challenge:
      'Cross-platform products often drift into inconsistent UX and mismatched backend behavior when shipped quickly.',
    role: 'Full-Stack + Mobile Developer',
    team: 'Small project team',
    signatureWin:
      'Delivered synchronized web and mobile experiences backed by one cohesive API and data model.',
    stack: ['MERN', 'Flutter', 'Leaflet.js', 'JWT', 'MongoDB'],
    gallery: [critters3, critters2, critters1],
    galleryCaptions: [
      'Interactive map — animal category filters (Cat, Deer, Raccoon, Squirrel, Bird, Reptile, Fish, Bug) overlaid on live campus sightings.',
      'Post details — squirrel sighting by Ezzat ("where\'s the food at?"), 11 days ago, with map location and animal data.',
      'Login screen — username/password authentication with "Forgot Password" and "Sign Up" options.',
    ],
    links: [{ label: 'GitHub', href: 'https://github.com/EzzatBoukhary/animal-tracker' }],
    stats: [
      { value: '2', label: 'Platforms Shipped' },
      { value: '1', label: 'Unified Backend API' },
      { value: 'JWT', label: 'Secure Auth System' },
      { value: 'Map + Media', label: 'Core Product Loop' },
    ],
    objectives: [
      'Built a shared backend powering both React web and Flutter mobile clients',
      'Implemented map-first discovery with location-aware browsing and filtering',
      'Delivered JWT-secured auth, profile management, and protected endpoints',
      'Implemented media upload/retrieval for a complete end-user posting flow',
    ],
    outcomes: [
      'Shipped both web and mobile applications with a unified backend architecture',
      'Delivered intuitive campus-wide discovery through a map-centered UX',
      'Implemented secure auth and media flows covering the full user lifecycle',
      'Demonstrated end-to-end cross-platform delivery speed and product ownership',
    ],
    technicalSkills: ['Cross-platform architecture', 'REST API design', 'Auth/security flows', 'Geospatial UI integration'],
    softSkills: ['Product ownership', 'Prioritization', 'User-centered design thinking', 'Execution speed'],
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
