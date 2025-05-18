import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://lpssndayjlsfyqwjoyuz.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxwc3NuZGF5amxzZnlxd2pveXV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1MzYxOTAsImV4cCI6MjA2MzExMjE5MH0.GM4HZuxiOAjvDsBcUR7Bmm_O2FxFygmtESHWR4hIAq0'

export const supabase = createClient(supabaseUrl, supabaseKey)

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();

  const { count, error } = await supabase
    .from('missing_relatives')
    .select('*', { count: 'exact', head: true });

  if (error) return res.status(500).json({ error });

  res.status(200).json({ total_cases: count });
}