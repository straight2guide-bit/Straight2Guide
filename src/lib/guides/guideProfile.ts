import { createClient } from "@/lib/supabase/server";
import type { GuideProfile, Trip } from "@/lib/supabase/types";

// A guide profile joined with its region (to-one), as shown on /guides/[slug].
export type GuideProfileDetail = GuideProfile & {
  region: { id: string; name: string; slug: string; country: string } | null;
};

export type GuideProfileResult = {
  guide: GuideProfileDetail;
  trips: Trip[];
};

// Fetch a single VERIFIED guide by slug plus their PUBLISHED trips.
// Returns null when Supabase is not configured, or the guide is missing /
// not verified — the page turns that into a 404 (RLS also hides unverified rows).
export async function getGuideBySlug(slug: string): Promise<GuideProfileResult | null> {
  const configured =
    !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!configured) return null;

  const supabase = await createClient();

  const { data: guide, error } = await supabase
    .from("guide_profiles")
    .select(`*, region:regions(id, name, slug, country)`)
    .eq("slug", slug)
    .eq("verification_status", "verified")
    .maybeSingle();

  if (error || !guide) return null;

  const detail = guide as GuideProfileDetail;

  const { data: trips } = await supabase
    .from("trips")
    .select("*")
    .eq("guide_id", detail.id)
    .eq("status", "published")
    .order("base_price", { ascending: true });

  return { guide: detail, trips: (trips ?? []) as Trip[] };
}
