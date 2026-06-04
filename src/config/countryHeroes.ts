// Iconic hero images per country, used as the guide-search banner background.
// Images live in /public/country-heroes and are served via next/image.
// Source: Wikimedia Commons (attribution required — see `source` for each file's page).
// Keys are the lowercased country name, matching `filters.country` on the guide pages.

export interface CountryHero {
  src: string;
  alt: string;
  landmark: string;
  source: string; // Wikimedia Commons file page, for attribution
  objectPosition?: string; // CSS object-position focal point (default "center")
}

export const countryHeroes: Record<string, CountryHero> = {
  // ── Africa ─────────────────────────────────────────────────────
  "south africa": {
    src: "/country-heroes/south-africa-v3.jpg",
    alt: "A leopard walking through Sabi Sand Game Reserve, South Africa",
    landmark: "Sabi Sand Reserve",
    source: "https://commons.wikimedia.org/wiki/File:African_Leopard_Sabi_Sands_Fir0002_Oct18.jpg",
    objectPosition: "center 30%",
  },
  kenya: {
    src: "/country-heroes/kenya-v2.jpg",
    alt: "Sunset over the Maasai Mara savanna, Kenya",
    landmark: "Maasai Mara",
    source: "https://commons.wikimedia.org/wiki/File:Masai_Mara_at_Sunset.jpg",
  },
  tanzania: {
    src: "/country-heroes/tanzania-v2.jpg",
    alt: "Mount Kilimanjaro rising above the plains, Tanzania",
    landmark: "Mount Kilimanjaro",
    source: "https://commons.wikimedia.org/wiki/File:Kilimanjaro_from_Amboseli.jpg",
  },
  namibia: {
    src: "/country-heroes/namibia-v2.jpg",
    alt: "Red dunes of Sossusvlei in the Namib Desert, Namibia",
    landmark: "Sossusvlei",
    source: "https://commons.wikimedia.org/wiki/File:Sossusvlei.jpg",
  },
  zambia: {
    src: "/country-heroes/zambia-v2.jpg",
    alt: "Victoria Falls on the Zambezi River, Zambia",
    landmark: "Victoria Falls",
    source:
      "https://commons.wikimedia.org/wiki/File:Cataratas_Victoria,_Zambia-Zimbabue,_2018-07-27,_DD_04.jpg",
  },
  botswana: {
    src: "/country-heroes/botswana-v2.jpg",
    alt: "Waterways of the Okavango Delta, Botswana",
    landmark: "Okavango Delta",
    source: "https://commons.wikimedia.org/wiki/File:Okavango_Delta,_Botswana1.jpg",
  },

  // ── Asia ───────────────────────────────────────────────────────
  china: {
    src: "/country-heroes/china-v2.jpg",
    alt: "The Great Wall of China winding over forested mountains at Jinshanling",
    landmark: "Great Wall of China",
    source:
      "https://commons.wikimedia.org/wiki/File:The_Great_Wall_of_China_at_Jinshanling-edit.jpg",
    objectPosition: "center 42%",
  },
  vietnam: {
    src: "/country-heroes/vietnam-v5.jpg",
    alt: "Colorful silk lanterns lighting the streets of Hoi An Ancient Town at night, Vietnam",
    landmark: "Hoi An Old Town",
    source: "https://commons.wikimedia.org/wiki/File:Lanterns_in_Hoi_An_(40542858941).jpg",
    objectPosition: "center 40%",
  },
  thailand: {
    src: "/country-heroes/thailand-v4.jpg",
    alt: "Turquoise water and limestone cliffs at Maya Bay, Ko Phi Phi, Thailand",
    landmark: "Maya Bay, Ko Phi Phi",
    source:
      "https://commons.wikimedia.org/wiki/File:Playa_Maya,_Ko_Phi_Phi,_Tailandia,_2013-08-19,_DD_09.JPG",
    objectPosition: "center 45%",
  },
  indonesia: {
    src: "/country-heroes/indonesia-v5.jpg",
    alt: "The T-Rex cliff and turquoise cove of Kelingking Beach, Nusa Penida, Bali, Indonesia",
    landmark: "Kelingking Beach, Nusa Penida",
    source:
      "https://commons.wikimedia.org/wiki/File:Kelingking_Beach_(T-Rex_Bay)_of_Nusa_Penida,_Bali_(2025)_-_img_08.jpg",
    objectPosition: "center 70%",
  },
  philippines: {
    src: "/country-heroes/philippines-v3.jpg",
    alt: "Aerial view of palm-fringed Guyam Island and turquoise water, Siargao, Philippines",
    landmark: "Guyam Island, Siargao",
    source: "https://commons.wikimedia.org/wiki/File:Picturesque_Guyam_Island,_Siargao.jpg",
    objectPosition: "center 55%",
  },
  // ── Central America ────────────────────────────────────────────
  "el salvador": {
    src: "/country-heroes/el-salvador-v3.jpg",
    alt: "A bustling local market with colourful fruit and vegetable stalls, Ahuachapán, El Salvador",
    landmark: "Local Market",
    source: "https://commons.wikimedia.org/wiki/File:Mercado_de_Ahuachapán_un_24_de_Diciembre.jpg",
    objectPosition: "center 44%",
  },
  "costa rica": {
    src: "/country-heroes/costa-rica-v1.jpg",
    alt: "The conical Arenal Volcano above lush rainforest, Costa Rica",
    landmark: "Arenal Volcano",
    source: "https://commons.wikimedia.org/wiki/File:Arenal_volcano_(70785p).jpg",
    objectPosition: "center 48%",
  },
  guatemala: {
    src: "/country-heroes/guatemala-v2.jpg",
    alt: "The yellow Santa Catalina Arch framing Volcán de Agua, Antigua, Guatemala",
    landmark: "Santa Catalina Arch, Antigua",
    source:
      "https://commons.wikimedia.org/wiki/File:Volcano_Street,_Antigua_Guatemala,_2022-01-27.jpg",
    objectPosition: "center 40%",
  },
  panama: {
    src: "/country-heroes/panama-v4.jpg",
    alt: "Aerial view of a palm-covered San Blas islet ringed by turquoise water, Guna Yala, Panama",
    landmark: "San Blas Islands",
    source: "https://images.unsplash.com/photo-1528068079014-ca011a7f4035 (Unsplash)",
    objectPosition: "center 48%",
  },
  nicaragua: {
    src: "/country-heroes/nicaragua-v6.jpg",
    alt: "A surfer riding inside a vivid turquoise barrelling wave",
    landmark: "Pacific Surf Coast",
    source: "https://images.unsplash.com/photo-1502680390469-be75c86b636f (Unsplash)",
    objectPosition: "center 45%",
  },
  belize: {
    src: "/country-heroes/belize-v1.jpg",
    alt: "Aerial view of the Great Blue Hole surrounded by turquoise reef, Belize",
    landmark: "Great Blue Hole",
    source: "https://commons.wikimedia.org/wiki/File:Belize_Blue_Hole_(TMP)_(16912331906).jpg",
    objectPosition: "center 55%",
  },

  // ── North America ──────────────────────────────────────────────
  usa: {
    src: "/country-heroes/usa-v1.jpg",
    alt: "The Grand Canyon glowing at sunset, Arizona, USA",
    landmark: "Grand Canyon",
    source: "https://commons.wikimedia.org/wiki/File:Grand_Canyon_Sunset_Panorama.jpg",
    objectPosition: "center 52%",
  },
  canada: {
    src: "/country-heroes/canada-v1.jpg",
    alt: "Turquoise Moraine Lake and the Valley of the Ten Peaks, Banff, Canada",
    landmark: "Moraine Lake",
    source: "https://commons.wikimedia.org/wiki/File:Lake_Moraine-Banff_National_Park.jpg",
    objectPosition: "center 45%",
  },
  mexico: {
    src: "/country-heroes/mexico-v1.jpg",
    alt: "Tulum Mayan ruins above the turquoise Caribbean sea, Quintana Roo, Mexico",
    landmark: "Tulum",
    source: "https://commons.wikimedia.org/wiki/File:Tulum_-_God_of_the_Winds_Temple_03.JPG",
    objectPosition: "center 45%",
  },
  cuba: {
    src: "/country-heroes/cuba-v1.jpg",
    alt: "A vintage classic car on the Malecón with the Havana skyline behind, Cuba",
    landmark: "Havana Malecón",
    source: "https://commons.wikimedia.org/wiki/File:Blue_Car_on_the_Malecon_(48808223206).jpg",
    objectPosition: "center 38%",
  },
  "dominican republic": {
    src: "/country-heroes/dominican-republic-v3.jpg",
    alt: "Palm-fringed white sand beach and clear turquoise water at Playa Bonita, Las Terrenas, Dominican Republic",
    landmark: "Playa Bonita, Las Terrenas",
    source:
      "https://commons.wikimedia.org/wiki/File:Playa_Bonita_Beach,_Las_Terrenas,_Samana_Peninsula,_Dominican_Republic_(52757385491).jpg",
    objectPosition: "center 25%",
  },

  // ── South America ──────────────────────────────────────────────
  brazil: {
    src: "/country-heroes/brazil-v1.jpg",
    alt: "Sugarloaf Mountain and Guanabara Bay glowing at golden sunrise, Rio de Janeiro, Brazil",
    landmark: "Sugarloaf Mountain, Rio",
    source: "https://commons.wikimedia.org/wiki/File:Sugarloaf_Sunrise_2.jpg",
    objectPosition: "center 42%",
  },
  peru: {
    src: "/country-heroes/peru-v2.jpg",
    alt: "The vivid striped slopes of Vinicunca, the Rainbow Mountain, under a deep blue sky, Cusco, Peru",
    landmark: "Rainbow Mountain (Vinicunca)",
    source: "https://commons.wikimedia.org/wiki/File:Vinicunca_(Rainbow_Mountain).jpg",
    objectPosition: "center 42%",
  },
  bolivia: {
    src: "/country-heroes/bolivia-v1.jpg",
    alt: "A 4x4 mirrored on the flooded salt flats of Salar de Uyuni at dusk, Bolivia",
    landmark: "Salar de Uyuni",
    source: "https://commons.wikimedia.org/wiki/File:Reflection_on_the_Salar_de_Uyuni,_bolivia.jpg",
    objectPosition: "center 50%",
  },
  colombia: {
    src: "/country-heroes/colombia-v2.jpg",
    alt: "Vibrant street-art murals lining the stairways of Comuna 13, Medellín, Colombia",
    landmark: "Comuna 13, Medellín",
    source: "https://commons.wikimedia.org/wiki/File:Graffiti_in_Comuna_13,_Medellín_03.jpg",
    objectPosition: "center 65%",
  },
  argentina: {
    src: "/country-heroes/argentina-v1.jpg",
    alt: "The vast blue ice front of the Perito Moreno Glacier, Los Glaciares National Park, Argentina",
    landmark: "Perito Moreno Glacier",
    source:
      "https://commons.wikimedia.org/wiki/File:Perito_Moreno_Glacier_panorama,_Los_Glaciares_National_Park,_Santa_Cruz_Province,_Argentina.jpg",
    objectPosition: "center 50%",
  },
  chile: {
    src: "/country-heroes/chile-v1.jpg",
    alt: "The granite towers of Torres del Paine above a glacial lagoon, Patagonia, Chile",
    landmark: "Torres del Paine",
    source:
      "https://commons.wikimedia.org/wiki/File:Torres_del_Paine_massif_from_Laguna_Amarga.jpg",
    objectPosition: "center 55%",
  },

  // ── Europe ─────────────────────────────────────────────────────
  italy: {
    src: "/country-heroes/italy-v1.jpg",
    alt: "The colorful clifftop village of Manarola, Cinque Terre, Italy",
    landmark: "Cinque Terre",
    source: "https://commons.wikimedia.org/wiki/File:Manarola_NW_Cinque_Terre_Sep23_A7C_07237.jpg",
    objectPosition: "center 45%",
  },
  france: {
    src: "/country-heroes/france-v1.jpg",
    alt: "Mont Saint-Michel abbey rising from the bay at sunset, Normandy, France",
    landmark: "Mont Saint-Michel",
    source: "https://commons.wikimedia.org/wiki/File:Mont_Saint_Michel_at_sunset,_April_2025.jpg",
    objectPosition: "center 42%",
  },
  spain: {
    src: "/country-heroes/spain-v1.jpg",
    alt: "The grand semicircular Plaza de España in Seville, Spain",
    landmark: "Plaza de España, Seville",
    source: "https://commons.wikimedia.org/wiki/File:Sevilla_Plaza_de_Espana_01.jpg",
    objectPosition: "center 45%",
  },
  portugal: {
    src: "/country-heroes/portugal-v2.jpg",
    alt: "Golden cliffs, sea stacks and a turquoise cove at Praia da Marinha, Algarve, Portugal",
    landmark: "Praia da Marinha, Algarve",
    source: "https://commons.wikimedia.org/wiki/File:Praia_da_Marinha-Algarve-Portugal.jpg",
    objectPosition: "center 48%",
  },
  norway: {
    src: "/country-heroes/norway-v1.jpg",
    alt: "Aerial view of the Lofoten islands and villages over deep blue fjord water, Norway",
    landmark: "Lofoten Islands",
    source:
      "https://commons.wikimedia.org/wiki/File:Lofoten_Road_Seen_from_Reinebringen_-_2013.08_-_panoramio.jpg",
    objectPosition: "center 48%",
  },
  germany: {
    src: "/country-heroes/germany-v1.jpg",
    alt: "Neuschwanstein Castle framed by autumn forest and alpine peaks, Bavaria, Germany",
    landmark: "Neuschwanstein Castle",
    source: "https://commons.wikimedia.org/wiki/File:Schloss_Neuschwanstein_at_autumn_sunlight.jpg",
    objectPosition: "center 42%",
  },

  // ── Oceania ────────────────────────────────────────────────────
  australia: {
    src: "/country-heroes/australia-v1.jpg",
    alt: "Uluru (Ayers Rock) glowing red at sunset in the Australian outback",
    landmark: "Uluru",
    source: "https://commons.wikimedia.org/wiki/File:Uluru_sunset_-_(13113209863).jpg",
    objectPosition: "center 48%",
  },
  "new zealand": {
    src: "/country-heroes/new-zealand-v1.jpg",
    alt: "Mitre Peak rising over the fjord of Milford Sound, Fiordland, New Zealand",
    landmark: "Milford Sound",
    source:
      "https://commons.wikimedia.org/wiki/File:Milford_Sound_in_Fiordland_National_Park_18.jpg",
    objectPosition: "center 60%",
  },
  fiji: {
    src: "/country-heroes/fiji-v3.jpg",
    alt: "Aerial view of palm-covered Tavarua Island ringed by white sand and turquoise reef, Fiji",
    landmark: "Tavarua Island",
    source: "https://commons.wikimedia.org/wiki/File:Tavarua_Island,_Fiji.JPG",
    objectPosition: "center 52%",
  },
  "papua new guinea": {
    src: "/country-heroes/papua-new-guinea-v1.jpg",
    alt: "Tavurvur volcano erupting with an ash plume at sunset near Rabaul, Papua New Guinea",
    landmark: "Tavurvur Volcano",
    source: "https://commons.wikimedia.org/wiki/File:Tavurvur_volcano_5.jpg",
    objectPosition: "center 74%",
  },
  vanuatu: {
    src: "/country-heroes/vanuatu-v1.jpg",
    alt: "Lava erupting from Mount Yasur volcano at night, Tanna Island, Vanuatu",
    landmark: "Mount Yasur",
    source:
      "https://commons.wikimedia.org/wiki/File:Lava_trails_at_Mount_Yasur_Volcano,_Tanna,_Vanuatu_(49181693888).jpg",
    objectPosition: "center 52%",
  },

  india: {
    src: "/country-heroes/india-v4.jpg",
    alt: "The Taj Mahal at sunset beside the Yamuna river, Agra, India",
    landmark: "Taj Mahal",
    source: "https://commons.wikimedia.org/wiki/File:Panorama_Taj_Mahal_Evening.jpg",
    objectPosition: "center 55%",
  },
};

export function getCountryHero(country: string): CountryHero | undefined {
  // Normalize hyphens/underscores to spaces so "south-africa" and
  // "south africa" both resolve to the same entry.
  const key = country.trim().toLowerCase().replace(/[-_]+/g, " ").replace(/\s+/g, " ");
  return countryHeroes[key];
}
