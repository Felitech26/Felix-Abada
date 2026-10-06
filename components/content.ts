export const EMAIL = 'hello@felixabada.com';
export const PHONE_DISPLAY = '+233 50 859 1078';
export const WHATSAPP = 'https://wa.me/233508591078';

export const socials = [
  { label: 'LinkedIn', href: 'https://gh.linkedin.com/in/felix-abada-11707a1aa' },
  { label: 'WhatsApp', href: WHATSAPP },
  { label: 'Instagram', href: 'https://www.instagram.com/nii.devs/' },
];

export const navLinks = [
  { label: 'Home', href: '#top', note: 'Greatness is engineered' },
  { label: 'About', href: '#about', note: 'The engineer and the mission' },
  { label: 'Work', href: '#work', note: 'goParkly and ScoutVerse.ai' },
  { label: 'Leadership', href: '#leadership', note: 'From vision to impact' },
  { label: 'Contact', href: '#contact', note: "Let's build the future" },
];

export const credentials = [
  { value: '5+', label: 'Years building software' },
  { value: '2', label: 'Ventures founded' },
  { value: '99.9%', label: 'Uptime at goParkly' },
];

export type IconName = 'compass' | 'layers' | 'spark';

export const disciplines: { icon: IconName; title: string; line: string; points: string[] }[] = [
  {
    icon: 'compass',
    title: 'Technology Leadership',
    line: 'Strategy that ships.',
    points: [
      'Technology aligned with business vision',
      'Roadmaps that turn goals into delivery',
      'Hiring, mentoring and engineering culture',
      'Clarity for founders, teams and partners',
    ],
  },
  {
    icon: 'layers',
    title: 'Platform Engineering',
    line: 'Built to scale, built to last.',
    points: [
      'Web and mobile platforms, end to end',
      'Real-time data and seamless payments',
      'Reliability proven at 99.9% uptime',
      'Architecture that grows with the business',
    ],
  },
  {
    icon: 'spark',
    title: 'Applied AI',
    line: 'Intelligence with a purpose.',
    points: [
      'Computer vision on everyday video',
      'Multimodal AI that reasons in context',
      'Intelligent search across every record',
      'AI features that solve real problems',
    ],
  },
];

export interface Venture {
  id: 'goparkly' | 'scoutverse';
  scene: number;
  name: string;
  meta: string;
  role: string;
  summary: string;
  points: string[];
  chips: string[];
  link: string;
  url: string;
}

export const ventures: Venture[] = [
  {
    id: 'goparkly',
    scene: 0.38,
    name: 'goParkly',
    meta: 'Accra · Urban mobility',
    role: 'CTO & Co-Founder · 2025 — Present',
    summary:
      'Revolutionizing urban mobility globally. A smart parking platform engineered to bridge the gap between drivers and spaces through real-time data, AI architecture and seamless payments.',
    points: [
      'Find and book a space before you arrive',
      'Real-time availability across the city',
      'Seamless in-app payments',
      'Production running at 99.9% uptime',
      'Engineering team built and led from day one',
    ],
    chips: ['PropTech', 'Payments', 'Real-time'],
    link: 'https://www.goparkly.co',
    url: 'goparkly.co',
  },
  {
    id: 'scoutverse',
    scene: 0.47,
    name: 'ScoutVerse.ai',
    meta: 'Global · Sports intelligence',
    role: 'Founder, CEO & CTO · 2026 — Present',
    summary:
      'A full football ecosystem powered by AI, connecting players, scouts, agents and clubs on one intelligent platform. From discovery to decision, ScoutVerse reimagines how the beautiful game finds, evaluates and celebrates its talent.',
    points: [
      'Dual-brain AI: computer vision and multimodal reasoning',
      'Phone video turned into physics-verified analytics',
      'Deep AI search across every profile, metric and moment',
      'Verified profiles for players, scouts, agents and clubs',
    ],
    chips: ['SportsTech', 'Computer vision', 'AI'],
    link: 'https://scoutverse-frontend.vercel.app/',
    url: 'scoutverse.ai',
  },
];

export const leadershipNotes = [
  { title: 'It starts with the problem', text: 'Technology follows a clear understanding of the people it serves.' },
  { title: 'Standards are set early', text: 'Architecture, quality and security are decided before the first line of code.' },
  { title: 'Teams own the outcome', text: 'Leading with empathy and clarity, and developing the people who build.' },
];

export const pillars = [
  { title: 'Strategic Leadership', desc: 'Aligning technology with long-term business vision and operational excellence.' },
  { title: 'Scalable Innovation', desc: 'Designing systems that grow seamlessly with users, markets, and opportunity.' },
  { title: 'Global Perspective', desc: 'Benchmarking international models and adapting them for local and regional relevance.' },
  { title: 'Platform Thinking', desc: 'Building digital infrastructure that empowers people, businesses, and ecosystems.' },
  { title: 'Mentorship & Culture', desc: 'Leading with empathy, clarity, and a commitment to developing others.' },
];

/**
 * Great-circle distance and initial bearing from Accra (5.60°N, 0.19°W).
 * `shown` is the bearing used on the map: Lisbon, Madrid and Barcelona sit
 * within a few degrees of each other, so they are fanned out to stay legible.
 * Distances are exact.
 */
export const cities: { name: string; tz: string; km: number; bearing: number; shown: number; side: 'l' | 'r' | 't'; dy?: number }[] = [
  { name: 'Lisbon', tz: 'Europe/Lisbon', km: 3791, bearing: 347, shown: 318, side: 'l', dy: 14 },
  { name: 'Madrid', tz: 'Europe/Madrid', km: 3887, bearing: 355, shown: 338, side: 'l', dy: -4 },
  { name: 'Barcelona', tz: 'Europe/Madrid', km: 3986, bearing: 3, shown: 18, side: 'r' },
  { name: 'London', tz: 'Europe/London', km: 5104, bearing: 0, shown: 0, side: 't' },
  { name: 'Rio de Janeiro', tz: 'America/Sao_Paulo', km: 5644, bearing: 234, shown: 234, side: 'l' },
  { name: 'Dubai', tz: 'Asia/Dubai', km: 6281, bearing: 63, shown: 63, side: 'r' },
  { name: 'New York', tz: 'America/New_York', km: 8240, bearing: 311, shown: 311, side: 'l' },
  { name: 'Tokyo', tz: 'Asia/Tokyo', km: 13801, bearing: 39, shown: 39, side: 'r' },
];

export const contactTopics = ['Partnership', 'Investment', 'Advisory', 'Leadership role', 'Something else'];
