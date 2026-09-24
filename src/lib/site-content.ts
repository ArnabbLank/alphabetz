/**
 * Public marketing content, in one place.
 *
 * WHY THIS FILE EXISTS
 * There is an unresolved question about what Alphabetz actually sells. This site
 * is built around classes 1-12 school tuition for WB Board / CBSE / ICSE, which
 * is what the live site, the fee structure and the real faculty roster all say.
 * Docs 01 and 04 in the notes directory instead describe NEET/JEE/WBJEE/WBCS
 * competitive coaching.
 *
 * Keeping subjects, plans and copy here means resolving that question is a data
 * edit rather than a component rewrite. Do not inline this content into JSX.
 *
 * Faculty entries are REAL — names, subjects, qualifications and photographs.
 * PROGRAMME FEES ARE PLACEHOLDER and are labelled as such in the UI until the
 * institute confirms its schedule.
 */

export const INSTITUTE = {
  name: 'Alphabetz Coaching Centre',
  shortName: 'Alphabetz',
  city: 'Durgapur',
  establishedIso: '2022-12-20',
  establishedLabel: 'December 2022',
  phone: '089007 62900',
  phoneE164: '+918900762900',
  whatsapp: 'https://wa.me/918900762900',
  email: 'swarajkundu2023@gmail.com',
  address: {
    line1: 'Durgapur Aryan Club, B1 More',
    line2: 'Deshbandhu Chittaranjan Avenue',
    line3: 'Durgapur, West Bengal',
  },
  social: {
    facebook: 'https://www.facebook.com/profile.php?id=100093813424079',
    youtube: 'https://www.youtube.com/@AlphabetZ.2022/featured',
    instagram: 'https://www.instagram.com/alphabet_z2022/',
  },
} as const;

export const STATS = [
  { value: 15, label: 'Teachers' },
  { value: 12, label: 'Classes covered' },
  { value: 3, label: 'Boards' },
  { value: 3, label: 'Languages' },
] as const;

/** Drives the hero ticker and the subject grid. */
export const SUBJECTS = [
  { name: 'Mathematics', taughtBy: 'Swaraj, Subir, Souvik' },
  { name: 'Physics', taughtBy: 'Meghali, Riya' },
  { name: 'Chemistry', taughtBy: 'Choton Sir' },
  { name: 'Biology', taughtBy: 'Akash, Sudipta' },
  { name: 'English', taughtBy: 'Khusboo, Namrata' },
  { name: 'Bengali', taughtBy: 'Satabdi' },
  { name: 'Hindi', taughtBy: 'Swagata' },
  { name: 'Sanskrit', taughtBy: 'Soumi' },
  { name: 'Geography', taughtBy: 'Sanchita, Namrata' },
  { name: 'History', taughtBy: 'Satabdi' },
  { name: 'Civics', taughtBy: 'Khusboo' },
  { name: 'Computer', taughtBy: 'Tohidur' },
] as const;

export const CLASS_GROUPS = [
  { id: 'all', label: 'Show all' },
  { id: 'g14', label: 'Classes 1–4' },
  { id: 'g58', label: 'Classes 5–8' },
  { id: 'g910', label: 'Classes 9–10' },
  { id: 'g1112', label: 'Classes 11–12' },
] as const;

export type ClassGroupId = (typeof CLASS_GROUPS)[number]['id'];

export interface Plan {
  id: string;
  title: string;
  /** Which class-group filters reveal this plan. */
  groups: Exclude<ClassGroupId, 'all'>[];
  feeMonthly: number;
  summary: string;
  tags: string[];
  /** Rendered with the warm accent — reserve for genuinely free things. */
  freeTag?: string;
}

export const PLANS: Plan[] = [
  {
    id: 'junior',
    title: 'Junior · Classes 1 to 4',
    groups: ['g14'],
    feeMonthly: 600,
    summary:
      'Reading, writing and number sense in small groups, with one teacher per subject from the very first year.',
    tags: ['WB Board', 'CBSE', 'ICSE'],
    freeTag: 'First class free',
  },
  {
    id: 'middle',
    title: 'Middle school · Classes 5 to 8',
    groups: ['g58'],
    feeMonthly: 900,
    summary:
      'Maths, science, English and a second language. Monthly tests, and a written report home so you can see movement.',
    tags: ['WB Board', 'CBSE', 'ICSE', 'Online option'],
  },
  {
    id: 'madhyamik',
    title: 'Madhyamik · Classes 9 to 10',
    groups: ['g910'],
    feeMonthly: 1200,
    summary:
      'Full syllabus with past-paper drilling. When a monthly test exposes a gap we add classes at no extra charge.',
    tags: ['WB Board'],
    freeTag: 'Extra classes free',
  },
  {
    id: 'secondary',
    title: 'Secondary · Classes 9 to 10',
    groups: ['g910'],
    feeMonthly: 1400,
    summary:
      'Board-specific pacing for CBSE and ICSE, with a separate teacher for each of the three sciences.',
    tags: ['CBSE', 'ICSE', 'Online option'],
  },
  {
    id: 'higher-secondary',
    title: 'Higher secondary science · 11 to 12',
    groups: ['g1112'],
    feeMonthly: 1800,
    summary:
      'Physics, chemistry, mathematics and biology, each taught by someone who took it to postgraduate level.',
    tags: ['WB Board', 'CBSE', 'ICSE'],
  },
  {
    id: 'computer',
    title: 'Computer literacy',
    groups: ['g58', 'g910', 'g1112'],
    feeMonthly: 700,
    summary:
      'Fundamentals, spreadsheets and a first look at programming. Runs online, so it fits around school hours.',
    tags: ['Any board', 'Online'],
  },
];

export interface Teacher {
  name: string;
  subject: string;
  qualification: string;
  photo: string;
}

/** Real staff. Sourced from the institute's own records. */
export const TEACHERS: Teacher[] = [
  {
    name: 'Swaraj Kundu',
    subject: 'Founder · Maths & Physics',
    qualification: 'B.Sc in Physics, M.A in English, Masters in Fine Arts',
    photo: '/images/faculty/swarajk.jpg',
  },
  {
    name: 'Choton Sir',
    subject: 'Chemistry',
    qualification: 'Over 20 years of teaching experience',
    photo: '/images/faculty/old_bot1.png',
  },
  {
    name: 'Subir Sir',
    subject: 'Mathematics',
    qualification: 'Over 20 years of teaching experience',
    photo: '/images/faculty/old_bot2.png',
  },
  {
    name: 'Meghali Paul',
    subject: 'Physics',
    qualification: 'B.Sc and M.Sc in Physics',
    photo: '/images/faculty/meghali.jpg',
  },
  {
    name: 'Riya Biswas',
    subject: 'Physics',
    qualification: 'M.Sc in Physics',
    photo: '/images/faculty/riya.jpg',
  },
  {
    name: 'Akash Banerjee',
    subject: 'Biology',
    qualification: 'B.Sc, pursuing M.Sc in Medical Laboratory Technology',
    photo: '/images/faculty/akashbanerjee.jpg',
  },
  {
    name: 'Sudipta Lohar',
    subject: 'Biology',
    qualification: 'B.Sc in Botany, B.Ed in Life Science',
    photo: '/images/faculty/sudipta.jpg',
  },
  {
    name: 'Souvik Musib',
    subject: 'Mathematics',
    qualification: 'Pursuing B.Sc in Mathematics, Presidency College',
    photo: '/images/faculty/bot_young.png',
  },
  {
    name: 'Khusboo Singh Rai',
    subject: 'English & Civics',
    qualification: 'Double graduate in English, B.Ed in English, CTET qualified',
    photo: '/images/faculty/khusboo.jpg',
  },
  {
    name: 'Namrata Mondal',
    subject: 'English & Geography',
    qualification: 'B.A and M.A in English',
    photo: '/images/faculty/namrata.jpg',
  },
  {
    name: 'Sanchita Kundu',
    subject: 'Geography',
    qualification: 'M.Sc in Geography',
    photo: '/images/faculty/sanchita.jpg',
  },
  {
    name: 'Satabdi Mukherjee',
    subject: 'Bengali & History',
    qualification: 'B.Sc in Geography',
    photo: '/images/faculty/satapdim.jpg',
  },
  {
    name: 'Soumi Konar',
    subject: 'Sanskrit',
    qualification: 'B.A and M.A in Sanskrit',
    photo: '/images/faculty/soumi.jpg',
  },
  {
    name: 'Swagata Mondal',
    subject: 'Hindi',
    qualification: 'B.A in Hindi',
    photo: '/images/faculty/swagata.jpg',
  },
  {
    name: 'Tohidur Rahaman',
    subject: 'Computer',
    qualification: 'Bachelor in Computer Applications',
    photo: '/images/faculty/tohidur.jpg',
  },
];

export const NAV_LINKS = [
  { href: '#subjects', label: 'Subjects' },
  { href: '#fees', label: 'Classes & fees' },
  { href: '#teachers', label: 'Teachers' },
  { href: '#visit', label: 'Visit' },
] as const;
