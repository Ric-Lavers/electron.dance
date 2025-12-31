import { CalendlyToken } from './types'

export async function exchangeCodeForTokens(
  code: string,
  redirect_uri = 'http://localhost:3000/api/calendly/callback'
) {
  const res = await fetch(`https://auth.calendly.com/oauth/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      grant_type: 'authorization_code',
      code,
      redirect_uri,
      client_id: process.env.CALENDLY_CLIENT_ID,
      client_secret: process.env.CALENDLY_CLIENT_SECRET,
    }),
  })

  if (!res.ok) throw new Error(`Token exchange failed: ${res.status}`)
  return res.json() as Promise<CalendlyToken>
}
