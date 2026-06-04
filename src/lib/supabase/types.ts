export type {
  User,
  Region,
  GuideProfile,
  Trip,
  AvailabilityBlock,
  BookingRequest,
  ContactMessage,
  MediaAsset,
} from "./database.types";

export type GuideSearchResult = {
  id: string;
  display_name: string;
  slug: string;
  profile_photo_url: string | null;
  price_per_person: number | null;
  price_per_vehicle: number | null;
  vehicle_capacity: number | null;
  specialties: string[];
  certifications: string | null;
  region: { id: string; name: string; slug: string } | null;
  min_group_size: number | null;
  max_group_size: number | null;
};
