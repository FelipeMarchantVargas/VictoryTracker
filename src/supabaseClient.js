import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://wljobbkgyzkgeqgqehld.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indsam9iYmtneXprZ2VxZ3FlaGxkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI4MjUzNDEsImV4cCI6MjAzODQwMTM0MX0.6dePWwopW3-V7xqA3jBnIZ0lRUXPDbWzPH5YC-WHe6U";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
