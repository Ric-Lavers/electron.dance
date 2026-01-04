export async function exchangeGoogleinCodeForTokens(
  code: string,
  redirect_uri = "http://localhost:3000/api/google/callback"
) {
  const params = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    client_id: process.env.GOOGLE_CLIENT_ID!,
    client_secret: process.env.GOOGLE_CLIENT_SECRET!,
    redirect_uri,
  })

  const res = await fetch(`https://oauth2.googleapis.com/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params,
  })

  if (!res.ok) throw new Error(`Token exchange failed: ${res.status}`)
  const data = await res.json()
  return data
}
