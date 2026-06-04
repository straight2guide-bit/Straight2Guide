-- ─────────────────────────────────────────────────────────────────────────────
-- Seed data (Plan Step 23)
-- 3 regions, 6 verified guides (2 per region), 9 published trips.
-- Idempotent: fixed UUIDs + `on conflict (id) do nothing`, so it is safe to run
-- repeatedly and without a destructive reset.
--
-- Apply (after linking a Supabase project + running migrations):
--   supabase db reset            # runs migrations then this seed, OR
--   supabase db execute --file supabase/seed.sql   # apply to an existing DB
-- Country values match the continent pages so guides appear under
-- /guides/africa (Kenya, Tanzania) and /guides/south-america (Brazil).
-- ─────────────────────────────────────────────────────────────────────────────

-- Regions ─────────────────────────────────────────────────────────────────────
insert into public.regions (id, name, slug, country, description, best_season, sustainability_note, is_active) values
  ('a0000000-0000-4000-8000-000000000001', 'Pantanal',   'pantanal',   'Brazil',
   'The world''s largest tropical wetland and the best place on earth to see wild jaguars.',
   'Jul–Oct (dry season)', 'Tourism income gives ranchers a reason to protect jaguars rather than hunt them.', true),
  ('a0000000-0000-4000-8000-000000000002', 'Masai Mara', 'masai-mara', 'Kenya',
   'Iconic savannah teeming with big cats and the stage for the Great Migration.',
   'Jul–Oct (migration)', 'Conservancy fees fund Maasai-owned land and anti-poaching patrols.', true),
  ('a0000000-0000-4000-8000-000000000003', 'Serengeti',  'serengeti',  'Tanzania',
   'Endless plains, vast herds, and some of Africa''s richest predator density.',
   'Jun–Oct & Jan–Feb (calving)', 'Community-run camps keep tourism revenue local.', true)
on conflict (id) do nothing;

-- Guides ──────────────────────────────────────────────────────────────────────
insert into public.guide_profiles
  (id, user_id, display_name, slug, bio, location, region_id, profile_photo_url,
   years_experience, languages, specialties, certifications,
   verification_status, is_featured,
   price_per_person, price_per_vehicle, vehicle_capacity,
   transport_options, certification_types, suitable_for, local_origin, sustainability_tags)
values
  ('b0000000-0000-4000-8000-000000000001', null, 'Mateus Oliveira', 'mateus-oliveira',
   'Born on a Pantanal cattle ranch, Mateus has tracked jaguars along the Cuiabá River for over a decade. He reads the river like a map and knows every oxbow where the cats come to drink.',
   'Porto Jofre, Brazil', 'a0000000-0000-4000-8000-000000000001', null,
   12, array['portuguese','english','spanish'], array['wildlife','photography','birdwatching'],
   'Licensed Pantanal nature guide; Wilderness First Responder.',
   'verified', true,
   180, 320, 6,
   array['4x4','boat'], array['licensed-guide','first-aid','conservation-trained'],
   array['photographers','families','researchers'], 'born-in-region',
   array['locally-owned','wildlife-ethical','low-impact']),

  ('b0000000-0000-4000-8000-000000000002', null, 'Ana Beatriz Souza', 'ana-beatriz-souza',
   'A biologist turned guide, Ana specialises in birdlife and the smaller creatures most visitors miss. Her boat trips at dawn are unhurried and full of detail.',
   'Bonito, Brazil', 'a0000000-0000-4000-8000-000000000001', null,
   7, array['portuguese','english'], array['birdwatching','wildlife','cultural'],
   'BSc Biology; licensed regional guide.',
   'verified', false,
   140, 240, 4,
   array['boat','private-vehicle'], array['licensed-guide','eco-certified'],
   array['birders','solo','seniors'], 'lives-locally',
   array['community-based','conservation-focused','plastic-conscious']),

  ('b0000000-0000-4000-8000-000000000003', null, 'Joseph Sankale', 'joseph-sankale',
   'A Maasai guide raised on the edge of the Mara, Joseph blends deep local knowledge with a sharp eye for predators. Guests remember his calm, his humour, and his uncanny sense for where the lions will be.',
   'Maasai Mara, Kenya', 'a0000000-0000-4000-8000-000000000002', null,
   15, array['english','swahili','maa'], array['safari','wildlife','cultural'],
   'KPSGA Silver-level guide; first aid certified.',
   'verified', true,
   210, 360, 7,
   array['4x4','airport-pickup'], array['licensed-guide','first-aid','community-guide'],
   array['families','photographers','honeymooners'], 'indigenous',
   array['community-based','supports-local','wildlife-ethical']),

  ('b0000000-0000-4000-8000-000000000004', null, 'Grace Wanjiru', 'grace-wanjiru',
   'Grace leads walking safaris and cultural visits with an emphasis on conservation. She works closely with the conservancies and brings travellers into real community projects.',
   'Narok, Kenya', 'a0000000-0000-4000-8000-000000000002', null,
   9, array['english','swahili'], array['hiking','cultural','wildlife'],
   'Licensed safari guide; eco-tourism certified.',
   'verified', false,
   160, 280, 6,
   array['4x4','private-vehicle'], array['licensed-guide','eco-certified','conservation-trained'],
   array['solo','seniors','researchers'], 'community-based',
   array['community-based','conservation-focused','locally-owned']),

  ('b0000000-0000-4000-8000-000000000005', null, 'Baraka Mollel', 'baraka-mollel',
   'Baraka has guided the Serengeti for over twenty years and has a near-photographic memory of migration patterns. He times each day to put you in the right place before the crowds arrive.',
   'Seronera, Tanzania', 'a0000000-0000-4000-8000-000000000003', null,
   21, array['english','swahili'], array['safari','wildlife','photography'],
   'Senior safari guide; Wilderness First Responder.',
   'verified', true,
   230, 390, 7,
   array['4x4','airport-pickup'], array['licensed-guide','first-aid'],
   array['photographers','families','luxury'], 'born-in-region',
   array['supports-local','wildlife-ethical','low-impact']),

  ('b0000000-0000-4000-8000-000000000006', null, 'Neema Kimaro', 'neema-kimaro',
   'Neema focuses on small-group, low-impact safaris and the calving season in the southern Serengeti. Patient and warm, she is a favourite with first-time safari-goers.',
   'Arusha, Tanzania', 'a0000000-0000-4000-8000-000000000003', null,
   8, array['english','swahili','german'], array['wildlife','birdwatching','cultural'],
   'Licensed guide; first aid certified.',
   'verified', false,
   150, 260, 5,
   array['4x4','shared-vehicle'], array['licensed-guide','first-aid','community-guide'],
   array['backpackers','solo','families'], 'lives-locally',
   array['low-impact','community-based','no-animal-exploitation'])
on conflict (id) do nothing;

-- Trips (9 published) ──────────────────────────────────────────────────────────
insert into public.trips
  (id, guide_id, region_id, title, slug, short_description, full_description,
   duration_days, base_price, currency, max_group_size, min_group_size,
   activity_type, difficulty, included, not_included, itinerary, status, is_featured)
values
  ('c0000000-0000-4000-8000-000000000001', 'b0000000-0000-4000-8000-000000000001', 'a0000000-0000-4000-8000-000000000001',
   'Jaguars of the Cuiabá River', 'jaguars-of-the-cuiaba-river',
   'Four days of boat safaris in peak jaguar territory.',
   'A focused jaguar expedition along the rivers around Porto Jofre, with full-day boat safaris timed for the best light and animal activity.',
   4, 980, 'EUR', 6, 1, 'wildlife', 'easy',
   array['Lodging','All meals','Boat safaris','Park fees'], array['Flights','Travel insurance'],
   '[{"day":1,"title":"Arrival & orientation","description":"Meet at the lodge, evening briefing.","accommodation":"Porto Jofre Lodge","meals":"D"},{"day":2,"title":"Full-day river safari","description":"Boat safari along the Cuiabá River searching for jaguars.","accommodation":"Porto Jofre Lodge","meals":"B/L/D"},{"day":3,"title":"Tributaries & wildlife","description":"Explore quieter side channels for giant otters and caiman.","accommodation":"Porto Jofre Lodge","meals":"B/L/D"},{"day":4,"title":"Final morning & departure","description":"Dawn safari then transfer out.","accommodation":null,"meals":"B"}]'::jsonb,
   'published', true),

  ('c0000000-0000-4000-8000-000000000002', 'b0000000-0000-4000-8000-000000000001', 'a0000000-0000-4000-8000-000000000001',
   'Pantanal Photography Intensive', 'pantanal-photography-intensive',
   'A small-group trip built around the best light and hides.',
   'Designed for photographers: early starts, patient waits at productive spots, and guidance on settings for fast-moving wildlife.',
   5, 1390, 'EUR', 4, 1, 'photography', 'moderate',
   array['Lodging','All meals','Boat & 4x4 safaris','Photo guidance'], array['Camera gear','Flights'],
   '[{"day":1,"title":"Arrival","description":"Settle in, sunset scout.","accommodation":"Riverside Lodge","meals":"D"},{"day":2,"title":"Golden hour river","description":"Dawn and dusk boat sessions.","accommodation":"Riverside Lodge","meals":"B/L/D"},{"day":3,"title":"Jaguar tracking","description":"Full day tracking cats for portraits.","accommodation":"Riverside Lodge","meals":"B/L/D"}]'::jsonb,
   'published', false),

  ('c0000000-0000-4000-8000-000000000003', 'b0000000-0000-4000-8000-000000000002', 'a0000000-0000-4000-8000-000000000001',
   'Birding the Wetlands', 'birding-the-wetlands',
   'Dawn boat trips for the Pantanal''s spectacular birdlife.',
   'A relaxed, detail-rich birding trip covering hyacinth macaws, jabiru storks and hundreds of other species.',
   3, 560, 'EUR', 6, 1, 'birdwatching', 'easy',
   array['Lodging','All meals','Boat trips','Checklist'], array['Binoculars','Flights'],
   '[{"day":1,"title":"Arrival & first outing","description":"Afternoon birding walk.","accommodation":"Bonito Eco Lodge","meals":"D"},{"day":2,"title":"Dawn on the water","description":"Full day of birding by boat.","accommodation":"Bonito Eco Lodge","meals":"B/L/D"},{"day":3,"title":"Morning & departure","description":"Final dawn outing then transfer.","accommodation":null,"meals":"B"}]'::jsonb,
   'published', false),

  ('c0000000-0000-4000-8000-000000000004', 'b0000000-0000-4000-8000-000000000003', 'a0000000-0000-4000-8000-000000000002',
   'Great Migration Safari', 'great-migration-safari',
   'Witness the river crossings in the heart of the Mara.',
   'Time your visit to the migration with a guide who knows exactly where the herds gather and where the crossings happen.',
   6, 2150, 'EUR', 7, 1, 'safari', 'easy',
   array['4x4 safaris','Lodging','All meals','Conservancy fees'], array['International flights','Tips'],
   '[{"day":1,"title":"Arrival in the Mara","description":"Transfer and evening game drive.","accommodation":"Mara Camp","meals":"D"},{"day":2,"title":"Big cats","description":"Full-day drive focused on lion and cheetah.","accommodation":"Mara Camp","meals":"B/L/D"},{"day":3,"title":"River crossings","description":"Position early for the wildebeest crossings.","accommodation":"Mara Camp","meals":"B/L/D"},{"day":4,"title":"Maasai village","description":"Cultural morning then afternoon drive.","accommodation":"Mara Camp","meals":"B/L/D"}]'::jsonb,
   'published', true),

  ('c0000000-0000-4000-8000-000000000005', 'b0000000-0000-4000-8000-000000000003', 'a0000000-0000-4000-8000-000000000002',
   'Mara Family Safari', 'mara-family-safari',
   'A relaxed, kid-friendly introduction to the savannah.',
   'Shorter drives, flexible timing and plenty of variety to keep younger travellers engaged.',
   4, 1280, 'EUR', 6, 2, 'wildlife', 'easy',
   array['4x4 safaris','Family lodging','All meals','Park fees'], array['Flights','Insurance'],
   '[{"day":1,"title":"Arrival","description":"Settle in, short sunset drive.","accommodation":"Family Camp","meals":"D"},{"day":2,"title":"Discovery day","description":"Morning and late-afternoon drives.","accommodation":"Family Camp","meals":"B/L/D"},{"day":3,"title":"Culture & wildlife","description":"Village visit and game drive.","accommodation":"Family Camp","meals":"B/L/D"}]'::jsonb,
   'published', false),

  ('c0000000-0000-4000-8000-000000000006', 'b0000000-0000-4000-8000-000000000004', 'a0000000-0000-4000-8000-000000000002',
   'Walking Safari & Conservancy', 'walking-safari-and-conservancy',
   'Track wildlife on foot and meet the people protecting it.',
   'A grounded, low-impact trip combining guided walks with visits to community conservation projects.',
   5, 1490, 'EUR', 6, 1, 'hiking', 'moderate',
   array['Guided walks','Lodging','All meals','Conservancy fees'], array['Flights','Tips'],
   '[{"day":1,"title":"Arrival","description":"Orientation walk near camp.","accommodation":"Conservancy Camp","meals":"D"},{"day":2,"title":"Bush walk","description":"Half-day tracking on foot with an armed ranger.","accommodation":"Conservancy Camp","meals":"B/L/D"},{"day":3,"title":"Community day","description":"Visit a conservation project and school.","accommodation":"Conservancy Camp","meals":"B/L/D"}]'::jsonb,
   'published', false),

  ('c0000000-0000-4000-8000-000000000007', 'b0000000-0000-4000-8000-000000000005', 'a0000000-0000-4000-8000-000000000003',
   'Serengeti Predator Expedition', 'serengeti-predator-expedition',
   'Maximise big-cat sightings with a veteran guide.',
   'A predator-focused safari across the central and southern Serengeti, timed and routed to avoid crowds.',
   7, 2680, 'EUR', 7, 1, 'safari', 'moderate',
   array['4x4 safaris','Lodging','All meals','Park fees'], array['Flights','Balloon ride'],
   '[{"day":1,"title":"Arrival in Seronera","description":"Afternoon drive.","accommodation":"Central Camp","meals":"D"},{"day":2,"title":"Big cats","description":"Full day with lion and leopard.","accommodation":"Central Camp","meals":"B/L/D"},{"day":3,"title":"Cheetah plains","description":"Open-country drives for cheetah.","accommodation":"Central Camp","meals":"B/L/D"},{"day":4,"title":"Move south","description":"Transfer with game viewing en route.","accommodation":"Southern Camp","meals":"B/L/D"}]'::jsonb,
   'published', true),

  ('c0000000-0000-4000-8000-000000000008', 'b0000000-0000-4000-8000-000000000005', 'a0000000-0000-4000-8000-000000000003',
   'Photographer''s Serengeti', 'photographers-serengeti',
   'Built around light, patience and the perfect angle.',
   'Low-ratio photographic safari with flexible timing and a guide who anticipates the action.',
   6, 2490, 'EUR', 4, 1, 'photography', 'moderate',
   array['4x4 safaris','Lodging','All meals','Park fees'], array['Camera gear','Flights'],
   '[{"day":1,"title":"Arrival","description":"Sunset scouting drive.","accommodation":"Photo Camp","meals":"D"},{"day":2,"title":"Golden hours","description":"Dawn and dusk sessions.","accommodation":"Photo Camp","meals":"B/L/D"},{"day":3,"title":"Predators","description":"Full day tracking cats.","accommodation":"Photo Camp","meals":"B/L/D"}]'::jsonb,
   'published', false),

  ('c0000000-0000-4000-8000-000000000009', 'b0000000-0000-4000-8000-000000000006', 'a0000000-0000-4000-8000-000000000003',
   'Calving Season Safari', 'calving-season-safari',
   'The southern plains in the dramatic calving season.',
   'A small-group, low-impact safari focused on the southern Serengeti during the calving months.',
   5, 1620, 'EUR', 5, 1, 'wildlife', 'easy',
   array['4x4 safaris','Lodging','All meals','Park fees'], array['Flights','Insurance'],
   '[{"day":1,"title":"Arrival","description":"Transfer to the southern plains.","accommodation":"Ndutu Camp","meals":"D"},{"day":2,"title":"Calving plains","description":"Full day among the herds and predators.","accommodation":"Ndutu Camp","meals":"B/L/D"},{"day":3,"title":"Final morning","description":"Dawn drive then departure.","accommodation":null,"meals":"B"}]'::jsonb,
   'published', false)
on conflict (id) do nothing;
