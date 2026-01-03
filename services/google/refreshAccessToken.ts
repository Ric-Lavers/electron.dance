export async function refreshGoogleAccessToken(refresh_token: string) {

  const params = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token,
    client_id: process.env.GOOGLE_CLIENT_ID!,
    client_secret: process.env.GOOGLE_CLIENT_SECRET!,
  })

  const res = await fetch(`https://oauth2.googleapis.com/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params,
  })

  if (!res.ok) throw new Error(`Token refresh failed: ${res.status}`)
  return res.json()
}
