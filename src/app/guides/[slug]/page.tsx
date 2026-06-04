import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, Globe, Clock, User, Car, Leaf, Award } from "lucide-react";
import { getGuideBySlug } from "@/lib/guides/guideProfile";
import { VerifiedBadge } from "@/components/guides/VerifiedBadge";

// "born-in-region" -> "Born In Region"; "honeymooners" -> "Honeymooners"
function humanize(value: string): string {
  return value.replace(/[-_]+/g, " ").replace(/(^|\s)\S/g, (c) => c.toUpperCase());
}

function initialsOf(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0] ?? "")
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const result = await getGuideBySlug(slug);
  if (!result) return { title: "Guide not found" };

  const { guide } = result;
  const where = guide.region
    ? `${guide.region.name}, ${guide.region.country}`
    : (guide.location ?? "");
  return {
    title: `${guide.display_name}${where ? ` — Local Guide in ${where}` : " — Local Guide"}`,
    description:
      guide.bio?.slice(0, 155) ??
      `Book ${guide.display_name}, a verified local guide on Straight2Guide.`,
  };
}

export default async function GuideProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const result = await getGuideBySlug(slug);
  if (!result) notFound();

  const { guide, trips } = result;
  const where = guide.region ? `${guide.region.name}, ${guide.region.country}` : guide.location;

  return (
    <main className="flex min-h-screen flex-col bg-slate-50">
      {/* Header band */}
      <header className="bg-[#0E7A45] text-white">
        <div className="mx-auto w-full max-w-5xl px-4 pt-6 pb-10 md:px-8">
          <Link
            href="/guides"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-white/80 transition-colors hover:text-white"
          >
            <ArrowLeft className="size-4" aria-hidden />
            Back to guides
          </Link>

          <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="relative size-28 shrink-0 overflow-hidden rounded-2xl ring-4 ring-white/20">
              {guide.profile_photo_url ? (
                <Image
                  src={guide.profile_photo_url}
                  alt={guide.display_name}
                  fill
                  sizes="112px"
                  className="object-cover"
                />
              ) : (
                <div className="flex size-full items-center justify-center bg-white/15 text-2xl font-bold">
                  {initialsOf(guide.display_name)}
                </div>
              )}
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-bold sm:text-3xl">{guide.display_name}</h1>
                <VerifiedBadge className="bg-white/15 text-white" />
              </div>
              {where && (
                <p className="mt-1.5 flex items-center gap-1.5 text-sm text-white/85">
                  <MapPin className="size-4" aria-hidden />
                  {where}
                </p>
              )}
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-white/85">
                {guide.years_experience != null && (
                  <span className="flex items-center gap-1.5">
                    <Clock className="size-4" aria-hidden />
                    {guide.years_experience} yrs experience
                  </span>
                )}
                {guide.languages.length > 0 && (
                  <span className="flex items-center gap-1.5">
                    <Globe className="size-4" aria-hidden />
                    {guide.languages.map(humanize).join(", ")}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="mx-auto grid w-full max-w-5xl flex-1 grid-cols-1 gap-6 px-4 py-8 md:px-8 lg:grid-cols-[1fr_300px]">
        {/* Left column */}
        <div className="flex flex-col gap-6">
          {guide.bio && (
            <section className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-[#0F172A]">About</h2>
              <p className="mt-3 text-sm leading-relaxed whitespace-pre-line text-slate-600">
                {guide.bio}
              </p>
            </section>
          )}

          {guide.specialties.length > 0 && (
            <section className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-[#0F172A]">Specialties</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {guide.specialties.map((s) => (
                  <span
                    key={s}
                    className="rounded-full bg-[#0E7A45]/10 px-3 py-1 text-xs font-semibold text-[#0E7A45]"
                  >
                    {humanize(s)}
                  </span>
                ))}
              </div>
            </section>
          )}

          {(guide.certifications || guide.certification_types.length > 0) && (
            <section className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-[#0F172A]">
                <Award className="size-5 text-[#0E7A45]" aria-hidden />
                Certifications
              </h2>
              {guide.certification_types.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {guide.certification_types.map((c) => (
                    <span
                      key={c}
                      className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600"
                    >
                      {humanize(c)}
                    </span>
                  ))}
                </div>
              )}
              {guide.certifications && (
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {guide.certifications}
                </p>
              )}
            </section>
          )}

          {guide.sustainability_tags.length > 0 && (
            <section className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-[#0F172A]">
                <Leaf className="size-5 text-[#0E7A45]" aria-hidden />
                Sustainability
              </h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {guide.sustainability_tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-[#0E7A45]/10 px-3 py-1 text-xs font-semibold text-[#0E7A45]"
                  >
                    {humanize(t)}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Trips offered */}
          <section className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-[#0F172A]">Trips offered</h2>
            {trips.length === 0 ? (
              <p className="mt-3 text-sm text-slate-500">
                This guide has no published trips yet — request a custom experience below.
              </p>
            ) : (
              <ul className="mt-4 flex flex-col gap-3">
                {trips.map((trip) => (
                  <li
                    key={trip.id}
                    className="flex items-center justify-between gap-4 rounded-lg border border-slate-100 p-4"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-[#0F172A]">{trip.title}</p>
                      <p className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Clock className="size-3.5" aria-hidden />
                          {trip.duration_days} {trip.duration_days === 1 ? "day" : "days"}
                        </span>
                        {trip.activity_type && <span>{humanize(trip.activity_type)}</span>}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <span className="text-sm font-bold text-[#0F172A]">
                        from {trip.currency === "EUR" ? "€" : "$"}
                        {trip.base_price}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        {/* Right column — request card */}
        <aside className="lg:sticky lg:top-6 lg:self-start">
          <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Starting from</p>
            <div className="mt-2 flex flex-col gap-2">
              <span className="flex items-center gap-2 text-slate-800">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-slate-100">
                  <User className="size-3.5 text-slate-500" aria-hidden />
                </span>
                <span className="text-lg font-bold">
                  {guide.price_per_person != null ? `$${guide.price_per_person}` : "On request"}
                </span>
                <span className="text-xs text-slate-400">per person</span>
              </span>
              {guide.price_per_vehicle != null && (
                <span className="flex items-center gap-2 text-slate-800">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-slate-100">
                    <Car className="size-3.5 text-slate-500" aria-hidden />
                  </span>
                  <span className="text-lg font-bold">${guide.price_per_vehicle}</span>
                  <span className="text-xs text-slate-400">per vehicle</span>
                </span>
              )}
            </div>

            <Link
              href="/contact"
              className="mt-5 flex w-full items-center justify-center rounded-full bg-[#0E7A45] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0c6a3c] focus-visible:ring-2 focus-visible:ring-[#0E7A45] focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              Request this guide
            </Link>
            <p className="mt-3 text-center text-xs text-slate-400">
              Direct booking · No agency fees · Secure request
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}
