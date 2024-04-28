import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.REACT_APP_ANNON_KEY;
// console.log("Supabase URL:", SUPABASE_URL);
// console.log("Supabase Anon Key:", SUPABASE_ANON_KEY);

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

//you need this for accessing the supabase database. I put it in components so I can call it at each page. Reducing the need to rewrite it at each level. Check .env for my url and key.
