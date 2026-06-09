import type { Metadata } from "next";
import { CheckCircle, DollarSign, Calendar, Star, ShieldCheck } from "lucide-react";
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

export default function BecomeAGuidePage() {
  return (
    <main className="flex flex-1 flex-col">
      {/* Hero */}
      <section className="bg-[#0E7A45] px-4 py-20 md:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center">
            <div>
              <h1 className="mb-4 text-4xl font-bold text-white">
                Turn your local expertise into a thriving business.
              </h1>
              <p className="mb-8 text-lg text-white/80">
                Join guides in Africa, Asia, Europe, and the Americas who are earning more, working
                flexibly, and sharing their home with travelers who truly want to experience it.
              </p>
              <Link
                href="/auth/sign-up"
                className="inline-block rounded-full bg-white px-8 py-3 font-semibold text-[#0E7A45] hover:opacity-90"
              >
                Apply now — it&apos;s free
              </Link>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
              <Image
                src="/guide-andean.jpg"
                alt="Local guide leading a trek"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="px-4 py-16 md:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-2 text-center text-2xl font-bold text-[#0F172A]">
            Why guides choose Straight2Guide
          </h2>
          <p className="mb-10 text-center text-slate-500">
            Built by travelers who worked with guides. Designed to be fair from day one.
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {benefits.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="flex gap-4 rounded-xl border border-slate-100 bg-white p-6 shadow-sm"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0E7A45]/10">
                  <Icon className="size-5 text-[#0E7A45]" />
                </div>
                <div>
                  <p className="mb-1 font-semibold text-[#0F172A]">{title}</p>
                  <p className="text-sm leading-relaxed text-slate-600">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Verification steps */}
      <section className="bg-slate-50 px-4 py-16 md:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-10 text-center text-2xl font-bold text-[#0F172A]">
            How verification works
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {verificationSteps.map((s, i) => (
              <div key={s.label} className="rounded-xl bg-white p-6 shadow-sm">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#0E7A45] text-lg font-bold text-white">
                  {i + 1}
                </div>
                <p className="mb-2 font-semibold text-[#0F172A]">{s.label}</p>
                <p className="text-sm leading-relaxed text-slate-600">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What you need */}
      <section className="px-4 py-16 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 text-2xl font-bold text-[#0F172A]">What you&apos;ll need to apply</h2>
          <ul className="mb-10 inline-flex flex-col items-start gap-3 text-left">
            {[
              "A valid government-issued ID or passport",
              "A local guide license or relevant certification (where applicable)",
              "At least 1 year of guiding experience",
              "Fluency in English (additional languages are a bonus)",
              "A smartphone or computer to manage bookings",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-slate-600">
                <CheckCircle className="mt-0.5 size-5 shrink-0 text-[#0E7A45]" />
                {item}
              </li>
            ))}
          </ul>
          <Link
            href="/auth/sign-up"
            className="inline-block rounded-full bg-[#0E7A45] px-8 py-3 font-semibold text-white hover:opacity-90"
          >
            Start your application
          </Link>
          <p className="mt-4 text-sm text-slate-400">
            Questions?{" "}
            <Link href="/contact" className="text-[#0E7A45] underline underline-offset-2">
              Contact us
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
