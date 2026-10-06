/**
 * Search metadata in one place. The page title, description, structured data
 * and FAQ copy all come from here so they stay consistent with each other and
 * with what is visible on the page.
 */

export const SITE = 'https://www.felixabada.com';

export const TITLE = 'Felix Abada — Software Engineer & CTO in Accra, Ghana';
export const DESCRIPTION =
  'Felix Abada is a software engineer, full-stack developer and CTO based in Accra, Ghana, building scalable platforms and applied AI products for Africa and the world.';
export const OG_IMAGE = `${SITE}/og-image.png`;

export const faqs = [
  {
    q: 'Who is Felix Abada?',
    a: 'Felix Abada is a software engineer and technology executive based in Accra, Ghana. He is the Co-Founder and CTO of goParkly, a smart parking platform, and the Founder and CEO of ScoutVerse.ai, an AI-powered football scouting platform.',
  },
  {
    q: 'What does Felix Abada do as a software engineer?',
    a: 'He designs and builds web and mobile platforms end to end: full-stack software engineering, platform architecture, real-time systems, payments and applied AI. As a CTO he also sets technical strategy, builds engineering teams and leads products from first idea to launch and scale.',
  },
  {
    q: 'Does Felix work with companies in Ghana and across Africa?',
    a: 'Yes. Felix is based in Accra on Greenwich Mean Time and works with founders, companies and investors in Ghana, across Africa and internationally, on partnerships, advisory and technology leadership.',
  },
  {
    q: 'What has Felix Abada built?',
    a: 'goParkly, a platform that lets drivers find and book parking in real time with in-app payments, running at 99.9% uptime. And ScoutVerse.ai, a football ecosystem whose dual-brain AI turns ordinary phone video into physics-verified player analytics.',
  },
  {
    q: 'How can I contact Felix Abada?',
    a: 'Email hello@felixabada.com, message him on WhatsApp at +233 50 859 1078, or use the contact form on this page.',
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
      dateModified: '2026-10-06',
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
      url: SITE,
      image: OG_IMAGE,
      email: 'hello@felixabada.com',
      telephone: '+233508591078',
      founder: { '@id': `${SITE}/#felix` },
      address: { '@type': 'PostalAddress', addressLocality: 'Accra', addressRegion: 'Greater Accra', addressCountry: 'GH' },
      geo: { '@type': 'GeoCoordinates', latitude: 5.6037, longitude: -0.187 },
      areaServed: [
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
