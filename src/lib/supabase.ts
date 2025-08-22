import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types will be generated here
export type Database = {
  public: {
    Tables: {
      datasets: {
        Row: {
          id: string;
          title: string;
          description: string;
          cid: string;
          sha256: string;
          tags: string[];
          verified: boolean;
          domain: string;
          price: string;
          downloads: number;
          creator: string;
          license: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          cid: string;
          sha256: string;
          tags: string[];
          verified?: boolean;
          domain: string;
          price: string;
          downloads?: number;
          creator: string;
          license: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          cid?: string;
          sha256?: string;
          tags?: string[];
          verified?: boolean;
          domain?: string;
          price?: string;
          downloads?: number;
          creator?: string;
          license?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
};