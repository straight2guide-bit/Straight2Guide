import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, User, Car, MapPin, Users, ChevronRight } from "lucide-react";
import type { GuideSearchResult } from "@/lib/supabase/types";

interface GuideCardProps {
  guide: GuideSearchResult;
}

export function GuideCard({ guide }: GuideCardProps) {
  const {
    slug,
    display_name,
    profile_photo_url,
    price_per_person,
    price_per_vehicle,
    vehicle_capacity,
    specialties,
    certifications,
    region,
    min_group_size,
    max_group_size,
  } = guide;

  const isCertified = certifications !== null;
  const initials = display_name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const shownSpecialties = specialties.slice(0, 4);
  const extraSpecialties = specialties.length - shownSpecialties.length;

  const groupSizeLabel =
    min_group_size != null && max_group_size != null
      ? `${min_group_size}–${max_group_size} people`
      : min_group_size != null
        ? `${min_group_size}+ people`
        : max_group_size != null
          ? `Up to ${max_group_size} people`
          : null;

  return (
    <Link
      href={`/guides/${slug}`}
      className="focus-visible:ring-brand-green block rounded-2xl focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
    >
      <article className="flex flex-col gap-5 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:flex-row sm:items-stretch">
        {/* Left: photo */}
        <div className="relative size-28 shrink-0 self-center overflow-hidden rounded-2xl sm:size-36 sm:self-auto">
          {profile_photo_url ? (
            <Image
              src={profile_photo_url}
              alt={display_name}
              fill
              sizes="144px"
              className="object-cover"
            />
          ) : (
            <div className="bg-brand-green/10 text-brand-green flex size-full items-center justify-center text-xl font-bold">
              {initials}
            </div>
          )}
          {isCertified && (
            <div className="bg-brand-green absolute bottom-2 left-2 flex size-7 items-center justify-center rounded-full shadow-sm">
              <ShieldCheck className="size-4 text-white" aria-hidden />
            </div>
          )}
        </div>

        {/* Middle: details */}
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <h3 className="text-dark truncate text-lg font-semibold">{display_name}</h3>
            {isCertified && (
              <span className="bg-brand-green/10 text-brand-green inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold">
                <ShieldCheck className="size-3.5" aria-hidden />
                Certified
              </span>
            )}
          </div>

          <p className="flex items-center gap-1.5 text-sm text-slate-500">
            <MapPin className="size-4 shrink-0" aria-hidden />
            {region ? region.name : "Region to be confirmed"}
          </p>

          {shownSpecialties.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {shownSpecialties.map((s) => (
                <span
                  key={s}
                  className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600"
                >
                  {s}
                </span>
              ))}
              {extraSpecialties > 0 && (
                <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-400">
                  +{extraSpecialties}
                </span>
              )}
            </div>
          )}

          {(groupSizeLabel || vehicle_capacity != null) && (
            <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
              {groupSizeLabel && (
                <span className="flex items-center gap-1.5">
                  <Users className="size-3.5 shrink-0" aria-hidden />
                  {groupSizeLabel}
                </span>
              )}
              {vehicle_capacity != null && (
                <span className="flex items-center gap-1.5">
                  <Car className="size-3.5 shrink-0" aria-hidden />
                  Up to {vehicle_capacity} seats
                </span>
              )}
            </div>
          )}
        </div>

        {/* Right: pricing + CTA */}
        <div className="flex shrink-0 flex-col justify-between gap-4 border-slate-100 sm:border-l sm:pl-5">
          <div className="flex items-center gap-6 sm:flex-col sm:items-end sm:gap-3">
            <div className="flex items-center gap-2 sm:flex-col sm:items-end sm:gap-0">
              <span className="text-dark text-xl font-bold">
                {price_per_person != null ? `$${price_per_person}` : "—"}
              </span>
              <span className="flex items-center gap-1 text-xs text-slate-400">
                <User className="size-3.5" aria-hidden />
                per person
              </span>
            </div>
            {price_per_vehicle != null && (
              <div className="flex items-center gap-2 sm:flex-col sm:items-end sm:gap-0">
                <span className="text-dark text-xl font-bold">${price_per_vehicle}</span>
                <span className="flex items-center gap-1 text-xs text-slate-400">
                  <Car className="size-3.5" aria-hidden />
                  per vehicle
                </span>
              </div>
            )}
          </div>
          <span className="text-brand-green flex items-center gap-1 text-sm font-semibold sm:justify-end">
            View profile
            <ChevronRight className="size-4" aria-hidden />
          </span>
        </div>
      </article>
    </Link>
  );
}
