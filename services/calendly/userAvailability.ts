import axios from "axios"
import { connectToDatabase } from "@/db/mongo/connect"
import Token from "@/db/mongo/models/token"
import { NextRequest } from "next/server"

export function getRedirectUrl(req: NextRequest) {
  const url = new URL(req.url)
  return url.origin + "/api/calendly/callback"
}

export async function userAvailabilitySchedules() {
  await connectToDatabase()
  const token = await Token.findOne({ provider: "calendly" })
  if (!token) {
    throw Error()
  }

  const { data } = await axios.get(`https://api.calendly.com/user_availability_schedules`, {
    params: { user: token.data.uri },
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token.accessToken}` },
  })

  return data
}

export async function userEventTypes() {
  await connectToDatabase()
  const token = await Token.findOne({ provider: "calendly" })
  if (!token) {
    throw Error()
  }
  const { data } = await axios.get(`https://api.calendly.com/event_types`, {
    params: { user: token.data.uri },
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token.accessToken}` },
  })

  return data
}

export async function userBusyTimes({ start_time, end_time }: { start_time: Date; end_time: Date }) {
  await connectToDatabase()
  const token = await Token.findOne({ provider: "calendly" })
  if (!token) {
    throw Error()
  }

  const res = await axios.get(`https://api.calendly.com/user_busy_times`, {
    params: {
      user: token.data.uri,
      start_time: start_time.toISOString(),
      end_time: end_time.toISOString(),
    },
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token.accessToken}` },
  })

  return res.data
}

export async function createScheduleLink({ max_event_count = 1 }) {
  await connectToDatabase()
  const eventTypes = await userEventTypes()
  const token = await Token.findOne({ provider: "calendly" })
  if (!token) {
    throw Error()
  }
  const { data } = await axios.post(
    `https://api.calendly.com/scheduling_links`,
    {
      owner: eventTypes.collection[0].uri,
      max_event_count,
      owner_type: "EventType",
    },
    {
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token.accessToken}` },
    }
  )

  return data
}
