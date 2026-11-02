// ============================================================================
//  JAPAN QUEST — TRIP DATA
//  Edit this file to update the plan. Everything on the site is generated
//  from it. Prices are rough per-person estimates in JPY (¥).
// ============================================================================

export const TRIP = {
  title: 'Japan Quest',
  titleJp: '日本冒険譚',
  subtitle: 'Osaka → Shikoku → Kyoto → Tokyo',
  start: '2027-01-21',
  end: '2027-02-06',
  defaultPartySize: 4,
  // Approximate exchange rates (1 unit of currency = X yen). Update before the trip.
  rates: { JPY: 1, USD: 150, EUR: 165 },
};

// Cities that appear on the map. x/y are SVG coordinates on the map (see japan-geo.js).
export const PLACES = {
  osaka:      { name: 'Osaka',      jp: '大阪', color: '#ff5a3c' },
  nara:       { name: 'Nara',       jp: '奈良', color: '#f2b880' },
  himeji:     { name: 'Himeji',     jp: '姫路', color: '#f5f0e6' },
  kobe:       { name: 'Kobe',       jp: '神戸', color: '#7ad3ff' },
  takamatsu:  { name: 'Takamatsu',  jp: '高松', color: '#ffd166' },
  naoshima:   { name: 'Naoshima',   jp: '直島', color: '#ffe14d' },
  teshima:    { name: 'Teshima',    jp: '豊島', color: '#9be564' },
  kyoto:      { name: 'Kyoto',      jp: '京都', color: '#ff8fb1' },
  tokyo:      { name: 'Tokyo',      jp: '東京', color: '#b98cff' },
  fuji:       { name: 'Mt. Fuji',   jp: '富士山', color: '#e6f4ff' },
};

// ---------------------------------------------------------------------------
//  STAGES — where we sleep. Accommodation + how we get there + local transport.
//  pricePerNight is per person (assuming shared rooms).
//  status: 'idea' | 'shortlist' | 'booked'
// ---------------------------------------------------------------------------
export const STAGES = [
  {
    id: 'osaka', place: 'osaka', stage: 1,
    checkIn: '2027-01-21', nights: 5,
    tagline: 'The Kitchen of Japan',
    boss: 'Dōtonbori after dark',
    stats: { food: 5, culture: 3, nightlife: 5, nature: 1, chaos: 5 },
    stay: {
      name: 'TBD — apartment or hotel', area: 'Namba / Shinsaibashi',
      why: 'Walkable to Dōtonbori, direct Nankai train from Kansai Airport.',
      pricePerNight: 7000, status: 'idea', link: '',
    },
    arrive: { mode: 'train', label: 'KIX → Namba (Nankai Rapi:t)', duration: '40 min', price: 1450 },
    local: { label: 'ICOCA card · Midōsuji subway line', perDay: 800 },
    foodPerDay: 3000,
  },
  {
    id: 'himeji', place: 'himeji', stage: 2,
    checkIn: '2027-01-26', nights: 1,
    tagline: 'The White Heron Castle',
    boss: 'Himeji Castle keep',
    stats: { food: 2, culture: 5, nightlife: 1, nature: 3, chaos: 1 },
    stay: {
      name: 'TBD — business hotel', area: 'Near JR Himeji Station',
      why: 'Castle is a straight 15-min walk up Ōtemae-dōri. (Could also sleep in Kobe instead.)',
      pricePerNight: 6000, status: 'idea', link: '',
    },
    arrive: { mode: 'train', label: 'Osaka → Himeji (JR Special Rapid)', duration: '1 h', price: 1520, pass: 'kansaiWide' },
    local: { label: 'On foot / loop bus', perDay: 300 },
    foodPerDay: 3000,
  },
  {
    id: 'takamatsu', place: 'takamatsu', stage: 3,
    checkIn: '2027-01-27', nights: 2,
    tagline: 'Gateway to the Art Islands',
    boss: 'Sanuki udon crawl',
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
    id: 'kyoto', place: 'kyoto', stage: 4,
    checkIn: '2027-01-29', nights: 2,
    tagline: 'A Thousand Years of Temples',
    boss: 'Fushimi Inari at dawn',
    stats: { food: 4, culture: 5, nightlife: 2, nature: 4, chaos: 2 },
    stay: {
      name: 'TBD — machiya or ryokan', area: 'Gion / Higashiyama or Kyoto Station',
      why: 'Treat ourselves: a traditional townhouse or a ryokan with onsen.',
      pricePerNight: 11000, status: 'idea', link: '',
    },
    arrive: { mode: 'train', label: 'Takamatsu → Okayama (Marine Liner) → Kyoto (Shinkansen)', duration: '2 h', price: 8700, pass: 'kansaiWide' },
    local: { label: 'City bus + subway (buses get busy!)', perDay: 1000 },
    foodPerDay: 3000,
  },
  {
    id: 'tokyo', place: 'tokyo', stage: 5,
    checkIn: '2027-01-31', nights: 6,
    tagline: 'Neon Final Dungeon',
    boss: 'Shibuya Scramble at midnight',
    stats: { food: 5, culture: 4, nightlife: 5, nature: 2, chaos: 5 },
    stay: {
      name: 'TBD — hotel', area: 'Shinjuku / Asakusa / Ueno',
      why: 'Shinjuku for nightlife & Fuji buses; Asakusa/Ueno for cheaper, cosier vibes.',
      pricePerNight: 8000, status: 'idea', link: '',
    },
    arrive: { mode: 'shinkansen', label: 'Kyoto → Tokyo (Nozomi Shinkansen) — sit in seat E for Fuji', duration: '2 h 15', price: 14170 },
    local: { label: 'Suica card · JR Yamanote + Metro', perDay: 1000 },
    foodPerDay: 3500,
  },
];

// Rail pass hack: Kansai Wide Area Pass — 5 consecutive days, covers
// Osaka→Himeji→Kobe→Okayama→Takamatsu→Kyoto. Check the current price before buying!
export const PASSES = {
  kansaiWide: {
    name: 'Kansai Wide Area Pass (5 days)',
    price: 12000,
    covers: 'Jan 26 – Jan 30 · Osaka → Himeji → Kobe → Takamatsu → Kyoto',
    link: 'https://www.westjr.co.jp/global/en/ticket/pass/kansai_wide/',
  },
};

// ---------------------------------------------------------------------------
//  foodPerDay = baseline (konbini, ramen, coffee). Planned meals below are extra.
//  DAYS — the day-by-day itinerary.
//  route: places visited that day in order (drawn on the map).
//  sleep: which stage we sleep in that night (null on the last day).
//  activities: { name, cat, price (per person ¥), note, time }
//    cat: 'culture' | 'food' | 'nature' | 'anime' | 'nightlife' | 'shopping'
//  extraTransport: day-trip tickets not covered by "arrive" of a stage.
// ---------------------------------------------------------------------------
export const DAYS = [
  {
    date: '2027-01-21', route: ['osaka'], sleep: 'osaka',
    title: 'The Party Assembles',
    text: 'Everyone lands in Osaka. Drop the bags, grab ICOCA cards and head straight into the neon river of Dōtonbori.',
    activities: [
      { name: 'Meet-up & check-in', cat: 'culture', price: 0, time: 'PM' },
      { name: 'Dōtonbori glico sign + takoyaki', cat: 'food', price: 1500, time: 'Evening' },
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
    date: '2027-01-23', route: ['osaka', 'nara', 'osaka'], sleep: 'osaka',
    title: 'Side Quest: Deer Kingdom',
    text: 'Day trip to Nara. Bow to the deer (they bow back), then face the giant Buddha of Tōdai-ji.',
    extraTransport: [{ label: 'Osaka ⇄ Nara (Kintetsu)', price: 1360 }],
    activities: [
      { name: 'Nara Park deer crackers', cat: 'nature', price: 200, time: 'AM' },
      { name: 'Tōdai-ji Great Buddha', cat: 'culture', price: 800, time: 'Midday' },
      { name: 'Kasuga Taisha lantern shrine', cat: 'culture', price: 500, time: 'PM' },
    ],
  },
  {
    date: '2027-01-24', route: ['osaka'], sleep: 'osaka',
    title: 'Power-Up: Super Nintendo World',
    text: 'Universal Studios Japan. Punch blocks, collect coins, race Mario Kart. Buy tickets early!',
    activities: [
      { name: 'Universal Studios Japan (1-day)', cat: 'anime', price: 9800, time: 'All day', note: 'Price varies by date. Express Pass optional.' },
    ],
  },
  {
    date: '2027-01-25', route: ['osaka'], sleep: 'osaka',
    title: 'Retro Osaka',
    text: 'Shinsekai’s retro streets and kushikatsu, Den Den Town for games & figures, sunset from Umeda Sky Building.',
    activities: [
      { name: 'Shinsekai kushikatsu', cat: 'food', price: 2000, time: 'Midday' },
      { name: 'Den Den Town arcades & retro games', cat: 'anime', price: 2000, time: 'PM' },
      { name: 'Umeda Sky Building sunset', cat: 'culture', price: 2000, time: 'Evening' },
    ],
  },
  {
    date: '2027-01-26', route: ['osaka', 'himeji'], sleep: 'himeji',
    title: 'The White Castle',
    text: 'West to Himeji, Japan’s most beautiful original castle. Kōko-en garden next door, then a quiet night.',
    activities: [
      { name: 'Himeji Castle', cat: 'culture', price: 2500, time: 'AM' },
      { name: 'Kōko-en Garden', cat: 'nature', price: 310, time: 'PM' },
    ],
  },
  {
    date: '2027-01-27', route: ['himeji', 'kobe', 'takamatsu'], sleep: 'takamatsu',
    title: 'Beef, Harbor, Ferry Lights',
    text: 'Stop in Kobe for a legendary Kobe beef lunch and a stroll around Kitano & Harborland, then cross to Shikoku.',
    extraTransport: [{ label: 'Himeji → Kobe Sannomiya (JR)', price: 990, pass: 'kansaiWide' }],
    activities: [
      { name: 'Kobe beef teppanyaki lunch', cat: 'food', price: 8000, time: 'Midday', note: 'Lunch sets are much cheaper than dinner.' },
      { name: 'Kitano Ijinkan & Harborland', cat: 'culture', price: 0, time: 'PM' },
    ],
  },
  {
    date: '2027-01-28', route: ['takamatsu', 'naoshima', 'teshima', 'takamatsu'], sleep: 'takamatsu',
    title: 'The Art Islands',
    text: 'Ferry to Naoshima: Yayoi Kusama’s pumpkins, Chichu Art Museum, and island cats. Teshima if the boats line up.',
    extraTransport: [{ label: 'Ferries Takamatsu ⇄ Naoshima / Teshima', price: 2500 }],
    activities: [
      { name: 'Chichu Art Museum', cat: 'culture', price: 2500, time: 'AM', note: 'Timed tickets — reserve online.' },
      { name: 'Yellow Pumpkin & Benesse House', cat: 'culture', price: 0, time: 'Midday' },
      { name: 'Teshima Art Museum', cat: 'culture', price: 1570, time: 'PM', note: '⚠ Often closed Tue–Thu in winter. Jan 28 is a Thursday — check!' },
    ],
  },
  {
    date: '2027-01-29', route: ['takamatsu', 'kyoto'], sleep: 'kyoto',
    title: 'Garden & Udon, then Kyoto',
    text: 'Morning in Ritsurin Garden, a final bowl of sanuki udon, and a train ride to the old capital.',
    activities: [
      { name: 'Ritsurin Garden', cat: 'nature', price: 410, time: 'AM' },
      { name: 'Sanuki udon showdown', cat: 'food', price: 800, time: 'Midday' },
      { name: 'Evening walk in Gion', cat: 'culture', price: 0, time: 'Evening' },
    ],
  },
  {
    date: '2027-01-30', route: ['kyoto'], sleep: 'kyoto',
    title: 'Ten Thousand Gates',
    text: 'Beat the crowds at Fushimi Inari at sunrise, then Kiyomizu-dera, Ninenzaka slopes and Nishiki Market.',
    activities: [
      { name: 'Fushimi Inari sunrise hike', cat: 'culture', price: 0, time: 'Dawn' },
      { name: 'Kiyomizu-dera', cat: 'culture', price: 500, time: 'AM' },
      { name: 'Nishiki Market snacking', cat: 'food', price: 2500, time: 'PM' },
      { name: 'Kaiseki or izakaya dinner', cat: 'food', price: 6000, time: 'Evening' },
    ],
  },
  {
    date: '2027-01-31', route: ['kyoto', 'tokyo'], sleep: 'tokyo',
    title: 'Bamboo, then Bullet Train',
    text: 'Early Arashiyama bamboo grove, then the Shinkansen to Tokyo. Wave at Mt. Fuji from seat E.',
    activities: [
      { name: 'Arashiyama Bamboo Grove', cat: 'nature', price: 0, time: 'Dawn' },
      { name: 'Ekiben lunch on the Shinkansen', cat: 'food', price: 1500, time: 'Midday' },
    ],
  },
  {
    date: '2027-02-01', route: ['tokyo'], sleep: 'tokyo',
    title: 'Neon Overworld',
    text: 'Shibuya Scramble and Shibuya Sky, Harajuku’s Takeshita Street, then Shinjuku’s Omoide Yokochō & Golden Gai.',
    activities: [
      { name: 'Shibuya Sky', cat: 'culture', price: 2500, time: 'PM', note: 'Book a sunset slot.' },
      { name: 'Harajuku & Meiji Jingū', cat: 'shopping', price: 0, time: 'AM' },
      { name: 'Golden Gai bar hop', cat: 'nightlife', price: 4000, time: 'Night' },
    ],
  },
  {
    date: '2027-02-02', route: ['tokyo'], sleep: 'tokyo',
    title: 'Otaku Pilgrimage',
    text: 'Akihabara arcades and figure towers, then Ikebukuro: Pokémon Center, Sunshine City and Otome Road.',
    activities: [
      { name: 'Akihabara (Super Potato, GiGO)', cat: 'anime', price: 3000, time: 'AM' },
      { name: 'Pokémon Center Mega Tokyo', cat: 'anime', price: 0, time: 'PM' },
      { name: 'Karaoke all night', cat: 'nightlife', price: 3000, time: 'Night' },
    ],
  },
  {
    date: '2027-02-03', route: ['tokyo'], sleep: 'tokyo',
    title: 'Setsubun Festival',
    text: 'It’s Setsubun! Throw beans to chase away demons at Sensō-ji. Asakusa street food and Tokyo Skytree.',
    activities: [
      { name: 'Setsubun bean-throwing at Sensō-ji', cat: 'culture', price: 0, time: 'PM' },
      { name: 'Asakusa street food', cat: 'food', price: 2000, time: 'Midday' },
      { name: 'Tokyo Skytree', cat: 'culture', price: 3100, time: 'Evening' },
    ],
  },
  {
    date: '2027-02-04', route: ['tokyo', 'fuji', 'tokyo'], sleep: 'tokyo',
    title: 'Side Quest: The Sacred Mountain',
    text: 'Day trip to Lake Kawaguchiko for crystal-clear winter views of Mt. Fuji and the Chureito Pagoda.',
    extraTransport: [{ label: 'Shinjuku ⇄ Kawaguchiko (highway bus)', price: 4400 }],
    activities: [
      { name: 'Chureito Pagoda viewpoint', cat: 'nature', price: 0, time: 'AM' },
      { name: 'Hōtō noodle lunch', cat: 'food', price: 1500, time: 'Midday' },
      { name: 'Onsen with Fuji view', cat: 'nature', price: 1500, time: 'PM' },
    ],
  },
  {
    date: '2027-02-05', route: ['tokyo'], sleep: 'tokyo',
    title: 'Final Boss Rush',
    text: 'teamLab Planets in the morning, Shimokitazawa thrift in the afternoon, farewell yakiniku feast.',
    activities: [
      { name: 'teamLab Planets', cat: 'culture', price: 3800, time: 'AM' },
      { name: 'Shimokitazawa vintage shopping', cat: 'shopping', price: 0, time: 'PM' },
      { name: 'Farewell yakiniku feast', cat: 'food', price: 6000, time: 'Evening' },
    ],
  },
  {
    date: '2027-02-06', route: ['tokyo'], sleep: null,
    title: 'The End… or New Game+?',
    text: 'Last konbini breakfast, souvenir sprint, and off to the airport. Same time next year?',
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
