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
    { label: 'GitHub', href: 'https://github.com/rahulkumarthakur07', icon: 'github' },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/rahul-sharma-807604412/',
      icon: 'linkedin',
    },
    { label: 'X', href: 'https://x.com/rahulbarahi', icon: 'x' },
  ],
}

export const nav = [
  { hash: 'top', label: 'Home' },
  { hash: 'about', label: 'About' },
  { hash: 'skills', label: 'Skills' },
  { hash: 'experience', label: 'Experience' },
  { hash: 'work', label: 'Projects' },
]

export const labels = {
  workCta: 'Contact me',
  about: 'About',
  skills: 'Skills',
  experience: 'Experience',
  work: 'Selected projects',
  allWork: 'All projects',
  seeAll: 'See all',
  process: 'Process',
  contact: 'Contact me',
  liveDemo: 'Live Demo',
  github: 'GitHub',
  techStack: 'Tech stack',
  built: 'What I built',
  challenge: 'Challenge',
  workBack: 'Projects',
  back: 'Back',
  otherProjects: 'Other projects',
  formEyebrow: 'Contact',
  formTitle: 'Contact me',
  formName: 'Name',
  formEmail: 'Email',
  formSubject: 'Subject',
  formSubjectPlaceholder: 'What’s this about?',
  formDescription: 'Description',
  formDescriptionPlaceholder: 'Tell me a bit more…',
  formProject: 'Subject',
  formMessage: 'Description',
  formPlaceholder: 'What’s this about?',
  formSend: 'Send',
  formSending: 'Sending…',
  formSuccessTitle: 'Message sent',
  formSuccessBody:
    'Thanks — your message is in. I’ll get back to you as soon as I can.',
  formDone: 'Done',
  formClose: 'Close',
  notFound: 'Page not found',
  notFoundBody:
    'This page doesn’t exist — or it moved. Head home and keep looking around.',
  backHome: 'Back home',
  viewWork: 'View projects',
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
    slug: 'recipe-mobile-app',
    name: 'Recipe Mobile App',
    tags: 'Mobile · React Native · Expo · TheMealDB',
    image: 'https://i.ibb.co/ZRQR9X0z/Chat-GPT-Image-May-19-2026-11-34-36-AM.png',
    hoverImage: 'https://i.ibb.co/ZRQR9X0z/Chat-GPT-Image-May-19-2026-11-34-36-AM.png',
    summary:
      'A sleek cross-platform recipe app built with React Native and Expo — browse global recipes, save favorites, and cook with clear instructions.',
    built: [
      'Browse global recipes via TheMealDB API',
      'View images, ingredients, and instructions',
      'Save favorites with local storage',
      'Smooth, responsive UI with Expo Router navigation',
      'Runs on iOS, Android, and Web',
    ],
    tech: ['React Native', 'Expo', 'Expo Router', 'TheMealDB', 'Local Storage'],
    challenge:
      'Delivering a clean, responsive recipe experience across iOS, Android, and Web from one Expo codebase.',
    demo: 'http://www.mediafire.com/file/4d6z32udbkvb976/recepieapp.apk',
    github: 'https://github.com/rahulkumarthakur07/RecepieApp',
  },
  {
    id: '02',
    slug: 'yetiwise',
    name: 'YetiWise — Finance Tracker App',
    tags: 'Mobile · Finance · Expense tracking',
    image: 'https://i.ibb.co/PGcDG9L1/Chat-GPT-Image-May-20-2026-10-20-30-AM.png',
    hoverImage: 'https://i.ibb.co/PGcDG9L1/Chat-GPT-Image-May-20-2026-10-20-30-AM.png',
    summary:
      'A mobile app that helps users manage personal finances by tracking daily expenses, setting budgets, and viewing spending history.',
    built: [
      'Daily expense tracking',
      'Budget setup and monitoring',
      'Spending history views',
      'Simple, clean interface for clearer money habits',
    ],
    tech: ['Mobile', 'Finance', 'Budgeting'],
    challenge:
      'Making spending habits easy to understand without overwhelming users with complexity.',
    demo: '',
    github: 'https://github.com/rahulkumarthakur07/yetiwise-finance-tracker-app',
  },
  {
    id: '03',
    slug: 'animated-website',
    name: 'Animated website GSAP + React',
    tags: 'Web · React · GSAP · Animation',
    image: 'https://i.ibb.co/DgfSgPdR/Screenshot-2025-08-30-111729.png',
    hoverImage: 'https://i.ibb.co/DgfSgPdR/Screenshot-2025-08-30-111729.png',
    summary:
      'A React + GSAP clone of the Zentry website, featuring smooth animations, responsive design, and interactive UI elements.',
    built: [
      'GSAP-driven scroll and interaction animations',
      'Responsive layout across breakpoints',
      'Interactive UI elements inspired by Zentry',
    ],
    tech: ['React', 'GSAP', 'Vite'],
    challenge:
      'Matching a high-polish animated marketing site while keeping motion smooth and responsive.',
    demo: 'https://animated-website-pearl.vercel.app/',
    github: 'https://github.com/rahulkumarthakur07/animated-website',
  },
  {
    id: '04',
    slug: 'bakery-website',
    name: 'Bakery Website',
    tags: 'Web · React · Vite',
    image: 'https://i.ibb.co/ycJSzMY4/Screenshot-2026-05-28-121808.png',
    hoverImage:
      'https://i.ibb.co/SD713XmN/Screenshot-From-2026-08-06-21-59-49.png',
    summary: 'Bakery website made with React and Vite.',
    built: [
      'Product-focused bakery landing experience',
      'Responsive React UI built with Vite',
      'Multi-image project gallery',
    ],
    tech: ['React', 'Vite'],
    challenge: 'Presenting a bakery brand clearly with a fast, lightweight React frontend.',
    demo: 'https://mitho-bakery.vercel.app/',
    github: 'https://github.com/rahulkumarthakur07/MithoBakery',
  },
  {
    id: '05',
    slug: 'school-management-app',
    name: 'School Management App',
    tags: 'Mobile · React Native · Firebase · Admin panel',
    image: 'https://i.ibb.co/gMjTMzTy/Chat-GPT-Image-May-19-2026-11-34-29-AM.png',
    hoverImage: 'https://i.ibb.co/gMjTMzTy/Chat-GPT-Image-May-19-2026-11-34-29-AM.png',
    summary:
      'School management app built with React Native, Firebase, and a custom admin panel — connecting admins, teachers, and students.',
    built: [
      'Role-based access for Admin, Teacher, and Student',
      'Mobile flows for homework, notices, and gallery',
      'Full control via a web admin panel',
      'Clean, responsive UI for school communication',
    ],
    tech: ['React Native', 'Firebase', 'Admin Panel'],
    challenge:
      'Keeping school communication simple across three roles while spanning mobile and a web admin panel.',
    demo: 'https://drive.google.com/file/d/1I6-wJ2dLuhC1vTp8msw5P3cyyDGbTQM4/view?usp=drivesdk',
    github: 'https://github.com/rahulkumarthakur07',
  },
  {
    id: '06',
    slug: 'prepswipe',
    name: 'PrepSwipe',
    tags: 'Mobile learning · Swipe-based practice',
    image: 'https://i.ibb.co/SX0LvGLF/Prep-Swipe.png',
    hoverImage: 'https://i.ibb.co/SX0LvGLF/Prep-Swipe.png',
    summary:
      'PrepSwipe is a swipe-based learning app that helps students practice questions and prepare for exams in a simple, engaging way.',
    built: [
      'Swipe-based question practice',
      'Exam preparation flows for students',
      'Published on Google Play',
    ],
    tech: ['Mobile', 'Learning', 'Android'],
    challenge:
      'Making exam practice feel engaging through swipe interactions without losing learning focus.',
    demo: 'https://play.google.com/store/apps/details?id=com.appdevxyronix.co.PrepSwipe',
    github: 'https://groups.google.com/g/myprepswipetest',
  },
  {
    id: '07',
    slug: 'restromvp',
    name: 'RestroMvp: Restaurant Management System',
    tags: 'Mobile · QR ordering · POS',
    image: 'https://i.ibb.co/ymjCNGqp/Chat-GPT-Image-May-19-2026-11-34-14-AM.png',
    hoverImage: 'https://i.ibb.co/ymjCNGqp/Chat-GPT-Image-May-19-2026-11-34-14-AM.png',
    summary:
      'RestroMVP is a QR-based restaurant ordering and POS mobile app that helps restaurants manage menus, table orders, billing, and sales.',
    built: [
      'QR-based table ordering',
      'Menu and order management',
      'Billing and sales flows for restaurants',
    ],
    tech: ['Mobile', 'QR', 'POS'],
    challenge:
      'Speeding up restaurant ordering and billing by tying QR menus into a practical POS workflow.',
    demo: '',
    github: '',
  },
  {
    id: '08',
    slug: 'tasknebula',
    name: 'TaskNebula',
    tags: 'Web · React · Framer Motion',
    image: 'https://i.ibb.co/Kj8drWRV/Screenshot-2025-08-30-222059.png',
    hoverImage: 'https://i.ibb.co/Kj8drWRV/Screenshot-2025-08-30-222059.png',
    summary:
      'Animated freeform task management app using React and Framer Motion.',
    built: [
      'Freeform task boards',
      'Motion-led interactions with Framer Motion',
      'Lightweight React task management UI',
    ],
    tech: ['React', 'Framer Motion'],
    challenge:
      'Making task management feel fluid and freeform without losing clarity.',
    demo: 'https://nebula-tasks.vercel.app/',
    github: 'https://github.com/rahulkumarthakur07/NebulaTasks',
  },
]

export function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug)
}

export function getOtherProjects(slug) {
  return projects.filter((project) => project.slug !== slug)
}

export function getProjectImage(project, kind = 'detail') {
  if (!project) return ''
  if (kind === 'hover') return project.hoverImage || project.image || ''
  return project.image || project.hoverImage || ''
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
