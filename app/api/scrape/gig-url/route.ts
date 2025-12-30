import { NextRequest, NextResponse } from "next/server";
import {
  chromiumHtml,
  getRenderedHtml,
  getSocialMeta,
} from "../_lib/scrape-html";
import { extractEventJson } from "../_lib/open-api";

export async function GET(req: NextRequest) {
  try {
    const query = Object.fromEntries(req.nextUrl.searchParams),
      data = await generateEventData(query.url);

    return NextResponse.json(
      data,

      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

async function generateEventData(url: string) {
  const html = await chromiumHtml(url);
  const meta = await getSocialMeta(html);
  const content = await getRenderedHtml(html);
  console.log({
    meta,
    content,
  });

  return extractEventJson({
    url,
    meta,
    content,
  });
}
