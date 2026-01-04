export async function exchangeSpotifyCodeForTokens(
  code: string,
  redirect_uri = "http://localhost:3000/api/spotify/callback"
) {
  const auth = Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString("base64")
  const params = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri,
  }).toString()

  const res = await fetch(`https://accounts.spotify.com/api/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params,
  })

  if (!res.ok) throw new Error(`Token exchange failed: ${res.status}`)
  return res.json()
}
