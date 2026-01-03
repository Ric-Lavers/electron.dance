import { NextResponse } from 'next/server'
import { refreshLinkedinAccessToken } from '@/services/linkedin/refreshAccessToken'
import { me, refreshToken } from '@/services/models/refreshToken'

export async function GET(request: Request) {
  const host = await request.headers.get('host')

  try {
    const Refresh = await refreshToken.init({ phone: me, type: 'linkedIn' })


    await Refresh.getToken()

    if (Refresh.isTokenValid()) {
      //@ts-ignore
      const token = await refreshLinkedinAccessToken(Refresh.token!.refreshToken)

      const tokenData = await Refresh.saveToken(token)

      await Refresh.removeAlert()

      return NextResponse.json(tokenData, { status: 200 })
    }

    // dont spam the owner with alerts, if they have already been messaged
    if (await Refresh.hasAlertBeenSent()) {
      throw Error("Linked token is expired or doesn't exist")
    }
    //send a sms when its not valid as they owner will need to log in
    const message = "Linked token is expired or doesn't exist; \ngo to https://" + host + '/api/linkedin/auth'
    await Refresh.sendSms(message)
    await Refresh.setAlertSent()

    return new Response(message, { status: 427 })
  } catch (error: any) {
    const message = 'error refreshing linkedin token' + error?.message || error
    console.log(message)
    return new Response(message, { status: 500 })
  }
}
