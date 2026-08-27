export const site = {
  name: 'Rahul Sharma',
  role: 'Software Engineer',
  location: 'Kathmandu, Nepal',
  heroSupport:
    'I build practical digital products using React, React Native, Node.js, PostgreSQL, and AI.',
  aboutHeadline:
    "I'm a software engineer focused on building real-world products across web, mobile, backend, and AI.",
  aboutBody:
    "My core stack is React, React Native, Expo, Node.js, PostgreSQL, and Prisma. I work on booking systems, authentication, notification infrastructure, and mobile apps — and I'm expanding into LLM-powered products, RAG, and AI SaaS.",
  aboutNote:
    'Junior Software Engineer at ALTISE Technologies, building Slotani, a booking and queue-management SaaS.',
  contactHeadline: 'Turning complex problems into simple products.',
  contactNote: 'Open to remote software engineering and product roles.',
  showContactNote: false,
  email: 'rahulbarahi.connect@gmail.com',
  resume: '/resume.pdf',
  resumeLabel: 'View Resume',
  copyrightYear: 2024,
  socials: [
    { label: 'GitHub', href: 'https://github.com/rahulbarahi', icon: 'github' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/rahulbarahi', icon: 'linkedin' },
    { label: 'X', href: 'https://x.com/rahulbarahi', icon: 'x' },
  ],
}

export const nav = [
  { hash: 'about', label: 'About' },
  { hash: 'skills', label: 'Skills' },
  { hash: 'experience', label: 'Experience' },
  { hash: 'work', label: 'Work' },
  { hash: 'contact', label: 'Drop a line' },
]

export const labels = {
  workCta: 'Work',
  about: 'About',
  skills: 'Skills',
  experience: 'Experience',
  work: 'Selected work',
  process: 'Process',
  contact: 'Drop me a line',
  liveDemo: 'Live Demo',
  github: 'GitHub',
  techStack: 'Tech stack',
  built: 'What I built',
  challenge: 'Challenge',
  workBack: 'Work',
  formEyebrow: 'Work',
  formTitle: 'Tell me about the project',
  formName: 'Name',
  formEmail: 'Email',
  formProject: 'Project',
  formMessage: 'Message',
  formPlaceholder: 'Web, mobile, AI, or something else',
  formSend: 'Send',
  formClose: 'Close',
  notFound: 'Page not found',
  notFoundBody:
    'This page doesn’t exist — or it moved. Head home and keep looking around.',
  backHome: 'Back home',
  viewWork: 'View work',
}

export const roles = [
  { line1: 'Software', line2: 'Engineer' },
  { line1: 'Full Stack', line2: 'Developer' },
  { line1: 'Mobile App', line2: 'Developer' },
  { line1: 'AI', line2: 'Engineer' },
  { line1: 'UI / UX', line2: 'Designer' },
]

export function nextRoleIndex(index, length = roles.length) {
  return (index + 1) % length
}

export const projects = [
  {
    id: '01',
    slug: 'slotani',
    name: 'Slotani',
    tags: 'Booking SaaS · React Native · Node.js · PostgreSQL',
    image: '/projects/slotani.png',
    summary:
      'A booking and queue-management SaaS for businesses that need digital queues, outlets, customers, and notifications.',
    built: [
      'Booking and queue workflows across web and mobile',
      'Outlet-based flows and QR customer entry',
      'Google Sign-In, JWT auth, and notification preferences',
      'Multi-channel delivery: FCM, web push, SMS, email, and in-app inbox',
    ],
    tech: ['React', 'React Native', 'Node.js', 'PostgreSQL', 'Redis', 'BullMQ', 'Firebase'],
    challenge:
      'Routing notifications across channels and keeping Google Sign-In reliable across QA, Cloudflare Access, and mobile builds.',
    demo: '',
    github: '',
  },
  {
    id: '02',
    slug: 'prepswipe',
    name: 'Prepswipe',
    tags: 'Learning app · React · Vite · Flashcards',
    image: '/projects/prepswipe.png',
    summary:
      'A flashcard product with swipe-based revision and a visual, cartoon-inspired 2D interface so studying feels like a game, not a chore.',
    built: [
      'Swipe-based flashcard interactions',
      'A distinct 2D visual direction for revision',
      'Frontend architecture in React and Vite',
    ],
    tech: ['React', 'Vite'],
    challenge:
      'Making study and revision feel engaging without burying the actual learning under decoration.',
    demo: '',
    github: '',
  },
  {
    id: '03',
    slug: 'mindra',
    name: 'Mindra',
    tags: 'Mobile productivity · React Native · Expo · AI',
    image: '/projects/mindra.png',
    summary:
      'A mobile life assistant built around contextual reminders and scenario checklists — office to home, travel, treks, and more.',
    built: [
      'Scenario-based checklists and reminder types',
      'A mobile-first productivity experience',
      'Planned AI capabilities on a React Native and Node stack',
    ],
    tech: ['React Native', 'Expo', 'Nativewind', 'Node.js', 'Prisma', 'PostgreSQL', 'AI'],
    challenge:
      'Reminders that understand context instead of dumping a generic to-do list on the user.',
    demo: '',
    github: '',
  },
  {
    id: '04',
    slug: 'qr-menu',
    name: 'QR Menu',
    tags: 'SaaS concept · QR flows · Product UX',
    image: '/projects/qrmenu.png',
    summary:
      'A digital restaurant menu concept: one reusable QR, the system decides the outlet, and the guest never sees the wrong menu.',
    built: [
      'QR-based restaurant profiles and menus',
      'Outlet-aware entry so one code can serve many locations',
      'A low-friction customer flow',
    ],
    tech: ['Product UX', 'QR systems', 'SaaS'],
    challenge:
      'Businesses should not need a different QR for every outlet. The complexity stays in the system, not in the guest’s hands.',
    demo: '',
    github: '',
  },
]

export function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug)
}

export const experience = [
  {
    id: '01',
    role: 'Junior Software Engineer',
    company: 'ALTISE Technologies',
    location: 'Nepal',
    period: 'Present',
    summary:
      'Building Slotani, a booking and queue-management SaaS across web, mobile, and backend.',
    points: [
      'React Native, React, Node.js, and PostgreSQL across the product',
      'Authentication, Google Sign-In, and notification routing',
      'Production debugging, QA environments, and mobile release workflows',
    ],
  },
  {
    id: '02',
    role: 'Freelance App Developer',
    company: 'Fiverr',
    location: 'Remote',
    period: '',
    summary: 'Freelance app development for clients on Fiverr.',
    points: [
      'Mobile and web app builds for clients',
      'End-to-end delivery from interface to working product',
    ],
  },
]

export const skillGroups = [
  {
    label: 'Frontend',
    items: ['React', 'React Native', 'Expo', 'TypeScript', 'Vite', 'Nativewind'],
  },
  {
    label: 'Backend',
    items: ['Node.js', 'Express', 'REST APIs', 'JWT', 'OAuth', 'PostgreSQL', 'Prisma'],
  },
  {
    label: 'Mobile & Infra',
    items: ['Android', 'Firebase', 'FCM', 'Docker', 'Redis', 'BullMQ'],
  },
  {
    label: 'AI',
    items: ['LLM Apps', 'RAG', 'LangChain', 'Ollama', 'Qwen', 'AI APIs'],
  },
]

export const steps = [
  {
    id: '01',
    title: 'Problem',
    copy: 'Start with the real friction — like one QR for every outlet — and keep the experience simple for the user.',
  },
  {
    id: '02',
    title: 'Architecture',
    copy: 'Plan web, mobile, backend, data, and auth as one product, not a pile of disconnected features.',
  },
  {
    id: '03',
    title: 'Build',
    copy: 'Ship with React, React Native, Node.js, and PostgreSQL. Notifications, queues, and APIs included.',
  },
  {
    id: '04',
    title: 'Production',
    copy: 'Debug QA and production, handle Google Sign-In and releases, then keep the system reliable after launch.',
  },
]
