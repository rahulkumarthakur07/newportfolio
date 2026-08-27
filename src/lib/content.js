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
  email: 'rahulbarahi.connect@gmail.com',
  resume: '/resume.pdf',
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
