import type { Metadata } from "next";

export const metadata: Metadata = { title: "Cookie Policy" };

export default function CookiesPage() {
  return (
    <>
      <h1 className="mb-2 text-2xl font-bold text-[#0F172A]">Cookie Policy</h1>
      <p className="mb-6 text-sm text-slate-400">Last updated: April 2026 — Placeholder for beta</p>
      <p className="text-slate-600">
        Straight2Guide uses cookies and similar technologies to keep you signed in, remember your
        preferences, and understand how visitors use the platform.
      </p>
      <h2 className="mt-8 mb-2 text-lg font-semibold text-[#0F172A]">Cookies we use</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-slate-600">
          <thead>
            <tr className="border-b border-slate-100 text-left text-xs font-semibold tracking-wider text-slate-400 uppercase">
              <th className="pr-4 pb-2">Cookie</th>
              <th className="pr-4 pb-2">Purpose</th>
              <th className="pb-2">Duration</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            <tr>
              <td className="py-2 pr-4 font-mono text-xs">sb-auth-token</td>
              <td className="py-2 pr-4">Authentication session (Supabase)</td>
              <td className="py-2">Session</td>
            </tr>
            <tr>
              <td className="py-2 pr-4 font-mono text-xs">ph_*</td>
              <td className="py-2 pr-4">Analytics (PostHog) — page views and events</td>
              <td className="py-2">1 year</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-8 rounded-xl bg-amber-50 px-5 py-4 text-sm text-amber-700">
        <strong>Note:</strong> This is placeholder legal text for the beta phase. Final policy will
        be prepared with legal counsel before public launch.
      </p>
    </>
  );
}
