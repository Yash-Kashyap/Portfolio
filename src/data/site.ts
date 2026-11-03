export const WA = 'https://wa.me/917876331526';
export const EMAIL = 'yashkashyap1110@gmail.com';

export interface Project {
  n: string;
  name: string;
  dImg: string;
  mImg: string;
  meta: string;
  url: string;
  host: string;
  outcome: string;
  features: string[];
  tag: string;
  ph?: boolean;
  cat: string;
  loc: string;
  caseHref?: string;
}

export const PROJECTS: Project[] = [
  {
    n: '01',
    name: 'Chilli Bistro',
    dImg: '/assets/chilli-desktop.png',
    mImg: '/assets/chilli-mobile.png',
    meta: 'Restaurant website · Nahan, HP · 2026',
    url: 'https://chillibistro-nahan.netlify.app/',
    host: 'chillibistro-nahan.netlify.app',
    outcome: 'A casual Mall Road bistro, now taking orders on WhatsApp instead of the phone.',
    features: [
      'WhatsApp cart ordering (pay by cash/UPI)',
      'Searchable full menu with veg-only filter',
      'Signature-dish carousel',
      'Group combos',
      'Table booking & party enquiries',
      'Reviews, hours, map, Instagram',
    ],
    tag: '[Yash: Client project / Concept build]',
    ph: true,
    cat: 'Restaurant',
    loc: 'Nahan, HP',
    caseHref: '/work/chilli-bistro',
  },
  {
    n: '02',
    name: 'Suto Café',
    dImg: '/assets/suto-desktop.png',
    mImg: '/assets/suto-mobile.png',
    meta: 'Café website · Nahan, HP · 2026',
    url: 'https://suto-cafe-nahan.netlify.app/',
    host: 'suto-cafe-nahan.netlify.app',
    outcome: 'A pure-veg hill-view café with a menu you can search, book from and pre-order from.',
    features: [
      'Categorised menu with search & ₹ prices',
      'Combos for students & groups',
      'Table booking with same-day pre-orders via WhatsApp',
      'Instagram/YouTube vibe gallery',
      'Zomato + Google Maps directions',
    ],
    tag: '[Yash: Client project / Concept build]',
    ph: true,
    cat: 'Café',
    loc: 'Nahan, HP',
  },
  {
    n: '03',
    name: 'The Town House',
    dImg: '/assets/townhouse-desktop.png',
    mImg: '/assets/townhouse-mobile.png',
    meta: 'Café website · Nahan, HP · 2026',
    url: 'https://thetownhouse.netlify.app/',
    host: 'thetownhouse.netlify.app',
    outcome: 'An all-day café and kitchen near Delhi Gate, with a live open-now status, a full 22-list menu and one-tap calling.',
    features: [
      'Full menu, 22 lists, with veg / non-veg filter',
      "Live open-now status and today's hours (IST)",
      'Hour-by-hour day story and menu preview',
      'Google reviews wall, maps & directions',
      'Parties & birthday enquiries',
      'English + Hindi copy',
    ],
    tag: '[Yash: Client project / Concept build]',
    ph: true,
    cat: 'Café & kitchen',
    loc: 'Nahan, HP',
  },
  {
    n: '04',
    name: 'randomchat.social',
    dImg: '/assets/rc-desktop.png',
    mImg: '/assets/rc-mobile.png',
    meta: 'Real-time web app · Own product · 2026',
    url: 'https://www.randomchat.social/',
    host: 'randomchat.social',
    outcome: 'Anonymous text and video chat with strangers. No sign-up, no download, live worldwide.',
    features: [
      '1-on-1 text & peer-to-peer video (WebRTC)',
      'Interest-based matching',
      'Topic chat rooms',
      'Real-time translation across 8 languages',
      'Browser mini-games with daily leaderboards',
      'Moderation, block & report',
      'Site in 8 languages',
    ],
    tag: 'Own product · Live',
    cat: 'Real-time web app',
    loc: 'Worldwide',
  },
  {
    n: '05',
    name: 'PikkNDrop',
    dImg: '/assets/pikk-desktop.png',
    mImg: '/assets/pikk-mobile.png',
    meta: 'Ride-booking platform · Nahan, HP · 2026',
    url: 'https://www.pikkndrop.com',
    host: 'pikkndrop.com',
    outcome: 'A Rapido-style local ride service for Nahan: book a car or bike, see the fare, get picked up.',
    features: [
      'Car & bike booking',
      'Per-km fare calculation',
      'Pickup/drop on Google Maps',
      'Phone or Google sign-in',
      'Owner dashboard with auto availability',
      'Instant booking alerts with pickup location',
    ],
    tag: 'Own product · Live',
    cat: 'Ride booking',
    loc: 'Nahan, HP',
  },
  {
    n: '06',
    name: 'Chaand nikla kya?',
    dImg: '/assets/chaand-desktop.png',
    mImg: '/assets/chaand-mobile.png',
    meta: 'Festive web app · Own product · 2026',
    url: 'https://chaand-nikla-kya.karwachauth.workers.dev/',
    host: 'chaand-nikla-kya.karwachauth.workers.dev',
    outcome: 'A Karwa Chauth companion for couples: live moonrise time for your city, every ritual made interactive, and a card to share on WhatsApp.',
    features: [
      'Live moonrise countdown for 300+ Indian cities',
      'Jodi sync: partners connect in real time via a WhatsApp link',
      'Interactive rituals: sargi, shringar, pooja thali, katha',
      'Digital chhalni using the phone camera',
      'Custom couple share card',
      'Zero login, photos never leave the phone',
    ],
    tag: 'Own product · Live',
    cat: 'Festive web app',
    loc: 'India',
  },
];

export interface Service {
  img: string;
  n: string;
  title: string;
  bullets: string[];
  built: { label: string; href: string }[];
}

export const SERVICES: Service[] = [
  {
    img: 'https://images.pexels.com/photos/776538/pexels-photo-776538.jpeg?auto=compress&cs=tinysrgb&w=900',
    n: '01',
    title: 'Restaurant & café websites',
    bullets: ['Menu', 'WhatsApp ordering', 'Table booking'],
    built: [
      { label: 'Chilli Bistro', href: '#work-0' },
      { label: 'Suto Café', href: '#work-1' },
      { label: 'The Town House', href: '#work-2' },
    ],
  },
  {
    img: 'https://images.pexels.com/photos/5834913/pexels-photo-5834913.jpeg?auto=compress&cs=tinysrgb&w=900',
    n: '02',
    title: 'Booking & ride platforms',
    bullets: ['Maps', 'Fares', 'Dashboards'],
    built: [{ label: 'PikkNDrop', href: '#work-4' }],
  },
  {
    img: 'https://images.pexels.com/photos/6415622/pexels-photo-6415622.jpeg?auto=compress&cs=tinysrgb&w=900',
    n: '03',
    title: 'Real-time web apps',
    bullets: ['Chat', 'Video', 'Rooms'],
    built: [
      { label: 'randomchat.social', href: '#work-3' },
      { label: 'Chaand nikla kya?', href: '#work-5' },
    ],
  },
  {
    img: 'https://images.pexels.com/photos/16368540/pexels-photo-16368540.jpeg?auto=compress&cs=tinysrgb&w=900',
    n: '04',
    title: 'Google, SEO & local reach',
    bullets: ['Maps', 'Speed', 'Reviews'],
    built: [],
  },
  {
    img: 'https://images.pexels.com/photos/16094046/pexels-photo-16094046.jpeg?auto=compress&cs=tinysrgb&w=900',
    n: '05',
    title: 'AI features & automation',
    bullets: ['Chatbots', 'Smart forms', 'Auto-replies'],
    built: [],
  },
];

export const MISSIONS = [
  'A website for my business',
  'Online orders & bookings',
  'Redesign my current site',
  'Something custom / app',
];

export const STACK = [
  'HTML',
  'CSS',
  'JavaScript',
  'React',
  'WebRTC',
  'Google Maps',
  'WhatsApp API',
  'Netlify',
  'SQL',
  'Snowflake',
  'AI tools',
];

export const GUIDE: Record<string, [string, string]> = {
  top: ['Yash · tour guide', 'Hey, I’m Yash. Scroll down — I’ll walk you through everything.'],
  what: ['01 · What I do', 'Short version: I build fast sites and apps that bring in real users.'],
  work0: ['02 · Chilli Bistro', 'This bistro takes orders on WhatsApp now. No more phone calls.'],
  work1: ['02 · Suto Café', 'Search the menu, book a table, pre-order. All from one page.'],
  work2: ['02 · The Town House', 'A café with a live open-now badge and the whole menu in one scroll.'],
  work3: ['02 · randomchat.social', 'Strangers chatting live on video, worldwide. Real-time, no sign-up.'],
  work4: ['02 · PikkNDrop', 'Nahan’s own ride app. Fares, maps, owner dashboard — all mine.'],
  work5: ['02 · Chaand nikla kya?', 'Moonrise times for 300+ cities, synced between couples live.'],
  services: ['03 · Services', 'Cards move sideways. Tap the ones you need, I’ll add them to your message.'],
  process: ['04 · How it works', 'This is how a project usually goes. Spoiler: the demo is free.'],
  about: ['05 · Under the hood', 'That’s me. Data pipelines by day, websites by night.'],
  mission: ['06 · Your mission', 'Pick one and I’ll pre-write the message for you.'],
  contact: [
    '07 · Contact',
    'Your move. I reply within 6 hours — unless it’s night in India and I’m asleep. Then it’s 6 hours after I wake up, haha.',
  ],
  footer: ['That’s the tour', 'Still here? Back to top is that way ↑'],
};

export const POSE_NAMES = ['front', 'left', 'right', 'point', 'smile', 'wave'] as const;

export const POSE: Record<string, string> = {
  top: 'wave',
  what: 'point',
  work0: 'point|f',
  work1: 'right',
  work2: 'point',
  work3: 'left',
  work4: 'smile',
  work5: 'front',
  contact: 'wave',
  footer: 'smile',
};

export const SOCIALS = [
  { label: 'WhatsApp', note: '', isWa: true },
  { label: 'Instagram', note: '', href: 'https://www.instagram.com/__yash_.kashyap_/' },
  { label: 'LinkedIn', note: '', href: 'https://www.linkedin.com/in/yash--kashyap/' },
  { label: 'GitHub', note: '', href: 'https://github.com/Yash-Kashyap' },
  { label: 'Fiverr', note: '[Yash: optional — add link]', href: '#' },
];

