import { Skeleton } from "@/components/ui/skeleton";

export default function GuidesLoading() {
  return (
    <main className="bg-surface flex min-h-screen flex-col">
      {/* Header skeleton */}
      <div className="sticky top-0 z-30 border-b border-slate-100 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 md:px-8">
          <Skeleton className="h-10 w-64 rounded-full" />
          <Skeleton className="hidden h-10 w-36 rounded-lg sm:block" />
          <Skeleton className="hidden h-10 w-36 rounded-lg sm:block" />
          <Skeleton className="ml-auto hidden h-10 w-28 rounded-lg md:block" />
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-7xl flex-1 gap-6 px-4 py-6 md:px-8">
        {/* Filter sidebar skeleton */}
        <aside className="hidden w-60 shrink-0 space-y-4 md:block">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-lg" />
          ))}
        </aside>

        {/* Results skeleton */}
        <section className="flex-1">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-[112px] rounded-xl" />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
