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
      en: 'Development of the corporate website for Fiqus, a cooperative company specializing in data science, artificial intelligence, blockchain, and fintech.',
      es: 'Desarrollo de sitio institucional de Fiqus, una empresa cooperativa de ciencia de datos, inteligencia artificial, blockchain y fintech.',
    },
    longDesc: {
      en: `I developed the complete corporate website for the technology cooperative Fiqus, which includes multiple sections, a blog, and a multilingual translation system.\n\n
      The site was built with React and TypeScript, using TailwindCSS for CSS styling, Lottie for SVG animations, and implementing the multilingual translation system with i18n.`,
      es: `Desarrollé el sitio institucional completo de la cooperativa de tecnología Fiqus, la cual consta de múltiples secciones, un blog y un sistema de traducción multiidioma.\n\n
      El sitio fue desarrollado con React y TypeScript, utilizando TailwindCSS para los estilos CSS, Lottie para las animaciones SVG y el sistema de traducción multiidioma con i18n.`,
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
      en: 'Development of the corporate website for Nayra, a cooperative technology company.',
      es: 'Desarrollo de sitio institucional de Nayra, una empresa cooperativa de tecnología.',
    },
    longDesc: {
      en: `I worked on the design and development in Vue.js of the corporate website for Nayra, a cooperative technology company.\n\n
      The site includes a Home, About Us, Projects, and Contact section. It also features a language selector.`,
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
    tags: ['Vue.js', 'Sass','Figma', 'Design Systems', 'Accessibility'],
    year: '2019',
    role: { en: 'Design Systems Lead', es: 'Líder de Design Systems' },
    link: 'https://nayra.coop',
  },
  {
    id: 3,
    slug: 'pokedex',
    title: 'Pokedex',
    shortDesc: {
      en: 'The Pokédex project consists of a Pokémon search engine, where they can be found by name, number, or type through the consumption of a public API.',
      es: 'El proyecto Pokedex consiste en un buscador de Pokemons, los cuales se pueden encontrar según su nombre, número o tipo a través del consumo de una API pública.',
    },
    longDesc: {
      en: `In the Pokédex project, I worked on the design and development in Vue.js. It consists of a Pokémon search engine, where they can be found by name, number, or type.\n\n
      Each Pokémon has detailed information, such as its type, abilities, moves, and more. By clicking on a Pokémon card, its detailed information can be viewed.\n\n
      The site includes a Home, Search, and Pokémon List section. The search feature has a type filter and a search by name and number. The list includes pagination and an option to select the number of Pokémon to display.\n\n
      It also has a Pokémon loading indicator and an error indicator in case a Pokémon is not found.
`,
      es: `En el proyecto Pokedex trabajé en el diseño y desarrollo en Vue.js. Consiste en un buscador de Pokemons, los cuales se pueden encontrar según su nombre, número o tipo.\n\n\
      Cada Pokemon posee su información detallada, como su tipo, habilidades, movimientos y más. Presionando una tarjeta de Pokemon se puede ver su información detallada.\n\n\
      El sitio consta de una sección de Inicio, Buscador y Listado de Pokemons. El buscador cuenta con un filtro por tipo y un buscador por nombre y número. El listado cuenta con un paginador y una selección de cantidad de Pokemons a mostrar.\n\n\
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
      en: 'Corporate website of the FIT. It is an inter-cooperative network made up of technology companies from the Federación Argentina de Cooperativas de Trabajo de Tecnología, Innovación y Conocimiento (FIT).',
      es: 'Sitio institucional del FIT. Es una red intercooperativa conformada por empresas tecnológicas de la Federación Argentina de Cooperativas de Trabajo de Tecnología, Innovación y Conocimiento.',
    },
    longDesc: {
      en: `The FIT project involved the design and development in Vue.js of the corporate website for FIT – Flujo Intercooperativo de Trabajo. This platform is an inter-cooperative network made up of technology companies belonging to the Federación Argentina de Cooperativas de Trabajo de Tecnología, Innovación y Conocimiento.\n\n
The site features a responsive design and layout, presenting the description and operation of the network, the technologies used, success stories, and a contact form.
`,
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
      en: 'Platform developed to display statistics about the impact of the COVID-19 virus in Argentina.',
      es: 'Plataforma desarrollada para mostrar estadísticas acerca del impacto del virus Covid 19 en Argentina.',
    },
    longDesc: {
      en: `This project was developed during the COVID-19 pandemic in 2020.\n\n
      It involved a team of Back-end and Front-end developers, as well as UI/UX designers.\n\n
      The Back-end developers were responsible for the REST API, which consumed data from the World Health Organization (WHO) API.\n\n
      The Front-end developers handled the user interface and user experience.`,
      es: `Este proyecto se desarrolló en el marco de la pandemia por el COVID 19 en el año 2020.\n\n
      Contó con un equipo formado por desarrolladores Back-end, Front-end y Diseñadores UI/UX.\n\n
      Los desarrolladores Back-end se encargaron de la API REST que consumía datos de la API de la Organización Mundial de la Salud (OMS) y la API de la Organización Mundial de la Salud (OMS). \n\n
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
    id: 6,
    slug: 'proyecto-aurora',
    title: 'Proyecto Aurora',
    shortDesc: {
      en: 'Proyecto Aurora is a Real Estate project that aims to offer an online property purchasing experience in Panama and various countries across Latin America.',
      es: 'Proyecto Aurora es un proyecto del segmento Real Estate el cual busca ofrecer una experiencia de inicio de compra de propiedades online en Panamá y distintos países de LATAM.',
    },
    longDesc: {
      en: `Proyecto Aurora is a Real Estate project, in which I worked on the development of the design system, creating atoms, components, and layouts.\n\n
      These elements were applied to the Home, Building, Units, and Contact views.`,
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
    name: 'Christian Pranteda',
    role: { en: 'Team Leader at Ethofy', es: 'Team Leader en Ethofy' },
    avatar: '/testimonials/christian-pranteda.jpg',
    quote: {
      en: "Tobi is the best layout developer I’ve worked with and an outstanding teammate. Always willing to help and learn. A true asset to any team.",
      es: "Tobi es el mejor maquetador con el que trabajé y un excelentísimo compañero. Siempre dispuesto a ayudar y aprender. Un lujo tenerlo en cualquier equipo.",
    },
  },
  {
    id: 2,
    name: 'Cristian Martinez',
    role: { en: 'Tech leader at Ethofy', es: 'Tech Lider en Ethofy' },
    avatar: '/testimonials/cristian-martinez.jpg',
    quote: {
      en: "I had the privilege of working with Tobías as a technical lead on a project, and I can say with complete confidence that he is an excellent designer. His experience in layout development and UI/UX design is reflected in work that is always polished, well thought out, and aligned with the product’s goals. He is a reliable, creative professional with a consistently positive attitude—qualities that make him a valuable asset to any team.",
      es: "Tuve el privilegio de trabajar con Tobías como líder técnico en un proyecto, y puedo decir con total confianza que es un excelente diseñador. Su experiencia en maquetado y diseño UI/UX se refleja en entregas siempre prolijas, bien pensadas y alineadas con los objetivos del producto. Es un profesional confiable, creativo y con una actitud siempre positiva, cualidades que lo convierten en un gran aporte para cualquier equipo de trabajo.",
    },
  },
  {
    id: 3,
    name: 'Gabriela Di Grazia',
    role: { en: 'Sr. Frontend Developer at Ethofy', es: 'Frontend Developer Sr. en Ethofy' },
    avatar: '/testimonials/gabriela-di-grazia.jpg',
    quote: {
      en: `I had the pleasure of working with Tobías on a project at 1950Labs, and he is a professional who stands out both for his technical expertise in front-end development and for his UI/UX design skills.\n
      During the time we were on the same team, he proved to be proactive, detail-oriented, and always willing to collaborate. He has a great ability to identify opportunities to improve the user experience and doesn’t hesitate to propose creative and well-founded solutions. In addition, he has an excellent attitude and contributes positively to the team dynamic.\n
      Working with Tobías is synonymous with quality, commitment, and great energy. Without a doubt, a great asset to any development team.`,
      es: `Tuve el gusto de trabajar con Tobías en un proyecto en 1950Labs, y es un profesional que destaca tanto por su dominio técnico en front-end como por sus habilidades en diseño UI/UX.\n
      Durante el tiempo que compartimos equipo, demostró ser proactivo, detallista y siempre dispuesto a colaborar. Tiene una gran capacidad para detectar oportunidades de mejora en la experiencia del usuario, y no duda en proponer soluciones creativas y bien fundamentadas. Además, es una persona con excelente disposición, que suma positivamente a la dinámica del grupo.\n
      Trabajar con Tobías es sinónimo de calidad, compromiso y buena energía. Sin dudas, un gran valor para cualquier equipo de desarrollo.`,
    },
  },
];
