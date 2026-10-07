/**
 * Search metadata in one place. The page title, description, structured data
 * and FAQ copy all come from here so they stay consistent with each other and
 * with what is visible on the page.
 */

export const SITE = 'https://www.felixabada.com';

// The page's main search phrase is "software engineer in Ghana"; it leads the title, the H1 and the first paragraph.
export const TITLE = 'Felix Abada | Software Engineer in Accra, Ghana';
export const DESCRIPTION =
  'Felix Abada is a software engineer and full-stack developer in Accra, Ghana. CTO of goParkly and founder of ScoutVerse.ai, building web, mobile and AI platforms.';
export const SHARE_TITLE = 'Felix Abada — Software Engineer & CTO in Accra, Ghana';
export const SHARE_DESCRIPTION =
  'Software engineer, full-stack developer and CTO based in Accra, Ghana. Co-Founder of goParkly and Founder of ScoutVerse.ai.';
export const OG_IMAGE = `${SITE}/og-image.png`;
export const OG_IMAGE_ALT = 'Felix Abada, software engineer and CTO in Accra, Ghana';
export const UPDATED = '2026-10-07';

export const faqs = [
  {
    q: 'Looking to hire a software engineer in Ghana?',
    a: 'Felix Abada is a software engineer and full-stack developer based in Accra, Ghana, open to strategic engagements with teams in Ghana, across Africa and internationally. He leads builds end to end: architecture, web and mobile development, payments, applied AI and the engineering team that runs it.',
  },
  {
    q: 'What kind of work does Felix take on?',
    a: 'Three kinds. Technology leadership: strategy, roadmaps and engineering teams aligned with the business. Platform engineering: web and mobile products built end to end, with real-time data and payments. Applied AI: computer vision, multimodal reasoning and intelligent search that solve a real problem rather than decorate one.',
  },
  {
    q: 'How does an engagement work?',
    a: 'It depends on what the work needs: a technical partnership, an advisory role, a leadership role inside the team, or investment conversations. Every engagement starts with the problem and the people it serves, and the technology follows from there.',
  },
  {
    q: 'What has been built and shipped?',
    a: 'goParkly, a smart parking platform where drivers find and book a space in real time and pay in the app, running in production at 99.9% uptime. And ScoutVerse.ai, a football ecosystem whose dual-brain AI turns ordinary phone video into physics-verified player analytics for players, scouts, agents and clubs.',
  },
  {
    q: 'How is the work built to scale?',
    a: 'Standards are set early. Architecture, quality and security are decided before the first line of code, systems are designed to grow with users and markets, and the teams who build them own the outcome. That is how goParkly holds 99.9% uptime.',
  },
  {
    q: 'Does Felix work with teams outside Ghana?',
    a: 'Yes. The work is run from Accra with founders, companies and investors across Africa, Europe, the Middle East, Asia and the Americas, remotely or in person.',
  },
  {
    q: 'How do we start a project together?',
    a: 'Email hello@felixabada.com or send a WhatsApp message to +233 50 859 1078 with a short note on what you are building, or use the contact form on this page.',
  },
];

const person = {
  '@type': 'Person',
  '@id': `${SITE}/#felix`,
  name: 'Felix Abada',
  alternateName: 'Felix Abada Orezimena',
  givenName: 'Felix',
  familyName: 'Abada',
  url: SITE,
  image: `${SITE}/assets/Images/felix_google.png`,
  email: 'mailto:hello@felixabada.com',
  telephone: '+233508591078',
  jobTitle: ['Software Engineer', 'Chief Technology Officer', 'Full-Stack Developer'],
  description: DESCRIPTION,
  mainEntityOfPage: { '@id': `${SITE}/#page` },
  knowsLanguage: 'en',
  workLocation: { '@type': 'Place', name: 'Accra, Ghana', address: { '@type': 'PostalAddress', addressLocality: 'Accra', addressCountry: 'GH' } },
  worksFor: [
    { '@type': 'Organization', name: 'goParkly', url: 'https://www.goparkly.co' },
    { '@type': 'Organization', name: 'ScoutVerse.ai', url: 'https://scoutverse-frontend.vercel.app/' },
  ],
  hasOccupation: [
    {
      '@type': 'Occupation',
      name: 'Software Engineer',
      occupationLocation: { '@type': 'Country', name: 'Ghana' },
      skills: 'Full-stack development, platform architecture, applied AI, real-time systems, payments',
    },
    {
      '@type': 'Occupation',
      name: 'Chief Technology Officer',
      occupationLocation: { '@type': 'City', name: 'Accra' },
    },
  ],
  knowsAbout: [
    'Software Engineering',
    'Software Development',
    'Full-Stack Development',
    'Web Development',
    'Mobile App Development',
    'Platform Architecture',
    'Scalable Systems Design',
    'Artificial Intelligence',
    'Computer Vision',
    'Payments',
    'PropTech',
    'SportsTech',
    'Technical Leadership',
    'Product Strategy',
  ],
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'Ghana Technology University College' },
  nationality: { '@type': 'Country', name: 'Ghana' },
  homeLocation: { '@type': 'City', name: 'Accra', containedInPlace: { '@type': 'Country', name: 'Ghana' } },
  address: { '@type': 'PostalAddress', addressLocality: 'Accra', addressRegion: 'Greater Accra', addressCountry: 'GH' },
  sameAs: ['https://gh.linkedin.com/in/felix-abada-11707a1aa', 'https://github.com/Felitech26', 'https://www.instagram.com/nii.devs/'],
};

export const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfilePage',
      '@id': `${SITE}/#page`,
      url: SITE,
      name: TITLE,
      description: DESCRIPTION,
      inLanguage: 'en',
      dateModified: UPDATED,
      isPartOf: { '@id': `${SITE}/#website` },
      mainEntity: { '@id': `${SITE}/#felix` },
      primaryImageOfPage: OG_IMAGE,
    },
    person,
    {
      '@type': 'WebSite',
      '@id': `${SITE}/#website`,
      url: SITE,
      name: 'Felix Abada',
      description: DESCRIPTION,
      inLanguage: 'en',
      publisher: { '@id': `${SITE}/#felix` },
    },
    {
      '@type': 'ProfessionalService',
      '@id': `${SITE}/#services`,
      name: 'Felix Abada — Software Engineering & Technology Leadership',
      description: 'Software engineering, full-stack web and mobile development, platform architecture, applied AI and technical leadership from Accra, Ghana.',
      url: SITE,
      image: OG_IMAGE,
      email: 'hello@felixabada.com',
      telephone: '+233508591078',
      founder: { '@id': `${SITE}/#felix` },
      address: { '@type': 'PostalAddress', addressLocality: 'Accra', addressRegion: 'Greater Accra', addressCountry: 'GH' },
      geo: { '@type': 'GeoCoordinates', latitude: 5.6037, longitude: -0.187 },
      areaServed: [
        { '@type': 'City', name: 'Accra' },
        { '@type': 'Country', name: 'Ghana' },
        { '@type': 'Place', name: 'Africa' },
        { '@type': 'Place', name: 'Worldwide' },
      ],
      knowsAbout: ['Software engineering', 'Full-stack development', 'Platform architecture', 'Applied AI', 'Technical leadership'],
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE}/#faq`,
      mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ],
};
