import OpenAI from "openai"
import { z } from "zod"
import { zodTextFormat } from "openai/helpers/zod"
import { chromiumHtml, getSocialMeta, getRenderedHtml } from "./scrape-html"

export type EventExtractInput = {
  url: string // parsed html page (already textified / cleaned as you like)
  content: string // parsed html page (already textified / cleaned as you like)
  meta: {
    title?: string
    description?: string
    image?: string
  }
  data?: any
}

// STRICT model output (schema-conformant)
export type EventExtractOutputStrict = {
  uri?: string // a
  url: string
  title: string | null
  artists: string[]
  description: string | null
  organiser: string | null
  image: string | null //href
  startDate: string | null // ISO 8601
  endDate: string | null // ISO 8601 or null
  price: number | null
  location: "TBA" | "Online" | "Secret location" | string | null // venue Name
  address: string | null
}

// RELAXED app-facing output
export type EventExtractOutput = {
  url: string
  title?: string
  artists: string[]
  description?: string
  organiser?: string
  image?: string
  startDate?: string
  endDate?: string
  location?: "TBA" | "Online" | "Secret location" | string
  price?: number
}

export const EventExtractSchema = z.object({
  uri: z.string().min(1).nullable(),
  url: z.string().min(1),

  title: z.string().min(1).nullable(),
  artists: z.array(z.string()).default([]),

  description: z.string().min(1).nullable(),
  organiser: z.string().min(1).nullable(),
  image: z.string().min(1).nullable(),

  startDate: z.string().min(1).nullable(), // ISO 8601 date-time string or null
  endDate: z.string().min(1).nullable(), // ISO 8601 date-time string or null
  price: z.number().nonnegative().nullable(),

  location: z.string().nullable(),
})

// function normalizeEvent(strict: EventExtractOutputStrict): EventExtractOutput {
//   const out: EventExtractOutput = {
//     url: strict.url,
//     artists: strict.artists ?? [],
//   }

//   //   if (strict.title) out.title = strict.title
//   //   if (strict.description) out.description = strict.description
//   //   if (strict.organiser) out.organiser = strict.organiser
//   //   if (strict.image) out.image = strict.image
//   //   if (strict.startDate) out.startDate = strict.startDate
//   //   if (strict.endDate) out.endDate = strict.endDate
//   //   if (strict.location) out.location = strict.location
//   //   if (strict.price !== null) out.price = strict.price;

//   return out
// }
export async function extractEventJson(input: EventExtractInput): Promise<EventExtractOutputStrict> {
  const client = new OpenAI({ apiKey: process.env.OPEN_API_SECRET })

  const resp = await client.responses.parse({
    model: "gpt-4o-mini",
    // You can set store: false if you don’t want OpenAI storing responses
    // store: false,
    input: [
      {
        role: "system",
        content:
          "You extract event information from messy ticketing/event pages. " +
          "When information is not for a event return a empty schema, do not try and imagine a event." +
          "Return ONLY the JSON object matching the provided schema. " +
          "Use metas a hint, but can enhance with details in content." +
          "if data exists, it is often reliable, but enhance with details from content." +
          "data.title can be a the headliner artist name or may not, when the content confirms this add to artists array" +
          "if the meta image url is local, concat it with the url" +
          "Description character limit is 3 paragraphs, summarised if over" +
          "Dates/times must be ISO 8601. If timezone is given, include it (e.g. +11:00). " +
          "If location is intentionally hidden (emailed day-of / secret venue), set location to 'Secret location'. " +
          "If it just says 'To be announced', set location to 'TBA'.",
      },
      {
        role: "system",
        content: `output as following type 
          type EventExtractOutputStrict = {
            uri?: string // a
            url: string
            title: string | null
            artists: string[]
            description: string | null
            organiser?: string | null
            image: string | null //href
            startDate: string | null // ISO 8601
            endDate?: string | null // ISO 8601 or null
            price?: number | null
            location: 'TBA' | 'Online' | 'Secret location' | string | null // venue Name
            address?: string | null
          }
         `,
      },
      {
        role: "user",
        content:
          `URL:\n${JSON.stringify(input.url, null, 2)}\n\n` +
          `META:\n${JSON.stringify(input.meta, null, 2)}\n\n` +
          `DATA:\n${JSON.stringify(input.data, null, 2)}\n\n` +
          `CONTENT:\n${input.content}`,
      },
    ],
    text: {
      format: zodTextFormat(EventExtractSchema, "event_extract"),
    },
  })
  //@ts-ignore
  // This is already a validated object (or the call throws).
  return resp.output_parsed as EventExtractOutputStrict
  //   const strict = resp.output_parsed as EventExtractOutputStrict
  //   return normalizeEvent(strict)
}

export async function generateEventData(url: string, data?: any) {
  const html = await chromiumHtml(url),
    [meta, content] = await Promise.all([getSocialMeta(html), getRenderedHtml(html)])

  return extractEventJson({
    url,
    meta,
    content,
    data,
  })
}
