import Link from "next/link";
import { getFeaturedGuides, getFeaturedTrips, getFeaturedRegions } from "@/lib/home/featured";
import { GuideCard } from "@/components/guides/GuideCard";
import { TripCard } from "./TripCard";
import { RegionCard } from "./RegionCard";

// Homepage "shop window": featured trips, guides, and regions pulled from the DB.
// Each row hides itself when empty (e.g. Supabase not configured), so the page
// never renders an empty heading.
export async function FeaturedSection() {
  const [guides, trips, regions] = await Promise.all([
    getFeaturedGuides(),
    getFeaturedTrips(),
    getFeaturedRegions(),
  ]);

  if (guides.length === 0 && trips.length === 0 && regions.length === 0) return null;

  return (
    <section className="bg-slate-50 px-4 py-16 md:px-8">
      <div className="mx-auto max-w-6xl">
        {trips.length > 0 && (
          <div className="mb-14">
            <RowHeader title="Featured Trips" href="/explore" cta="Explore all trips" />
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {trips.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>
          </div>
        )}

        {guides.length > 0 && (
          <div className="mb-14">
            <RowHeader title="Featured Guides" href="/guides" cta="Browse all guides" />
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {guides.map((guide) => (
                <GuideCard key={guide.id} guide={guide} />
              ))}
            </div>
          </div>
        )}

        {regions.length > 0 && (
          <div>
            <RowHeader title="Explore Regions" />
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {regions.map((region) => (
                <RegionCard key={region.id} region={region} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function RowHeader({ title, href, cta }: { title: string; href?: string; cta?: string }) {
  return (
    <div className="mb-5 flex items-end justify-between">
      <h2 className="text-2xl font-bold text-[#0F172A]">{title}</h2>
      {href && cta && (
        <Link
          href={href}
          className="text-sm font-semibold text-[#0E7A45] transition-colors hover:text-[#0c6438] hover:underline"
        >
          {cta}
        </Link>
      )}
    </div>
  );
}
