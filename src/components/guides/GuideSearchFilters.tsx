"use client";

import { useState } from "react";
import { useQueryStates } from "nuqs";
import { Accordion } from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import { FilterSection, FilterCheckbox } from "./FilterSection";
import { guideSearchParsers } from "@/lib/guides/searchParams";

// ─── Constants ────────────────────────────────────────────────────────────────

const PRICE_MIN = 0;
const PRICE_MAX = 600;

const SPECIALTY_OPTIONS = [
  "Wildlife",
  "Birdwatching",
  "Jaguars",
  "Photography",
  "Plants & Botany",
  "Fishing",
  "Hiking",
  "Conservation",
  "Local Culture",
  "Indigenous Culture",
  "Night Safari",
  "Boat Tours",
  "Horseback Riding",
  "Adventure",
  "River Safari",
  "Family-friendly",
  "Luxury",
  "Food & Cuisine",
] as const;

const LANGUAGE_OPTIONS = [
  "English",
  "Portuguese",
  "Spanish",
  "Dutch",
  "French",
  "German",
  "Italian",
] as const;

const TRANSPORT_OPTIONS = [
  { value: "private-vehicle", label: "Private vehicle" },
  { value: "shared-vehicle", label: "Shared vehicle" },
  { value: "4x4", label: "4×4" },
  { value: "boat", label: "Boat" },
  { value: "airport-pickup", label: "Airport pickup" },
] as const;

const CERTIFICATION_OPTIONS = [
  { value: "licensed-guide", label: "Licensed guide" },
  { value: "first-aid", label: "First-aid trained" },
  { value: "eco-certified", label: "Eco-certified" },
  { value: "conservation-trained", label: "Conservation-trained" },
  { value: "community-guide", label: "Community guide" },
] as const;

const SUITABLE_FOR_OPTIONS = [
  { value: "solo", label: "Solo travelers" },
  { value: "families", label: "Families" },
  { value: "seniors", label: "Seniors" },
  { value: "photographers", label: "Photographers" },
  { value: "birders", label: "Birders" },
  { value: "researchers", label: "Researchers" },
  { value: "honeymooners", label: "Honeymooners" },
  { value: "backpackers", label: "Backpackers" },
  { value: "luxury", label: "Luxury travelers" },
] as const;

const SUSTAINABILITY_OPTIONS = [
  { value: "locally-owned", label: "Locally owned" },
  { value: "community-based", label: "Community-based" },
  { value: "conservation-focused", label: "Conservation-focused" },
  { value: "low-impact", label: "Low-impact" },
  { value: "wildlife-ethical", label: "Wildlife ethical" },
  { value: "supports-local", label: "Supports local projects" },
  { value: "no-animal-exploitation", label: "No animal exploitation" },
  { value: "plastic-conscious", label: "Plastic-conscious" },
] as const;

const LOCAL_ORIGIN_OPTIONS = [
  { value: "born-in-region", label: "Born in the region" },
  { value: "lives-locally", label: "Lives locally" },
  { value: "community-based", label: "Community-based guide" },
  { value: "indigenous", label: "Indigenous / local community" },
] as const;

const GROUP_SIZE_OPTIONS = [
  { value: "1-2", label: "1–2 people" },
  { value: "3-4", label: "3–4 people" },
  { value: "5-6", label: "5–6 people" },
  { value: "7+", label: "7+ people" },
] as const;

const VEHICLE_CAPACITY_OPTIONS = [
  { value: 2, label: "2 seats" },
  { value: 4, label: "4 seats" },
  { value: 6, label: "6 seats" },
  { value: 8, label: "8+ seats" },
] as const;

const EXPERIENCE_OPTIONS = [
  { value: "1-3", label: "1–3 years" },
  { value: "4-7", label: "4–7 years" },
  { value: "8-15", label: "8–15 years" },
  { value: "15+", label: "15+ years" },
] as const;

// Accordion sections open by default vs collapsed
const DEFAULT_OPEN = [
  "Region",
  "Availability",
  "Guide Price",
  "Vehicle Price",
  "Group Size",
  "Transport Options",
];

// ─── Tag chip component ────────────────────────────────────────────────────────

function TagChip({
  label,
  selected,
  onToggle,
  disabled,
}: {
  label: string;
  selected: boolean;
  onToggle: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={disabled}
      className={`rounded-full border px-2.5 py-1 text-xs font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
        selected
          ? "border-[#0E7A45] bg-[#0E7A45] text-white"
          : "border-slate-200 bg-white text-slate-600 hover:border-[#0E7A45] hover:text-[#0E7A45]"
      }`}
    >
      {label}
    </button>
  );
}

// ─── Section divider label ─────────────────────────────────────────────────────

function SectionDividerLabel({ label }: { label: string }) {
  return (
    <p className="px-4 pt-5 pb-1 text-[10px] font-semibold tracking-widest text-slate-400 uppercase">
      {label}
    </p>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────

interface Region {
  id: string;
  name: string;
  slug: string;
}

interface GuideSearchFiltersProps {
  regions: Region[];
}

export function GuideSearchFilters({ regions }: GuideSearchFiltersProps) {
  // shallow: false so applying a filter re-runs the server component and
  // re-fetches guides — without it the URL updates but results stay stale.
  const [filters, setFilters] = useQueryStates(guideSearchParsers, { shallow: false });

  const [guidePriceLocal, setGuidePriceLocal] = useState([
    filters.minGuidePrice,
    filters.maxGuidePrice,
  ]);
  const [vehiclePriceLocal, setVehiclePriceLocal] = useState([
    filters.minVehiclePrice,
    filters.maxVehiclePrice,
  ]);

  function toggle<T>(arr: T[], value: T): T[] {
    return arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
  }

  async function handleReset() {
    setGuidePriceLocal([PRICE_MIN, PRICE_MAX]);
    setVehiclePriceLocal([PRICE_MIN, PRICE_MAX]);
    await setFilters({
      regions: [],
      availableOnDates: false,
      minGuidePrice: PRICE_MIN,
      maxGuidePrice: PRICE_MAX,
      minVehiclePrice: PRICE_MIN,
      maxVehiclePrice: PRICE_MAX,
      groupSize: [],
      vehicleCapacity: [],
      transportOptions: [],
      specialties: [],
      languages: [],
      experienceRange: [],
      certificationTypes: [],
      suitableFor: [],
      localOrigin: [],
      sustainabilityTags: [],
      certified: false,
    });
  }

  return (
    <div className="flex flex-col">
      {/* Panel header */}
      <div className="flex items-center justify-between pb-3">
        <span className="text-sm font-bold text-[#0F172A]">Filters</span>
        <button
          type="button"
          onClick={handleReset}
          className="text-xs font-medium text-[#0E7A45] underline-offset-2 transition-colors hover:underline"
        >
          Reset all
        </button>
      </div>

      <Accordion multiple defaultValue={DEFAULT_OPEN} className="w-full">
        {/* ── LOCATION ────────────────────────────── */}
        {regions.length > 0 && (
          <FilterSection title="Region">
            <FilterCheckbox
              id="region-all"
              label="All regions"
              checked={filters.regions.length === 0}
              onCheckedChange={() => setFilters({ regions: [] })}
            />
            {regions.map((r) => (
              <FilterCheckbox
                key={r.id}
                id={`region-${r.slug}`}
                label={r.name}
                checked={filters.regions.includes(r.slug)}
                onCheckedChange={() => setFilters({ regions: toggle(filters.regions, r.slug) })}
              />
            ))}
          </FilterSection>
        )}

        {/* ── AVAILABILITY ────────────────────────── */}
        <FilterSection title="Availability">
          <FilterCheckbox
            id="avail-dates"
            label="Available on selected dates"
            checked={filters.availableOnDates}
            onCheckedChange={(v) => setFilters({ availableOnDates: v })}
          />
          <FilterCheckbox
            id="avail-flexible"
            label="Flexible dates"
            checked={false}
            onCheckedChange={() => {}}
            disabled
          />
          <FilterCheckbox
            id="avail-instant"
            label="Instant confirmation"
            checked={false}
            onCheckedChange={() => {}}
            disabled
          />
          <FilterCheckbox
            id="avail-week"
            label="Available this week"
            checked={false}
            onCheckedChange={() => {}}
            disabled
          />
          <FilterCheckbox
            id="avail-next-month"
            label="Available next month"
            checked={false}
            onCheckedChange={() => {}}
            disabled
          />
        </FilterSection>

        {/* ── PRICING ─────────────────────────────── */}
        <FilterSection title="Guide Price">
          <Slider
            value={guidePriceLocal}
            min={PRICE_MIN}
            max={PRICE_MAX}
            step={10}
            onValueChange={(v) => setGuidePriceLocal(v)}
            onValueCommitted={(v) => {
              const lo = v[0] ?? PRICE_MIN;
              const hi = v[1] ?? PRICE_MAX;
              setFilters({ minGuidePrice: lo, maxGuidePrice: hi });
            }}
          />
          <div className="mt-1 flex justify-between text-xs text-slate-500">
            <span>${guidePriceLocal[0]}</span>
            <span>${guidePriceLocal[1]}</span>
          </div>
        </FilterSection>

        <FilterSection title="Vehicle Price">
          <Slider
            value={vehiclePriceLocal}
            min={PRICE_MIN}
            max={PRICE_MAX}
            step={10}
            onValueChange={(v) => setVehiclePriceLocal(v)}
            onValueCommitted={(v) => {
              const lo = v[0] ?? PRICE_MIN;
              const hi = v[1] ?? PRICE_MAX;
              setFilters({ minVehiclePrice: lo, maxVehiclePrice: hi });
            }}
          />
          <div className="mt-1 flex justify-between text-xs text-slate-500">
            <span>${vehiclePriceLocal[0]}</span>
            <span>${vehiclePriceLocal[1]}</span>
          </div>
        </FilterSection>

        {/* ── GROUP & TRANSPORT ────────────────────── */}
        <FilterSection title="Group Size">
          {GROUP_SIZE_OPTIONS.map((opt) => (
            <FilterCheckbox
              key={opt.value}
              id={`group-${opt.value}`}
              label={opt.label}
              checked={filters.groupSize.includes(opt.value)}
              onCheckedChange={() =>
                setFilters({ groupSize: toggle(filters.groupSize, opt.value) })
              }
            />
          ))}
        </FilterSection>

        <FilterSection title="Transport Options">
          <div className="flex flex-wrap gap-1.5">
            {TRANSPORT_OPTIONS.map((opt) => (
              <TagChip
                key={opt.value}
                label={opt.label}
                selected={filters.transportOptions.includes(opt.value)}
                onToggle={() =>
                  setFilters({ transportOptions: toggle(filters.transportOptions, opt.value) })
                }
              />
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Vehicle Capacity">
          {VEHICLE_CAPACITY_OPTIONS.map((opt) => (
            <FilterCheckbox
              key={opt.value}
              id={`cap-${opt.value}`}
              label={opt.label}
              checked={filters.vehicleCapacity.includes(opt.value)}
              onCheckedChange={() =>
                setFilters({ vehicleCapacity: toggle(filters.vehicleCapacity, opt.value) })
              }
            />
          ))}
        </FilterSection>

        {/* ── EXPERTISE ───────────────────────────── */}
        <FilterSection title="Specialties">
          <div className="flex flex-wrap gap-1.5">
            {SPECIALTY_OPTIONS.map((s) => (
              <TagChip
                key={s}
                label={s}
                selected={filters.specialties.includes(s)}
                onToggle={() => setFilters({ specialties: toggle(filters.specialties, s) })}
              />
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Languages">
          <div className="flex flex-wrap gap-1.5">
            {LANGUAGE_OPTIONS.map((lang) => (
              <TagChip
                key={lang}
                label={lang}
                selected={filters.languages.includes(lang)}
                onToggle={() => setFilters({ languages: toggle(filters.languages, lang) })}
              />
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Years of Experience">
          {EXPERIENCE_OPTIONS.map((opt) => (
            <FilterCheckbox
              key={opt.value}
              id={`exp-${opt.value}`}
              label={opt.label}
              checked={filters.experienceRange.includes(opt.value)}
              onCheckedChange={() =>
                setFilters({ experienceRange: toggle(filters.experienceRange, opt.value) })
              }
            />
          ))}
        </FilterSection>

        {/* ── TRUST & QUALITY ──────────────────────── */}
        <FilterSection title="Certification">
          <div className="flex flex-wrap gap-1.5">
            {CERTIFICATION_OPTIONS.map((opt) => (
              <TagChip
                key={opt.value}
                label={opt.label}
                selected={filters.certificationTypes.includes(opt.value)}
                onToggle={() =>
                  setFilters({ certificationTypes: toggle(filters.certificationTypes, opt.value) })
                }
              />
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Suitable For">
          <div className="flex flex-wrap gap-1.5">
            {SUITABLE_FOR_OPTIONS.map((opt) => (
              <TagChip
                key={opt.value}
                label={opt.label}
                selected={filters.suitableFor.includes(opt.value)}
                onToggle={() => setFilters({ suitableFor: toggle(filters.suitableFor, opt.value) })}
              />
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Local Origin">
          {LOCAL_ORIGIN_OPTIONS.map((opt) => (
            <FilterCheckbox
              key={opt.value}
              id={`origin-${opt.value}`}
              label={opt.label}
              checked={filters.localOrigin.includes(opt.value)}
              onCheckedChange={() =>
                setFilters({ localOrigin: toggle(filters.localOrigin, opt.value) })
              }
            />
          ))}
        </FilterSection>

        {/* ── SUSTAINABILITY ───────────────────────── */}
        <FilterSection title="Sustainability">
          <div className="flex flex-wrap gap-1.5">
            {SUSTAINABILITY_OPTIONS.map((opt) => (
              <TagChip
                key={opt.value}
                label={opt.label}
                selected={filters.sustainabilityTags.includes(opt.value)}
                onToggle={() =>
                  setFilters({ sustainabilityTags: toggle(filters.sustainabilityTags, opt.value) })
                }
              />
            ))}
          </div>
        </FilterSection>

        {/* ── PLACEHOLDERS (coming soon) ───────────── */}
        <FilterSection title="Rating">
          <p className="text-xs text-slate-400 italic">Available once reviews are live</p>
          <div className="pointer-events-none flex flex-wrap gap-1.5 opacity-40 select-none">
            {["4.8+", "4.5+", "4.0+", "New guide"].map((r) => (
              <TagChip key={r} label={r} selected={false} onToggle={() => {}} disabled />
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Reviews">
          <p className="text-xs text-slate-400 italic">Available once reviews are live</p>
          <div className="pointer-events-none flex flex-wrap gap-1.5 opacity-40 select-none">
            {["10+ reviews", "25+ reviews", "50+ reviews", "New but verified"].map((r) => (
              <TagChip key={r} label={r} selected={false} onToggle={() => {}} disabled />
            ))}
          </div>
        </FilterSection>
      </Accordion>
    </div>
  );
}
