import Link from "next/link";
import Image from "next/image";
import { Clock, MapPin } from "lucide-react";
import { getCountryHero } from "@/config/countryHeroes";
import type { FeaturedTrip } from "@/lib/home/featured";

interface TripCardProps {
  trip: FeaturedTrip;
}

// A featured trip. Image falls back to the region's country hero when the trip
// has no gallery photo yet. Interim link: the trip's guide profile (which lists
// the trip) — repoint to /trips/[slug] once that page exists (Phase 2).
export function TripCard({ trip }: TripCardProps) {
  const fallback = trip.region ? getCountryHero(trip.region.country) : undefined;
  const imageSrc = trip.gallery_urls[0] ?? fallback?.src ?? null;
  const href = trip.guide ? `/guides/${trip.guide.slug}` : "/guides";

  return (
    <Link
      href={href}
      className="group block overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm transition-shadow hover:shadow-md focus-visible:ring-2 focus-visible:ring-[#0E7A45] focus-visible:outline-none"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={trip.title}
            fill
            sizes="(max-width: 768px) 90vw, 360px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="size-full bg-gradient-to-br from-[#0E7A45] to-[#16A34A]" />
        )}
        {trip.region && (
          <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-[#0E7A45] shadow-sm">
            <MapPin className="size-3" />
            {trip.region.name}
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="line-clamp-1 text-base font-bold text-[#0F172A]">{trip.title}</h3>
        <div className="mt-2 flex items-center justify-between text-sm">
          <span className="flex items-center gap-1 text-slate-500">
            <Clock className="size-3.5" />
            {trip.duration_days} days
          </span>
          <span className="font-bold text-[#0F172A]">from ${trip.base_price}</span>
        </div>
        {trip.guide && (
          <p className="mt-1 text-xs text-slate-400">with {trip.guide.display_name}</p>
        )}
      </div>
    </Link>
  );
}
