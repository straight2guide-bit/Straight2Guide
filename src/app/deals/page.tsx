import type { Metadata } from "next";
import { Tag } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Deals & Featured Trips",
  description:
    "Discover featured trips and special offers from verified local guides around the world.",
};

export default function DealsPage() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center md:px-8">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#F28C28]/10">
          <Tag className="size-8 text-[#F28C28]" />
        </div>
        <h1 className="mb-3 text-3xl font-bold text-[#0F172A]">Featured trips coming soon</h1>
        <p className="mb-8 max-w-md text-slate-500">
          We&apos;re curating exceptional trips from our verified guide network. Check back soon —
          or browse all destinations now.
        </p>
        <Link
          href="/explore"
          className="rounded-full bg-[#0E7A45] px-8 py-3 text-sm font-semibold text-white hover:opacity-90"
        >
          Explore destinations
        </Link>
      </section>
    </main>
  );
}
