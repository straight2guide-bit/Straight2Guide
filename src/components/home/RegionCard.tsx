import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { getCountryHero } from "@/config/countryHeroes";
import type { Region } from "@/lib/supabase/types";

interface RegionCardProps {
  region: Region;
}

// A featured region. Reuses the country hero image (src/config/countryHeroes.ts)
// for the photo since seeded regions have no hero_image_url of their own.
// Interim link: the guide search filtered to this region's country — repoint to
// /regions/[slug] once that page exists (Phase 2).
export function RegionCard({ region }: RegionCardProps) {
  const hero = getCountryHero(region.country);

  return (
    <Link
      href={`/guides?country=${encodeURIComponent(region.country.toLowerCase())}`}
      className="group block overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm transition-shadow hover:shadow-md focus-visible:ring-2 focus-visible:ring-[#0E7A45] focus-visible:outline-none"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        {hero ? (
          <Image
            src={hero.src}
            alt={hero.alt}
            fill
            sizes="(max-width: 768px) 90vw, 360px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            style={{ objectPosition: hero.objectPosition ?? "center" }}
          />
        ) : (
          <div className="size-full bg-gradient-to-br from-[#0E7A45] to-[#16A34A]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute bottom-0 left-0 p-4">
          <h3 className="text-lg font-bold text-white">{region.name}</h3>
          <p className="flex items-center gap-1 text-sm text-white/85">
            <MapPin className="size-3.5" />
            {region.country}
          </p>
        </div>
      </div>
    </Link>
  );
}
