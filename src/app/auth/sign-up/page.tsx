import type { Metadata } from "next";
import Link from "next/link";
import { UserPlus } from "lucide-react";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Guide applications are opening soon at Straight2Guide.",
};

export default function SignUpPage() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center md:px-8">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#0E7A45]/10">
          <UserPlus className="size-8 text-[#0E7A45]" />
        </div>
        <h1 className="mb-3 text-3xl font-bold text-[#0F172A]">Guide sign-up coming soon</h1>
        <p className="mb-8 max-w-md text-slate-500">
          We&apos;re putting the finishing touches on guide onboarding. Learn how it works, or reach
          out and we&apos;ll let you know the moment applications open.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/become-a-guide"
            className="rounded-full bg-[#0E7A45] px-8 py-3 text-sm font-semibold text-white hover:opacity-90"
          >
            Why become a guide
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
