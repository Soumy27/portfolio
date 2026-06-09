// ============================================================================
//  EDIT THIS FILE TO PUT IN YOUR REAL CONTENT.
//  Everything below is placeholder text based on the original design.
//  Drop your project images into /public/projects/ and reference them as
//  "/projects/your-image.jpg".
// ============================================================================

export const profile = {
  // Shown big in the header, intro landing and footer (large display name).
  name: 'Soumy Dhiran',
  // The small year shown next to the big name (set to '' to hide it).
  landingYear: '',
  // The wordmark shown bottom-centre on the hero + top-right once scrolled.
  // Renders as "<wordmark> - Folio" with "Folio" in italic.
  wordmark: 'Dev',
  // The one-liner shown in the centre of the header row.
  motto: 'Software developer · building for the web',
  // Hero lines (kept for the About panel / meta use).
  heroLines: [
    "I'm a software developer",
    'Focused on web development & building products.',
  ],
  // Big centered intro sentence (shown over the cube section).
  intro:
    'I build for the web — turning ideas into fast, thoughtful products with clean, reliable code.',
  // Outro / footer headline.
  outro: ['Have an idea in mind?', 'Feel free to contact.'],
  // Giant faint wordmark at the very bottom of the footer.
  footerMark: 'Get in touch',
  credit: 'Designed & built by Soumy Dhiran',

  email: 'soumy2706@gmail.com',
  socials: [
    { label: 'Instagram', href: 'https://www.instagram.com/soumy_dhiran_27/' },
    { label: 'Linkedin', href: 'https://www.linkedin.com/in/soumydhiran/' },
  ],
}

export const about = {
  bio: [
    'Soumy Dhiran is a software developer focused on building for the web.',
    'Comfortable across the stack — from clean, accessible front-ends to solid back-end logic — Soumy turns ideas into fast, reliable products with thoughtful, maintainable code.',
  ],
  columns: [
    {
      title: 'Education',
      items: ['B.Tech — Graduating 2027'],
    },
    {
      title: 'Stack',
      items: [
        'JavaScript / TypeScript',
        'React & Node.js',
        'HTML, CSS & Tailwind',
        'Databases & REST APIs',
      ],
    },
    {
      title: 'Focus',
      items: ['Web development', 'Full-stack apps', 'Clean, reliable code'],
    },
  ],
}

// The rotating words near the hero (mouse-trail clone effect).
export const dynamicWords = [
  'React',
  'TypeScript',
  'Node.js',
  'Web dev',
  'Full-stack',
  'Building things',
]

// The services list that reveals on scroll in the projects intro.
export const services = [
  'Frontend',
  'Backend',
  'Full-stack',
  'Agentic AI',
  'Machine Learning',
]

// ============================================================================
//  YOUR PROJECTS — add/remove freely. Each card scatters into view on scroll.
//  image: put files in /public/projects/  (placeholder gradients shown for now)
// ============================================================================
export const projects = [
  {
    title: 'Habit Streak Consequence',
    description:
      'Set a habit — break the streak and it charges your card or blocks your favourite site. Discipline forged through documented consequence.',
    image: '/projects/habit-streak.png',
    bg: '#f4f3ef',
    href: 'https://habit-streak-consequence-fh5baux4g-soumy-s-projects2.vercel.app/',
  },
  {
    title: 'Ambient News',
    description:
      'The world as a living map — global headlines plotted on an interactive 3D globe, filterable by conflict, economy and nature.',
    image: '/projects/ambient-news.png',
    bg: '#05060a',
    href: 'https://ambient-news.vercel.app/',
  },
  {
    title: 'CareerAI',
    description:
      'An AI-powered job-application copilot — track your pipeline, tailor resumes with AI, and auto-detect application updates from your inbox.',
    image: '/projects/careerai.png',
    bg: '#eef2fb',
    href: 'https://ai-job-assistant-omega.vercel.app/login',
  },
  {
    title: 'BillKaro',
    description:
      'GST invoicing for Indian micro-businesses — create GST-compliant invoices, share on WhatsApp, accept payments, and automate reminders.',
    image: '/projects/billkaro.png',
    bg: '#f5f6fa',
    href: 'https://billkaro-sigma.vercel.app/',
  },
]

// Faces of the rotating showreel cube. Use a video for front/back, images for sides.
// Leave video empty to fall back to gradient faces.
export const cube = {
  video: '', // e.g. "/showreel.mp4"
  // [front, back, right, left, top, bottom]
  // each can be an image OR a video (.mp4/.webm) — '' = shaded gradient.
  // front + right are adjacent faces, so both projects sit next to each other.
  faces: [
    '/projects/habit-streak.png', // front  (project 1)
    '/projects/ambient-news.mp4', // back   (project 2 — globe video)
    '', // right
    '', // left
    '', // top
    '', // bottom
  ],
}

// Draggable little folders in the footer.
export const folders = [
  {
    label: 'CV',
    href: 'https://drive.google.com/file/d/1ZtN5yhblef9u3QwbGI8cmJJI9TJ4jRH1/view?usp=drive_link',
  },
]
