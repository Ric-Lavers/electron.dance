"use server";
import { models } from "mongoose";
import { connectToDatabase } from "@/db/mongo/connect";
import { cookies } from "next/headers";

export async function get_or_createUser() {
  const jar = await cookies(),
    userId = jar.get("userId")?.value;

  let user = await getActiveUser(userId);

  if (!user) {
    user = await createUser();
  }
  return JSON.parse(JSON.stringify(user));
}

export async function createUser() {
  const jar = await cookies();
  await connectToDatabase();
  let user = await models.GigUser.create({});
  jar.set("userId", user.id),
    {
      name: "userId",
      value: user.id,
      secure: true,
      maxAge: 60 * 60 * 24 * 7 * 52, //  1 year
      path: "/",
      sameSite: "lax",
    };
  return user;
}

export async function getActiveUser(userId?: string) {
  if (!userId) {
    return null;
  }
  await connectToDatabase();
  let user = await models.GigUser.findOne({ id: userId }).populate("gigs");

  return JSON.parse(JSON.stringify(user));
}

export async function updateUserGigs(gigs) {
  const jar = await cookies(),
    userId = jar.get('userId')?.value
  console.log('updateuserGigs ', userId)

  if (!userId) return []

  await connectToDatabase()
  try {
    let user = await models.GigUser.findOneAndUpdate({ id: userId }, { gigs }, { new: true, upsert: true })

    return JSON.parse(JSON.stringify(user.gigs))
  } catch (error) {
    console.log('erro.updateUserGigs', error)
  }
}
