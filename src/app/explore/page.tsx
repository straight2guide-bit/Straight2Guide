import type { Metadata } from "next";
import { Search, MapPin } from "lucide-react";
import Link from "next/link";
import { destinationMenu } from "@/config/destinations";

export const metadata: Metadata = {
  title: "Explore Destinations",
  description:
    "Browse trips and local guides across Africa, Asia, Europe, the Americas, and Oceania. Find authentic, verified travel experiences.",
};

const continentColors: Record<string, string> = {
  Africa: "bg-amber-50 border-amber-200 text-amber-800",
  Asia: "bg-rose-50 border-rose-200 text-rose-800",
  Europe: "bg-blue-50 border-blue-200 text-blue-800",
  Oceania: "bg-cyan-50 border-cyan-200 text-cyan-800",
  "Central America": "bg-orange-50 border-orange-200 text-orange-800",
  "South America": "bg-green-50 border-green-200 text-green-800",
  "North America": "bg-violet-50 border-violet-200 text-violet-800",
};

function slugify(s: string) {
  return s.toLowerCase().replace(/\s+/g, "-");
}

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; continent?: string }>;
}) {
  const { q: query = "", continent: continentFilter = "" } = await searchParams;

  return (
    <main className="flex flex-1 flex-col">
      {/* Header */}
      <section className="border-b border-slate-100 bg-white px-4 pt-16 pb-8 md:px-8">
        <div className="mx-auto max-w-5xl">
          <h1 className="mb-2 text-3xl font-bold text-[#0F172A]">Explore Destinations</h1>
          <p className="mb-6 text-slate-500">
            Find verified local guides for authentic experiences around the world.
          </p>

          {/* Search */}
          <form
            method="GET"
            className="flex max-w-lg items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 shadow-sm"
          >
            <Search className="size-4 shrink-0 text-slate-400" />
            <input
              name="q"
              type="text"
              defaultValue={query}
              placeholder="Search destination, activity, or guide…"
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
            <button
              type="submit"
              className="rounded-full bg-[#0E7A45] px-4 py-1.5 text-xs font-semibold text-white hover:opacity-90"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Continent filter pills */}
      <section className="border-b border-slate-100 bg-slate-50 px-4 py-4 md:px-8">
        <div className="mx-auto flex max-w-5xl flex-wrap gap-2">
          <Link
            href="/explore"
            className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors ${
              !continentFilter
                ? "border-[#0E7A45] bg-[#0E7A45] text-white"
                : "border-slate-200 bg-white text-slate-600 hover:border-[#0E7A45] hover:text-[#0E7A45]"
            }`}
          >
            All
          </Link>
          {Object.keys(destinationMenu).map((continent) => (
            <Link
              key={continent}
              href={`/explore?continent=${slugify(continent)}`}
              className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors ${
                continentFilter === slugify(continent)
                  ? "border-[#0E7A45] bg-[#0E7A45] text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:border-[#0E7A45] hover:text-[#0E7A45]"
              }`}
            >
              {continent}
            </Link>
          ))}
        </div>
      </section>

      {/* Destination grid */}
      <section className="flex-1 px-4 py-10 md:px-8">
        <div className="mx-auto max-w-5xl">
          {Object.entries(destinationMenu)
            .filter(([continent]) =>
              continentFilter ? slugify(continent) === continentFilter : true
            )
            .map(([continent, destinations]) => (
              <div key={continent} className="mb-10">
                <h2 className="mb-4 text-lg font-semibold text-[#0F172A]">{continent}</h2>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                  {destinations
                    .filter((d) => (query ? d.toLowerCase().includes(query.toLowerCase()) : true))
                    .map((dest) => (
                      <Link
                        key={dest}
                        href={`/explore?region=${slugify(dest)}`}
                        className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-shadow hover:shadow-md ${continentColors[continent] ?? "border-slate-200 bg-slate-50 text-slate-700"}`}
                      >
                        <MapPin className="size-3.5 shrink-0 opacity-60" />
                        {dest}
                      </Link>
                    ))}
                </div>
              </div>
            ))}

          {/* Coming soon notice */}
          <div className="mt-6 rounded-xl border border-dashed border-slate-200 px-6 py-10 text-center">
            <p className="mb-1 font-semibold text-[#0F172A]">Full trip listings coming soon</p>
            <p className="text-sm text-slate-500">
              We&apos;re onboarding verified guides now. Browse destinations above or{" "}
              <Link href="/become-a-guide" className="text-[#0E7A45] underline underline-offset-2">
                apply to become a guide
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
