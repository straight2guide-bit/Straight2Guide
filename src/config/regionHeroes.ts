// Per-region "biggest attraction" images for the /explore browse page, keyed by
// region slug (matching public.regions.slug). Files live in /public/region-heroes
// and are served via next/image. When a region has no entry here, callers fall
// back to the country hero (src/config/countryHeroes.ts).
// Source: Wikimedia Commons (attribution required — see `source` per file).

export interface RegionHero {
  src: string;
  alt: string;
  landmark: string; // the region's signature attraction
  source: string; // Wikimedia Commons file page, for attribution
  objectPosition?: string; // CSS object-position focal point (default "center")
}

export const regionHeroes: Record<string, RegionHero> = {
  // ── Brazil ─────────────────────────────────────────────────────
  pantanal: {
    src: "/region-heroes/pantanal.jpg",
    alt: "A jaguar crouched at the forest edge in the Pantanal, Brazil",
    landmark: "Jaguars of the Pantanal",
    source:
      "https://commons.wikimedia.org/wiki/File:Jaguar_(Panthera_onca_palustris)_female_Piquiri_River_2.JPG",
    objectPosition: "center 40%",
  },
  "amazon-rainforest": {
    src: "/region-heroes/amazon-rainforest.jpg",
    alt: "Aerial view of the Amazon Rainforest canopy and rivers, Brazil",
    landmark: "Amazon Rainforest",
    source: "https://commons.wikimedia.org/wiki/File:Aerial_view_of_the_Amazon_Rainforest.jpg",
  },
  "iguacu-falls": {
    src: "/region-heroes/iguacu-falls.jpg",
    alt: "The cascades of Iguaçu Falls amid rainforest and mist, Brazil",
    landmark: "Iguaçu Falls",
    source: "https://commons.wikimedia.org/wiki/File:Cataratas027.jpg",
    objectPosition: "center 45%",
  },
  bonito: {
    src: "/region-heroes/bonito.jpg",
    alt: "The vivid blue underground lake of Gruta do Lago Azul, Bonito, Brazil",
    landmark: "Gruta do Lago Azul",
    source: "https://commons.wikimedia.org/wiki/File:Gruta_do_Lago_Azul_(Bonito).jpg",
    objectPosition: "center 60%",
  },

  // ── Kenya ──────────────────────────────────────────────────────
  "masai-mara": {
    src: "/region-heroes/masai-mara.jpg",
    alt: "Sunset over the Maasai Mara savanna, Kenya",
    landmark: "Maasai Mara at sunset",
    source: "https://commons.wikimedia.org/wiki/File:Masai_Mara_at_Sunset.jpg",
    objectPosition: "center 40%",
  },
  amboseli: {
    src: "/region-heroes/amboseli.jpg",
    alt: "Mount Kilimanjaro rising above the Amboseli plains",
    landmark: "Kilimanjaro from Amboseli",
    source: "https://commons.wikimedia.org/wiki/File:Kilimanjaro_from_Amboseli.jpg",
    objectPosition: "center 35%",
  },
  tsavo: {
    src: "/region-heroes/tsavo.jpg",
    alt: "An elephant coated in red dust, characteristic of Tsavo, Kenya",
    landmark: "Red elephants of Tsavo",
    source:
      "https://commons.wikimedia.org/wiki/File:Flickr_-_don_macauley_-_Elephant_with_red_dust.jpg",
  },
  "lake-nakuru": {
    src: "/region-heroes/lake-nakuru.jpg",
    alt: "Flamingos massed along the shore of Lake Nakuru, Kenya",
    landmark: "Flamingos of Lake Nakuru",
    source: "https://commons.wikimedia.org/wiki/File:Flamingos_in_Lake_Nakuru_1.jpg",
  },

  // ── Tanzania ───────────────────────────────────────────────────
  serengeti: {
    src: "/region-heroes/serengeti.jpg",
    alt: "Wildebeest crossing a river during the Great Migration, Serengeti",
    landmark: "The Great Migration",
    source: "https://commons.wikimedia.org/wiki/File:Serengeti_wildebeest_migration_JF.jpg",
    objectPosition: "center 45%",
  },
  ngorongoro: {
    src: "/region-heroes/ngorongoro.jpg",
    alt: "The vast caldera and soda lake of the Ngorongoro Crater, Tanzania",
    landmark: "Ngorongoro Crater",
    source:
      "https://commons.wikimedia.org/wiki/File:Cr%C3%A1ter_volc%C3%A1nico,_zona_de_conservaci%C3%B3n_de_Ngorongoro,_Tanzania,_2024-05-27,_DD_11.jpg",
    objectPosition: "center 45%",
  },
  tarangire: {
    src: "/region-heroes/tarangire.jpg",
    alt: "Elephants sheltering under a giant baobab tree in Tarangire, Tanzania",
    landmark: "Baobabs of Tarangire",
    source: "https://commons.wikimedia.org/wiki/File:Elefanten_fressen_Baobab-Rinde.jpg",
  },
  zanzibar: {
    src: "/region-heroes/zanzibar.jpg",
    alt: "A traditional dhow on the white sand of Nungwi beach, Zanzibar",
    landmark: "Nungwi beach & dhows",
    source: "https://commons.wikimedia.org/wiki/File:Nungwi_(2010-011-1318-T).jpg",
    objectPosition: "center 45%",
  },
};

export function getRegionHero(slug: string): RegionHero | undefined {
  return regionHeroes[slug.trim().toLowerCase()];
}
