import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

// Service role client — bypasses RLS. Never import this in client-side code.
export const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
