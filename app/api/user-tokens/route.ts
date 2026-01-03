import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { connectToDatabase } from '@/db/mongo/connect'
import User from '@/db/mongo/models/user'


export async function GET() {
  try {
    const jar = await cookies(),
      userId = jar.get('userId')?.value

    if (!userId) {
      return NextResponse.json([], { status: 200 })
    }
    await connectToDatabase()
    const user = await User.findOne({ id: userId }).populate('tokens', '-accessToken -refreshToken -_id -__v'),
      //@ts-ignore
      tokens = (user?.tokens || []).filter((t) => t.provider !== 'calendly')

    return NextResponse.json(tokens, { status: 200 })
  } catch (error) {
    console.error('Error processing:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
