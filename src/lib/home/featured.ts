import { createPublicClient } from "@/lib/supabase/public";
import type { GuideSearchResult, Region } from "@/lib/supabase/types";

// A published trip with the bits the homepage TripCard needs, plus its region
// (for the badge + fallback image) and guide (for the interim link target).
export type FeaturedTrip = {
  id: string;
  title: string;
  slug: string;
  duration_days: number;
  base_price: number;
  currency: string;
  gallery_urls: string[];
  region: { name: string; slug: string; country: string } | null;
  guide: { display_name: string; slug: string } | null;
};

const supabaseConfigured = () =>
  !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// 3 featured, verified guides for the homepage. Same column set as the search
// query (src/lib/guides/queries.ts) so GuideCard renders identically.
export async function getFeaturedGuides(): Promise<GuideSearchResult[]> {
  if (!supabaseConfigured()) return [];
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("guide_profiles")
    .select(
      `id, display_name, slug, profile_photo_url,
       price_per_person, price_per_vehicle, vehicle_capacity,
       specialties, certifications,
       region:regions(id, name, slug)`
    )
    .eq("verification_status", "verified")
    .eq("is_featured", true)
    .limit(3);

  if (error) {
    console.error("[getFeaturedGuides]", error.message);
    return [];
  }
  return (data ?? []) as unknown as GuideSearchResult[];
}

// 3 featured, published trips, cheapest first.
export async function getFeaturedTrips(): Promise<FeaturedTrip[]> {
  if (!supabaseConfigured()) return [];
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("trips")
    .select(
      `id, title, slug, duration_days, base_price, currency, gallery_urls,
       region:regions(name, slug, country),
       guide:guide_profiles(display_name, slug)`
    )
    .eq("status", "published")
    .eq("is_featured", true)
    .order("base_price", { ascending: true })
    .limit(3);

  if (error) {
    console.error("[getFeaturedTrips]", error.message);
    return [];
  }
  return (data ?? []) as unknown as FeaturedTrip[];
}

// Active regions for the "Explore Regions" row (no is_featured column on regions).
export async function getFeaturedRegions(): Promise<Region[]> {
  if (!supabaseConfigured()) return [];
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("regions")
    .select("*")
    .eq("is_active", true)
    .order("name")
    .limit(6);

  if (error) {
    console.error("[getFeaturedRegions]", error.message);
    return [];
  }
  return (data ?? []) as Region[];
}
