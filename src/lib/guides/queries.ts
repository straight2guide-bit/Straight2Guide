import { createClient } from "@/lib/supabase/server";
import type { GuideSearchResult } from "@/lib/supabase/types";

export type GuideSearchParams = {
  country: string;
  countries?: string[];
  regions: string[];
  startDate: string | null;
  endDate: string | null;
  availableOnDates: boolean;
  minGuidePrice: number;
  maxGuidePrice: number;
  minVehiclePrice: number;
  maxVehiclePrice: number;
  groupSizes: string[];
  vehicleCapacities: number[];
  transportOptions: string[];
  specialties: string[];
  languages: string[];
  experienceRanges: string[];
  certificationTypes: string[];
  suitableFor: string[];
  localOrigin: string[];
  sustainabilityTags: string[];
  certified: boolean;
};

export async function fetchGuides(params: GuideSearchParams): Promise<GuideSearchResult[]> {
  const supabase = await createClient();

  // Step 1: Guides with an UNAVAILABLE block overlapping the date range.
  let excludedGuideIds: string[] = [];
  if (params.availableOnDates && params.startDate && params.endDate) {
    const { data: unavailable } = await supabase
      .from("availability_blocks")
      .select("guide_id")
      .eq("status", "unavailable")
      .lte("start_date", params.endDate)
      .gte("end_date", params.startDate);
    excludedGuideIds = ((unavailable ?? []) as { guide_id: string }[]).map((b) => b.guide_id);
  }

  // Step 2: Resolve region IDs for the requested country + optional sub-region slugs.
  let regionQuery = supabase.from("regions").select("id").eq("is_active", true);

  if (params.countries !== undefined && params.countries.length > 0 && !params.country) {
    const filter = params.countries.map((c) => `country.ilike.${c}`).join(",");
    regionQuery = regionQuery.or(filter) as typeof regionQuery;
  } else if (params.country) {
    regionQuery = regionQuery.ilike("country", params.country) as typeof regionQuery;
  }
  if (params.regions.length > 0) {
    regionQuery = regionQuery.in("slug", params.regions) as typeof regionQuery;
  }

  const { data: regionData } = await regionQuery;
  const regionIds = ((regionData ?? []) as { id: string }[]).map((r) => r.id);

  if (params.country && regionIds.length === 0) {
    return [];
  }

  // Step 3: Main guide query.
  let query = supabase
    .from("guide_profiles")
    .select(
      `id, display_name, slug, profile_photo_url,
       price_per_person, price_per_vehicle, vehicle_capacity,
       specialties, certifications,
       region:regions(id, name, slug)`
    )
    .eq("verification_status", "verified");

  if (regionIds.length > 0) {
    query = query.in("region_id", regionIds);
  }

  if (excludedGuideIds.length > 0) {
    query = query.not("id", "in", `(${excludedGuideIds.join(",")})`);
  }

  // Price range filters.
  if (params.minGuidePrice > 0) query = query.gte("price_per_person", params.minGuidePrice);
  if (params.maxGuidePrice < 99999) query = query.lte("price_per_person", params.maxGuidePrice);
  if (params.minVehiclePrice > 0) query = query.gte("price_per_vehicle", params.minVehiclePrice);
  if (params.maxVehiclePrice < 99999)
    query = query.lte("price_per_vehicle", params.maxVehiclePrice);

  // Vehicle capacity filter.
  if (params.vehicleCapacities.length > 0) {
    const exact = params.vehicleCapacities.filter((c) => c < 8);
    const hasPlus = params.vehicleCapacities.includes(8);
    if (exact.length > 0 && hasPlus) {
      query = query.or(`vehicle_capacity.in.(${exact.join(",")}),vehicle_capacity.gte.8`);
    } else if (exact.length > 0) {
      query = query.in("vehicle_capacity", exact);
    } else if (hasPlus) {
      query = query.gte("vehicle_capacity", 8);
    }
  }

  // Array-overlap filters — all use the same pattern.
  if (params.specialties.length > 0) query = query.overlaps("specialties", params.specialties);
  if (params.languages.length > 0) query = query.overlaps("languages", params.languages);
  if (params.transportOptions.length > 0)
    query = query.overlaps("transport_options", params.transportOptions);
  if (params.certificationTypes.length > 0)
    query = query.overlaps("certification_types", params.certificationTypes);
  if (params.suitableFor.length > 0) query = query.overlaps("suitable_for", params.suitableFor);
  if (params.sustainabilityTags.length > 0)
    query = query.overlaps("sustainability_tags", params.sustainabilityTags);

  // Local origin — single text field, use .in().
  if (params.localOrigin.length > 0) query = query.in("local_origin", params.localOrigin);

  // Certified filter — legacy single-checkbox (certifications field not null).
  if (params.certified) query = query.not("certifications", "is", null);

  // Years of experience — OR across selected bands.
  if (params.experienceRanges.length > 0) {
    const parts: string[] = [];
    if (params.experienceRanges.includes("1-3"))
      parts.push("and(years_experience.gte.1,years_experience.lte.3)");
    if (params.experienceRanges.includes("4-7"))
      parts.push("and(years_experience.gte.4,years_experience.lte.7)");
    if (params.experienceRanges.includes("8-15"))
      parts.push("and(years_experience.gte.8,years_experience.lte.15)");
    if (params.experienceRanges.includes("15+")) parts.push("years_experience.gte.16");
    if (parts.length > 0) query = query.or(parts.join(","));
  }

  const { data, error } = await query.limit(50);

  if (error) {
    console.error("[fetchGuides]", error.message);
    return [];
  }

  const guides = (data ?? []) as GuideSearchResult[];

  // Step 4: Post-filter by group size using joined trips.
  if (params.groupSizes.length === 0) return guides;

  const guideIds = guides.map((g) => g.id);
  const { data: trips } = await supabase
    .from("trips")
    .select("guide_id, min_group_size, max_group_size")
    .eq("status", "published")
    .in("guide_id", guideIds);

  type TripRow = { guide_id: string; min_group_size: number; max_group_size: number | null };
  const matchingGuideIds = new Set<string>();
  for (const trip of (trips ?? []) as TripRow[]) {
    if (matchesGroupSize(trip.min_group_size, trip.max_group_size, params.groupSizes)) {
      matchingGuideIds.add(trip.guide_id);
    }
  }

  return guides.filter((g) => matchingGuideIds.has(g.id));
}

function matchesGroupSize(min: number, max: number | null, bands: string[]): boolean {
  for (const band of bands) {
    if (band === "1-2" && min <= 2 && (max === null || max >= 1)) return true;
    if (band === "3-4" && min <= 4 && (max === null || max >= 3)) return true;
    if (band === "5-6" && min <= 6 && (max === null || max >= 5)) return true;
    if (band === "7+" && (max === null || max >= 7)) return true;
  }
  return false;
}
