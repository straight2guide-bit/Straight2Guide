import type { Metadata } from "next";

export const metadata: Metadata = { title: "Cancellation Policy" };

export default function CancellationPage() {
  return (
    <>
      <h1 className="mb-2 text-2xl font-bold text-[#0F172A]">Cancellation Policy</h1>
      <p className="mb-6 text-sm text-slate-400">Last updated: April 2026 — Placeholder for beta</p>
      <p className="text-slate-600">
        Cancellation terms are agreed between the traveler and the guide at the time of booking.
        Straight2Guide provides the following baseline guidelines.
      </p>
      <h2 className="mt-8 mb-2 text-lg font-semibold text-[#0F172A]">Traveler cancellations</h2>
      <ul className="list-disc space-y-2 pl-5 text-slate-600">
        <li>
          <strong>More than 30 days before departure:</strong> Full refund of any deposit paid.
        </li>
        <li>
          <strong>14–30 days before departure:</strong> 50% refund of deposit.
        </li>
        <li>
          <strong>Less than 14 days before departure:</strong> No refund unless the guide agrees
          otherwise.
        </li>
      </ul>
      <h2 className="mt-8 mb-2 text-lg font-semibold text-[#0F172A]">Guide cancellations</h2>
      <p className="text-slate-600">
        If a guide cancels a confirmed booking, the traveler receives a full refund. Repeated guide
        cancellations may result in suspension from the platform.
      </p>
      <h2 className="mt-8 mb-2 text-lg font-semibold text-[#0F172A]">Force majeure</h2>
      <p className="text-slate-600">
        Cancellations due to natural disasters, political unrest, or government travel advisories
        are assessed on a case-by-case basis. We encourage both parties to arrange appropriate
        travel insurance.
      </p>
      <p className="mt-8 rounded-xl bg-amber-50 px-5 py-4 text-sm text-amber-700">
        <strong>Note:</strong> This is placeholder legal text for the beta phase. Final policy will
        be prepared with legal counsel before public launch.
      </p>
    </>
  );
}
