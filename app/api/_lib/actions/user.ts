'use server'
import { models } from 'mongoose'
import { connectToDatabase } from '@/db/mongo/connect'
import { cookies } from 'next/headers'
import { UserActivity } from '@/app/gigs/_utils/localStorage'

export async function get_or_createUser() {
  const jar = await cookies(),
    userId = jar.get('userId')?.value

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
  jar.set('userId', user.id),
    {
      name: 'userId',
      value: user.id,
      secure: true,
      maxAge: 60 * 60 * 24 * 7 * 52, //  1 year
      path: '/',
      sameSite: 'lax',
    }
  return user
}

export async function getActiveUser(userId?: string) {
  if (!userId) return null

  await connectToDatabase()
  const user = await models.User.findOne({ id: userId }, '-__v -createdAt -profile -gigAdmin'),
    gigs = await models.Attendance.find({ userId: user?._id, status: { $in: ['going', 'maybe'] } }).populate('eventId')

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

export async function updateUserGigs(gigs: UserActivity[]) {
  const jar = await cookies(),
    userId = jar.get('userId')?.value

  if (!userId) return []

  await connectToDatabase()
  try {
    let user = await models.User.findOneAndUpdate({ id: userId }, { gigs }, { new: true, upsert: true })

    return JSON.parse(JSON.stringify(user.gigs))
  } catch (error) {
    console.log('erro.updateUserGigs', error)
  }
}

export async function updateUserGigAttendance({ eventId, groupId }) {
  let jar = await cookies(),
    userId: string | null | undefined = jar.get('userId')?.value,
    status = groupId

  await connectToDatabase()

  userId = (await models.User.findOne({ id: userId }))?._id

  if (!userId || !eventId) return null

  try {
    if (['going', 'maybe'].includes(status)) {
      const attendance = await models.Attendance.findOneAndUpdate(
        { userId, eventId },
        { status, community: 'sydney' },
        { new: true, upsert: true }
      )
      console.log('updated user attendance', attendance)
    } else {
      await models.Attendance.deleteOne({ userId, eventId })
      console.log('deleted user attendance')
    }
  } catch (error) {
    console.log('error updating attendance', error)
  }
}

// export const getActiveGigs = async (community = 'sydney') => {
//   await connectToDatabase()
//   try {
//     //TODO make communities
//     let users = await models.User.find(),

//     return JSON.parse(JSON.stringify(user.gigs))
//   } catch (error) {
//     console.log('erro.updateUserGigs', error)
//   }
// }
