-- Add pricing and vehicle capacity fields to guide_profiles
-- price_per_person: guide's daily or per-person rate shown on search cards
-- price_per_vehicle: optional vehicle/transport rate shown on search cards
-- vehicle_capacity: number of seats in guide's vehicle (for group size filter)

alter table public.guide_profiles
  add column price_per_person  numeric(10, 2),
  add column price_per_vehicle numeric(10, 2),
  add column vehicle_capacity  integer
    check (vehicle_capacity is null or vehicle_capacity > 0);

create index on public.guide_profiles (price_per_person);
create index on public.guide_profiles (price_per_vehicle);
create index on public.guide_profiles (vehicle_capacity);
