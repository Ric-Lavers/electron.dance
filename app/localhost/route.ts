import { NextResponse } from "next/server"

export async function GET(req) {
  const url = new URL(req.url)
  const attempts = Number(url.searchParams.get("a") ?? "0") + 1
  try {
    return NextResponse.redirect(url.origin + "/gigs" + `?a=${attempts}`)
  } catch (error) {
    console.error("Error creating user:", error)
    return NextResponse.json({ error: "User Auth failed" }, { status: 500 })
  }
}
