"use client";

import { useState } from "react";
import { useQueryStates } from "nuqs";
import Image from "next/image";
import { Search, X, SlidersHorizontal, CalendarDays } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { guideSearchParsers } from "@/lib/guides/searchParams";
import { getCountryHero } from "@/config/countryHeroes";
import { GuideSearchFilters } from "./GuideSearchFilters";

interface Region {
  id: string;
  name: string;
  slug: string;
}

interface GuideSearchHeaderProps {
  regions: Region[];
}

// Capitalize the first letter of every word, splitting on spaces and hyphens
// so "south-africa" -> "South-Africa" and "south africa" -> "South Africa".
function titleCase(s: string) {
  return s.replace(/(^|[\s-])([a-z])/g, (_, sep: string, ch: string) => sep + ch.toUpperCase());
}

// Each entry draws one flag inside a 10×7 tile at the origin.
// South + Central American countries. Add more continents later.
const FLAG_TILES: Record<string, React.ReactNode> = {
  // ── South America ──────────────────────────────────────────────
  brazil: (
    <>
      <rect width="10" height="7" fill="#009C3B" />
      <polygon points="5,0.5 9.5,3.5 5,6.5 0.5,3.5" fill="#FFDF00" />
      <circle cx="5" cy="3.5" r="2" fill="#002776" />
    </>
  ),
  peru: (
    <>
      <rect width="10" height="7" fill="#FFFFFF" />
      <rect width="3.33" height="7" fill="#D91023" />
      <rect x="6.67" width="3.33" height="7" fill="#D91023" />
    </>
  ),
  bolivia: (
    <>
      <rect width="10" height="2.33" fill="#DA291C" />
      <rect y="2.33" width="10" height="2.34" fill="#F4E400" />
      <rect y="4.67" width="10" height="2.33" fill="#007934" />
    </>
  ),
  colombia: (
    <>
      <rect width="10" height="3.5" fill="#FCD116" />
      <rect y="3.5" width="10" height="1.75" fill="#003893" />
      <rect y="5.25" width="10" height="1.75" fill="#CE1126" />
    </>
  ),
  argentina: (
    <>
      <rect width="10" height="7" fill="#FFFFFF" />
      <rect width="10" height="2.33" fill="#74ACDF" />
      <rect y="4.67" width="10" height="2.33" fill="#74ACDF" />
      <circle cx="5" cy="3.5" r="0.85" fill="#F6B40E" />
    </>
  ),
  chile: (
    <>
      <rect width="10" height="7" fill="#FFFFFF" />
      <rect y="3.5" width="10" height="3.5" fill="#D52B1E" />
      <rect width="3.5" height="3.5" fill="#0039A6" />
      <circle cx="1.75" cy="1.75" r="0.8" fill="#FFFFFF" />
    </>
  ),
  // ── Central America ────────────────────────────────────────────
  "el-salvador": (
    <>
      <rect width="10" height="7" fill="#FFFFFF" />
      <rect width="10" height="2.33" fill="#0F47AF" />
      <rect y="4.67" width="10" height="2.33" fill="#0F47AF" />
    </>
  ),
  "costa-rica": (
    <>
      <rect width="10" height="7" fill="#002B7F" />
      <rect y="1.17" width="10" height="4.66" fill="#FFFFFF" />
      <rect y="2.33" width="10" height="2.34" fill="#CE1126" />
    </>
  ),
  guatemala: (
    <>
      <rect width="10" height="7" fill="#FFFFFF" />
      <rect width="3.33" height="7" fill="#4997D0" />
      <rect x="6.67" width="3.33" height="7" fill="#4997D0" />
    </>
  ),
  panama: (
    <>
      <rect width="10" height="7" fill="#FFFFFF" />
      <rect x="5" width="5" height="3.5" fill="#DA121A" />
      <rect y="3.5" width="5" height="3.5" fill="#072357" />
      <circle cx="2.5" cy="1.75" r="0.6" fill="#072357" />
      <circle cx="7.5" cy="5.25" r="0.6" fill="#DA121A" />
    </>
  ),
  nicaragua: (
    <>
      <rect width="10" height="7" fill="#FFFFFF" />
      <rect width="10" height="2.33" fill="#0067C6" />
      <rect y="4.67" width="10" height="2.33" fill="#0067C6" />
      <polygon points="5,2.7 6,4.3 4,4.3" fill="#0067C6" opacity="0.5" />
    </>
  ),
  belize: (
    <>
      <rect width="10" height="7" fill="#003F87" />
      <rect width="10" height="0.7" fill="#CE1126" />
      <rect y="6.3" width="10" height="0.7" fill="#CE1126" />
      <circle cx="5" cy="3.5" r="2" fill="#FFFFFF" />
    </>
  ),
  // ── Africa ─────────────────────────────────────────────────────
  "south-africa": (
    <>
      {/* Horizontal bands: red top, white, green middle, white, blue bottom */}
      <rect width="10" height="1.75" fill="#007A4D" />
      <rect y="1.75" width="10" height="0.35" fill="#FFFFFF" />
      <rect y="2.1" width="10" height="2.8" fill="#DE3831" />
      <rect y="4.9" width="10" height="0.35" fill="#FFFFFF" />
      <rect y="5.25" width="10" height="1.75" fill="#002395" />
      {/* Y-shape: black triangle + yellow border + green horizontal */}
      <polygon points="0,0 3.5,3.5 0,7" fill="#000000" />
      <polygon points="0,0 0.6,0 3.8,3.5 0.6,7 0,7" fill="#FFB612" />
      <rect y="3.1" width="3.8" height="0.8" fill="#007A4D" />
    </>
  ),
  kenya: (
    <>
      <rect width="10" height="2.33" fill="#006600" />
      <rect y="2.33" width="10" height="2.34" fill="#BB0000" />
      <rect y="4.67" width="10" height="2.33" fill="#000000" />
      <rect y="2.1" width="10" height="0.4" fill="#FFFFFF" />
      <rect y="4.5" width="10" height="0.4" fill="#FFFFFF" />
      {/* Maasai shield */}
      <ellipse cx="5" cy="3.5" rx="0.8" ry="1.4" fill="#FFFFFF" />
      <ellipse cx="5" cy="3.5" rx="0.5" ry="1.0" fill="#BB0000" />
      <line x1="5" y1="1.8" x2="5" y2="5.2" stroke="#000000" strokeWidth="0.15" />
    </>
  ),
  tanzania: (
    <>
      {/* Diagonal: green top-left, blue bottom-right, yellow/black stripe */}
      <polygon points="0,0 10,0 10,2.5 0,7" fill="#1EB53A" />
      <polygon points="0,7 10,7 10,4.5 0,0" fill="#009FDA" />
      <polygon points="0,0 0,1.2 10,5.7 10,4.5" fill="#FCD116" />
      <polygon points="0,1.2 0,2.4 10,6.9 10,5.7" fill="#000000" />
    </>
  ),
  namibia: (
    <>
      {/* Diagonal: blue top-left, red bottom-right, white/green stripe */}
      <polygon points="0,0 10,0 10,3 0,7" fill="#003580" />
      <polygon points="0,7 10,7 10,4 0,0" fill="#CC0000" />
      <polygon points="0,0 0,1.2 10,5 10,3" fill="#FFFFFF" />
      <polygon points="0,1.2 0,2.4 10,6.2 10,5" fill="#009A44" />
      {/* Sun */}
      <circle cx="2.5" cy="2.2" r="0.9" fill="#FFCD00" />
      <circle cx="2.5" cy="2.2" r="0.5" fill="#FFCD00" stroke="#CC6600" strokeWidth="0.1" />
    </>
  ),
  zambia: (
    <>
      <rect width="10" height="7" fill="#198A00" />
      {/* Right-side stripes */}
      <rect x="7" width="1" height="7" fill="#DE0000" />
      <rect x="8" width="1" height="7" fill="#000000" />
      <rect x="9" width="1" height="7" fill="#EF7D00" />
      {/* Eagle (simplified) */}
      <circle cx="8.5" cy="1.5" r="0.5" fill="#EF7D00" />
      <line x1="7.5" y1="1.5" x2="9.5" y2="1.5" stroke="#EF7D00" strokeWidth="0.3" />
    </>
  ),
  botswana: (
    <>
      <rect width="10" height="7" fill="#75AADB" />
      <rect y="2.8" width="10" height="0.6" fill="#FFFFFF" />
      <rect y="3.1" width="10" height="0.8" fill="#000000" />
      <rect y="3.6" width="10" height="0.6" fill="#FFFFFF" />
    </>
  ),
  // ── Asia ───────────────────────────────────────────────────────
  china: (
    <>
      <rect width="10" height="7" fill="#DE2910" />
      <polygon
        points="1.5,0.8 1.85,1.9 2.9,1.9 2.05,2.55 2.35,3.65 1.5,3.0 0.65,3.65 0.95,2.55 0.1,1.9 1.15,1.9"
        fill="#FFDE00"
      />
      <polygon
        points="3.2,0.5 3.4,1.1 4,1.1 3.5,1.45 3.7,2.05 3.2,1.7 2.7,2.05 2.9,1.45 2.4,1.1 3,1.1"
        fill="#FFDE00"
      />
      <polygon
        points="4,1.5 4.2,2.1 4.8,2.1 4.3,2.45 4.5,3.05 4,2.7 3.5,3.05 3.7,2.45 3.2,2.1 3.8,2.1"
        fill="#FFDE00"
      />
      <polygon
        points="3.2,2.8 3.4,3.4 4,3.4 3.5,3.75 3.7,4.35 3.2,4.0 2.7,4.35 2.9,3.75 2.4,3.4 3,3.4"
        fill="#FFDE00"
      />
    </>
  ),
  vietnam: (
    <>
      <rect width="10" height="7" fill="#DA251D" />
      <polygon
        points="5,1.2 5.55,2.85 7.3,2.85 5.9,3.85 6.45,5.5 5,4.5 3.55,5.5 4.1,3.85 2.7,2.85 4.45,2.85"
        fill="#FFFF00"
      />
    </>
  ),
  thailand: (
    <>
      <rect width="10" height="7" fill="#A51931" />
      <rect y="1.17" width="10" height="1.17" fill="#F4F5F8" />
      <rect y="2.34" width="10" height="2.32" fill="#2D2A4A" />
      <rect y="4.66" width="10" height="1.17" fill="#F4F5F8" />
    </>
  ),
  indonesia: (
    <>
      <rect width="10" height="3.5" fill="#CE1126" />
      <rect y="3.5" width="10" height="3.5" fill="#FFFFFF" />
    </>
  ),
  philippines: (
    <>
      <rect width="10" height="3.5" fill="#0038A8" />
      <rect y="3.5" width="10" height="3.5" fill="#CE1126" />
      <polygon points="0,0 4.5,3.5 0,7" fill="#FFFFFF" />
      <circle cx="2" cy="3.5" r="0.8" fill="#FCD116" />
      <circle cx="1.1" cy="1.5" r="0.25" fill="#FCD116" />
      <circle cx="3.5" cy="1.0" r="0.25" fill="#FCD116" />
      <circle cx="3.5" cy="6.0" r="0.25" fill="#FCD116" />
      <circle cx="1.1" cy="5.5" r="0.25" fill="#FCD116" />
    </>
  ),
  india: (
    <>
      <rect width="10" height="2.33" fill="#FF9933" />
      <rect y="2.33" width="10" height="2.34" fill="#FFFFFF" />
      <rect y="4.67" width="10" height="2.33" fill="#138808" />
      <circle cx="5" cy="3.5" r="0.9" fill="none" stroke="#000080" strokeWidth="0.2" />
      <circle cx="5" cy="3.5" r="0.2" fill="#000080" />
    </>
  ),
  // ── Oceania ────────────────────────────────────────────────────
  australia: (
    <>
      <rect width="10" height="7" fill="#00008B" />
      <rect width="5" height="3.5" fill="#00008B" />
      {/* Union Jack simplified */}
      <line x1="0" y1="0" x2="5" y2="3.5" stroke="#FFFFFF" strokeWidth="1.4" />
      <line x1="5" y1="0" x2="0" y2="3.5" stroke="#FFFFFF" strokeWidth="1.4" />
      <line x1="0" y1="0" x2="5" y2="3.5" stroke="#CC0000" strokeWidth="0.7" />
      <line x1="5" y1="0" x2="0" y2="3.5" stroke="#CC0000" strokeWidth="0.7" />
      <rect x="2" y="0" width="1" height="3.5" fill="#FFFFFF" />
      <rect x="0" y="1.25" width="5" height="1" fill="#FFFFFF" />
      <rect x="2.2" y="0" width="0.6" height="3.5" fill="#CC0000" />
      <rect x="0" y="1.45" width="5" height="0.6" fill="#CC0000" />
      {/* Southern Cross — 4 stars */}
      <circle cx="7.5" cy="1.5" r="0.25" fill="#FFFFFF" />
      <circle cx="8.5" cy="2.8" r="0.25" fill="#FFFFFF" />
      <circle cx="7" cy="3.5" r="0.25" fill="#FFFFFF" />
      <circle cx="8.2" cy="4.2" r="0.25" fill="#FFFFFF" />
    </>
  ),
  "new-zealand": (
    <>
      <rect width="10" height="7" fill="#00247D" />
      {/* Union Jack simplified */}
      <line x1="0" y1="0" x2="5" y2="3.5" stroke="#FFFFFF" strokeWidth="1.4" />
      <line x1="5" y1="0" x2="0" y2="3.5" stroke="#FFFFFF" strokeWidth="1.4" />
      <line x1="0" y1="0" x2="5" y2="3.5" stroke="#CC0000" strokeWidth="0.7" />
      <line x1="5" y1="0" x2="0" y2="3.5" stroke="#CC0000" strokeWidth="0.7" />
      <rect x="2" y="0" width="1" height="3.5" fill="#FFFFFF" />
      <rect x="0" y="1.25" width="5" height="1" fill="#FFFFFF" />
      <rect x="2.2" y="0" width="0.6" height="3.5" fill="#CC0000" />
      <rect x="0" y="1.45" width="5" height="0.6" fill="#CC0000" />
      {/* Southern Cross — 4 red stars */}
      <circle cx="7.5" cy="1.2" r="0.3" fill="#CC0000" stroke="#FFFFFF" strokeWidth="0.1" />
      <circle cx="8.5" cy="2.5" r="0.3" fill="#CC0000" stroke="#FFFFFF" strokeWidth="0.1" />
      <circle cx="7" cy="3.5" r="0.3" fill="#CC0000" stroke="#FFFFFF" strokeWidth="0.1" />
      <circle cx="8.3" cy="4.5" r="0.3" fill="#CC0000" stroke="#FFFFFF" strokeWidth="0.1" />
    </>
  ),
  fiji: (
    <>
      <rect width="10" height="7" fill="#68BFE5" />
      {/* Union Jack top-left */}
      <rect width="5" height="3.5" fill="#003087" />
      <line x1="0" y1="0" x2="5" y2="3.5" stroke="#FFFFFF" strokeWidth="1.2" />
      <line x1="5" y1="0" x2="0" y2="3.5" stroke="#FFFFFF" strokeWidth="1.2" />
      <line x1="0" y1="0" x2="5" y2="3.5" stroke="#CC0000" strokeWidth="0.6" />
      <line x1="5" y1="0" x2="0" y2="3.5" stroke="#CC0000" strokeWidth="0.6" />
      <rect x="1.9" y="0" width="1.2" height="3.5" fill="#FFFFFF" />
      <rect x="0" y="1.15" width="5" height="1.2" fill="#FFFFFF" />
      <rect x="2.15" y="0" width="0.7" height="3.5" fill="#CC0000" />
      <rect x="0" y="1.4" width="5" height="0.7" fill="#CC0000" />
      {/* Shield (simplified white) */}
      <rect x="6" y="1.5" width="3" height="4" rx="0.5" fill="#FFFFFF" />
      <rect x="6" y="1.5" width="3" height="2" rx="0.3" fill="#003087" />
    </>
  ),
  "papua-new-guinea": (
    <>
      {/* Diagonal split: top-right black, bottom-left red */}
      <polygon points="10,0 10,7 0,7" fill="#CC0000" />
      <polygon points="0,0 10,0 0,7" fill="#000000" />
      {/* Yellow bird of paradise (simplified) */}
      <circle cx="3" cy="2" r="0.8" fill="#FCD116" />
      <line x1="3" y1="1.2" x2="2" y2="0.3" stroke="#FCD116" strokeWidth="0.3" />
      <line x1="3" y1="1.2" x2="4" y2="0.3" stroke="#FCD116" strokeWidth="0.3" />
      {/* Southern Cross — white stars */}
      <circle cx="7.5" cy="1.5" r="0.28" fill="#FFFFFF" />
      <circle cx="8.5" cy="3" r="0.22" fill="#FFFFFF" />
      <circle cx="7" cy="4" r="0.28" fill="#FFFFFF" />
      <circle cx="8.3" cy="5" r="0.22" fill="#FFFFFF" />
      <circle cx="6.5" cy="5.5" r="0.18" fill="#FFFFFF" />
    </>
  ),
  vanuatu: (
    <>
      {/* Green top half, red bottom half */}
      <rect width="10" height="3.5" fill="#009543" />
      <rect y="3.5" width="10" height="3.5" fill="#CE1126" />
      {/* Black triangle on left */}
      <polygon points="0,0 3.8,3.5 0,7" fill="#000000" />
      {/* Yellow Y-shape divider */}
      <line x1="0" y1="3.5" x2="4" y2="3.5" stroke="#FCD116" strokeWidth="0.5" />
      <line x1="4" y1="3.5" x2="7" y2="1" stroke="#FCD116" strokeWidth="0.5" />
      <line x1="4" y1="3.5" x2="7" y2="6" stroke="#FCD116" strokeWidth="0.5" />
      {/* Boar tusk emblem (simplified circle) */}
      <circle cx="1.8" cy="3.5" r="1" fill="none" stroke="#FCD116" strokeWidth="0.35" />
    </>
  ),
  // ── Europe ─────────────────────────────────────────────────────
  italy: (
    <>
      <rect width="3.33" height="7" fill="#009246" />
      <rect x="3.33" width="3.34" height="7" fill="#FFFFFF" />
      <rect x="6.67" width="3.33" height="7" fill="#CE2B37" />
    </>
  ),
  france: (
    <>
      <rect width="3.33" height="7" fill="#002395" />
      <rect x="3.33" width="3.34" height="7" fill="#FFFFFF" />
      <rect x="6.67" width="3.33" height="7" fill="#ED2939" />
    </>
  ),
  spain: (
    <>
      <rect width="10" height="7" fill="#AA151B" />
      <rect y="1.75" width="10" height="3.5" fill="#F1BF00" />
    </>
  ),
  portugal: (
    <>
      <rect width="4" height="7" fill="#006600" />
      <rect x="4" width="6" height="7" fill="#FF0000" />
      <circle cx="4" cy="3.5" r="1.2" fill="#FFFF00" />
    </>
  ),
  norway: (
    <>
      <rect width="10" height="7" fill="#EF2B2D" />
      <rect x="2.5" width="1.5" height="7" fill="#FFFFFF" />
      <rect y="2.75" width="10" height="1.5" fill="#FFFFFF" />
      <rect x="2.75" width="1" height="7" fill="#002868" />
      <rect y="3" width="10" height="1" fill="#002868" />
    </>
  ),
  germany: (
    <>
      <rect width="10" height="2.33" fill="#000000" />
      <rect y="2.33" width="10" height="2.34" fill="#DD0000" />
      <rect y="4.67" width="10" height="2.33" fill="#FFCE00" />
    </>
  ),
  // ── North America ──────────────────────────────────────────────
  usa: (
    <>
      <rect width="10" height="7" fill="#B22234" />
      {[0.538, 1.615, 2.692, 3.769, 4.846, 5.923].map((y) => (
        <rect key={y} y={y} width="10" height="0.538" fill="#FFFFFF" />
      ))}
      <rect width="4" height="3.77" fill="#3C3B6E" />
      {[0.7, 1.6, 2.5, 3.3].map((cx) =>
        [0.8, 1.7, 2.7].map((cy) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="0.18" fill="#FFFFFF" />
        ))
      )}
    </>
  ),
  canada: (
    <>
      <rect width="10" height="7" fill="#FFFFFF" />
      <rect width="2.5" height="7" fill="#D52B1E" />
      <rect x="7.5" width="2.5" height="7" fill="#D52B1E" />
      <polygon
        points="5,1.5 5.2,2.5 6.1,2.2 5.7,3.1 6.7,3.0 6.0,3.7 7.0,4.0 5.3,4.0 5.5,5.5 5,5.0 4.5,5.5 4.7,4.0 3.0,4.0 4.0,3.7 3.3,3.0 4.3,3.1 3.9,2.2 4.8,2.5"
        fill="#D52B1E"
      />
    </>
  ),
  mexico: (
    <>
      <rect width="10" height="7" fill="#FFFFFF" />
      <rect width="3.33" height="7" fill="#006847" />
      <rect x="6.67" width="3.33" height="7" fill="#CE1126" />
      <circle cx="5" cy="3.5" r="0.55" fill="#8B5A2B" />
    </>
  ),
  cuba: (
    <>
      <rect width="10" height="7" fill="#FFFFFF" />
      {[0, 2.8, 5.6].map((y) => (
        <rect key={y} y={y} width="10" height="1.4" fill="#002A8F" />
      ))}
      <polygon points="0,0 0,7 3.8,3.5" fill="#CF142B" />
      <circle cx="1.2" cy="3.5" r="0.6" fill="#FFFFFF" />
    </>
  ),
  "dominican-republic": (
    <>
      <rect width="10" height="7" fill="#FFFFFF" />
      <rect width="4.25" height="3" fill="#002D62" />
      <rect x="5.75" width="4.25" height="3" fill="#CE1126" />
      <rect y="4" width="4.25" height="3" fill="#CE1126" />
      <rect x="5.75" y="4" width="4.25" height="3" fill="#002D62" />
    </>
  ),
};

// 4 flags in a single horizontal row — the header crops to the central band,
// giving a clean repeating flag stripe behind the logo.
function FlagBackground({ country }: { country: string }) {
  const key = country.trim().toLowerCase().replace(/\s+/g, "-");
  const tile = FLAG_TILES[key];

  if (tile) {
    return (
      <svg
        viewBox="0 0 40 7"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
        style={{ opacity: 0.28 }}
      >
        {[0, 10, 20, 30].map((x) => (
          <g key={x} transform={`translate(${x},0)`}>
            {tile}
          </g>
        ))}
      </svg>
    );
  }

  return (
    <div
      className="absolute inset-0"
      style={{
        backgroundImage:
          "repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(255,255,255,0.045) 10px, rgba(255,255,255,0.045) 11px)",
      }}
    />
  );
}

// Iconic country photo as the banner background, with a brand-green/dark
// gradient wash so the white logo and search card stay legible.
// Falls back to the flag-stripe pattern for countries without a photo yet.
function HeroBackground({ country }: { country: string }) {
  const hero = getCountryHero(country);

  if (!hero) {
    return <FlagBackground country={country} />;
  }

  return (
    <>
      <Image
        src={hero.src}
        alt={hero.alt}
        fill
        priority
        sizes="100vw"
        className="animate-ken-burns origin-center object-cover motion-reduce:animate-none"
        style={{ objectPosition: hero.objectPosition ?? "center" }}
      />
      {/* Directional scrim: light at the top (behind logo), heavier at the
          bottom (behind the floating search card). Photo stays true-colour
          through the middle. */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/65" />
      {/* Vignette: darkens the edges so every photo is framed consistently. */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.4)_100%)]" />
      <span className="absolute top-2 right-3 z-10 text-[10px] font-medium tracking-wider text-white/75 uppercase">
        {hero.landmark}
      </span>
    </>
  );
}

export function GuideSearchHeader({ regions }: GuideSearchHeaderProps) {
  const [filters, setFilters] = useQueryStates(guideSearchParsers);
  const [countryInput, setCountryInput] = useState(titleCase(filters.country));

  function handleCountrySubmit(e: React.FormEvent) {
    e.preventDefault();
    setFilters({ country: countryInput.toLowerCase().trim() });
  }

  function handleCountryClear() {
    setCountryInput("");
    setFilters({ country: "" });
  }

  return (
    <div className="relative overflow-hidden bg-[#0E7A45]">
      {/* ── Country-themed background ─────────────────────────────── */}
      <HeroBackground country={filters.country} />

      {/* ── Content ───────────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-8 md:px-8">
        {/* Logo — white, centered, compact */}
        <div className="flex justify-center pt-6 pb-3">
          <Image
            src="/logo-transparent.png"
            alt="Straight2Guide"
            width={180}
            height={65}
            quality={100}
            priority
            style={{
              width: "auto",
              height: "auto",
              maxWidth: "180px",
              filter: "brightness(0) invert(1)",
            }}
          />
        </div>

        {/* ── Floating white search card — unchanged ──────────────── */}
        <div className="mx-auto max-w-3xl">
          <div className="mb-[-28px] rounded-2xl bg-white px-4 py-4 shadow-2xl ring-1 ring-black/5 md:px-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-center">
              {/* Destination input */}
              <form
                onSubmit={handleCountrySubmit}
                className="flex flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 transition-all focus-within:border-[#0E7A45] focus-within:ring-2 focus-within:ring-[#0E7A45]/20"
              >
                <Search className="size-4 shrink-0 text-slate-400" />
                <input
                  type="text"
                  value={countryInput}
                  onChange={(e) => setCountryInput(e.target.value)}
                  placeholder="Where are you going?"
                  className="flex-1 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
                />
                {countryInput && (
                  <button
                    type="button"
                    onClick={handleCountryClear}
                    className="text-slate-400 transition-colors hover:text-slate-600"
                    aria-label="Clear"
                  >
                    <X className="size-3.5" />
                  </button>
                )}
              </form>

              {/* Date range */}
              <div className="flex gap-2">
                <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 transition-all focus-within:border-[#0E7A45] focus-within:ring-2 focus-within:ring-[#0E7A45]/20">
                  <CalendarDays className="size-4 shrink-0 text-slate-400" />
                  <input
                    type="date"
                    value={filters.start}
                    onChange={(e) => setFilters({ start: e.target.value })}
                    className="w-32 bg-transparent text-sm text-slate-700 outline-none"
                  />
                </div>
                <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 transition-all focus-within:border-[#0E7A45] focus-within:ring-2 focus-within:ring-[#0E7A45]/20">
                  <CalendarDays className="size-4 shrink-0 text-slate-400" />
                  <input
                    type="date"
                    value={filters.end}
                    onChange={(e) => setFilters({ end: e.target.value })}
                    className="w-32 bg-transparent text-sm text-slate-700 outline-none"
                  />
                </div>
              </div>

              {/* Mobile filter trigger */}
              <Sheet>
                <SheetTrigger
                  render={
                    <Button
                      variant="outline"
                      size="sm"
                      className="shrink-0 gap-1.5 border-[#0E7A45] text-[#0E7A45] hover:bg-[#0E7A45]/5 md:hidden"
                    >
                      <SlidersHorizontal className="size-4" />
                      Filters
                    </Button>
                  }
                />
                <SheetContent side="left" className="w-[88vw] max-w-sm overflow-y-auto p-0">
                  <SheetHeader className="border-b border-slate-100 px-4 py-3">
                    <SheetTitle className="text-base font-semibold text-[#0F172A]">
                      Filters
                    </SheetTitle>
                  </SheetHeader>
                  <div className="p-4">
                    <GuideSearchFilters regions={regions} />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
