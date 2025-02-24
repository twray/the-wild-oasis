import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://krigwcygdneouayobusl.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtyaWd3Y3lnZG5lb3VheW9idXNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk0NzQzMjYsImV4cCI6MjA1NTA1MDMyNn0.5OjBxUgHE3ZEDpqqBvhZXOt9Z-tr_q1G3_WRd9-bvfg";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
