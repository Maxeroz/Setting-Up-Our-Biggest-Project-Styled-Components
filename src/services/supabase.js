import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://rzxqnqflaxehdndvvqpm.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6eHFucWZsYXhlaGRuZHZ2cXBtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk2ODM4ODcsImV4cCI6MjAzNTI1OTg4N30.VHHIh2RYskcJHLsUAv4m55IKmVn1T6DERUpMEiFSKoI";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
