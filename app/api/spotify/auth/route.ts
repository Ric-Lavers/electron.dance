import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

// const REDIRECT_URI = process.env.CALENDLY_REDIRECT_URI || 'http://localhost:3000/api/calendly/callback'

export async function GET(req: NextRequest) {
  const cookieJar = await cookies(),
    url = new URL(req.url),
    redirect_uri = url.origin + "/api/spotify/callback",
    userId = cookieJar.get("userId")?.value || "",
    stateParams = new URLSearchParams({
      origin: url.origin,
      userId,
    }),
    state = stateParams.toString()
  // const redirect_uri = 'http://192.168.86.21:3000/api/spotify/callback'

  if (!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_CLIENT_SECRET) {
    throw new Error("Missing Spotify client credentials in environment variables.")
  }

  const search = new URLSearchParams({
    // grant_type: 'client_credentials',
    response_type: "code",
    client_id: process.env.SPOTIFY_CLIENT_ID,
    client_secret: process.env.SPOTIFY_CLIENT_SECRET,
    state,
    redirect_uri,
    scope:
      "user-read-email user-read-private user-read-playback-state user-modify-playback-state user-read-currently-playing user-read-recently-played user-read-playback-position user-library-read user-library-modify playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private user-follow-read user-follow-modify user-top-read streaming",
  })
  const authUrl = `https://accounts.spotify.com/authorize?${search}`

  return NextResponse.redirect(authUrl)
}
