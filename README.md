# Soumy Dhiran — Portfolio

My personal developer portfolio — an interactive, animation-driven single page
built with React. Features a custom WebGL background, smooth scrolling, a
morphing header, scroll-driven section reveals, a scattered project grid, and a
draggable contact footer.

## Tech

- **React + Vite**
- **GSAP** — ScrollTrigger, Draggable, Inertia (scroll animations & interactions)
- **Lenis** — smooth scrolling
- **Three.js** — full-screen WebGL background shader

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → /dist
npm run preview    # preview the production build
```

## Editing content

All copy, links, and projects live in [`src/data/content.js`](src/data/content.js):

- `profile` — name, tagline, email, social links
- `about` — bio + columns shown in the About panel
- `projects` — `{ title, description, image, href, bg }` for each project card
- `services` — the skills list
- `folders` — the draggable footer shortcuts (CV, etc.)

Project images go in `public/projects/` and are referenced like
`/projects/name.png`.

## Structure

```
src/
  data/content.js      ← all editable content
  styles/global.css    ← styles + theme variables
  shaders/dotScreen.js ← WebGL background shader
  components/          ← Header, Hero, AboutOverlay, ProjectsSection, Footer …
  App.jsx              ← layout + smooth-scroll wiring
```
