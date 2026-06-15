"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

interface GuideBackLinkProps {
  // Where to go when there's no in-app history to return to (e.g. the profile
  // was opened directly from a shared link). Should be the guide's country page.
  fallbackHref: string;
  className?: string;
}

// "Back" returns to whatever page the visitor came from — the country/region
// search page if they searched, or the homepage if they arrived from a featured
// guide. Falls back to the country page on a direct/first-entry load.
export function GuideBackLink({ fallbackHref, className }: GuideBackLinkProps) {
  const router = useRouter();

  function handleBack() {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push(fallbackHref);
    }
  }

  return (
    <button type="button" onClick={handleBack} className={className}>
      <ArrowLeft className="size-4" aria-hidden />
      Back
    </button>
  );
}
