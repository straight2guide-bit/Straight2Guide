import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Trees, Bird, Mountain, Camera, Leaf, Landmark, ArrowRight } from "lucide-react";
import { getRegionsByCountry } from "@/lib/explore/regions";
import { RegionTile } from "@/components/explore/RegionTile";

export const metadata: Metadata = {
  title: "Explore Destinations",
  description:
    "Browse destinations by country and region, and connect directly with verified local guides you can book by the day or with a vehicle.",
};

// Static + ISR: regions/prices change rarely and the data is read cookie-free.
export const revalidate = 3600;

// Curated entry points by experience, linking into the specialty-filtered guide
// search. Values match the search's SPECIALTY_OPTIONS.
const EXPERIENCES = [
  { label: "Wildlife", icon: Trees },
  { label: "Birdwatching", icon: Bird },
  { label: "Hiking", icon: Mountain },
  { label: "Photography", icon: Camera },
  { label: "Conservation", icon: Leaf },
  { label: "Local Culture", icon: Landmark },
];

export default async function ExplorePage() {
  const countryGroups = await getRegionsByCountry();

  return (
    <main className="flex flex-1 flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden px-4 py-16 text-center md:px-8 md:py-20">
        <Image
          src="/country-heroes/kenya-v2.jpg"
          alt="Sunset over the savanna"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="from-dark/75 via-dark/55 to-brand-green/70 absolute inset-0 bg-gradient-to-b" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_60%_at_50%_45%,rgba(15,23,42,0.5),rgba(15,23,42,0)_72%)]" />
        <div className="relative mx-auto max-w-3xl">
          <Image
            src="/logo-white-notext.png"
            alt="Straight2Guide"
            width={80}
            height={80}
            priority
            className="mx-auto mb-6 h-16 w-16 md:h-20 md:w-20"
          />
          <p className="mb-4 text-xs font-semibold tracking-[0.18em] text-white/85 uppercase [text-shadow:0_1px_8px_rgba(0,0,0,0.5)]">
            Explore
          </p>
          <h1 className="font-heading mb-5 text-4xl font-semibold tracking-tight text-balance text-white [text-shadow:0_2px_18px_rgba(0,0,0,0.55)] md:text-5xl">
            Find your next journey.
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-pretty text-white/95 [text-shadow:0_1px_12px_rgba(0,0,0,0.5)]">
            Browse by country and region, then connect directly with verified local guides — book
            them by the day or with a vehicle. Your trip, your pace, no middlemen.
          </p>
        </div>
      </section>

      {/* Destinations by country → region strips */}
      <section className="px-4 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10">
            <p className="text-brand-green mb-3 text-xs font-semibold tracking-[0.18em] uppercase">
              Where to
            </p>
            <h2 className="font-heading text-dark text-3xl font-semibold tracking-tight text-balance md:text-4xl">
              Browse by destination
            </h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-pretty text-slate-500">
              Each region shows its standout attraction and the lowest daily price among its guides.
            </p>
          </div>

          {countryGroups.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-slate-500">
              Destinations are loading. Please check back shortly.
            </p>
          ) : (
            <div className="flex flex-col gap-12">
              {countryGroups.map((group) => (
                <div key={group.country}>
                  <div className="mb-4 flex items-end justify-between gap-4">
                    <h3 className="text-dark text-xl font-semibold">{group.country}</h3>
                    <Link
                      href={`/guides?country=${encodeURIComponent(group.country.toLowerCase())}`}
                      className="text-brand-green flex shrink-0 items-center gap-1 text-sm font-semibold hover:underline"
                    >
                      All guides
                      <ArrowRight className="size-4" aria-hidden />
                    </Link>
                  </div>
                  <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden">
                    {group.regions.map((region) => (
                      <RegionTile key={region.id} region={region} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Browse by experience */}
      <section className="bg-slate-50 px-4 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10">
            <p className="text-brand-green mb-3 text-xs font-semibold tracking-[0.18em] uppercase">
              What to do
            </p>
            <h2 className="font-heading text-dark text-3xl font-semibold tracking-tight text-balance md:text-4xl">
              Browse by experience
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
            {EXPERIENCES.map(({ label, icon: Icon }) => (
              <Link
                key={label}
                href={`/guides?specialties=${encodeURIComponent(label)}`}
                className="hover:border-brand-green/40 group flex flex-col items-center gap-3 rounded-2xl border border-slate-100 bg-white p-5 text-center shadow-sm transition-shadow hover:shadow-md"
              >
                <span className="bg-brand-green/10 flex size-11 items-center justify-center rounded-xl">
                  <Icon className="text-brand-green size-5" aria-hidden />
                </span>
                <span className="text-dark text-sm font-semibold">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="px-4 py-16 text-center md:px-8">
        <div className="mx-auto max-w-xl">
          <h2 className="font-heading text-dark mb-4 text-3xl font-semibold tracking-tight text-balance md:text-4xl">
            Know a place better than anyone?
          </h2>
          <p className="mb-8 leading-relaxed text-pretty text-slate-500">
            Share your corner of the world and earn fairly for it. Become a verified guide.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/become-a-guide"
              className="bg-brand-green focus-visible:ring-brand-green inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#0c6438] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              Become a Guide
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link
              href="/about"
              className="border-brand-green bg-brand-green/10 text-brand-green hover:bg-brand-green/20 focus-visible:ring-brand-green inline-flex items-center justify-center gap-2 rounded-full border px-7 py-3.5 text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              How it works
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
