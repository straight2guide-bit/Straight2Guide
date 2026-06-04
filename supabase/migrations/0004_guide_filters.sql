-- Add filter-supporting fields to guide_profiles
-- These power the extended filter panel on the /guides search page.

alter table public.guide_profiles
  add column transport_options   text[] not null default '{}',
  add column certification_types text[] not null default '{}',
  add column suitable_for        text[] not null default '{}',
  add column local_origin        text,
  add column sustainability_tags text[] not null default '{}';

-- transport_options values: "private-vehicle","shared-vehicle","4x4","boat","airport-pickup"
-- certification_types values: "licensed-guide","first-aid","eco-certified","conservation-trained","community-guide"
-- suitable_for values: "solo","families","seniors","photographers","birders","researchers","honeymooners","backpackers","luxury"
-- local_origin values: "born-in-region","lives-locally","community-based","indigenous"
-- sustainability_tags values: "locally-owned","community-based","conservation-focused","low-impact","wildlife-ethical","supports-local","no-animal-exploitation","plastic-conscious"
