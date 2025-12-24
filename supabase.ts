import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://fpsyasjakawmcxvwpaot.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZwc3lhc2pha2F3bWN4dndwYW90Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY0NTM0ODEsImV4cCI6MjA4MjAyOTQ4MX0.UeXeJ7lkKTEHXhGZ_GVJFePoQ6pRHsEFeg6ztvmaaNc";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
