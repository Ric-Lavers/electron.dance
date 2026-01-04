export async function refreshSpotifyAccessToken(refresh_token: string) {
  const auth = Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString("base64")
  const params = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token,
    client_id: process.env.SPOTIFY_CLIENT_ID!,
  })

  const res = await fetch(`https://accounts.spotify.com/api/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params,
  })

  if (!res.ok) throw new Error(`Token refresh failed: ${res.status}`)
  return res.json()
}
