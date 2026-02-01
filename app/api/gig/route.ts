import { startOfToday } from "date-fns"
import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { connectToDatabase } from "@/db/mongo/connect"
import Event from "@/db/mongo/models/event"
import User from "@/db/mongo/models/user"
import { Schema } from "mongoose"

export async function POST(req: NextRequest) {
  try {
    const formData = await req.json()

    await connectToDatabase()

    const event = await Event.create({
      url: formData.url,
      title: formData.title,
      artists: formData.artists || [],
      description: formData.description,
      organiser: formData.organiser,
      image: formData.image,
      startDate: formData.startDate ? new Date(formData.startDate) : undefined,
      endDate: formData.endDate ? new Date(formData.endDate) : undefined,
      location: formData.location,
      price: formData.price,
    })

    return NextResponse.json({ success: true, data: event }, { status: 201 })
  } catch (error) {
    console.error("Error creating event:", error)
    return NextResponse.json({ errorMessage: error.messages, error }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const query = Object.fromEntries(req.nextUrl.searchParams),
      from = new Date(query?.start || startOfToday()),
      jar = await cookies(),
      userId = jar.get("userId")?.value

    await connectToDatabase()
    let usersGigIds: Schema.Types.ObjectId[] = []

    if (userId) {
      //@ts-ignore
      usersGigIds = (await User.findOne({ id: userId }))?.gigs || []
      console.log(usersGigIds)
    }

    const gigs = await Event.find({ startDate: { $gte: from } }).sort({
      startDate: 1,
    })
    return NextResponse.json(gigs, { status: 200 })
  } catch (error) {
    console.error("Error fetching events:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
