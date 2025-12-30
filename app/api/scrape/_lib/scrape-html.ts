import { chromium } from "playwright";
import * as cheerio from "cheerio";

export async function chromiumHtml(url: string) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle" });
  let html = await page.content();

  await browser.close();
  return html;
}

export async function getRenderedHtml(html) {
  const $ = cheerio.load(html);

  $("style, script, noscript, svg, canvas").remove();
  $("[style]").removeAttr("style");

  return $("body").text().replace(/\s+/g, " ").trim();
}

const pick = (...values: (string | undefined)[]) =>
  values.find((v) => v && v.trim());
export async function getSocialMeta(html) {
  const $ = cheerio.load(html);

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
    image: pick(
      $('meta[property="og:image"]').attr("content"),
      $('meta[name="twitter:image"]').attr("content")
    ),
  };
}
