import { parseAsString, parseAsInteger, parseAsBoolean, parseAsArrayOf } from "nuqs/server";

export const guideSearchParsers = {
  country: parseAsString.withDefault(""),
  regions: parseAsArrayOf(parseAsString).withDefault([]),
  start: parseAsString.withDefault(""),
  end: parseAsString.withDefault(""),
  availableOnDates: parseAsBoolean.withDefault(false),
  minGuidePrice: parseAsInteger.withDefault(0),
  maxGuidePrice: parseAsInteger.withDefault(600),
  minVehiclePrice: parseAsInteger.withDefault(0),
  maxVehiclePrice: parseAsInteger.withDefault(600),
  groupSize: parseAsArrayOf(parseAsString).withDefault([]),
  vehicleCapacity: parseAsArrayOf(parseAsInteger).withDefault([]),
  transportOptions: parseAsArrayOf(parseAsString).withDefault([]),
  specialties: parseAsArrayOf(parseAsString).withDefault([]),
  languages: parseAsArrayOf(parseAsString).withDefault([]),
  experienceRange: parseAsArrayOf(parseAsString).withDefault([]),
  certificationTypes: parseAsArrayOf(parseAsString).withDefault([]),
  suitableFor: parseAsArrayOf(parseAsString).withDefault([]),
  localOrigin: parseAsArrayOf(parseAsString).withDefault([]),
  sustainabilityTags: parseAsArrayOf(parseAsString).withDefault([]),
  certified: parseAsBoolean.withDefault(false),
};

export type GuideFilters = {
  country: string;
  regions: string[];
  start: string;
  end: string;
  availableOnDates: boolean;
  minGuidePrice: number;
  maxGuidePrice: number;
  minVehiclePrice: number;
  maxVehiclePrice: number;
  groupSize: string[];
  vehicleCapacity: number[];
  transportOptions: string[];
  specialties: string[];
  languages: string[];
  experienceRange: string[];
  certificationTypes: string[];
  suitableFor: string[];
  localOrigin: string[];
  sustainabilityTags: string[];
  certified: boolean;
};
