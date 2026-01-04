'use server'
import { models, Schema } from "mongoose"
import { connectToDatabase } from "@/db/mongo/connect"
import { cookies } from "next/headers"
import { startOfToday } from "date-fns"

export async function get_or_createUser() {
  const jar = await cookies(),
    userId = jar.get("userId")?.value

  let user = await getActiveUser(userId)

  if (!user) {
    user = await createUser()
  }
  return JSON.parse(JSON.stringify(user))
}

export async function createUser() {
  const jar = await cookies()
  await connectToDatabase()
  let user = await models.User.create({})
  jar.set("userId", user.id),
    {
      name: "userId",
      value: user.id,
      secure: true,
      maxAge: 60 * 60 * 24 * 7 * 52, //  1 year
      path: "/",
      sameSite: "lax",
    }
  return user
}

export async function getActiveUser(userId?: string) {
  if (!userId) return null

  await connectToDatabase()
  const user = await models.User.findOne({ id: userId }, "-__v -createdAt -profile -gigAdmin"),
    gigs = await models.Attendance.find({ userId: user?._id, status: { $in: ["going", "maybe"] } }).populate("eventId")

  if (!user) return null

  // console.log(gigs)
  const result = {
    ...user.toObject(),
    gigs: gigs.map((g) => ({
      userId: g.eventId.userId,
      eventId: g.eventId._id,
      status: g.status,
      startDate: g.eventId.startDate,
      //future schema
      community: g.community,
      // previous schema
      groupId: g.status,
      _id: g.eventId._id,
    })),
  }

  return JSON.parse(JSON.stringify(result))
}

export async function updateUserGigAttendance({ eventId, groupId }) {
  let jar = await cookies(),
    userId: string | null | undefined = jar.get("userId")?.value,
    status = groupId

  await connectToDatabase()

  userId = (await models.User.findOne({ id: userId }))?._id

  if (!userId || !eventId) return null

  try {
    if (["going", "maybe"].includes(status)) {
      const attendance = await models.Attendance.findOneAndUpdate(
        { userId, eventId },
        { status, community: "sydney" },
        { new: true, upsert: true }
      )
      console.log("updated user attendance", attendance)
    } else {
      await models.Attendance.deleteOne({ userId, eventId })
      console.log("deleted user attendance")
    }
  } catch (error) {
    console.log("error updating attendance", error)
  }
}

export const getAllAttendance = async (community = "sydney") => {
  await connectToDatabase()
  try {
    //TODO make communities
    let allAttendance = await models.Attendance.aggregate([
      {
        $lookup: {
          from: "events",
          localField: "eventId",
          foreignField: "_id",
          as: "eventDetails",
        },
      },
      {
        $unwind: "$eventDetails",
      },
      {
        $match: {
          "eventDetails.startDate": {
            $gte: startOfToday(),
          },
        },
      },
    ])

    return JSON.parse(JSON.stringify(allAttendance.map(mapAttendance)))
  } catch (error) {
    console.log("erro.updateUserGigs", error)
    return []
  }
}

export const getOthersAttendanceSummary = async (
  from,
  community = "sydney"
): Promise<{ status: "going" | "maybe"; count: number }[]> => {
  let jar = await cookies(),
    userId: string | null | undefined = jar.get("userId")?.value
  await connectToDatabase()

  try {
    userId = (await models.User.findOne({ id: userId }))?._id
    let usersGigs = await models.Attendance.find({ userId })
    //TODO make communities
    let attendanceSummary = await models.Attendance.aggregate([
      {
        $match: {
          eventId: { $nin: usersGigs.map((_) => _.eventId) },
        },
      },
      {
        $lookup: {
          from: "events",
          localField: "eventId",
          foreignField: "_id",
          as: "event",
        },
      },
      {
        $unwind: "$event",
      },
      {
        $match: {
          "event.startDate": {
            $gte: from,
          },
        },
      },
      {
        $group: {
          _id: "$status",
          count: {
            $sum: 1,
          },
        },
      },
      {
        $project: {
          _id: 0,
          status: "$_id",
          count: 1,
        },
      },
    ])

    return attendanceSummary
  } catch (error) {
    console.log("error attendanceSummary", error)
    return []
  }
}

function mapAttendance(att) {
  return {
    userId: att.userId,
    eventId: att.eventId,
    gigId: att.eventId,
    status: att.status,
    community: att.community,
  }
}

export async function getGigs(userId?: string | null, startDate?: Date) {
  const from = startDate || startOfToday()
  await connectToDatabase()

  const gigs = await models.Event.find({ startDate: { $gte: from } }).sort({
    startDate: 1,
  })

  const gigAttendance = await models.Attendance.find({ eventId: { $in: gigs.map((g) => g._id) } })
  const result = gigs
    .map((g) => g.toObject())
    .map((g) => ({
      ...g,
      attendance: gigAttendance.filter((a) => a.eventId.equals(g._id)).map(mapAttendance),
    }))

  return JSON.parse(JSON.stringify(result))
}
