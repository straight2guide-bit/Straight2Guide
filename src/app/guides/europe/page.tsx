import type { Metadata } from "next";
import { Suspense } from "react";
import { createLoader } from "nuqs/server";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { guideSearchParsers } from "@/lib/guides/searchParams";
import { fetchGuides } from "@/lib/guides/queries";
import { GuideSearchHeader } from "@/components/guides/GuideSearchHeader";
import { GuideSearchFilters } from "@/components/guides/GuideSearchFilters";
import { GuideResultsGrid } from "@/components/guides/GuideResultsGrid";

export const metadata: Metadata = {
  title: "Find a Guide in Europe",
  description:
    "Search verified local guides across Italy, France, Spain, Portugal, Norway, and Germany. Direct bookings, fair pricing, authentic experiences.",
};

const EU_COUNTRIES = ["Italy", "France", "Spain", "Portugal", "Norway", "Germany"];

const loadSearchParams = createLoader(guideSearchParsers);

export default async function EuropeGuidesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const filters = await loadSearchParams(searchParams);
  const activeCountry = filters.country.toLowerCase().trim();

  const supabaseConfigured =
    !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  let regionList: { id: string; name: string; slug: string }[] = [];
  let guides: Awaited<ReturnType<typeof fetchGuides>> = [];

  if (supabaseConfigured) {
    const supabase = await createClient();

    let regionQuery = supabase
      .from("regions")
      .select("id, name, slug")
      .eq("is_active", true)
      .or(EU_COUNTRIES.map((c) => `country.ilike.${c}`).join(","))
      .order("name");

    if (activeCountry) {
      regionQuery = regionQuery.ilike("country", activeCountry) as typeof regionQuery;
    }

    const { data: regions } = await regionQuery;
    regionList = (regions ?? []) as typeof regionList;

    guides = await fetchGuides({
      country: activeCountry,
      countries: activeCountry ? [] : EU_COUNTRIES,
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
      <GuideSearchHeader regions={regionList} />

      <div className="flex-1 bg-slate-50 pt-10">
        {/* Country quick-nav chips */}
        <div className="mx-auto max-w-7xl px-4 pb-5 md:px-8">
          <div className="flex flex-wrap gap-2">
            <Link
              href="/guides/europe"
              className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors ${
                !activeCountry
                  ? "border-[#0E7A45] bg-[#0E7A45] text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:border-[#0E7A45] hover:text-[#0E7A45]"
              }`}
            >
              All Europe
            </Link>
            {EU_COUNTRIES.map((country) => {
              const isActive = activeCountry === country.toLowerCase();
              return (
                <Link
                  key={country}
                  href={`/guides/europe?country=${encodeURIComponent(country.toLowerCase())}`}
                  className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors ${
                    isActive
                      ? "border-[#0E7A45] bg-[#0E7A45] text-white"
                      : "border-slate-200 bg-white text-slate-600 hover:border-[#0E7A45] hover:text-[#0E7A45]"
                  }`}
                >
                  {country}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Sidebar + results */}
        <div className="mx-auto flex w-full max-w-7xl gap-6 px-4 py-2 md:px-8">
          <aside className="hidden w-64 shrink-0 md:block">
            <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
              <GuideSearchFilters regions={regionList} />
            </div>
          </aside>

          <section className="min-w-0 flex-1">
            <Suspense fallback={<GuideResultsGrid guides={[]} loading country={filters.country} />}>
              <GuideResultsGrid guides={guides} country={filters.country || "Europe"} />
            </Suspense>
          </section>
        </div>
      </div>
    </main>
  );
}
