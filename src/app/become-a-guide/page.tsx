import type { Metadata } from "next";
import { CheckCircle, DollarSign, Calendar, Star, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Become a Guide",
  description:
    "Join Straight2Guide as a verified local guide. Set your own prices, manage your schedule, and connect directly with travelers from around the world.",
};

const benefits = [
  {
    icon: DollarSign,
    title: "Fairer earnings",
    body: "Keep significantly more of every booking. No agency taking 20–40% — you set your price and we keep our fee transparent and low.",
  },
  {
    icon: Calendar,
    title: "Flexible scheduling",
    body: "You decide when you work. Block off dates, set availability, and accept only the trips that work for you.",
  },
  {
    icon: Star,
    title: "Build your reputation",
    body: "Verified reviews from real travelers build your profile over time. A strong reputation means more bookings at the prices you deserve.",
  },
  {
    icon: ShieldCheck,
    title: "Verified & trusted",
    body: "Our verification badge signals to travelers that you are a legitimate, licensed professional — increasing trust and conversion.",
  },
];

const verificationSteps = [
  {
    label: "Submit your application",
    body: "Fill in your profile, region, languages, and experience. Upload your guide license or certification.",
  },
  {
    label: "We review your documents",
    body: "Our team verifies your identity and credentials. This typically takes 2–5 business days.",
  },
  {
    label: "Get your Verified badge",
    body: "Once approved, your profile goes live and you start receiving booking requests from travelers worldwide.",
  },
];

const requirements = [
  "A valid government-issued ID or passport",
  "A local guide license or relevant certification (where applicable)",
  "At least 1 year of guiding experience",
  "Fluency in English (additional languages are a bonus)",
  "A smartphone or computer to manage bookings",
];

export default function BecomeAGuidePage() {
  return (
    <main className="flex flex-1 flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden px-4 py-16 text-center md:px-8 md:py-20">
        <Image
          src="/become-a-guide-hero.jpg"
          alt="A guided rope team traversing a snowy ridge high in the mountains"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Scrims for text contrast over the photo. */}
        <div className="from-dark/75 via-dark/60 to-brand-green/70 absolute inset-0 bg-gradient-to-b" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_60%_at_50%_45%,rgba(15,23,42,0.55),rgba(15,23,42,0)_72%)]" />
        <div className="relative mx-auto max-w-3xl">
          <Image
            src="/logo-white-notext.png"
            alt="Straight2Guide"
            width={80}
            height={80}
            priority
            className="mx-auto mb-6 h-16 w-16 md:h-20 md:w-20"
          />
          <p className="mb-4 text-xs font-semibold tracking-[0.18em] text-white/90 uppercase [text-shadow:0_1px_8px_rgba(0,0,0,0.5)]">
            For Guides
          </p>
          <h1 className="font-heading mb-5 text-4xl font-semibold tracking-tight text-balance text-white [text-shadow:0_2px_18px_rgba(0,0,0,0.55)] md:text-5xl">
            Guide on your terms.
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-pretty text-white/95 [text-shadow:0_1px_12px_rgba(0,0,0,0.5)]">
            Earn more, work flexibly, and meet travelers who genuinely want your local expertise —
            no middlemen, ever.
          </p>
          <Link
            href="/auth/sign-up"
            className="bg-brand-green focus-visible:ring-brand-green inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#0c6438] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            Apply now — it&apos;s free
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </section>

      {/* Benefits */}
      <section className="px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <p className="text-brand-green mb-3 text-xs font-semibold tracking-[0.18em] uppercase">
              Why join
            </p>
            <h2 className="font-heading text-dark mb-3 text-3xl font-semibold tracking-tight text-balance md:text-4xl">
              Why guides choose Straight2Guide
            </h2>
            <p className="text-pretty text-slate-500">
              Built by travelers who worked with guides. Designed to be fair from day one.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {benefits.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="flex gap-4 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="bg-brand-green/10 flex size-11 shrink-0 items-center justify-center rounded-lg">
                  <Icon className="text-brand-green size-5" aria-hidden />
                </div>
                <div>
                  <p className="text-dark mb-1 font-semibold">{title}</p>
                  <p className="text-sm leading-relaxed text-pretty text-slate-600">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Verification steps */}
      <section className="bg-slate-50 px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <p className="text-brand-green mb-3 text-xs font-semibold tracking-[0.18em] uppercase">
              The process
            </p>
            <h2 className="font-heading text-dark text-3xl font-semibold tracking-tight text-balance md:text-4xl">
              How verification works
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {verificationSteps.map((s, i) => (
              <div
                key={s.label}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="bg-brand-green/10 text-brand-green mb-4 flex size-10 items-center justify-center rounded-full text-lg font-bold">
                  {i + 1}
                </div>
                <h3 className="text-dark mb-2 font-semibold">{s.label}</h3>
                <p className="text-sm leading-relaxed text-pretty text-slate-600">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What you need */}
      <section className="px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-brand-green mb-3 text-xs font-semibold tracking-[0.18em] uppercase">
            Requirements
          </p>
          <h2 className="font-heading text-dark mb-6 text-3xl font-semibold tracking-tight text-balance md:text-4xl">
            What you&apos;ll need to apply
          </h2>
          <ul className="mb-10 inline-flex flex-col items-start gap-3 text-left">
            {requirements.map((item) => (
              <li key={item} className="flex items-start gap-3 text-pretty text-slate-600">
                <CheckCircle className="text-brand-green mt-0.5 size-5 shrink-0" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
          <div>
            <Link
              href="/auth/sign-up"
              className="bg-brand-green focus-visible:ring-brand-green inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#0c6438] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              Start your application
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
          <p className="mt-4 text-sm text-slate-400">
            Questions?{" "}
            <Link
              href="/contact"
              className="text-brand-green underline underline-offset-2 hover:text-[#0c6438]"
            >
              Contact us
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
