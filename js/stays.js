// Accommodation options per city (researched Nov 2026).
// pricePerNight = estimated ¥ per person per night. ALL PRICES ARE ESTIMATES: check live rates.
// Budget target: €35–40 per person per night (≈ ¥5,800–6,600).
export const STAYS = {
  "osaka": [
    {
      "id": "namba-oriental-twins",
      "name": "Namba Oriental Hotel",
      "type": "hotel",
      "typeLabel": "Hotel · 2 rooms",
      "setup": "2 twin rooms (one per couple)",
      "area": "Namba, about 3-5 min walk to Namba Station (Nankai line)",
      "url": "https://www.hafh.com/properties/9343",
      "pricePerNight": 6000,
      "why": "Twin rooms are listed on Booking.com and the hotel sits right at the Nankai line, which matches the airport transfer.",
      "caveats": "Estimate (about 12,000 JPY per twin room per night); walking time differs between sources, so check the route on the hotel site."
    },
    {
      "id": "hiyori-namba-twins",
      "name": "Hiyori Hotel Osaka Namba Station",
      "type": "hotel",
      "typeLabel": "Hotel · 2 rooms",
      "setup": "2 Deluxe Twin rooms (one per couple)",
      "area": "Namba, about 2 min walk to Namba Station (Nankai)",
      "url": "https://lookup.hotels.com/ho1149089312/hiyori-hotel-osaka-namba-station-osaka-japan",
      "pricePerNight": 6500,
      "why": "Deluxe Twin rooms are a listed room type, and the hotel is closest to the Nankai station for the airport line.",
      "caveats": "Estimate (about 13,000 JPY per twin room per night); twin rooms can be small, so check room size."
    },
    {
      "id": "il-cuore-namba-twins",
      "name": "Il Cuore Namba",
      "type": "hotel",
      "typeLabel": "Hotel · 2 rooms",
      "setup": "2 Standard Twin rooms, non-smoking (one per couple)",
      "area": "Nanbanaka, Naniwa-ku, very close to Namba and Nankai stations",
      "url": "https://ph.trip.com/hotels/osaka-hotel-detail-736820/hotel-il-cuore-namba/review.html",
      "pricePerNight": 6000,
      "why": "Guest reviews mention Standard Twin Non-Smoking rooms, and it is very close to Namba and Nankai station.",
      "caveats": "Estimate (about 12,000 JPY per twin room per night); no walking time is confirmed, and room size is unverified."
    },
    {
      "id": "airbnb-couple-osaka",
      "name": "Airbnb: two 1-bedroom places in Namba",
      "type": "airbnb-couple",
      "typeLabel": "Airbnb · per couple",
      "setup": "2 × entire place for 2 (book two, one per couple, ideally same building)",
      "area": "Namba / Nipponbashi",
      "url": "https://www.airbnb.com/s/Namba--Osaka/homes?checkin=2027-01-21&checkout=2027-01-27&adults=2&room_types%5B%5D=Entire%20home%2Fapt",
      "pricePerNight": 6500,
      "why": "Each couple gets its own kitchen and space; the link searches your exact dates for 2 guests.",
      "caveats": "Search link, not a specific listing. Price is a typical winter estimate; watch cleaning fees on short stays."
    },
    {
      "id": "mimaru-namba-2br",
      "name": "MIMARU Osaka Namba Station (Two-Bedroom Japanese Apartment)",
      "type": "airbnb-group",
      "typeLabel": "Airbnb · whole group",
      "setup": "1 two-bedroom apartment (51 m2) for the whole group of 4",
      "area": "Namba, about 8 min walk to Osaka Metro Namba; Nippombashi Station 6 min walk",
      "url": "https://mimaruhotels.com/en/hotel/namba-station",
      "pricePerNight": 7000,
      "why": "One apartment with two bedrooms and a kitchen keeps all four together, and the Namba location is a short walk from the Nankai line to the airport.",
      "caveats": "Estimate (about 28,000 JPY per night for the unit); slightly over budget, and the official listing sleeps six, so confirm bedding for four."
    }
  ],
  "takamatsu": [
    {
      "id": "jr-hotel-clement-takamatsu",
      "name": "JR Hotel Clement Takamatsu",
      "type": "hotel",
      "typeLabel": "Hotel · 2 rooms",
      "setup": "2 twin rooms (one per couple)",
      "area": "Takamatsu, about 1 min walk from JR Takamatsu Station",
      "url": "https://www.expedia.com/go/hotel/info/786743",
      "pricePerNight": 5500,
      "why": "It is about a 1-minute walk from JR Takamatsu Station and lists Compact and Standard twin rooms, which is convenient for the Takamatsu Port ferry.",
      "caveats": "Estimate (about 11,000 JPY per twin room per night); the twin rooms are compact (about 24 m2), so check the room type when booking."
    },
    {
      "id": "jr-clement-inn-takamatsu",
      "name": "JR Clement Inn Takamatsu",
      "type": "hotel",
      "typeLabel": "Hotel · 2 rooms",
      "setup": "2 rooms (twin configuration not confirmed)",
      "area": "Takamatsu, about 1 min walk from JR Takamatsu Station",
      "url": "https://es.hotels.com/ho848928416/jr-clement-inn-takamatsu-takamatsu-japan",
      "pricePerNight": 5500,
      "why": "It is a sister property of JR Clement, very close to the station, and has a top-floor observation bath.",
      "caveats": "Estimate (about 11,000 JPY per room per night); the search found no confirmed twin room, so verify before booking."
    },
    {
      "id": "alphabed-takamatsu-station",
      "name": "Alphabed Takamatsu Station",
      "type": "airbnb-couple",
      "typeLabel": "Airbnb · per couple",
      "setup": "2 x 1-bedroom apartments (book two, one per couple)",
      "area": "Takamatsu, directly in front of JR Takamatsu Station",
      "url": "https://www.expedia.co.jp/en/Takamatsu-Hotels-Alphabed-Takamatsu-Station.h38798750.Hotel-Information",
      "pricePerNight": 7000,
      "why": "Each unit has a kitchen and fridge right at the station, and it fits the couple-by-couple setup.",
      "caveats": "Estimate (about 14,000 JPY per unit per night); the listing shows one bedroom and sleeping capacity is unconfirmed, and the price is slightly over budget."
    },
    {
      "id": "airbnb-group-takamatsu",
      "name": "Airbnb: one place for all four near Takamatsu Station",
      "type": "airbnb-group",
      "typeLabel": "Airbnb · whole group",
      "setup": "1 × entire place with 2 bedrooms",
      "area": "Around JR Takamatsu Station / Kawaramachi",
      "url": "https://www.airbnb.com/s/Takamatsu--Kagawa/homes?checkin=2027-01-27&checkout=2027-01-29&adults=4&min_bedrooms=2&room_types%5B%5D=Entire%20home%2Fapt",
      "pricePerNight": 5500,
      "why": "Smaller city, so whole homes are cheaper than in Osaka or Tokyo; the link searches your dates for 4 guests and 2 bedrooms.",
      "caveats": "Search link, not a specific listing. Price is an estimate; cleaning fees weigh more on a 2-night stay."
    }
  ],
  "kyoto": [
    {
      "id": "henn-na-kyoto-hachijoguchi-twins",
      "name": "Henn na Hotel Premier Kyoto Station Hachijoguchi",
      "type": "hotel",
      "typeLabel": "Hotel · 2 rooms",
      "setup": "2 twin rooms (one per couple)",
      "area": "Kyoto Station Hachijo (south) side, about 2 min walk from the Hachijo east exit",
      "url": "https://www.google.com/search?q=Henn+na+Hotel+Premier+Kyoto+Station+Hachijoguchi",
      "pricePerNight": 6000,
      "why": "Its Rakuten listing includes a twin room type and it is a short walk from Kyoto Station for the early Shinkansen.",
      "caveats": "Estimate (about 12,000 JPY per twin room per night); it is a robot-staffed hotel with small rooms."
    },
    {
      "id": "kintetsu-kyoto-station-twins",
      "name": "Miyako City Kintetsu Kyoto Station (Hotel Kintetsu Kyoto Station)",
      "type": "hotel",
      "typeLabel": "Hotel · 2 rooms",
      "setup": "2 twin rooms, about 21 m2 each (one per couple)",
      "area": "Inside Kyoto Station, about 1 min walk to the Shinkansen Central Gate",
      "url": "https://www.kyotostation.com/hotel-kintetsu-kyoto-station/",
      "pricePerNight": 7500,
      "why": "It is inside the station building, the shortest possible walk to the Shinkansen gates.",
      "caveats": "Estimate (about 15,000 JPY per twin room per night); slightly over budget and the rooms are compact."
    },
    {
      "id": "airbnb-couple-kyoto",
      "name": "Airbnb: two 1-bedroom places in Around Kyoto Station",
      "type": "airbnb-couple",
      "typeLabel": "Airbnb · per couple",
      "setup": "2 × entire place for 2 (book two, one per couple, ideally same building)",
      "area": "Around Kyoto Station",
      "url": "https://www.airbnb.com/s/Kyoto-Station--Kyoto/homes?checkin=2027-01-29&checkout=2027-01-30&adults=2&room_types%5B%5D=Entire%20home%2Fapt",
      "pricePerNight": 7000,
      "why": "Each couple gets its own kitchen and space; the link searches your exact dates for 2 guests.",
      "caveats": "Search link, not a specific listing. Price is a typical winter estimate; watch cleaning fees on short stays."
    },
    {
      "id": "hanare-kyoto-hachijoguchi",
      "name": "HANARE KYOTO Hachijoguchi",
      "type": "airbnb-group",
      "typeLabel": "Airbnb · whole group",
      "setup": "1 two-bedroom apartment (1 bathroom) for the whole group",
      "area": "Hachijoguchi, about 4 min walk to Kyoto Station",
      "url": "https://www.lastminute.com.au/Kyoto-Hotels-HANARE-KYOTO-Hachijoguchi.h33796146.Hotel-Information",
      "pricePerNight": 6750,
      "why": "Two bedrooms and a 4-minute walk to Kyoto Station keep the group together for an early train.",
      "caveats": "Estimate (about 27,000 JPY per night for the unit); only one bathroom, so check the bedroom layout."
    },
    {
      "id": "kyo-machiya-hachijo",
      "name": "Kyo Machiya Hachijo",
      "type": "machiya",
      "typeLabel": "Machiya townhouse",
      "setup": "2-bedroom machiya townhouse for the whole group",
      "area": "Hachijo, about 5 min walk to Kujo Station and Kyoto Station",
      "url": "https://nz.hotels.com/ho604323/kyo-machiya-hachijo-kyoto-japan",
      "pricePerNight": 7000,
      "why": "A traditional machiya townhouse with two bedrooms gives the group a distinctive stay near the station.",
      "caveats": "Estimate (about 28,000 JPY per night for the house); slightly over budget, no pets, and a 1-night stay means check-in and check-out timing matters."
    }
  ],
  "tokyo": [
    {
      "id": "sotetsu-grand-fresa-takadanobaba",
      "name": "Sotetsu Grand Fresa Takadanobaba",
      "type": "hotel",
      "typeLabel": "Hotel · 2 rooms",
      "setup": "2 Standard Twin rooms, about 19.9 m2 (one per couple)",
      "area": "Takadanobaba, about 1 min walk from Takadanobaba Station (JR Yamanote)",
      "url": "https://jasumo.com/listing/sotetsu-grand-fresa-takadanobaba-tokyo-4-star-hotel-near-station-with-easy-access-to-shinjuku-shibuya/",
      "pricePerNight": 6500,
      "why": "It has Standard Twin rooms and is on the Yamanote line, about 4 minutes by train from Shinjuku.",
      "caveats": "Estimate (about 13,000 JPY per twin room per night); sources disagree on the walk (1 min vs 250 m)."
    },
    {
      "id": "hotel-sunroute-asakusa",
      "name": "Hotel Sunroute Asakusa",
      "type": "hotel",
      "typeLabel": "Hotel · 2 rooms",
      "setup": "2 Standard Twin rooms (one per couple)",
      "area": "Asakusa, near Sensoji Temple (not on the Yamanote line)",
      "url": "https://hotels.com/ho40606848/hotel-sunroute-asakusa-tokyo-japan",
      "pricePerNight": 6000,
      "why": "Standard Twin rooms with two beds each, in the Asakusa area that was on the preferred list.",
      "caveats": "Estimate (about 12,000 JPY per twin room per night); the Yamanote link is not confirmed, so the trip to Shinjuku takes longer."
    },
    {
      "id": "airbnb-couple-tokyo",
      "name": "Airbnb: two 1-bedroom places in Shinjuku",
      "type": "airbnb-couple",
      "typeLabel": "Airbnb · per couple",
      "setup": "2 × entire place for 2 (book two, one per couple, ideally same building)",
      "area": "Shinjuku, Ueno or Asakusa",
      "url": "https://www.airbnb.com/s/Shinjuku--Tokyo/homes?checkin=2027-01-30&checkout=2027-02-06&adults=2&room_types%5B%5D=Entire%20home%2Fapt",
      "pricePerNight": 6500,
      "why": "Each couple gets its own kitchen and space; the link searches your exact dates for 2 guests.",
      "caveats": "Search link, not a specific listing. Price is a typical winter estimate; watch cleaning fees on short stays."
    },
    {
      "id": "oakwood-nishi-shinjuku",
      "name": "Oakwood Apartments Nishi-Shinjuku",
      "type": "airbnb-group",
      "typeLabel": "Airbnb · whole group",
      "setup": "1 two-bedroom serviced apartment for the whole group of 4 (1-2 BR units listed)",
      "area": "Nishi-Shinjuku, 7-18-8 Nishishinjuku (JR Shinjuku Station area)",
      "url": "https://www.silverdoor.com/oakwood-apartments-nishi-shinjuku-tokyo-12990/",
      "pricePerNight": 7000,
      "why": "A serviced apartment with 1-2 bedroom units in Shinjuku keeps the group together for the full 7 nights with weekly housekeeping.",
      "caveats": "Estimate (about 28,000 JPY per night for a 2-bedroom unit); slightly over budget, and monthly-stay rates were not visible."
    },
    {
      "id": "minn-akihabara-weekly",
      "name": "Minn Akihabara (weekly/monthly mansion)",
      "type": "weekly-mansion",
      "typeLabel": "Weekly mansion",
      "setup": "2 x 1-bedroom apartments (book two, one per couple)",
      "area": "Akihabara, on the JR Yamanote line",
      "url": "https://www.google.com/search?q=Minn+Akihabara+monthly+apartment",
      "pricePerNight": 6000,
      "why": "Minn is a short-stay mansion brand with Yamanote access, and two units would give each couple a private kitchen for the 7 nights.",
      "caveats": "Estimate (about 12,000 JPY per unit per night); the specific Akihabara unit was not verified, and monthly-minimum rules may apply to a 7-night stay."
    }
  ]
};
