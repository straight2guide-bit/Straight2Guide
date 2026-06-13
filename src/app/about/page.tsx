import type { Metadata } from "next";
import { CheckCircle, Users, Globe, Leaf, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Straight2Guide connects travelers directly with verified local guides — cutting out agency fees and putting more into the hands of communities.",
};

const steps = [
  {
    n: "1",
    title: "Browse & discover",
    body: "Search destinations and explore profiles of verified local guides. Read reviews, check specialties, and find the perfect match for your journey.",
  },
  {
    n: "2",
    title: "Send a booking request",
    body: "Contact the guide directly with your travel dates and group size. No booking fees, no middlemen — just a direct conversation.",
  },
  {
    n: "3",
    title: "Travel with confidence",
    body: "Every guide on our platform is personally verified. You know exactly who is leading your trip, what they charge, and what is included.",
  },
];

const values = [
  {
    icon: Users,
    label: "Fair for guides",
    body: "Guides keep the majority of what they earn. No agency cuts, no hidden commissions.",
  },
  {
    icon: Globe,
    label: "Authentic for travelers",
    body: "Real local knowledge, not a scripted tour. Every guide lives and breathes their region.",
  },
  {
    icon: Leaf,
    label: "Good for the planet",
    body: "When guides depend on healthy ecosystems, tourism becomes a reason to protect them.",
  },
  {
    icon: CheckCircle,
    label: "Verified & trusted",
    body: "Every guide passes our identity and license check before appearing on the platform.",
  },
];

export default function AboutPage() {
  return (
    <main className="flex flex-1 flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden px-4 py-16 text-center md:px-8 md:py-20">
        <Image
          src="/country-heroes/bolivia-v1.jpg"
          alt="An overland 4x4 reflected on the Uyuni salt flat at dawn, Bolivia"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Scrim for text contrast — this image is bright/pastel, so darken evenly. */}
        <div className="from-dark/70 via-dark/60 to-brand-green/70 absolute inset-0 bg-gradient-to-b" />
        <div className="relative mx-auto max-w-3xl">
          <p className="mb-4 text-xs font-semibold tracking-[0.18em] text-white/80 uppercase">
            About Straight2Guide
          </p>
          <h1 className="font-heading mb-5 text-4xl font-semibold tracking-tight text-balance text-white md:text-5xl">
            Fair travel, straight to the guide.
          </h1>
          <p className="text-lg leading-relaxed text-pretty text-white/85">
            We built Straight2Guide because great travel doesn&apos;t need middlemen. Local guides
            deserve fair pay. Travelers deserve authentic experiences. We make both possible.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="bg-slate-50 px-4 py-16 md:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-brand-green mb-3 text-xs font-semibold tracking-[0.18em] uppercase">
                Who we are
              </p>
              <h2 className="font-heading text-dark mb-6 text-3xl font-semibold tracking-tight text-balance md:text-4xl">
                Our Story
              </h2>
              <div className="flex flex-col gap-4 text-base leading-relaxed text-pretty text-slate-600">
                <p>
                  Straight2Guide was born from a simple observation: the best travel moments happen
                  when you&apos;re with someone who genuinely loves where they live — a local guide
                  who knows the hidden waterfall, the right season for wildlife, the family
                  restaurant that doesn&apos;t appear on any app.
                </p>
                <p>
                  But traditional booking platforms skim 20–40% from every transaction. Guides work
                  hard; agencies profit. We flipped that model. On Straight2Guide, travelers connect
                  directly with guides. Guides set their own prices, own their schedule, and build
                  their reputation on their own terms.
                </p>
                <p className="text-brand-green font-medium">
                  Fair travel is better travel — for people, communities, and the planet.
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-sm ring-1 ring-slate-900/5">
              <Image
                src="/namibia-dunes.jpg"
                alt="Hikers on Namibia sand dunes"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-4 py-16 md:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <p className="text-brand-green mb-3 text-xs font-semibold tracking-[0.18em] uppercase">
              The process
            </p>
            <h2 className="font-heading text-dark mb-3 text-3xl font-semibold tracking-tight text-balance md:text-4xl">
              How it works
            </h2>
            <p className="text-slate-500">Three steps to an authentic journey.</p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {steps.map((s) => (
              <div
                key={s.n}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="bg-brand-green/10 text-brand-green mb-4 flex size-10 items-center justify-center rounded-full text-lg font-bold">
                  {s.n}
                </div>
                <h3 className="text-dark mb-2 font-semibold">{s.title}</h3>
                <p className="text-sm leading-relaxed text-pretty text-slate-600">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-slate-50 px-4 py-16 md:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <p className="text-brand-green mb-3 text-xs font-semibold tracking-[0.18em] uppercase">
              Our values
            </p>
            <h2 className="font-heading text-dark text-3xl font-semibold tracking-tight text-balance md:text-4xl">
              What we stand for
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {values.map(({ icon: Icon, label, body }) => (
              <div
                key={label}
                className="flex gap-4 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="bg-brand-green/10 flex size-11 shrink-0 items-center justify-center rounded-lg">
                  <Icon className="text-brand-green size-5" />
                </div>
                <div>
                  <p className="text-dark mb-1 font-semibold">{label}</p>
                  <p className="text-sm leading-relaxed text-pretty text-slate-600">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-16 text-center md:px-8">
        <div className="mx-auto max-w-xl">
          <h2 className="font-heading text-dark mb-4 text-3xl font-semibold tracking-tight text-balance md:text-4xl">
            Ready to explore?
          </h2>
          <p className="mb-8 leading-relaxed text-pretty text-slate-500">
            Browse destinations and connect directly with a verified local guide.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/explore"
              className="bg-brand-green focus-visible:ring-brand-green inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#0c6438] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              Start Exploring
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link
              href="/become-a-guide"
              className="border-brand-green bg-brand-green/10 text-brand-green hover:bg-brand-green/20 focus-visible:ring-brand-green inline-flex items-center justify-center gap-2 rounded-full border px-7 py-3.5 text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              Become a Guide
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
