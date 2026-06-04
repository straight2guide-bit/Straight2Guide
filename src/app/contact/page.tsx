import type { Metadata } from "next";
import { Mail, MessageSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the Straight2Guide team. We're here to help travelers and guides with any questions.",
};

const reasons = [
  "Question about a booking",
  "Guide application enquiry",
  "Report a problem",
  "Partnership or press",
  "Other",
];

export default function ContactPage() {
  return (
    <main className="flex flex-1 flex-col">
      {/* Header */}
      <section className="bg-slate-50 px-4 pt-16 pb-10 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-3 text-3xl font-bold text-[#0F172A]">Get in touch</h1>
          <p className="text-slate-500">
            We typically reply within one business day. For guide-related questions, please include
            your guide ID or application reference if you have one.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="flex-1 px-4 py-12 md:px-8">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
            {/* Coming-soon notice */}
            <div className="mb-8 flex items-start gap-3 rounded-xl bg-[#0E7A45]/5 px-5 py-4">
              <MessageSquare className="mt-0.5 size-5 shrink-0 text-[#0E7A45]" />
              <p className="text-sm text-slate-600">
                Our contact form is launching shortly. In the meantime, reach us directly at{" "}
                <a
                  href="mailto:hello@straight2guide.com"
                  className="font-medium text-[#0E7A45] underline underline-offset-2"
                >
                  hello@straight2guide.com
                </a>
              </p>
            </div>

            <form className="flex flex-col gap-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-slate-700">
                    Full name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    disabled
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-400 outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-sm font-medium text-slate-700"
                  >
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    disabled
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-400 outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="reason" className="mb-1.5 block text-sm font-medium text-slate-700">
                  Reason for contact
                </label>
                <select
                  id="reason"
                  name="reason"
                  disabled
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-400 outline-none"
                >
                  {reasons.map((r) => (
                    <option key={r}>{r}</option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Tell us how we can help…"
                  disabled
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-400 outline-none"
                />
              </div>

              <button
                type="submit"
                disabled
                className="w-full cursor-not-allowed rounded-full bg-[#0E7A45] py-3 text-sm font-semibold text-white opacity-40"
              >
                Send message
              </button>
            </form>
          </div>

          {/* Direct email fallback */}
          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-slate-500">
            <Mail className="size-4 text-[#0E7A45]" />
            <span>
              Or email us directly:{" "}
              <a
                href="mailto:hello@straight2guide.com"
                className="font-medium text-[#0E7A45] underline underline-offset-2"
              >
                hello@straight2guide.com
              </a>
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
