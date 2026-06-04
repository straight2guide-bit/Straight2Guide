import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <>
      <h1 className="mb-2 text-2xl font-bold text-[#0F172A]">Privacy Policy</h1>
      <p className="mb-6 text-sm text-slate-400">Last updated: April 2026 — Placeholder for beta</p>
      <p className="text-slate-600">
        This Privacy Policy explains how Straight2Guide collects, uses, and protects your personal
        data in accordance with the General Data Protection Regulation (GDPR) and applicable law.
      </p>
      <h2 className="mt-8 mb-2 text-lg font-semibold text-[#0F172A]">Data we collect</h2>
      <ul className="list-disc space-y-1 pl-5 text-slate-600">
        <li>Account information: name, email address, role</li>
        <li>Guide profile data: bio, location, languages, certifications</li>
        <li>Booking request data: travel dates, traveler count, contact details</li>
        <li>Usage data: pages visited, search queries (via PostHog analytics)</li>
      </ul>
      <h2 className="mt-8 mb-2 text-lg font-semibold text-[#0F172A]">How we use it</h2>
      <p className="text-slate-600">
        We use your data to operate the platform, match travelers with guides, send booking
        confirmations, and improve our services. We do not sell your personal data to third parties.
      </p>
      <h2 className="mt-8 mb-2 text-lg font-semibold text-[#0F172A]">Your rights</h2>
      <p className="text-slate-600">
        Under GDPR you have the right to access, correct, or delete your personal data at any time.
        Contact us at privacy@straight2guide.com to exercise these rights.
      </p>
      <p className="mt-8 rounded-xl bg-amber-50 px-5 py-4 text-sm text-amber-700">
        <strong>Note:</strong> This is placeholder legal text for the beta phase. Final policy will
        be prepared with legal counsel before public launch.
      </p>
    </>
  );
}
