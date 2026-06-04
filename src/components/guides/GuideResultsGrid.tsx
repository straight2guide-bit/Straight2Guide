import { GuideCard } from "./GuideCard";
import { Skeleton } from "@/components/ui/skeleton";
import type { GuideSearchResult } from "@/lib/supabase/types";

interface GuideResultsGridProps {
  guides: GuideSearchResult[];
  loading?: boolean;
  country?: string;
}

// Capitalize the first letter of every word, splitting on spaces and hyphens
// so "south-africa" -> "South-Africa" and "south africa" -> "South Africa".
function titleCase(s: string) {
  return s.replace(/(^|[\s-])([a-z])/g, (_, sep: string, ch: string) => sep + ch.toUpperCase());
}

export function GuideResultsGrid({ guides, loading = false, country }: GuideResultsGridProps) {
  if (loading) {
    return (
      <div>
        <Skeleton className="mb-5 h-5 w-48 rounded" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-[120px] rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  const contextLabel = country ? ` in ${titleCase(country)}` : "";

  return (
    <div>
      {/* Results context bar */}
      <div className="mb-5 flex items-center justify-between">
        <p className="text-sm text-slate-500">
          <span className="font-semibold text-[#0F172A]">{guides.length}</span> guide
          {guides.length !== 1 ? "s" : ""} found{contextLabel}
        </p>
      </div>

      {guides.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 py-20 text-center">
          <p className="text-base font-semibold text-[#0F172A]">No guides found</p>
          <p className="mt-1 text-sm text-slate-500">
            Try adjusting your filters or searching a different destination.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {guides.map((guide) => (
            <GuideCard key={guide.id} guide={guide} />
          ))}
        </div>
      )}
    </div>
  );
}
