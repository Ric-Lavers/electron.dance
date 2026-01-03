import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

// const REDIRECT_URI = process.env.CALENDLY_REDIRECT_URI || 'http://localhost:3000/api/calendly/callback'

export async function GET(req: NextRequest) {
  if (!process.env.LINKEDIN_CLIENT_ID || !process.env.LINKEDIN_CLIENT_SECRET) {
    throw new Error('Missing Spotify client credentials in environment variables.')
  }
  const cookieJar = await cookies()

  const url = new URL(req.url),
    redirect_uri = url.origin + '/api/linkedin/callback',
    userId = cookieJar.get('userId')?.value || '',
    stateParams = new URLSearchParams({
      origin: url.origin,
      userId,
    }),
    state = stateParams.toString()

  const search = new URLSearchParams({
    // grant_type: 'client_credentials',
    response_type: 'code',
    client_id: process.env.LINKEDIN_CLIENT_ID,
    client_secret: process.env.LINKEDIN_CLIENT_SECRET,
    state,
    redirect_uri,
    scope: 'profile openid email',
  })

  const authUrl = `https://www.linkedin.com/oauth/v2/authorization?${search}`

  return NextResponse.redirect(authUrl)
}
