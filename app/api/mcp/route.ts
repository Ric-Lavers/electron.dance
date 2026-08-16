// MCP server for electron.dance (linked from app/layout.tsx via <link rel="mcp-server">
// so agents browsing the site can discover it instead of scraping HTML for gig info).
//
// Tools: list_upcoming_gigs / get_site_links are open, no auth needed — safe defaults
// for "what's on tonight/this week at electron.dance"-style requests. rsvp_to_gig and
// get_top_tracks require an MCP_TOKEN bearer token (see isAuthorized below).
import { createMcpHandler } from "mcp-handler"
import type { ServerContext } from "@modelcontextprotocol/server"
import { z } from "zod"

import { connectToDatabase } from "@/db/mongo/connect"
import Attendance from "@/db/mongo/models/attendance"
import User from "@/db/mongo/models/user"
import { getGigs } from "@/app/api/_lib/actions/user"
import { getTopTracks } from "@/app/api/spotify/top/route"

const SITE_LINKS = {
  community: "https://chat.whatsapp.com/KI2rCCnikhPAvAwN0AKiUk",
  instagram: "https://www.instagram.com/electron.dance/",
  soundcloud: "https://soundcloud.com/electrondancesyd",
  djCards: "https://cards.electron.dance",
  mixes: "https://drive.google.com/drive/folders/1CSmJuAQc9KpeMThfrrWbqezVcet2MNH1?usp=sharing",
  listen: "https://listen.electron.haus/app/",
  smsBot: "sms:+19206898256",
  gigs: "https://electron.dance/gigs",
}

const UNAUTHORIZED = {
  isError: true,
  content: [
    {
      type: "text" as const,
      text: "Unauthorized: this tool requires a valid 'Authorization: Bearer <token>' header.",
    },
  ],
}

// list_upcoming_gigs and get_site_links are intentionally open to anyone.
// rsvp_to_gig and get_top_tracks are gated behind MCP_TOKEN.
function isAuthorized(ctx: ServerContext): boolean {
  const expected = process.env.MCP_TOKEN
  if (!expected) return false

  const header = ctx.http?.req?.headers.get("authorization") ?? ""
  const [scheme, token] = header.split(" ")
  return scheme === "Bearer" && token === expected
}

async function rsvpToGig(gigId: string, status: "going" | "maybe" | "none") {
  await connectToDatabase()

  const defaultUserId = process.env.MCP_DEFAULT_USER_ID
  if (!defaultUserId) throw new Error("MCP_DEFAULT_USER_ID is not configured")

  const user = await User.findOne({ id: defaultUserId })
  if (!user) throw new Error("Default MCP user not found")

  if (status === "none") {
    await Attendance.deleteOne({ userId: user._id, eventId: gigId })
    return { gigId, status: "none" }
  }

  const attendance = await Attendance.findOneAndUpdate(
    { userId: user._id, eventId: gigId },
    { status, community: "sydney" },
    { new: true, upsert: true }
  )
  return JSON.parse(JSON.stringify(attendance))
}

const handler = createMcpHandler(
  (server) => {
    server.registerTool(
      "list_upcoming_gigs",
      {
        title: "List upcoming gigs",
        description:
          "List upcoming electron.dance gigs, each with its current going/maybe attendance. Use this for " +
          "'what's on tonight/this week/this weekend' style questions instead of scraping the website — " +
          "results are sorted soonest-first, so filter/take the first entries for 'tonight'. Open to anyone.",
        inputSchema: z.object({
          limit: z.number().int().min(1).max(50).optional().describe("Max number of gigs to return"),
        }),
      },
      async ({ limit }) => {
        const gigs = await getGigs()
        const result = limit ? gigs.slice(0, limit) : gigs
        return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] }
      }
    )

    server.registerTool(
      "rsvp_to_gig",
      {
        title: "RSVP to a gig",
        description:
          "Set attendance status for a gig (going, maybe, or none to clear it), on behalf of the site's configured default user. Requires a bearer token.",
        inputSchema: z.object({
          gigId: z.string().describe("The gig's Event _id, as returned by list_upcoming_gigs"),
          status: z.enum(["going", "maybe", "none"]),
        }),
      },
      async ({ gigId, status }, ctx) => {
        if (!isAuthorized(ctx)) return UNAUTHORIZED
        const result = await rsvpToGig(gigId, status)
        return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] }
      }
    )

    server.registerTool(
      "get_top_tracks",
      {
        title: "Get Spotify top tracks",
        description: "Get electron.dance's current Spotify top tracks (short term). Requires a bearer token.",
        inputSchema: z.object({}),
      },
      async (_args, ctx) => {
        if (!isAuthorized(ctx)) return UNAUTHORIZED
        const tracks = await getTopTracks()
        return { content: [{ type: "text", text: JSON.stringify(tracks, null, 2) }] }
      }
    )

    server.registerTool(
      "get_site_links",
      {
        title: "Get site links",
        description:
          "Get electron.dance's public community/social links (WhatsApp, Instagram, SoundCloud, DJ Cards, mixes, Listen/Navidrome, SMS bot, gigs page). Open to anyone.",
        inputSchema: z.object({}),
      },
      async () => {
        return { content: [{ type: "text", text: JSON.stringify(SITE_LINKS, null, 2) }] }
      }
    )
  },
  { serverInfo: { name: "electron-dance", version: "0.1.0" } }
)

export { handler as GET, handler as POST }
