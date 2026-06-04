"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import Image from "next/image";
import { GlobeVisual } from "./GlobeVisual";

export function HeroGlobeSearch() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/guides?country=${encodeURIComponent(query.trim().toLowerCase())}`);
    }
  }

  return (
    <section className="relative w-full overflow-hidden bg-white">
      {/* Logo */}
      <div className="flex justify-center pt-12 pb-6">
        <Image
          src="/logo.png"
          alt="Straight2Guide"
          width={180}
          height={65}
          priority
          loading="eager"
          style={{ width: "auto", height: "auto", maxWidth: "180px" }}
        />
      </div>

      {/* Search bubble */}
      <div className="flex justify-center px-4 pb-8">
        <form onSubmit={handleSearch} className="w-full max-w-md">
          <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 shadow-sm">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Where do you want to travel?"
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
            <button type="submit" aria-label="Search">
              <Search className="size-4 text-slate-400" />
            </button>
          </div>
        </form>
      </div>

      {/* Globe */}
      <GlobeVisual />
    </section>
  );
}
