// ============================================================================
//  JAPAN QUEST — TRIP DATA
//  Edit this file to update the plan. Everything on the site is generated
//  from it. Prices are rough per-person estimates in JPY (¥).
// ============================================================================

export const TRIP = {
  title: 'Japan Quest',
  titleJp: '日本冒険譚',
  subtitle: 'Osaka → Shikoku → Kyoto → Ghibli Park → Tokyo',
  start: '2027-01-21',
  end: '2027-02-06',
  defaultPartySize: 4,
  // Approximate exchange rates (1 unit of currency = X yen). Update before the trip.
  rates: { JPY: 1, USD: 150, EUR: 165 },
};

// Places that appear on the map (coordinates live in japan-geo.js).
export const PLACES = {
  osaka:       { name: 'Osaka',       jp: '大阪', color: '#ff5a3c' },
  himeji:      { name: 'Himeji',      jp: '姫路', color: '#f5f0e6' },
  kobe:        { name: 'Kobe',        jp: '神戸', color: '#7ad3ff' },
  takamatsu:   { name: 'Takamatsu',   jp: '高松', color: '#ffd166' },
  naoshima:    { name: 'Naoshima',    jp: '直島', color: '#ffe14d' },
  teshima:     { name: 'Teshima',     jp: '豊島', color: '#9be564' },
  kotohira:    { name: 'Kotohira',    jp: '琴平', color: '#ffc38a' },
  kyoto:       { name: 'Kyoto',       jp: '京都', color: '#ff8fb1' },
  ghibli:      { name: 'Ghibli Park', jp: 'ジブリ', color: '#8fe0b0' },
  tokyo:       { name: 'Tokyo',       jp: '東京', color: '#b98cff' },
  kamakura:    { name: 'Kamakura',    jp: '鎌倉', color: '#9be564' },
  yokohama:    { name: 'Yokohama',    jp: '横浜', color: '#7ad3ff' },
  kawaguchiko: { name: 'Kawaguchiko', jp: '河口湖', color: '#e6f4ff' },
};

// ---------------------------------------------------------------------------
//  STAGES — where we sleep. Accommodation + how we get there + local transport.
//  pricePerNight is per person (assuming shared rooms).
//  status: 'idea' | 'shortlist' | 'booked'
//  foodPerDay = baseline (konbini, ramen, coffee). Planned meals are extra.
// ---------------------------------------------------------------------------
export const STAGES = [
  {
    id: 'osaka', place: 'osaka', stage: 1,
    checkIn: '2027-01-21', nights: 6,
    tagline: 'The Kitchen of Japan',
    boss: 'Dōtonbori after dark',
    stats: { food: 5, culture: 3, nightlife: 5, nature: 1, chaos: 5 },
    stay: {
      name: 'TBD — apartment or hotel', area: 'Namba / Shinsaibashi',
      why: 'Walkable to Dōtonbori, direct Nankai train from Kansai Airport, easy JR to Himeji.',
      pricePerNight: 7000, status: 'idea', link: '',
    },
    arrive: { mode: 'train', label: 'KIX → Namba (Nankai Rapi:t)', duration: '40 min', price: 1450 },
    local: { label: 'ICOCA card · Midōsuji subway line', perDay: 800 },
    foodPerDay: 3000,
  },
  {
    id: 'takamatsu', place: 'takamatsu', stage: 2,
    checkIn: '2027-01-27', nights: 2,
    tagline: 'Gateway to the Art Islands',
    boss: 'Make your own udon',
    stats: { food: 4, culture: 4, nightlife: 2, nature: 5, chaos: 1 },
    stay: {
      name: 'TBD — hotel by the port', area: 'Sunport / Kawaramachi',
      why: 'Ferries to Naoshima & Teshima leave from Takamatsu Port, 5 min from JR station.',
      pricePerNight: 6000, status: 'idea', link: '',
    },
    arrive: { mode: 'train', label: 'Kobe → Okayama (Shinkansen) → Takamatsu (Marine Liner)', duration: '1 h 45', price: 6400, pass: 'kansaiWide' },
    local: { label: 'Kotoden trains · ferries · rental bikes', perDay: 500 },
    foodPerDay: 3000,
  },
  {
    id: 'kyoto', place: 'kyoto', stage: 3,
    checkIn: '2027-01-29', nights: 1,
    tagline: 'One Night in the Old Capital',
    boss: 'Fushimi Inari at dawn',
    stats: { food: 4, culture: 5, nightlife: 2, nature: 4, chaos: 2 },
    stay: {
      name: 'TBD — ryokan or hotel', area: 'Near Kyoto Station',
      why: 'Only one night, so stay close to the Shinkansen and the JR Nara line to Fushimi Inari.',
      pricePerNight: 11000, status: 'idea', link: '',
    },
    arrive: { mode: 'train', label: 'Kotohira → Okayama (JR) → Kyoto (Shinkansen)', duration: '2 h 30', price: 9000, pass: 'kansaiWide' },
    local: { label: 'JR + city bus', perDay: 800 },
    foodPerDay: 3000,
  },
  {
    id: 'tokyo', place: 'tokyo', stage: 4,
    checkIn: '2027-01-30', nights: 7,
    tagline: 'Neon Final Dungeon',
    boss: 'Shibuya Scramble at midnight',
    stats: { food: 5, culture: 4, nightlife: 5, nature: 2, chaos: 5 },
    stay: {
      name: 'TBD — hotel', area: 'Shinjuku / Asakusa / Ueno',
      why: 'Shinjuku for nightlife and the Fuji buses; Asakusa/Ueno for cheaper, cosier vibes.',
      pricePerNight: 8000, status: 'idea', link: '',
    },
    arrive: { mode: 'shinkansen', label: 'Kyoto → Nagoya → Tokyo (Shinkansen, stopping for Ghibli Park)', duration: '35 min + 1 h 40', price: 17200 },
    local: { label: 'Suica card · JR Yamanote + Metro', perDay: 1000 },
    foodPerDay: 3500,
  },
];

// Rail pass: Kansai Wide Area Pass, 5 consecutive days. Check the current price before buying!
export const PASSES = {
  kansaiWide: {
    name: 'Kansai Wide Area Pass (5 days)',
    price: 12000,
    stage: 'takamatsu', // where it shows up in the ledger
    covers: 'Jan 26 – Jan 30 · Himeji, Kobe, Takamatsu, Kotohira, Kyoto',
    link: 'https://www.westjr.co.jp/global/en/ticket/pass/kansai_wide/',
  },
};

// ---------------------------------------------------------------------------
//  DAYS — the day-by-day itinerary.
//  route: places visited that day in order (drawn on the map).
//  sleep: which stage we sleep in that night (null on the last day).
//  event: optional badge shown on the calendar.
//  activities: { name, cat, price (per person ¥), note, time }
//    cat: 'culture' | 'food' | 'nature' | 'anime' | 'nightlife' | 'shopping'
//  extraTransport: day-trip tickets not covered by "arrive" of a stage.
// ---------------------------------------------------------------------------
export const DAYS = [
  {
    date: '2027-01-21', route: ['osaka'], sleep: 'osaka',
    title: 'The Party Assembles',
    text: 'Land at Kansai Airport and meet up. Drop the bags, grab ICOCA cards and head straight into the neon river of Dōtonbori.',
    event: '✈ Arrive KIX',
    activities: [
      { name: 'Meet at KIX & check-in', cat: 'culture', price: 0, time: 'PM' },
      { name: 'Dōtonbori Glico sign + takoyaki', cat: 'food', price: 1500, time: 'Evening' },
    ],
  },
  {
    date: '2027-01-22', route: ['osaka'], sleep: 'osaka',
    title: 'Castle & Market',
    text: 'Breakfast grazing at Kuromon Market, then the golden-trimmed Osaka Castle. Okonomiyaki for dinner.',
    activities: [
      { name: 'Kuromon Market breakfast', cat: 'food', price: 2500, time: 'AM' },
      { name: 'Osaka Castle main tower', cat: 'culture', price: 1200, time: 'Midday' },
      { name: 'Okonomiyaki in Namba', cat: 'food', price: 1800, time: 'Evening' },
    ],
  },
  {
    date: '2027-01-23', route: ['osaka'], sleep: 'osaka',
    title: 'Retro Osaka',
    text: 'Shinsekai’s retro streets and kushikatsu, Den Den Town for games and figures, sunset from the Umeda Sky Building.',
    activities: [
      { name: 'Shinsekai kushikatsu', cat: 'food', price: 2000, time: 'Midday' },
      { name: 'Den Den Town arcades & retro games', cat: 'anime', price: 2000, time: 'PM' },
      { name: 'Umeda Sky Building sunset', cat: 'culture', price: 2000, time: 'Evening' },
    ],
  },
  {
    date: '2027-01-24', route: ['osaka'], sleep: 'osaka',
    title: 'Slow Sunday',
    text: 'An easy day: the Kaiyūkan aquarium’s whale sharks, Nakazakichō’s café lanes, then izakaya-hopping under the tracks in Tenma.',
    activities: [
      { name: 'Kaiyūkan Aquarium', cat: 'nature', price: 2700, time: 'AM' },
      { name: 'Nakazakichō cafés & vintage shops', cat: 'shopping', price: 1000, time: 'PM' },
      { name: 'Tenma izakaya crawl', cat: 'nightlife', price: 4000, time: 'Evening' },
    ],
  },
  {
    date: '2027-01-25', route: ['osaka'], sleep: 'osaka',
    title: 'Power-Up: Super Nintendo World',
    text: 'Universal Studios Japan on a Monday, when the crowds are thinner. Punch blocks, collect coins, race Mario Kart.',
    activities: [
      { name: 'Universal Studios Japan (1-day)', cat: 'anime', price: 9800, time: 'All day', note: 'Price varies by date. Buy tickets and Express Pass early.' },
    ],
  },
  {
    date: '2027-01-26', route: ['osaka', 'himeji', 'osaka'], sleep: 'osaka',
    title: 'The White Heron Castle',
    text: 'Day trip west to Himeji, the biggest and most beautiful original castle in Japan. Kōko-en garden next door, back to Osaka for dinner. First day of the Kansai Wide Area Pass.',
    extraTransport: [{ label: 'Osaka ⇄ Himeji (JR Special Rapid)', price: 3040, pass: 'kansaiWide' }],
    activities: [
      { name: 'Himeji Castle', cat: 'culture', price: 2500, time: 'AM' },
      { name: 'Kōko-en Garden', cat: 'nature', price: 310, time: 'PM' },
    ],
  },
  {
    date: '2027-01-27', route: ['osaka', 'kobe', 'takamatsu'], sleep: 'takamatsu',
    title: 'Beef, Harbor, Ferry Lights',
    text: 'Check out of Osaka and stop in Kobe for a Kobe beef lunch and a stroll around Kitano and Harborland. Cross to Shikoku in the evening.',
    extraTransport: [{ label: 'Osaka → Kobe Sannomiya (JR)', price: 420, pass: 'kansaiWide' }],
    activities: [
      { name: 'Kobe beef teppanyaki lunch', cat: 'food', price: 8000, time: 'Midday', note: 'Lunch sets are much cheaper than dinner.' },
      { name: 'Kitano Ijinkan & Harborland', cat: 'culture', price: 0, time: 'PM' },
    ],
  },
  {
    date: '2027-01-28', route: ['takamatsu', 'naoshima', 'teshima', 'takamatsu'], sleep: 'takamatsu',
    title: 'The Art Islands',
    text: 'Ferry to Naoshima: Yayoi Kusama’s pumpkins, the Chichu Art Museum and island cats. Teshima too if the boats line up.',
    extraTransport: [{ label: 'Ferries Takamatsu ⇄ Naoshima / Teshima', price: 2500 }],
    activities: [
      { name: 'Chichu Art Museum', cat: 'culture', price: 2500, time: 'AM', note: 'Timed tickets. Reserve online.' },
      { name: 'Yellow Pumpkin & Benesse House', cat: 'culture', price: 0, time: 'Midday' },
      { name: 'Teshima Art Museum', cat: 'culture', price: 1570, time: 'PM', note: '⚠ Often closed Tue–Thu in winter. Jan 28 is a Thursday, so check!' },
    ],
  },
  {
    date: '2027-01-29', route: ['takamatsu', 'kotohira', 'kyoto'], sleep: 'kyoto',
    title: 'Udon School, then Kyoto',
    text: 'Make (and stomp) our own sanuki udon at a cooking class in Kotohira, then ride on to Kyoto for an evening walk through Gion.',
    extraTransport: [{ label: 'Takamatsu → Kotohira (JR)', price: 870, pass: 'kansaiWide' }],
    activities: [
      { name: 'Udon-making class', cat: 'food', price: 2000, time: 'AM', note: 'e.g. Nakano Udon School. Book ahead; check the price.' },
      { name: 'Konpira-san shrine steps (optional)', cat: 'culture', price: 0, time: 'Midday' },
      { name: 'Evening walk in Gion & Hanamikoji', cat: 'culture', price: 0, time: 'Evening' },
    ],
  },
  {
    date: '2027-01-30', route: ['kyoto', 'ghibli', 'tokyo'], sleep: 'tokyo',
    title: 'Gates, Totoro, Bullet Train',
    text: 'Fushimi Inari at sunrise, then the Shinkansen to Nagoya for Ghibli Park, and on to Tokyo in the evening. Send the big bags ahead. Option: sleep in Nagoya tonight and reach Tokyo tomorrow (Tokyo becomes 6 nights).',
    event: '🌳 Ghibli Park',
    extraTransport: [
      { label: 'Nagoya ⇄ Ghibli Park (subway + Linimo)', price: 1400 },
      { label: 'Luggage forwarding Kyoto → Tokyo hotel', price: 2500 },
    ],
    activities: [
      { name: 'Fushimi Inari sunrise hike', cat: 'culture', price: 0, time: 'Dawn' },
      { name: 'Ghibli Park (Ō-sanpo Pass)', cat: 'anime', price: 4000, time: 'Midday', note: 'Tickets sell out. Buy when sales open, about 2–3 months ahead. Closed Tuesdays.' },
      { name: 'Ekiben dinner on the Shinkansen', cat: 'food', price: 1500, time: 'Evening' },
    ],
  },
  {
    date: '2027-01-31', route: ['tokyo'], sleep: 'tokyo',
    title: 'Neon Overworld',
    text: 'Meiji Jingū and Harajuku in the morning, Shibuya Scramble and Shibuya Sky at sunset, then Omoide Yokochō and Golden Gai in Shinjuku.',
    activities: [
      { name: 'Harajuku & Meiji Jingū', cat: 'shopping', price: 0, time: 'AM' },
      { name: 'Shibuya Sky', cat: 'culture', price: 2500, time: 'PM', note: 'Book a sunset slot.' },
      { name: 'Golden Gai bar hop', cat: 'nightlife', price: 4000, time: 'Night' },
    ],
  },
  {
    date: '2027-02-01', route: ['tokyo', 'kamakura', 'yokohama', 'tokyo'], sleep: 'tokyo',
    title: 'Side Quest: Great Buddha & Harbor',
    text: 'Day trip to Kamakura for the Great Buddha and the Enoden coastal train, then Yokohama on the way back for Chinatown dumplings and Minato Mirai lights.',
    extraTransport: [{ label: 'Tokyo → Kamakura → Yokohama → Tokyo (JR + Enoden)', price: 2200 }],
    activities: [
      { name: 'Kōtoku-in Great Buddha', cat: 'culture', price: 300, time: 'AM' },
      { name: 'Enoden to Enoshima', cat: 'nature', price: 0, time: 'Midday' },
      { name: 'Yokohama Chinatown dinner', cat: 'food', price: 2500, time: 'Evening' },
    ],
  },
  {
    date: '2027-02-02', route: ['tokyo'], sleep: 'tokyo',
    title: 'Otaku Pilgrimage',
    text: 'Akihabara arcades and figure towers, then Ikebukuro: Pokémon Center, Sunshine City and Otome Road. Karaoke to finish.',
    activities: [
      { name: 'Akihabara (Super Potato, GiGO)', cat: 'anime', price: 3000, time: 'AM' },
      { name: 'Pokémon Center Mega Tokyo', cat: 'anime', price: 0, time: 'PM' },
      { name: 'Karaoke all night', cat: 'nightlife', price: 3000, time: 'Night' },
    ],
  },
  {
    date: '2027-02-03', route: ['tokyo'], sleep: 'tokyo',
    title: 'Setsubun Festival',
    text: 'It’s Setsubun! Catch the bean-throwing at Sensō-ji to chase away demons, eat through Asakusa, then Tokyo Skytree at night.',
    event: '👹 Setsubun',
    activities: [
      { name: 'Setsubun bean-throwing at Sensō-ji', cat: 'culture', price: 0, time: 'PM' },
      { name: 'Asakusa street food', cat: 'food', price: 2000, time: 'Midday' },
      { name: 'Tokyo Skytree', cat: 'culture', price: 3100, time: 'Evening' },
    ],
  },
  {
    date: '2027-02-04', route: ['tokyo', 'kawaguchiko', 'tokyo'], sleep: 'tokyo',
    title: 'Side Quest: The Sacred Mountain',
    text: 'Day trip to Yamanashi: Lake Kawaguchiko for clear winter views of Mt. Fuji, the Chūreitō Pagoda and an onsen.',
    extraTransport: [{ label: 'Shinjuku ⇄ Kawaguchiko (highway bus)', price: 4400 }],
    activities: [
      { name: 'Chūreitō Pagoda viewpoint', cat: 'nature', price: 0, time: 'AM' },
      { name: 'Hōtō noodle lunch', cat: 'food', price: 1500, time: 'Midday' },
      { name: 'Onsen with a Fuji view', cat: 'nature', price: 1500, time: 'PM' },
    ],
  },
  {
    date: '2027-02-05', route: ['tokyo'], sleep: 'tokyo',
    title: 'Final Boss Rush',
    text: 'teamLab Planets in the morning, Shimokitazawa thrift shops in the afternoon, and a farewell yakiniku feast.',
    activities: [
      { name: 'teamLab Planets', cat: 'culture', price: 3800, time: 'AM' },
      { name: 'Shimokitazawa vintage shopping', cat: 'shopping', price: 0, time: 'PM' },
      { name: 'Farewell yakiniku feast', cat: 'food', price: 6000, time: 'Evening' },
    ],
  },
  {
    date: '2027-02-06', route: ['tokyo'], sleep: null,
    title: 'The End… or New Game+?',
    text: 'Last konbini breakfast, a souvenir sprint, and off to the airport. Same time next year?',
    event: '✈ Fly home',
    extraTransport: [{ label: 'Tokyo → Narita / Haneda', price: 1500 }],
    activities: [
      { name: 'Souvenir sprint & konbini breakfast', cat: 'shopping', price: 0, time: 'AM' },
    ],
  },
];

export const CATEGORIES = {
  culture:   { label: 'Culture',   icon: '⛩' },
  food:      { label: 'Food',      icon: '🍜' },
  nature:    { label: 'Nature',    icon: '🗻' },
  anime:     { label: 'Anime & Games', icon: '🎮' },
  nightlife: { label: 'Nightlife', icon: '🏮' },
  shopping:  { label: 'Shopping',  icon: '🛍' },
};
