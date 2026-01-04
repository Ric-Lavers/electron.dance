import { NextResponse } from "next/server"
import { me, refreshToken } from "@/services/models/refreshToken"

export async function GET(request: Request) {
  const host = await request.headers.get("host")

  try {
    const Refresh = await refreshToken.init({ phone: me, type: "google" })

    const tokenListData = await Refresh.refreshManyTokens()
    if (tokenListData.length) {
      return NextResponse.json(tokenListData, { status: 200 })
    }

    // dont spam the owner with alerts, if they have already been messaged
    if (await Refresh.hasAlertBeenSent()) {
      throw Error("Google token is expired or doesn't exist")
    }
    //send a sms when its not valid as they owner will need to log in
    const message = "Google token is expired or doesn't exist; \ngo to https://" + host + "/api/google/auth"
    await Refresh.sendSms(message)
    await Refresh.setAlertSent()

    return new Response(message, { status: 427 })
  } catch (error: any) {
    const message = "error refreshing google token" + error?.message || error
    console.log(message)
    return new Response(message, { status: 500 })
  }
}
