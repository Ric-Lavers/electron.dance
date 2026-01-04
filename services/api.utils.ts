import { cookies } from "next/headers"

export async function setUserId(userId: string) {
  const jar = await cookies()
  jar.set({
    name: "userId",
    value: userId,
    secure: true,
    maxAge: 60 * 60 * 24 * 7 * 52, //  1 year
    path: "/",
    sameSite: "lax",
  })
  console.log("cookie set", { userId })
}
