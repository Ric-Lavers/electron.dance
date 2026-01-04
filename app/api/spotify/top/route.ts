import { NextResponse } from "next/server"

import { connectToDatabase } from "@/db/mongo/connect"
import Token from "@/db/mongo/models/token"

export async function GET() {
  try {
    const tracks = await getTopTracks()
    return NextResponse.json(tracks, { status: 200 })
  } catch (error) {
    console.error("Error processing Spotify callback:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
export async function getTopTracks() {
  await connectToDatabase()
  const tokenSpotfiy = await Token.findOne({
    provider: "spotify",
    userUri: process.env.NEXT_PUBLIC_MY_SPOTIFY_URI,
  })

  return fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=short_term`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenSpotfiy?.accessToken}`,
    },
  }).then((res) => res.json())
}
