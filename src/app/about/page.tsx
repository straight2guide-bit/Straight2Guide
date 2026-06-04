import type { Metadata } from "next";
import { CheckCircle, Users, Globe, Leaf } from "lucide-react";
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
      <section className="bg-[#0E7A45] px-4 py-20 text-center md:px-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-4 text-4xl font-bold text-white">
            Fair travel, straight to the guide.
          </h1>
          <p className="text-lg text-white/80">
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
              <h2 className="mb-6 text-2xl font-bold text-[#0F172A]">Our Story</h2>
              <div className="flex flex-col gap-4 leading-relaxed text-slate-600">
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
                <p className="font-medium text-[#0E7A45]">
                  Fair travel is better travel — for people, communities, and the planet.
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
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
          <h2 className="mb-2 text-center text-2xl font-bold text-[#0F172A]">How it works</h2>
          <p className="mb-10 text-center text-slate-500">Three steps to an authentic journey.</p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n} className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#0E7A45] text-lg font-bold text-white">
                  {s.n}
                </div>
                <h3 className="mb-2 font-semibold text-[#0F172A]">{s.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-slate-50 px-4 py-16 md:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-10 text-center text-2xl font-bold text-[#0F172A]">What we stand for</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {values.map(({ icon: Icon, label, body }) => (
              <div key={label} className="flex gap-4 rounded-xl bg-white p-6 shadow-sm">
                <Icon className="mt-0.5 size-6 shrink-0 text-[#0E7A45]" />
                <div>
                  <p className="mb-1 font-semibold text-[#0F172A]">{label}</p>
                  <p className="text-sm leading-relaxed text-slate-600">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-16 text-center md:px-8">
        <div className="mx-auto max-w-xl">
          <h2 className="mb-4 text-2xl font-bold text-[#0F172A]">Ready to explore?</h2>
          <p className="mb-8 text-slate-500">
            Browse destinations and connect directly with a verified local guide.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/explore"
              className="rounded-full bg-[#0E7A45] px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
            >
              Start Exploring
            </Link>
            <Link
              href="/become-a-guide"
              className="rounded-full border border-[#0E7A45] px-6 py-3 text-sm font-semibold text-[#0E7A45] hover:bg-[#0E7A45]/5"
            >
              Become a Guide
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
