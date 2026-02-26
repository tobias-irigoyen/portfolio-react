export interface Project {
  id: number;
  slug: string;
  title: string;
  shortDesc: { en: string; es: string };
  longDesc: { en: string; es: string };
  images: string[];
  tags: string[];
  year: string;
  role: { en: string; es: string };
  link?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    slug: 'fiqus',
    title: 'Fiqus',
    shortDesc: {
      en: 'High-converting SaaS landing page with motion design and a 38% signup rate improvement.',
      es: 'Desarrollo de sitio institucional de Fiqus, una empresa cooperativa de ciencia de datos, inteligencia artificial, blockchain y fintech.',
    },
    longDesc: {
      en: `Launchpad is a landing page I designed and developed for a B2B SaaS startup launching their product. The brief was clear: maximize signups from cold traffic with a design that communicates trust, quality, and simplicity.\n\nI built the page with React and custom animation sequences using Motion. A/B tests were set up on 3 key sections, and the final variant achieved a 38% improvement in signup conversion rate compared to the original design.\n\nThe design language was carefully crafted to feel premium — inspired by top-tier SaaS products like Linear, Vercel, and Notion. Every micro-interaction was intentional.`,
      es: `Desarrollé el sitio institucional completo de la cooperativa de tecnología Fiqus, la cual consta de múltiples secciones, un blog y un sistema de traducción multiidioma.\n\n
      El sitio fue desarrollado con React y TypeScript, utilizando TailwindCSS para los estilos CSS y Lottie para las animaciones SVG. El sistema de traducción multiidioma fue implementado con i18n.
      `,
    },
    images: [
      '/fiqus/1.jpg',
      '/fiqus/2.jpg',
      '/fiqus/3.jpg',
      '/fiqus/4.jpg',
      '/fiqus/5.jpg'
    ],
    tags: ['React', 'Lottie.js', 'HTML5', 'CSS3', 'I18n'],
    year: '2022',
    role: { en: 'React Developer', es: 'React Developer' },
    link: 'https://fiqus.coop/',
  },
  {
    id: 2,
    slug: 'nayra',
    title: 'Nayra',
    shortDesc: {
      en: 'Scalable design system with 80+ components used across multiple product teams.',
      es: 'Desarrollo de sitio institucional de Nayra, una empresa cooperativa de tecnología.',
    },
    longDesc: {
      en: `Figmify DS is a comprehensive design system I built for a mid-size SaaS company. It bridges the gap between design and development by providing both Figma component libraries and React implementations.\n\nThe system covers typography, color tokens, spacing, 80+ UI components, motion guidelines, and accessibility documentation. It was adopted by 4 product teams within the first month.\n\nBuilding Figmify DS reduced design-to-development handoff time by 60%, virtually eliminated visual inconsistencies across the product suite, and gave engineers a reliable, well-documented component library to build on.`,
      es: `Trabajé en el diseño y desarrollo en Vue.js del sitio institucional de Nayra, una empresa cooperativa de tecnología. \n\n
      El sitio consta de una sección de Inicio, Sobre nosotros, Trabajos y Contacto. Además cuenta con un selector de idiomas.`
 
    },
    images: [
      'https://tobiasirigoyen.dev/assets/nayra/logo-min.jpg',
      'https://tobiasirigoyen.dev/assets/nayra/1-min.png',
      'https://tobiasirigoyen.dev/assets/nayra/2-min.png',
      'https://tobiasirigoyen.dev/assets/nayra/3-min.png',
      'https://tobiasirigoyen.dev/assets/nayra/4-min.png',
      'https://tobiasirigoyen.dev/assets/nayra/5-min.png'
    ],
    tags: ['React', 'Sass','Figma', 'Design Systems', 'Accessibility'],
    year: '2019',
    role: { en: 'Design Systems Lead', es: 'Líder de Design Systems' },
    link: 'https://nayra.coop',
  },
  {
    id: 6,
    slug: 'pokedex',
    title: 'Pokedex',
    shortDesc: {
      en: 'High-conversion e-commerce platform with personalized shopping experiences.',
      es: 'El proyecto Pokedex consiste en un buscador de Pokemons, los cuales se pueden encontrar según su nombre, número o tipo a través del consumo de una API pública.',
    },
    longDesc: {
      en: `ShopWave is a modern e-commerce platform built for independent brands looking to compete with larger retailers. The project focused heavily on conversion optimization and personalization.\n\nI led the frontend architecture and redesigned the checkout flow, reducing cart abandonment by 28%. The UI was built with React, TypeScript, and TailwindCSS, following a custom design system I created in Figma.\n\nThe platform includes an A/B testing framework I built, which allowed the team to run experiments continuously and iterate on key UX decisions. Average order value increased by 22% within 3 months of launch.`,
      es: `En el proyecto Pokedex trabajé en el diseño y desarrollo en Vue.js. Consiste en un buscador de Pokemons, los cuales se pueden encontrar según su nombre, número o tipo. 
 Cada Pokemon posee su información detallada, como su tipo, habilidades, movimientos y más. Presionando una tarjeta de Pokemon se puede ver su información detallada. 
 El sitio consta de una sección de Inicio, Buscador y Listado de Pokemons. El buscador cuenta con un filtro por tipo y un buscador por nombre y número. El listado cuenta con un paginador y una selección de cantidad de Pokemons a mostrar. 
 También tiene un indicador de carga de Pokemons y un indicador de error en caso de que no se encuentre el Pokemon.`,
    },
    images: [
      'https://tobiasirigoyen.dev/assets/pokedex/logo-min.jpg',
      'https://tobiasirigoyen.dev/assets/pokedex/1-min.png',
      'https://tobiasirigoyen.dev/assets/pokedex/2-min.png',
      'https://tobiasirigoyen.dev/assets/pokedex/3-min.png',
      'https://tobiasirigoyen.dev/assets/pokedex/4-min.png',
      'https://tobiasirigoyen.dev/assets/pokedex/5-min.png',
      'https://tobiasirigoyen.dev/assets/pokedex/6-min.png',
    ],
    tags: ['Vue.js', 'HTML5','CSS3','Diseño UI/UX','Design System', 'Figma'],
    year: '2025',
    role: { en: 'UI/UX Designer & Vue.js Developer', es: 'Vue.js Developer & Diseñador UI/UX' },
    link: 'https://www.phaurora.com/',
  },
  {
    id: 4,
    slug: 'fit',
    title: 'FIT - Flujo Intercooperativo de Trabajo',
    shortDesc: {
      en: 'Mobile-first travel companion app with smart itinerary planning and offline maps.',
      es: 'Sitio institucional del FIT. Es una red intercooperativa conformada por empresas tecnológicas de la Federación Argentina de Cooperativas de Trabajo de Tecnología, Innovación y Conocimiento.',
    },
    longDesc: {
      en: `Nomad is a travel companion app built for digital nomads and frequent travelers. The goal was to create a delightful, frictionless experience for building and sharing travel itineraries.\n\nI designed the entire UI/UX from scratch — conducting 15+ user interviews, building low-fidelity wireframes in Figma, and iterating through 3 rounds of usability testing. The frontend was built with Vue.js and delivered as a PWA.\n\nThe app achieved a 4.8/5 App Store rating on launch, with users specifically praising the intuitive onboarding flow and the beautiful offline map experience.`,
      es: `El proyecto del FIT consistió en el diseño y desarrollo en Vue.js del sitio institucional del FIT - Flujo Intercooperativo de Trabajo. Este espacio es una red intercooperativa conformada por empresas tecnológicas pertenecientes a la Federación Argentina de Cooperativas de Trabajo de Tecnología, Innovación y Conocimiento.\n\n 
      El sitio posee un diseño y maquetado responsive y muestra la descripción y funcionamiento del espacio, las tecnologías utilizadas, casos de éxito y un formulario de contacto.`,
    },
    images: [
      'https://tobiasirigoyen.dev/assets/fit/logo-min.jpg',
      'https://tobiasirigoyen.dev/assets/fit/1-min.jpg',
      'https://tobiasirigoyen.dev/assets/fit/2-min.jpg',
      'https://tobiasirigoyen.dev/assets/fit/3-min.jpg',
      'https://tobiasirigoyen.dev/assets/fit/4-min.jpg',
      'https://tobiasirigoyen.dev/assets/fit/5-min.jpg',
      'https://tobiasirigoyen.dev/assets/fit/6-min.jpg',
      'https://tobiasirigoyen.dev/assets/fit/7-min.jpg'
    ],
    tags: ['Vue.js', 'HTML5', 'CSS3', 'Diseño UI/UX', 'Figma'],
    year: '2019',
    role: { en: 'UI/UX Designer & Vue.js Developer', es: 'Vue.js Developer & Diseñador UI/UX' },
    link: 'https://facttic.org.ar/fit/',
  },
  {
    id: 5,
    slug: 'api-covid-19',
    title: 'API Covid 19',
    shortDesc: {
      en: 'Analytics SaaS platform with real-time data visualization and team collaboration.',
      es: 'Plataforma desarrollada para mostrar estadísticas acerca del impacto del virus Covid 19 en Argentina.',
    },
    longDesc: {
      en: `Orbit is a next-generation analytics platform designed for data-driven teams. The challenge was to present complex datasets in an intuitive way without overwhelming users.\n\nI led the end-to-end design and frontend development — starting with user research, competitive analysis, and wireframing, then moving into a full component library built on React and TypeScript.\n\nKey achievements include a 40% reduction in time-to-insight for users, a reusable chart component library, and a design system that scaled to 50+ components. The app handles real-time WebSocket data streams with zero perceived latency.`,
      es: `Este proyecto se desarrolló en el marco de la pandemia por el COVID 19 en el año 2020.\n
 Contó con un equipo formado por desarrolladores Back-end, Front-end y Diseñadores UI/UX.\n
 Los desarrolladores Back-end se encargaron de la API REST que consumía datos de la API de la Organización Mundial de la Salud (OMS) y la API de la Organización Mundial de la Salud (OMS). \n
 Los desarrolladores Front-end se encargaron de la interfaz de usuario y la experiencia del usuario. `,
      
    },
    images: [
      'https://tobiasirigoyen.dev/assets/api-covid/logo-min.jpg',
      'https://tobiasirigoyen.dev/assets/api-covid/1-min.png',
      'https://tobiasirigoyen.dev/assets/api-covid/2-min.png',
      'https://tobiasirigoyen.dev/assets/api-covid/3-min.png',

    ],
    tags: ['HTML5', 'CSS3', 'FastAPI', 'MetaBase', 'UI/UX Design', 'Figma'],
    year: '2020',
    role: { en: 'Lead Frontend & Design', es: 'Lider Frontend y de Diseño' },
    link: 'https://tobias-irigoyen.github.io/landing-api-covid/',
  },
  {
    id: 5,
    slug: 'proyecto-aurora',
    title: 'Proyecto Aurora',
    shortDesc: {
      en: 'High-conversion e-commerce platform with personalized shopping experiences.',
      es: 'Proyecto Aurora es un proyecto del segmento Real Estate el cual busca ofrecer una experiencia de inicio de compra de propiedades online en Panamá y distintos países de LATAM.',
    },
    longDesc: {
      en: `ShopWave is a modern e-commerce platform built for independent brands looking to compete with larger retailers. The project focused heavily on conversion optimization and personalization.\n\nI led the frontend architecture and redesigned the checkout flow, reducing cart abandonment by 28%. The UI was built with React, TypeScript, and TailwindCSS, following a custom design system I created in Figma.\n\nThe platform includes an A/B testing framework I built, which allowed the team to run experiments continuously and iterate on key UX decisions. Average order value increased by 22% within 3 months of launch.`,
      es: `Proyecto Aurora es un proyecto del segmento Real Estate, en el cual trabajé en el desarrollo del sistema de diseño, creando átomos, componentes y layouts.\n\n
      Estos elementos los apliqué en las vistas de Inicio, Edificio, Unidades y Contacto.`,
    },
    images: [
      //'https://tobiasirigoyen.dev/assets/ph-aurora/logo-min.png',
      '/aurora/logo.jpg',
      'https://tobiasirigoyen.dev/assets/ph-aurora/1-min.png',
      'https://tobiasirigoyen.dev/assets/ph-aurora/2-min.png',
      'https://tobiasirigoyen.dev/assets/ph-aurora/3-min.png',
      'https://tobiasirigoyen.dev/assets/ph-aurora/4-min.png',

    ],
    tags: ['Diseño UI/UX', 'Design System', 'Mejoras de diseño', 'UX Research','Figma'],
    year: '2023',
    role: { en: 'UI/UX Designer', es: 'Diseñador UI/UX' },
    link: 'https://www.phaurora.com/',
  },





];

export const testimonials = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    role: { en: 'CEO at Orbit Systems', es: 'CEO en Orbit Systems' },
    avatar: 'https://images.unsplash.com/photo-1712174766230-cb7304feaafe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGRldmVsb3BlciUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MjAzMTc2MHww&ixlib=rb-4.1.0&q=80&w=200',
    quote: {
      en: "Alex delivered beyond expectations. The dashboard they built is not only beautiful but handles complex data in a way our users genuinely love. Attention to detail at every level.",
      es: "Alex entregó más allá de las expectativas. El dashboard que construyeron no solo es hermoso sino que maneja datos complejos de una manera que nuestros usuarios genuinamente aman. Atención al detalle en cada nivel.",
    },
  },
  {
    id: 2,
    name: 'Marcus Chen',
    role: { en: 'Product Lead at Nomad Inc.', es: 'Product Lead en Nomad Inc.' },
    avatar: 'https://images.unsplash.com/photo-1629507208649-70919ca33793?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdCUyMGJ1c2luZXNzfGVufDF8fHx8MTc3MjAzMDMzOXww&ixlib=rb-4.1.0&q=80&w=200',
    quote: {
      en: "Working with Alex was a game-changer for our product. They have a rare ability to think both as a designer and an engineer simultaneously. Our app launch was a huge success — 4.8 stars.",
      es: "Trabajar con Alex fue un cambio de juego para nuestro producto. Tienen una rara habilidad de pensar tanto como diseñador como ingeniero simultáneamente. El lanzamiento de nuestra app fue un gran éxito — 4.8 estrellas.",
    },
  },
  {
    id: 3,
    name: 'Priya Sharma',
    role: { en: 'Design Director at ShopWave', es: 'Directora de Diseño en ShopWave' },
    avatar: 'https://images.unsplash.com/photo-1712174766230-cb7304feaafe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200',
    quote: {
      en: "The design system Alex built became the backbone of our entire product suite. Clean, scalable, and beautifully documented. Onboarding new designers became effortless after that.",
      es: "El sistema de diseño que construyó Alex se convirtió en la columna vertebral de toda nuestra suite de productos. Limpio, escalable y bellamente documentado. La incorporación de nuevos diseñadores se volvió sin esfuerzo después de eso.",
    },
  },
];
