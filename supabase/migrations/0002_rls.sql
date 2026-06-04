-- ─────────────────────────────────────────────────────────────────────────────
-- Row Level Security
-- All mutations that need admin-level access must use the service_role key
-- (supabaseAdmin in src/lib/supabase/admin.ts) which bypasses RLS entirely.
-- ─────────────────────────────────────────────────────────────────────────────

alter table public.users            enable row level security;
alter table public.regions          enable row level security;
alter table public.guide_profiles   enable row level security;
alter table public.trips            enable row level security;
alter table public.availability_blocks enable row level security;
alter table public.booking_requests enable row level security;
alter table public.contact_messages enable row level security;
alter table public.media_assets     enable row level security;

-- ─────────────────────────────────────────────────────────────────────────────
-- Helper: return the role for the current authenticated user
-- ─────────────────────────────────────────────────────────────────────────────
create or replace function public.current_user_role()
returns text language sql stable security definer as $$
  select role from public.users where id = auth.uid();
$$;

-- ─────────────────────────────────────────────────────────────────────────────
-- users
-- ─────────────────────────────────────────────────────────────────────────────
create policy "users: read own row"
  on public.users for select
  using (id = auth.uid());

create policy "users: update own row"
  on public.users for update
  using (id = auth.uid());

-- ─────────────────────────────────────────────────────────────────────────────
-- regions
-- ─────────────────────────────────────────────────────────────────────────────
create policy "regions: public read active"
  on public.regions for select
  using (is_active = true);

-- ─────────────────────────────────────────────────────────────────────────────
-- guide_profiles
-- ─────────────────────────────────────────────────────────────────────────────
create policy "guide_profiles: public read verified"
  on public.guide_profiles for select
  using (verification_status = 'verified');

create policy "guide_profiles: guide read own"
  on public.guide_profiles for select
  using (user_id = auth.uid());

create policy "guide_profiles: guide insert own"
  on public.guide_profiles for insert
  with check (user_id = auth.uid());

create policy "guide_profiles: guide update own"
  on public.guide_profiles for update
  using (user_id = auth.uid());

-- ─────────────────────────────────────────────────────────────────────────────
-- trips
-- ─────────────────────────────────────────────────────────────────────────────
create policy "trips: public read published"
  on public.trips for select
  using (status = 'published');

create policy "trips: guide read own"
  on public.trips for select
  using (
    guide_id in (
      select id from public.guide_profiles where user_id = auth.uid()
    )
  );

create policy "trips: guide insert for own profile"
  on public.trips for insert
  with check (
    guide_id in (
      select id from public.guide_profiles where user_id = auth.uid()
    )
  );

create policy "trips: guide update own"
  on public.trips for update
  using (
    guide_id in (
      select id from public.guide_profiles where user_id = auth.uid()
    )
  );

-- ─────────────────────────────────────────────────────────────────────────────
-- availability_blocks
-- ─────────────────────────────────────────────────────────────────────────────
create policy "availability: public read"
  on public.availability_blocks for select
  using (true);

create policy "availability: guide manage own"
  on public.availability_blocks for all
  using (
    guide_id in (
      select id from public.guide_profiles where user_id = auth.uid()
    )
  );

-- ─────────────────────────────────────────────────────────────────────────────
-- booking_requests
-- ─────────────────────────────────────────────────────────────────────────────
-- Travelers submit without an account — allow anonymous inserts
create policy "booking_requests: public insert"
  on public.booking_requests for insert
  with check (true);

create policy "booking_requests: guide read own"
  on public.booking_requests for select
  using (
    guide_id in (
      select id from public.guide_profiles where user_id = auth.uid()
    )
  );

create policy "booking_requests: guide update status"
  on public.booking_requests for update
  using (
    guide_id in (
      select id from public.guide_profiles where user_id = auth.uid()
    )
  );

-- ─────────────────────────────────────────────────────────────────────────────
-- contact_messages
-- ─────────────────────────────────────────────────────────────────────────────
create policy "contact_messages: public insert"
  on public.contact_messages for insert
  with check (true);

-- ─────────────────────────────────────────────────────────────────────────────
-- media_assets
-- ─────────────────────────────────────────────────────────────────────────────
create policy "media_assets: public read images"
  on public.media_assets for select
  using (type = 'image');

create policy "media_assets: owner insert"
  on public.media_assets for insert
  with check (owner_user_id = auth.uid());

create policy "media_assets: owner delete"
  on public.media_assets for delete
  using (owner_user_id = auth.uid());
