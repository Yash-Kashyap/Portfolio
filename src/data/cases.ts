export interface CaseStudy {
  slug: string;
  client: string; // who it was built for
  type: string;
  role: string;
  summary: string; // one line, used in meta description
  problem: string[]; // short paragraphs
  solved: { problem: string; fix: string }[];
  result: string[];
  next: string[];
}

export const CASES: CaseStudy[] = [
  {
    slug: 'chilli-bistro',
    client: 'Chilli Bistro, Mall Road, Nahan',
    type: 'Restaurant website + WhatsApp ordering',
    role: 'Design · Development · Launch',
    summary:
      'How a Mall Road bistro moved its orders from a busy phone line to a WhatsApp cart with a searchable menu.',
    problem: [
      'Chilli Bistro is a busy casual spot on Mall Road, open from 11 am to 10:30 pm. Most orders came in by phone, and at rush hour the line was often engaged.',
      'The menu was long (continental, Chinese, tandoor, thalis, shakes) and customers had no single place to read it with prices. Staff ended up reading dishes out over the phone and writing orders down by hand.',
    ],
    solved: [
      {
        problem: 'Engaged phone lines at rush hour',
        fix: 'A cart on the website. Customers add dishes, choose cash or UPI, and one tap sends the full order (items, quantities, total) to the bistro on WhatsApp.',
      },
      {
        problem: 'Orders misheard or written down wrong',
        fix: 'The order arrives as a written message, so the kitchen reads exactly what was asked for instead of relying on a phone conversation.',
      },
      {
        problem: 'A long menu that was hard to browse',
        fix: 'A full, searchable menu with prices and a veg-only filter, plus a signature-dish carousel for people who just want the popular picks.',
      },
      {
        problem: 'Group orders and bookings handled informally',
        fix: 'Priced group combos, and a table booking and party enquiry form that opens a pre-filled WhatsApp message.',
      },
      {
        problem: 'Hard for new customers to find and trust',
        fix: 'Hours, map, Instagram and Google reviews (4.6 from 143 reviews at launch) on one page, with the page written to show up for "cafe on Mall Road, Nahan".',
      },
    ],
    result: [
      'The site is live and the bistro now takes orders through WhatsApp as well as by phone. Customers can read the whole menu, see prices and send an order without calling.',
      'The bistro is onboarded and running on the system. I have not published order-volume numbers because I would rather show figures I can verify than estimates.',
    ],
    next: [
      'Add order-status replies so customers know when to come and collect.',
      'Review which dishes are ordered most and reshape the signature carousel around them.',
    ],
  },
  {
    slug: 'suto-cafe',
    client: 'Suto Café, Shimla Road, Nahan',
    type: 'Café website with booking and pre-orders',
    role: 'Design · Development · Launch',
    summary:
      'A single page where Suto Café customers can search the menu, book a table and pre-order on WhatsApp.',
    problem: [
      'Suto Café is a pure-veg, hill-view café with sunroof seating and an open kitchen, run as a local franchise outlet. It is well liked locally (4.8 from about 1,800 Google reviews), but the information a customer needs was spread across Zomato, Instagram and Google Maps.',
      'There was no one place to see the menu with ₹ prices, no direct way to reserve a table for a group, and no way to order ahead of arriving.',
    ],
    solved: [
      {
        problem: 'Menu and prices scattered across apps',
        fix: 'A categorised menu with search and ₹ prices (pizza, pasta, tacos, shakes, boba, coffee) that works on a phone without logging in anywhere.',
      },
      {
        problem: 'No direct way to book a table',
        fix: 'A table booking form that sends a pre-filled WhatsApp message to the café.',
      },
      {
        problem: 'Groups waiting after they arrive',
        fix: 'Same-day pre-orders sent with the booking, so the kitchen can start before the group walks in.',
      },
      {
        problem: 'Students and groups looking for value',
        fix: 'Combos built from the existing menu, with the saving shown against buying the items separately.',
      },
      {
        problem: 'Customers unsure if the café is open or how to reach it',
        fix: 'A live open/closing status, one-tap directions on Google Maps, a Zomato link for delivery, and an Instagram/YouTube gallery of the space.',
      },
    ],
    result: [
      'The site is live and the café is onboarded. Booking, pre-ordering, menu search and directions now sit on one page, in place of three separate apps.',
      'Some combo contents and prices on the site are still being finalised with the owner, so I am not quoting figures for them here.',
    ],
    next: [
      'Lock in final combo prices with the owner.',
      'Add a seasonal specials section the café can update without a developer.',
    ],
  },
  {
    slug: 'the-town-house',
    client: 'The Town House, near Delhi Gate, Nahan',
    type: 'Café and kitchen website',
    role: 'Design · Development · Launch',
    summary:
      'A café website with a live open-now badge, a full 22-list menu and one-tap calling, in English and Hindi.',
    problem: [
      'The Town House is an all-day café and kitchen near Delhi Gate, open 11 am to 11 pm, with a very wide menu: Indian, Indo-Chinese, Italian, continental and mocktails.',
      'A wide menu is hard to present. Customers could not easily check what was on offer, whether it was veg, or whether the café was open right now, and the owner’s phone line was the only way to find out.',
    ],
    solved: [
      {
        problem: 'A 22-list menu that is hard to scan',
        fix: 'The whole menu on one page, organised into 22 lists, with a veg / non-veg filter so people can cut it down to what they eat.',
      },
      {
        problem: 'Not knowing if the café is open',
        fix: 'A live open-now status and today’s hours, calculated in Indian Standard Time, so it is correct wherever the visitor is.',
      },
      {
        problem: 'Hard to tell what the café is like',
        fix: 'An hour-by-hour “day story” and a menu preview, so a first-time visitor sees breakfast-to-late-night at a glance.',
      },
      {
        problem: 'Trust before a first visit',
        fix: 'A wall of Google reviews (4.6 stars), map and directions.',
      },
      {
        problem: 'Birthdays and parties arranged by phone only',
        fix: 'A parties and birthday enquiry form, plus one-tap calling for everything else.',
      },
      {
        problem: 'Local customers prefer Hindi',
        fix: 'Copy written in both English and Hindi.',
      },
    ],
    result: [
      'The site is live. A visitor can check whether the café is open, browse every menu list, filter by veg and call or get directions within a few taps.',
      'I have not published footfall or enquiry numbers for this project.',
    ],
    next: [
      'Add online ordering if the owner wants it, along the lines of the WhatsApp cart used for Chilli Bistro.',
      'Keep the menu data in one file so price changes are quick to make.',
    ],
  },
  {
    slug: 'randomchat-social',
    client: 'Own product',
    type: 'Real-time web app (text + video chat)',
    role: 'Product · Design · Development · Moderation',
    summary:
      'An anonymous text and video chat that runs in the browser: no sign-up, no download, in 8 languages.',
    problem: [
      'Random chat with strangers is a well-known idea, but many of the services ask you to create an account or install an app before you can say hello. Language is another barrier, and moderation is often weak.',
      'I wanted something a person could open in a browser and use within seconds, from anywhere, without handing over personal details.',
    ],
    solved: [
      {
        problem: 'Sign-up and app-install friction',
        fix: 'Everything runs in the browser. No account, no download. The service is for adults aged 18+.',
      },
      {
        problem: 'Video needing heavy servers and adding delay',
        fix: 'Video is peer-to-peer using WebRTC, so the two people connect directly and video does not pass through my servers.',
      },
      {
        problem: 'Random matches with nothing in common',
        fix: 'Optional interest-based matching, plus topic chat rooms for people who prefer a group.',
      },
      {
        problem: 'Language barrier between strangers',
        fix: 'Real-time translation across 8 languages, and the site itself is available in 8 languages.',
      },
      {
        problem: 'Abuse on anonymous platforms',
        fix: 'Block and report tools, with moderation on my side.',
      },
      {
        problem: 'Keeping people engaged after the chat ends',
        fix: 'Browser mini-games with daily leaderboards.',
      },
    ],
    result: [
      'The product is live at randomchat.social, open worldwide, and I run it myself.',
      'It is a young product. I am not claiming user numbers here; the next phase is measuring real usage and improving matching and moderation from it.',
    ],
    next: [
      'Improve moderation tooling as usage grows.',
      'Study where users drop off between landing and first connection.',
    ],
  },
  {
    slug: 'pikkndrop',
    client: 'Own product, single-owner ride service in Nahan',
    type: 'Ride-booking platform',
    role: 'Product · Design · Development · Launch',
    summary:
      'A local pick-and-drop booking platform for Nahan with per-km fares, live availability and an owner dashboard.',
    problem: [
      'Nahan and nearby towns such as Kala Amb and Paonta Sahib do not have an app-based ride service like the ones in bigger cities. People book by phone, ask the fare in advance, and often cannot tell whether a driver is free.',
      'For a single-owner service the same gaps hit the driver too: calls arrive while driving, and manual availability updates are easy to forget.',
    ],
    solved: [
      {
        problem: 'Fare uncertainty',
        fix: 'Transparent per-km pricing (car ₹30/km, minimum ₹100; bike ₹20/km, minimum ₹60), with the fare calculated before the booking is confirmed and no surge pricing.',
      },
      {
        problem: 'Not knowing if a driver is free',
        fix: 'A live availability status for car and bike, updated automatically by the owner dashboard.',
      },
      {
        problem: 'Describing the pickup point over a call',
        fix: 'Pickup and drop selected on Google Maps, inside a 40 km service radius around Nahan.',
      },
      {
        problem: 'Missed bookings while driving',
        fix: 'Instant booking alerts to the owner with the pickup location, and the option to book up to 7 days ahead.',
      },
      {
        problem: 'Barrier to first booking',
        fix: 'Sign in with phone number or Google, with the site in English and Hindi.',
      },
    ],
    result: [
      'The platform is live at pikkndrop.com and takes bookings for cars and bikes. Riders see the fare and availability before they book, and the owner is alerted on every booking.',
      'It is a small local service, so I am not quoting trip counts here.',
    ],
    next: [
      'Add trip history and receipts for regular riders.',
      'Cover more routes around Sirmaur as the service grows.',
    ],
  },
  {
    slug: 'chaand-nikla-kya',
    client: 'Own product, seasonal festive app',
    type: 'Festive web app',
    role: 'Product · Design · Development',
    summary:
      'A Karwa Chauth companion with live moonrise times for 300+ Indian cities, synced between couples.',
    problem: [
      'On Karwa Chauth the fast ends when the moon is seen, and moonrise time differs by city. People end up searching for the time, refreshing it through the evening, and messaging a partner who is in another city to compare.',
      'The rituals themselves (sargi, shringar, the pooja thali, the katha) are scattered across articles and videos.',
    ],
    solved: [
      {
        problem: 'Searching for the right moonrise time',
        fix: 'A live moonrise countdown for 300+ Indian cities, so the time is shown for the user’s own city.',
      },
      {
        problem: 'Partners in different places',
        fix: 'Jodi sync: one partner shares a WhatsApp link and both see the same countdown in real time.',
      },
      {
        problem: 'Rituals spread across the internet',
        fix: 'Sargi, shringar, pooja thali and katha put together in one interactive flow.',
      },
      {
        problem: 'Waiting for the moon',
        fix: 'A digital chhalni that uses the phone camera.',
      },
      {
        problem: 'Sharing the moment',
        fix: 'A custom couple card that can be shared on WhatsApp.',
      },
      {
        problem: 'Privacy worries',
        fix: 'No login, and photos never leave the phone.',
      },
    ],
    result: [
      'The app is live and free to use. It is a seasonal product, built around a single evening of the year, so it was designed to load fast and to work with no sign-up.',
      'I am not quoting usage numbers here.',
    ],
    next: [
      'Prepare for next season: check moonrise data and the city list well ahead of the festival.',
      'Consider similar companions for other festivals.',
    ],
  },
];

export const caseBySlug = (slug: string) => CASES.find((c) => c.slug === slug);
