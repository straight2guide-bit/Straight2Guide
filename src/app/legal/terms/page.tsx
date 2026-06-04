import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <>
      <h1 className="mb-2 text-2xl font-bold text-[#0F172A]">Terms of Service</h1>
      <p className="mb-6 text-sm text-slate-400">Last updated: April 2026 — Placeholder for beta</p>
      <p className="text-slate-600">
        These Terms of Service govern your use of the Straight2Guide platform. By accessing or using
        our services you agree to be bound by these terms.
      </p>
      <h2 className="mt-8 mb-2 text-lg font-semibold text-[#0F172A]">1. Platform role</h2>
      <p className="text-slate-600">
        Straight2Guide is a marketplace that connects travelers with independent local guides. We
        are not a party to the travel contract between traveler and guide. We provide the platform,
        payment processing infrastructure, and verification services only.
      </p>
      <h2 className="mt-8 mb-2 text-lg font-semibold text-[#0F172A]">2. User accounts</h2>
      <p className="text-slate-600">
        You must be at least 18 years old to create an account. You are responsible for maintaining
        the confidentiality of your credentials and for all activity that occurs under your account.
      </p>
      <h2 className="mt-8 mb-2 text-lg font-semibold text-[#0F172A]">3. Guide verification</h2>
      <p className="text-slate-600">
        Straight2Guide verifies guide identities and credentials to the best of its ability.
        Verification does not constitute an endorsement or guarantee of service quality. Travelers
        are encouraged to read guide profiles and reviews before booking.
      </p>
      <p className="mt-8 rounded-xl bg-amber-50 px-5 py-4 text-sm text-amber-700">
        <strong>Note:</strong> This is placeholder legal text for the beta phase. Final terms will
        be prepared with legal counsel before public launch.
      </p>
    </>
  );
}
