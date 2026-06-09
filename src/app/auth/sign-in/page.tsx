import type { Metadata } from "next";
import Link from "next/link";
import { LogIn } from "lucide-react";

export const metadata: Metadata = {
  title: "Log In",
  description: "Guide and admin accounts are coming soon to Straight2Guide.",
};

export default function SignInPage() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center md:px-8">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#0E7A45]/10">
          <LogIn className="size-8 text-[#0E7A45]" />
        </div>
        <h1 className="mb-3 text-3xl font-bold text-[#0F172A]">Accounts are coming soon</h1>
        <p className="mb-8 max-w-md text-slate-500">
          Guide and admin sign-in is on the way. In the meantime, browse our verified guides or get
          in touch — no account needed to plan a trip.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/guides"
            className="rounded-full bg-[#0E7A45] px-8 py-3 text-sm font-semibold text-white hover:opacity-90"
          >
            Browse guides
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-slate-200 px-8 py-3 text-sm font-semibold text-[#0F172A] hover:bg-slate-50"
          >
            Contact us
          </Link>
        </div>
      </section>
    </main>
  );
}
