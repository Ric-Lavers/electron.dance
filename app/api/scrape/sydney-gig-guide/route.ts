import { NextRequest, NextResponse } from "next/server"
import { generateEventData } from "../_lib/open-api"
import { chromium } from "playwright"
import { connectToDatabase } from "@/db/mongo/connect"
import Event, { EventDoc } from "@/db/mongo/models/event"

const SydneyGigGuideURL = "https://sydneymusic.net/gig-guide"
export async function GET(req: NextRequest) {
  try {
    await connectToDatabase()

    let gigs = await gigGuideEvents()
    const result: EventDoc[] = []
    // gigs = gigs.slice(0, 2)
    let i = 0
    for (const gig of gigs) {
      console.log(`processing: ${i++} of ${gigs.length}`)
      console.log(gig)
      try {
        let ç: any = await Event.findOne({ uri: gig.uri })
        if (!ç && gig.url) {
          ç = await generateEventData(gig.url, gig)
          await Event.create({
            public: true,
            ...ç,
          })
        }
        result.push(ç)
      } catch (error) {
        console.log(`ERR0R with url ${gig.url} |`, error)
        console.log(JSON.stringify(error))
      }
    }

    // const html = await chromiumHtml(SydneyGigGuideURL)

    return NextResponse.json(
      result,

      { status: 200 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

async function getContent(ƒ, fallback: any = "") {
  try {
    return ƒ()
  } catch (error) {
    console.log(error)

    return fallback
  }
}
export async function gigGuideEvents() {
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage()
  await page.goto(SydneyGigGuideURL, { waitUntil: "networkidle" })

  const months = page.locator(".guide-month")

  const gigs: any = []
  for (const monthIndex of [0, 1]) {
    const month = months.nth(monthIndex)

    const cards = month.locator(".eventcardhost")
    const count = await cards.count()

    for (let i = 0; i < count - 1; i++) {
      // process.stdout.write(`scraping: ${i++} of ${count}`)
      const card = cards.nth(i)

      let startDate = await getContent(() => card.locator("[data-gigstartdate]").getAttribute("data-gigstartdate"))
      if (!startDate) continue

      let uri = await card.locator("[data-gigid]").getAttribute("data-gigid"),
        title = await card.locator(".headliner").textContent(),
        location = await getContent(() => card.locator(".venue").textContent()),
        info = await card.locator(".moreinfo"),
        url = (await info.count()) !== 0 ? await info.getAttribute("href") : "",
        support = await getContent(async () => {
          const $ = await card.locator(".supports"),
            count = await $.count(),
            text = count !== 0 ? ((await $.textContent()) as string) : "",
            artists = text.replace("W/ ", "").split(", ").filter(Boolean)
          return artists
        }, []),
        artists = support

      gigs.push({
        uri,
        url,
        startDate: new Date(startDate as string),
        title,
        location,
        artists,
      })
      console.log(`Complete: scraping: ${i++} of ${count}`)
      // process with month context
    }
  }

  // let html = await page.content();

  await browser.close()

  return gigs
}
