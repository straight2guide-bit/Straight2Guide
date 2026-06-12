import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

// Cookie-free Supabase client for public, user-independent reads (e.g. the
// homepage's featured content). Because it never touches cookies, pages that
// use it can be statically generated and cached/revalidated (ISR) instead of
// re-rendering on every request. Reads run under the anon role + RLS, same as
// an unauthenticated visitor.
export const createPublicClient = () =>
  createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } }
  );
