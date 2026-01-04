import { NextResponse } from "next/server"

import { connectToDatabase } from "@/db/mongo/connect"
import Token from "@/db/mongo/models/token"

export async function GET() {
  try {
    const length = await tokenLength()
    return NextResponse.json(
      {
        message: "processed successfully",
        length,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error processing:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
export async function tokenLength() {
  await connectToDatabase()
  let length = await Token.countDocuments()
  return length
}
