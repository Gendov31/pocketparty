
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fnrmkhihfsuggrjdclqx.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZucm1raGloZnN1Z2dyamRjbHF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMwNzU4MTgsImV4cCI6MjA1ODY1MTgxOH0._QRYQnmvKijZ0RgEVCOJoJCXmA0E3n9ZKupnhSNl44k'
export const supabase = createClient(supabaseUrl, supabaseKey)