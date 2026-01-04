import { NextRequest, NextResponse } from "next/server"

import Token from "@/db/mongo/models/token"
import { exchangeSpotifyCodeForTokens } from "@/services/spotify/exchangeCodeForTokens"
import { UserRegistrator } from "@/services/models/userRegistration"
import { setUserId } from "@/services/api.utils"
import { UserDoc } from "@/db/mongo/models/user"

export async function GET(req: NextRequest) {
  try {
    const query = Object.fromEntries(req.nextUrl.searchParams),
      url = new URL(req.url),
      redirect_uri = url.origin + "/api/spotify/callback",
      created_at = Date.now(),
      { access_token, token_type, expires_in, refresh_token } = await exchangeSpotifyCodeForTokens(
        query.code as string,
        redirect_uri
      ),
      spotifyUser = await fetch(`https://api.spotify.com/v1/me`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      }).then((res) => res.json())

    // we need to know if the user exists
    let userUri = spotifyUser.uri,
      stateString = decodeURIComponent(query.state || ""),
      params = new URLSearchParams(stateString),
      origin = params.get("origin"),
      userId = params.get("userId"),
      expiresAt = created_at + expires_in * 1000
    origin = origin === "undefined" ? "" : origin

    const UserReg = await UserRegistrator.init(userId),
      exisitingUserWithToken = await UserReg.getExistingUserWithToken(userUri),
      exisitingUser = UserReg.user

    const spotifyToken = await Token.findOneAndUpdate(
      { userUri, provider: "spotify" },
      {
        provider: "spotify",
        userUri,
        userId,
        accessToken: access_token,
        refreshToken: refresh_token,
        expiresAt,
        createdAt: new Date(),
        data: spotifyUser,
      },
      { new: true, upsert: true }
    )

    let user: UserDoc | null = null
    if (exisitingUserWithToken) {
      user = exisitingUserWithToken
      //no actions required, token would have updated automatically
    } else if (exisitingUser) {
      user = await UserReg.addTokenToUser(spotifyToken._id, "spotify")
    } else if (userId) {
      throw Error(`Oops, this has the user id cookie, but no user was found in db, userId:${userId}`)
    } else {
      user = await UserReg.createUser(spotifyToken._id, "spotify")
    }
    userId = user?.id || null

    if (origin) {
      if (userId) {
        await setUserId(userId)
      }
      console.log("redirecting to ", { origin })

      return NextResponse.redirect(origin)
    }

    return NextResponse.json(
      {
        message: "Callback processed successfully",
        data: {
          access_token,
          refresh_token,
          created_at,
          expires_in,
          token_type,
          expiresAt,
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error processing Spotify callback:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
