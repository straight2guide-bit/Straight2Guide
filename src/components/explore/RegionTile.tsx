import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { getRegionHero } from "@/config/regionHeroes";
import { getCountryHero } from "@/config/countryHeroes";
import type { ExploreRegion } from "@/lib/explore/regions";

interface RegionTileProps {
  region: ExploreRegion;
}

// A single region tile in a country's scrollable strip on /explore. Shows the
// region's signature-attraction photo (regionHeroes, falling back to the country
// hero) with the cheapest verified-guide day rate overlaid. Links into the guide
// search pre-filtered to this region.
export function RegionTile({ region }: RegionTileProps) {
  const hero = getRegionHero(region.slug) ?? getCountryHero(region.country);
  const href = `/guides?country=${encodeURIComponent(
    region.country.toLowerCase()
  )}&regions=${encodeURIComponent(region.slug)}`;

  return (
    <Link
      href={href}
      className="group focus-visible:ring-brand-green relative block w-64 shrink-0 snap-start overflow-hidden rounded-2xl focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none sm:w-72"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        {hero ? (
          <Image
            src={hero.src}
            alt={hero.alt}
            fill
            sizes="(max-width: 640px) 16rem, 18rem"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            style={{ objectPosition: hero.objectPosition ?? "center" }}
          />
        ) : (
          <div className="from-brand-green size-full bg-gradient-to-br to-[#0c6438]" />
        )}

        {/* Scrim for legible text */}
        <div className="from-dark/80 absolute inset-0 bg-gradient-to-t via-black/10 to-transparent" />

        {/* Cheapest day rate */}
        {region.minPricePerDay != null ? (
          <span className="absolute top-3 right-3 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-[#0F172A] shadow-sm backdrop-blur-sm">
            from €{region.minPricePerDay} / day
          </span>
        ) : (
          <span className="absolute top-3 right-3 rounded-full bg-white/85 px-3 py-1 text-xs font-semibold text-slate-500 shadow-sm backdrop-blur-sm">
            Guides soon
          </span>
        )}

        {/* Region name + country */}
        <div className="absolute right-3 bottom-3 left-3">
          <h3 className="text-lg leading-tight font-bold text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.6)]">
            {region.name}
          </h3>
          <p className="flex items-center gap-1 text-sm text-white/85 [text-shadow:0_1px_8px_rgba(0,0,0,0.55)]">
            <MapPin className="size-3.5" aria-hidden />
            {region.country}
          </p>
        </div>
      </div>
    </Link>
  );
}
