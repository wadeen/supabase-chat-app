import { createClient } from "@supabase/supabase-js";

export type Database = {
  id: string;
  createdAt: string;
  message: string;
  nickName: string;
  avatarUrl: string;
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!!;

const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export default supabase;
