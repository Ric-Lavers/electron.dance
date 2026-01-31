import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

// const REDIRECT_URI = process.env.CALENDLY_REDIRECT_URI || 'http://localhost:3000/api/calendly/callback'

export async function GET(req: NextRequest) {
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    throw new Error("Missing Spotify client credentials in environment variables.")
  }
  const cookieJar = await cookies()


  const url = new URL(req.url),
    redirect_uri = url.origin + "/api/google/callback",
    userId = cookieJar.get("userId")?.value || "",
    stateParams = new URLSearchParams({
      origin: url.origin + "/gigs",
      userId,

      group: "sydney",
    }),
    state = stateParams.toString()

  console.log({
    // prompt: 'consent',

    response_type: "code",
    client_id: process.env.GOOGLE_CLIENT_ID,
    access_type: "offline",
    state,
    redirect_uri,
    scope: "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid",
    // scope: 'openid',
  })

  const search = new URLSearchParams({
    // prompt: 'consent',

    response_type: "code",
    client_id: process.env.GOOGLE_CLIENT_ID,
    access_type: "offline",
    state,
    redirect_uri,
    scope: "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid",
    // scope: 'openid',
  })

  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${search}`
  console.log(authUrl)

  return NextResponse.redirect(authUrl)
}
