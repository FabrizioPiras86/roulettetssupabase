import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://omhfvtabmbceibksuomx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9taGZ2dGFibWJjZWlia3N1b214Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA2OTQ5NjUsImV4cCI6MjAzNjI3MDk2NX0.rRw3PNS_yHEHR0JOubCxCP_FHlxj8Cr5FzEQpehGkRQ';
export const supabase = createClient(supabaseUrl, supabaseKey);
