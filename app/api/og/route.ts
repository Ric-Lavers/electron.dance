const fs = require("fs").promises

import { ImageResponse } from "next/og"

export async function GET() {
  const imageData = await fs.readFile("public/Electron.Dance.png")
  return new ImageResponse(imageData, {
    width: 1200,
    height: 630,
  })
}
