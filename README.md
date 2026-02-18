# EzzatBoukhary.github.io

My personal portfolio website, rebuilt as a drivable interactive 3D portfolio park.

🌐 **Live Site**: [ezzatboukhary.github.io](https://ezzatboukhary.github.io/)

## What's Inside

- **3D Portfolio Park** (`/`) – A full-screen playable world where visitors drive through colorful zones and interact with kiosks.
- **Interactive Stations** – About, Experience, Projects, Achievements, Skills, Testimonials, and Contact are all represented in-world.
- **3D Info Panels** – Portfolio details render as in-scene floating panels instead of traditional 2D page sections.
- **External Link Beacons** – 3D link orbs open GitHub, LinkedIn, and Resume.

## Tech Stack

- React 18
- Vite 5
- Three.js
- @react-three/fiber
- @react-three/drei

## Features

- Complete 3D-first portfolio experience (no traditional 2D layout pages)
- Keyboard driving controls with in-world zone interaction
- Data-driven portfolio content from `src/data/siteData.js`
- Real-time lighting, sparkles, fog, and animated 3D scene elements

## Local Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
npm run preview
```

## Preview

Controls:

- Drive with `WASD` or arrow keys.
- Press `E` near a kiosk to open that section panel.
- Press `Esc` to close the active panel.
- Use panel links to open projects, recommendations, and contact destinations.