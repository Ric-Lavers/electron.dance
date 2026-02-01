import { NextRequest, NextResponse } from "next/server"
import Token from "@/db/mongo/models/token"
import { UserDoc } from "@/db/mongo/models/user"
import { UserRegistrator } from "@/services/models/userRegistration"
import { setUserId } from "@/services/api.utils"
import { exchangeGoogleinCodeForTokens } from "@/services/google/exchangeCodeForTokens"

export async function GET(req: NextRequest) {
  try {
    const query = Object.fromEntries(req.nextUrl.searchParams),
      url = new URL(req.url),
      redirect_uri = url.origin + "/api/google/callback",
      created_at = Date.now()

    const data = await exchangeGoogleinCodeForTokens(query.code as string, redirect_uri),
      { access_token, expires_in, refresh_token, id_token } = data

    const userInfo = await fetch(`https://openidconnect.googleapis.com/v1/userinfo`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    }).then((res) => res.json())

    // we need to know if the user exists
    let userUri = userInfo.sub,
      stateString = decodeURIComponent(query.state || ""),
      params = new URLSearchParams(stateString),
      origin = params.get("origin"),
      userId = params.get("userId")
    origin = origin === "undefined" ? "" : origin

    const UserReg = await UserRegistrator.init(userId)
    const exisitingUser = UserReg.user

    const googleToken = await Token.findOneAndUpdate(
      { userUri, provider: "google" },
      {
        provider: "google",
        userUri,
        userId,
        accessToken: access_token,
        ...(refresh_token ? { refreshToken: refresh_token } : {}),
        createdAt: new Date(created_at),
        expiresAt: new Date(created_at + expires_in * 1000),
        data: { id_token, ...userInfo },
      },
      { new: true, upsert: true }
    )

    const exisitingUserWithToken = await UserReg.getExistingUserWithToken(userUri)

    let user: UserDoc | null = null

    if (exisitingUserWithToken) {
      user = exisitingUserWithToken
      //no actions required, token would have updated automatically
    } else if (exisitingUser) {
      console.log("exisitingUser -> WithoutToken")
      user = await UserReg.addTokenToUser(googleToken._id, "google")
    } else if (userId) {
      // new user with a session id as user id
      user = await UserReg.createUser(googleToken._id, "google")
      console.warn(`Oops, this has the user id cookie, but no user was found in db, userId:${userId}`)
      // throw Error(`Oops, this has the user id cookie, but no user was found in db, userId:${userId}`)
    } else {
      user = await UserReg.createUser(googleToken._id, "google")
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
          userUri: userInfo.sub,
          accessToken: access_token,
          refreshToken: null,
          expiresAt: new Date(created_at + expires_in),
          data: userInfo,
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error processing Google callback:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
