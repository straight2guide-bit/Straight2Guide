-- Enable UUID extension
create extension if not exists "pgcrypto";

-- ─────────────────────────────────────────────────────────────────────────────
-- users
-- Mirrors auth.users so application code can join on public.users.
-- Populated by a trigger on auth.users INSERT.
-- ─────────────────────────────────────────────────────────────────────────────
create table public.users (
  id         uuid primary key references auth.users (id) on delete cascade,
  email      text unique not null,
  role       text not null default 'traveler'
               check (role in ('traveler', 'guide', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Trigger: create public.users row when a new auth user signs up
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.users (id, email)
  values (new.id, new.email);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ─────────────────────────────────────────────────────────────────────────────
-- regions
-- ─────────────────────────────────────────────────────────────────────────────
create table public.regions (
  id                 uuid primary key default gen_random_uuid(),
  name               text not null,
  slug               text unique not null,
  country            text not null,
  description        text,
  hero_image_url     text,
  best_season        text,
  sustainability_note text,
  is_active          boolean not null default true,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────────────────────
-- guide_profiles
-- ─────────────────────────────────────────────────────────────────────────────
create table public.guide_profiles (
  id                   uuid primary key default gen_random_uuid(),
  user_id              uuid unique references public.users (id) on delete cascade,
  display_name         text not null,
  slug                 text unique not null,
  bio                  text,
  location             text,
  region_id            uuid references public.regions (id),
  profile_photo_url    text,
  years_experience     integer,
  languages            text[] not null default '{}',
  specialties          text[] not null default '{}',
  certifications       text,
  license_files        text[] not null default '{}',
  verification_status  text not null default 'draft'
                         check (verification_status in
                           ('draft', 'submitted', 'verified', 'rejected', 'suspended')),
  is_featured          boolean not null default false,
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────────────────────
-- trips
-- ─────────────────────────────────────────────────────────────────────────────
create table public.trips (
  id                uuid primary key default gen_random_uuid(),
  guide_id          uuid not null references public.guide_profiles (id) on delete cascade,
  region_id         uuid references public.regions (id),
  title             text not null,
  slug              text unique not null,
  short_description text,
  full_description  text,
  duration_days     integer not null check (duration_days > 0),
  base_price        numeric(10, 2) not null check (base_price >= 0),
  currency          text not null default 'EUR',
  max_group_size    integer check (max_group_size > 0),
  min_group_size    integer not null default 1 check (min_group_size > 0),
  activity_type     text check (activity_type in (
                      'safari', 'wildlife', 'hiking', 'cultural',
                      'water', 'photography', 'birdwatching', 'multi-activity'
                    )),
  difficulty        text check (difficulty in ('easy', 'moderate', 'challenging', 'extreme')),
  included          text[] not null default '{}',
  not_included      text[] not null default '{}',
  safety_notes      text,
  itinerary         jsonb not null default '[]',
  gallery_urls      text[] not null default '{}',
  status            text not null default 'draft'
                      check (status in ('draft', 'submitted', 'published', 'rejected', 'archived')),
  is_featured       boolean not null default false,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────────────────────
-- availability_blocks
-- ─────────────────────────────────────────────────────────────────────────────
create table public.availability_blocks (
  id         uuid primary key default gen_random_uuid(),
  guide_id   uuid not null references public.guide_profiles (id) on delete cascade,
  start_date date not null,
  end_date   date not null check (end_date >= start_date),
  status     text not null default 'unavailable'
               check (status in ('available', 'unavailable')),
  note       text,
  created_at timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────────────────────
-- booking_requests
-- ─────────────────────────────────────────────────────────────────────────────
create table public.booking_requests (
  id                   uuid primary key default gen_random_uuid(),
  trip_id              uuid references public.trips (id),
  guide_id             uuid not null references public.guide_profiles (id),
  traveler_name        text not null,
  traveler_email       text not null,
  traveler_phone       text,
  preferred_start_date date not null,
  preferred_end_date   date,
  travelers_count      integer not null default 1 check (travelers_count > 0),
  message              text,
  estimated_value      numeric(10, 2),
  currency             text not null default 'EUR',
  status               text not null default 'pending'
                         check (status in
                           ('pending', 'accepted', 'declined', 'canceled', 'completed')),
  admin_notes          text,
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────────────────────
-- contact_messages
-- ─────────────────────────────────────────────────────────────────────────────
create table public.contact_messages (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  email      text not null,
  reason     text not null,
  message    text not null,
  status     text not null default 'new'
               check (status in ('new', 'read', 'archived')),
  created_at timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────────────────────
-- media_assets
-- ─────────────────────────────────────────────────────────────────────────────
create table public.media_assets (
  id            uuid primary key default gen_random_uuid(),
  owner_user_id uuid references public.users (id),
  url           text not null,
  type          text check (type in ('image', 'document')),
  alt_text      text,
  created_at    timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────────────────────
-- Indexes for common query patterns
-- ─────────────────────────────────────────────────────────────────────────────
create index on public.guide_profiles (verification_status);
create index on public.guide_profiles (region_id);
create index on public.guide_profiles (slug);
create index on public.trips (status);
create index on public.trips (guide_id);
create index on public.trips (region_id);
create index on public.trips (slug);
create index on public.booking_requests (guide_id);
create index on public.booking_requests (status);
create index on public.booking_requests (traveler_email);
