import { getCookies, setCookie } from '@tanstack/react-start/server'
import { createServerClient } from '@supabase/ssr'

export function getSupabaseServerClient() {
  return createServerClient(
    process.env.SUPABASE_URL ?? "https://qctdqokduewcjnvqkmvp.supabase.co",
    process.env.SUPABASE_ANON_KEY ?? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjdGRxb2tkdWV3Y2pudnFrbXZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3NTg4MDQsImV4cCI6MjA3NDMzNDgwNH0.Jd3PvKgWpTcosI9eWc-aV2Knu8B9cuYAHc0og26LkLI",
    {
      cookies: {
        getAll() {
          return Object.entries(getCookies()).map(([name, value]) => ({
            name,
            value,
          }))
        },
        setAll(cookies) {
          cookies.forEach((cookie) => {
            setCookie(cookie.name, cookie.value)
          })
        },
      },
    },
  )
}
