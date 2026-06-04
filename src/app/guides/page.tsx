import type { Metadata } from "next";
import { Suspense } from "react";
import { createLoader } from "nuqs/server";
import { createClient } from "@/lib/supabase/server";
import { guideSearchParsers } from "@/lib/guides/searchParams";
import { fetchGuides } from "@/lib/guides/queries";
import { GuideSearchHeader } from "@/components/guides/GuideSearchHeader";
import { GuideSearchFilters } from "@/components/guides/GuideSearchFilters";
import { GuideResultsGrid } from "@/components/guides/GuideResultsGrid";

export const metadata: Metadata = {
  title: "Find a Guide",
  description: "Search verified local guides by destination, date, and specialty.",
};

const loadSearchParams = createLoader(guideSearchParsers);

export default async function GuidesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const filters = await loadSearchParams(searchParams);

  const supabaseConfigured =
    !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  let regionList: { id: string; name: string; slug: string }[] = [];
  let guides: Awaited<ReturnType<typeof fetchGuides>> = [];

  if (supabaseConfigured) {
    const supabase = await createClient();

    const regionQuery = supabase
      .from("regions")
      .select("id, name, slug")
      .eq("is_active", true)
      .order("name");

    if (filters.country) {
      regionQuery.ilike("country", filters.country);
    }

    const { data: regions } = await regionQuery;
    regionList = (regions ?? []) as typeof regionList;

    guides = await fetchGuides({
      country: filters.country,
      regions: filters.regions,
      startDate: filters.start || null,
      endDate: filters.end || null,
      availableOnDates: filters.availableOnDates,
      minGuidePrice: filters.minGuidePrice,
      maxGuidePrice: filters.maxGuidePrice,
      minVehiclePrice: filters.minVehiclePrice,
      maxVehiclePrice: filters.maxVehiclePrice,
      groupSizes: filters.groupSize,
      vehicleCapacities: filters.vehicleCapacity,
      transportOptions: filters.transportOptions,
      specialties: filters.specialties,
      languages: filters.languages,
      experienceRanges: filters.experienceRange,
      certificationTypes: filters.certificationTypes,
      suitableFor: filters.suitableFor,
      localOrigin: filters.localOrigin,
      sustainabilityTags: filters.sustainabilityTags,
      certified: filters.certified,
    });
  }

  return (
    <main className="flex min-h-screen flex-col">
      {/* Green hero header + floating search card */}
      <GuideSearchHeader regions={regionList} />

      {/* Content area — slate-50 background with top padding for the floating card overlap */}
      <div className="flex-1 bg-slate-50 pt-10">
        <div className="mx-auto flex w-full max-w-7xl gap-6 px-4 py-6 md:px-8">
          {/* Desktop filter sidebar */}
          <aside className="hidden w-64 shrink-0 md:block">
            <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
              <GuideSearchFilters regions={regionList} />
            </div>
          </aside>

          {/* Results */}
          <section className="min-w-0 flex-1">
            <Suspense fallback={<GuideResultsGrid guides={[]} loading country={filters.country} />}>
              <GuideResultsGrid guides={guides} country={filters.country} />
            </Suspense>
          </section>
        </div>
      </div>
    </main>
  );
}
