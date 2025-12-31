import { CalendlyToken } from './types'

export async function refreshCalendlyAccessToken(refresh_token: string) {
  const data = await fetch(`https://auth.calendly.com/oauth/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      grant_type: 'refresh_token',
      refresh_token,
      client_id: process.env.CALENDLY_CLIENT_ID,
      client_secret: process.env.CALENDLY_CLIENT_SECRET,
    }),
  }).then((res) => res.json())

  return data as Promise<CalendlyToken>
}
