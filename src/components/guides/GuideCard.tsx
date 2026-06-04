import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, User, Car } from "lucide-react";
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
    certifications,
    region,
  } = guide;

  const isCertified = certifications !== null;
  const initials = display_name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Link
      href={`/guides/${slug}`}
      className="block rounded-xl focus-visible:ring-2 focus-visible:ring-[#0E7A45] focus-visible:outline-none"
    >
      <article className="flex gap-4 rounded-xl border border-slate-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
        {/* Left: photo + name */}
        <div className="flex shrink-0 flex-col items-center gap-2">
          <div className="relative size-[88px] overflow-hidden rounded-xl">
            {profile_photo_url ? (
              <Image
                src={profile_photo_url}
                alt={display_name}
                fill
                sizes="88px"
                className="object-cover"
              />
            ) : (
              <div className="flex size-full items-center justify-center bg-[#0E7A45]/10 text-base font-bold text-[#0E7A45]">
                {initials}
              </div>
            )}
            {isCertified && (
              <div className="absolute bottom-1.5 left-1.5 flex size-6 items-center justify-center rounded-full bg-[#0E7A45] shadow-sm">
                <ShieldCheck className="size-3.5 text-white" />
              </div>
            )}
          </div>
          <span className="max-w-[88px] truncate text-center text-xs leading-tight font-medium text-slate-500">
            {display_name}
          </span>
        </div>

        {/* Right: region + prices */}
        <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
          {/* Region badge */}
          <div>
            {region ? (
              <span className="inline-flex items-center rounded-full bg-[#0E7A45]/10 px-3 py-1 text-xs font-semibold text-[#0E7A45]">
                {region.name}
              </span>
            ) : (
              <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-400">
                Region TBD
              </span>
            )}
          </div>

          {/* Prices */}
          <div className="mt-3 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-slate-800">
              <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-slate-100">
                <User className="size-3.5 text-slate-500" />
              </div>
              <span className="text-base font-bold">
                {price_per_person != null ? `$${price_per_person}` : "—"}
              </span>
              {price_per_vehicle != null && (
                <>
                  <span className="text-slate-300">|</span>
                  <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-slate-100">
                    <Car className="size-3.5 text-slate-500" />
                  </div>
                  <span className="text-base font-bold">${price_per_vehicle}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
