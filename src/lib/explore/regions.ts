import { createPublicClient } from "@/lib/supabase/public";

// One region as shown on the /explore browse page: its core fields plus the
// cheapest per-day guide price ("from €X / day") and how many verified guides
// operate there. `minPricePerDay` is null when the region has no priced guide.
export type ExploreRegion = {
  id: string;
  name: string;
  slug: string;
  country: string;
  description: string | null;
  hero_image_url: string | null;
  best_season: string | null;
  minPricePerDay: number | null;
  guideCount: number;
};

// Regions grouped under their country — one CountryGroup renders as one row on
// /explore, with its regions in a horizontally scrollable strip.
export type CountryGroup = {
  country: string;
  regions: ExploreRegion[];
};

const supabaseConfigured = () =>
  !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

type RegionRow = {
  id: string;
  name: string;
  slug: string;
  country: string;
  description: string | null;
  hero_image_url: string | null;
  best_season: string | null;
};

type GuidePriceRow = { region_id: string | null; price_per_person: number | null };

// All active regions grouped by country, each annotated with its cheapest
// verified-guide day rate. Two reads (regions + guide prices) joined in memory,
// matching the cookie-free public-read pattern used by the homepage.
export async function getRegionsByCountry(): Promise<CountryGroup[]> {
  if (!supabaseConfigured()) return [];
  const supabase = createPublicClient();

  const [regionsRes, guidesRes] = await Promise.all([
    supabase
      .from("regions")
      .select("id, name, slug, country, description, hero_image_url, best_season")
      .eq("is_active", true)
      .order("country")
      .order("name"),
    supabase
      .from("guide_profiles")
      .select("region_id, price_per_person")
      .eq("verification_status", "verified"),
  ]);

  if (regionsRes.error) {
    console.error("[getRegionsByCountry] regions", regionsRes.error.message);
    return [];
  }
  if (guidesRes.error) {
    console.error("[getRegionsByCountry] guides", guidesRes.error.message);
  }

  // Aggregate cheapest day rate + guide count per region.
  const stats = new Map<string, { min: number | null; count: number }>();
  for (const g of (guidesRes.data ?? []) as GuidePriceRow[]) {
    if (!g.region_id) continue;
    const cur = stats.get(g.region_id) ?? { min: null, count: 0 };
    cur.count += 1;
    if (g.price_per_person !== null) {
      cur.min = cur.min === null ? g.price_per_person : Math.min(cur.min, g.price_per_person);
    }
    stats.set(g.region_id, cur);
  }

  const byCountry = new Map<string, ExploreRegion[]>();
  for (const r of (regionsRes.data ?? []) as RegionRow[]) {
    const s = stats.get(r.id) ?? { min: null, count: 0 };
    const region: ExploreRegion = {
      ...r,
      minPricePerDay: s.min,
      guideCount: s.count,
    };
    const list = byCountry.get(r.country) ?? [];
    list.push(region);
    byCountry.set(r.country, list);
  }

  // Within each country, lead with regions that have a price (cheapest first),
  // then the rest alphabetically (already name-ordered from the query).
  for (const list of byCountry.values()) {
    list.sort((a, b) => {
      if (a.minPricePerDay === null && b.minPricePerDay === null) return 0;
      if (a.minPricePerDay === null) return 1;
      if (b.minPricePerDay === null) return -1;
      return a.minPricePerDay - b.minPricePerDay;
    });
  }

  return [...byCountry.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([country, regions]) => ({ country, regions }));
}
