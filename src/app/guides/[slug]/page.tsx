import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  MapPin,
  Globe,
  Clock,
  User,
  Car,
  Leaf,
  Award,
  Users,
  Route,
  Compass,
  Wallet,
  Lock,
  ShieldCheck,
} from "lucide-react";
import { getGuideBySlug } from "@/lib/guides/guideProfile";
import { VerifiedBadge } from "@/components/guides/VerifiedBadge";
import { getCountryHero } from "@/config/countryHeroes";
import { destinationMenu } from "@/config/destinations";
import { GuideBackLink } from "@/components/guides/GuideBackLink";

// Build the "back" target from the guide's own country so it always returns to
// that country's guide page (continent page + country filter), never the bare
// ungated /guides list. Works even on a directly-opened/shared profile link.
function backTarget(country: string | null | undefined): { href: string; label: string } {
  if (!country) return { href: "/guides", label: "Back to guides" };
  const lc = country.toLowerCase();
  const continent = Object.entries(destinationMenu).find(([, list]) =>
    list.some((c) => c.toLowerCase() === lc)
  )?.[0];
  const href = continent
    ? `/guides/${continent.toLowerCase().replace(/\s+/g, "-")}?country=${encodeURIComponent(lc)}`
    : `/guides?country=${encodeURIComponent(lc)}`;
  return { href, label: `Back to ${country} guides` };
}

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

const TRUST = [
  { icon: ShieldCheck, title: "Verified Guide", body: "Identity & credentials checked." },
  { icon: Compass, title: "Local Expertise", body: "Lives and guides in the region." },
  { icon: Wallet, title: "Fair Pricing", body: "Direct booking, no agency fees." },
  { icon: Lock, title: "Secure Request", body: "Your details stay protected." },
];

export default async function GuideProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const result = await getGuideBySlug(slug);
  if (!result) notFound();

  const { guide, trips } = result;
  const where = guide.region ? `${guide.region.name}, ${guide.region.country}` : guide.location;
  const hero = guide.region ? getCountryHero(guide.region.country) : undefined;
  const back = backTarget(guide.region?.country);

  // "Good to know" facts, rendered only when present.
  const facts: { icon: typeof Car; label: string; value: string }[] = [];
  if (guide.transport_options.length > 0)
    facts.push({
      icon: Route,
      label: "Transport",
      value: guide.transport_options.map(humanize).join(", "),
    });
  if (guide.vehicle_capacity != null)
    facts.push({ icon: Car, label: "Vehicle", value: `Up to ${guide.vehicle_capacity} seats` });
  if (guide.suitable_for.length > 0)
    facts.push({
      icon: Users,
      label: "Suitable for",
      value: guide.suitable_for.map(humanize).join(", "),
    });
  if (guide.local_origin)
    facts.push({ icon: Compass, label: "Local roots", value: guide.local_origin });

  return (
    <main className="flex min-h-screen flex-col bg-slate-50">
      {/* Cover header */}
      <header className="relative overflow-hidden">
        {hero && (
          <Image
            src={hero.src}
            alt={hero.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: hero.objectPosition ?? "center" }}
          />
        )}
        <div
          className={
            hero
              ? "from-dark/75 via-dark/55 to-brand-green/70 absolute inset-0 bg-gradient-to-b"
              : "from-brand-green absolute inset-0 bg-gradient-to-br to-[#0c6438]"
          }
        />
        {hero && (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_30%_45%,rgba(15,23,42,0.5),rgba(15,23,42,0)_72%)]" />
        )}

        <div className="relative mx-auto w-full max-w-5xl px-4 pt-6 pb-10 md:px-8 md:pt-8 md:pb-14">
          <GuideBackLink
            fallbackHref={back.href}
            className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-2 text-sm font-medium text-white ring-1 ring-white/25 backdrop-blur-sm transition hover:bg-white/25 focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:outline-none"
          />

          <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-end">
            <div className="relative size-28 shrink-0 overflow-hidden rounded-2xl shadow-lg ring-4 ring-white/25 md:size-32">
              {guide.profile_photo_url ? (
                <Image
                  src={guide.profile_photo_url}
                  alt={guide.display_name}
                  fill
                  sizes="128px"
                  className="object-cover"
                />
              ) : (
                <div className="flex size-full items-center justify-center bg-white/20 text-3xl font-bold text-white">
                  {initialsOf(guide.display_name)}
                </div>
              )}
            </div>

            <div className="min-w-0">
              <p className="mb-1.5 text-xs font-semibold tracking-[0.18em] text-white/80 uppercase [text-shadow:0_1px_6px_rgba(0,0,0,0.4)]">
                Local guide
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="font-heading text-3xl font-semibold tracking-tight text-white [text-shadow:0_2px_16px_rgba(0,0,0,0.5)] md:text-4xl">
                  {guide.display_name}
                </h1>
                <VerifiedBadge className="bg-white/15 text-white" />
              </div>
              {where && (
                <p className="mt-2 flex items-center gap-1.5 text-sm text-white/90 [text-shadow:0_1px_8px_rgba(0,0,0,0.45)]">
                  <MapPin className="size-4" aria-hidden />
                  {where}
                </p>
              )}
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-white/90 [text-shadow:0_1px_8px_rgba(0,0,0,0.45)]">
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
            <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <h2 className="font-heading text-dark text-lg font-semibold">About</h2>
              <p className="mt-3 text-sm leading-relaxed text-pretty whitespace-pre-line text-slate-600">
                {guide.bio}
              </p>
            </section>
          )}

          {guide.specialties.length > 0 && (
            <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <h2 className="font-heading text-dark text-lg font-semibold">Specialties</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {guide.specialties.map((s) => (
                  <span
                    key={s}
                    className="bg-brand-green/10 text-brand-green rounded-full px-3 py-1 text-xs font-semibold"
                  >
                    {humanize(s)}
                  </span>
                ))}
              </div>
            </section>
          )}

          {facts.length > 0 && (
            <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <h2 className="font-heading text-dark text-lg font-semibold">Good to know</h2>
              <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {facts.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3">
                    <span className="bg-brand-green/10 flex size-9 shrink-0 items-center justify-center rounded-lg">
                      <Icon className="text-brand-green size-5" aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <dt className="text-xs font-medium tracking-wide text-slate-400 uppercase">
                        {label}
                      </dt>
                      <dd className="text-dark text-sm font-medium">{value}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            </section>
          )}

          {(guide.certifications || guide.certification_types.length > 0) && (
            <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <h2 className="font-heading text-dark flex items-center gap-2.5 text-lg font-semibold">
                <span className="bg-brand-green/10 flex size-9 shrink-0 items-center justify-center rounded-lg">
                  <Award className="text-brand-green size-5" aria-hidden />
                </span>
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
                <p className="mt-3 text-sm leading-relaxed text-pretty text-slate-600">
                  {guide.certifications}
                </p>
              )}
            </section>
          )}

          {guide.sustainability_tags.length > 0 && (
            <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <h2 className="font-heading text-dark flex items-center gap-2.5 text-lg font-semibold">
                <span className="bg-brand-green/10 flex size-9 shrink-0 items-center justify-center rounded-lg">
                  <Leaf className="text-brand-green size-5" aria-hidden />
                </span>
                Sustainability
              </h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {guide.sustainability_tags.map((t) => (
                  <span
                    key={t}
                    className="bg-brand-green/10 text-brand-green rounded-full px-3 py-1 text-xs font-semibold"
                  >
                    {humanize(t)}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Trips offered */}
          <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <h2 className="font-heading text-dark text-lg font-semibold">Trips offered</h2>
            {trips.length === 0 ? (
              <p className="mt-3 text-sm text-slate-500">
                This guide has no published trips yet — request a custom experience below.
              </p>
            ) : (
              <ul className="mt-4 flex flex-col gap-3">
                {trips.map((trip) => (
                  <li
                    key={trip.id}
                    className="flex items-center justify-between gap-4 rounded-xl border border-slate-100 p-4 transition-shadow hover:shadow-md"
                  >
                    <div className="min-w-0">
                      <p className="text-dark truncate font-semibold">{trip.title}</p>
                      <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Clock className="size-3.5" aria-hidden />
                          {trip.duration_days} {trip.duration_days === 1 ? "day" : "days"}
                        </span>
                        {trip.activity_type && (
                          <span className="bg-brand-green/10 text-brand-green rounded-full px-2 py-0.5 font-medium">
                            {humanize(trip.activity_type)}
                          </span>
                        )}
                        {trip.difficulty && <span>{humanize(trip.difficulty)}</span>}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <span className="text-dark text-sm font-bold">
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
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Starting from</p>
            <div className="mt-3 flex flex-col gap-3">
              <span className="flex items-center gap-2">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-slate-100">
                  <User className="size-4 text-slate-500" aria-hidden />
                </span>
                <span className="text-dark text-xl font-bold">
                  {guide.price_per_person != null ? `€${guide.price_per_person}` : "On request"}
                </span>
                <span className="text-xs text-slate-400">per person</span>
              </span>
              {guide.price_per_vehicle != null && (
                <span className="flex items-center gap-2">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-slate-100">
                    <Car className="size-4 text-slate-500" aria-hidden />
                  </span>
                  <span className="text-dark text-xl font-bold">€{guide.price_per_vehicle}</span>
                  <span className="text-xs text-slate-400">guide with car</span>
                </span>
              )}
            </div>

            <Link
              href="/contact"
              className="bg-brand-green focus-visible:ring-brand-green mt-5 flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0c6438] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              Request this guide
              <ArrowRight className="size-4" aria-hidden />
            </Link>

            <ul className="mt-6 flex flex-col gap-4 border-t border-slate-100 pt-5">
              {TRUST.map(({ icon: Icon, title, body }) => (
                <li key={title} className="flex items-start gap-3">
                  <span className="bg-brand-green/10 flex size-8 shrink-0 items-center justify-center rounded-lg">
                    <Icon className="text-brand-green size-4" aria-hidden />
                  </span>
                  <div>
                    <p className="text-dark text-sm font-semibold">{title}</p>
                    <p className="text-xs text-slate-500">{body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </main>
  );
}
