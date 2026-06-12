import Image from "next/image";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";

const guideBullets = [
  "Fairer Earnings",
  "Manage Bookings",
  "Build Reputation",
  "Flexible Scheduling",
];
const travelerBullets = [
  "Verified Guides",
  "Transparent Pricing",
  "Authentic Experiences",
  "Direct Contact",
  "Positive Impact",
];

export function EmpoweringSection() {
  return (
    <section className="border-t border-slate-200 px-4 py-16 md:px-8">
      <div className="mx-auto max-w-5xl">
        <p className="text-brand-green mb-4 text-sm font-semibold tracking-[0.2em] uppercase">
          Our Mission
        </p>
        <h2 className="font-heading text-dark text-3xl font-semibold tracking-tight text-balance md:text-4xl">
          Empowering Guides, Enriching Travelers
        </h2>
        <p className="mt-4 mb-10 max-w-2xl text-lg leading-relaxed text-pretty text-slate-600">
          Fair, authentic, and sustainable journeys — straight to the guide.
        </p>

        <div className="mb-10 grid grid-cols-2 gap-4">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-100">
            <Image
              src="/guide-andean.jpg"
              alt="A local Andean guide in the Peruvian highlands"
              fill
              priority
              sizes="(max-width: 768px) 50vw, 480px"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-100">
            <Image
              src="/rainbow-mountain-group.jpg"
              alt="Group of travelers at Rainbow Mountain, Peru"
              fill
              priority
              sizes="(max-width: 768px) 50vw, 480px"
              className="object-cover"
            />
          </div>
        </div>

        {/* Two columns */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div className="flex flex-col items-center">
            <h3 className="text-brand-green mb-5 text-base font-semibold tracking-[0.12em] uppercase">
              For Guides
            </h3>
            <ul className="mb-8 flex flex-col gap-3 text-left">
              {guideBullets.map((b) => (
                <li key={b} className="flex items-center gap-3 text-[15px] text-slate-700">
                  <span className="bg-brand-green/10 flex size-5 shrink-0 items-center justify-center rounded-full">
                    <Check className="text-brand-green size-3" strokeWidth={3} />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
            <Link
              href="/become-a-guide"
              className="border-brand-green bg-brand-green/10 text-brand-green hover:bg-brand-green/20 focus-visible:ring-brand-green mt-auto inline-flex items-center justify-center gap-2 rounded-full border px-7 py-3.5 text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              Become a Guide
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-brand-green mb-5 text-base font-semibold tracking-[0.12em] uppercase">
              For Travelers
            </h3>
            <ul className="mb-8 flex flex-col gap-3 text-left">
              {travelerBullets.map((b) => (
                <li key={b} className="flex items-center gap-3 text-[15px] text-slate-700">
                  <span className="bg-brand-green/10 flex size-5 shrink-0 items-center justify-center rounded-full">
                    <Check className="text-brand-green size-3" strokeWidth={3} />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
            <Link
              href="/explore"
              className="border-brand-green bg-brand-green/10 text-brand-green hover:bg-brand-green/20 focus-visible:ring-brand-green mt-auto inline-flex items-center justify-center gap-2 rounded-full border px-7 py-3.5 text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              Start Exploring
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
