// import { chromium } from "playwright"
import * as cheerio from "cheerio"
import { getChromiumPath } from "../sydney-gig-guide/util"

export async function chromiumHtml(url: string) {
  let puppeteer: any,
    launchOptions: any = {
      headless: true,
    }
  const isVercel = !!process.env.VERCEL_ENV
  console.log({ isVercel })
  if (isVercel) {
    const chromium = (await import("@sparticuz/chromium-min")).default
    puppeteer = await import("puppeteer-core")
    const executablePath = await getChromiumPath()
    launchOptions = {
      ...launchOptions,
      args: chromium.args,
      executablePath,
    }
    console.log("Launching browser with executable path:", launchOptions)
  } else {
    puppeteer = await import("puppeteer")
  }

  let browser = await puppeteer.launch(launchOptions)

  // const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage()
  await page.goto(url, { waitUntil: "domcontentloaded" })
  let html = await page.content()

  await browser.close()
  return html
}

export async function getRenderedHtml(html) {
  const $ = cheerio.load(html)

  $("style, script, noscript, svg, canvas").remove()
  $("[style]").removeAttr("style")

  return $("body").text().replace(/\s+/g, " ").trim()
}

const pick = (...values: (string | undefined)[]) => values.find((v) => v && v.trim())
export async function getSocialMeta(html) {
  const $ = cheerio.load(html)

  return {
    title: pick(
      $('meta[property="og:title"]').attr("content"),
      $('meta[name="twitter:title"]').attr("content"),
      $("title").text()
    ),
    description: pick(
      $('meta[property="og:description"]').attr("content"),
      $('meta[name="twitter:description"]').attr("content"),
      $('meta[name="description"]').attr("content")
    ),
    image: pick($('meta[property="og:image"]').attr("content"), $('meta[name="twitter:image"]').attr("content")),
  }
}
