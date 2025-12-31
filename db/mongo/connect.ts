//@ts-nocheck
import mongoose from "mongoose";

import { TokenSchema } from "./models/token";
import { AlertSchema } from "./models/alert";
import { UserSchema } from "./models/user";
import { CountSchema } from "./models/count";
import { EventSchema } from "./models/event";
import { GigUserSchema } from "./models/gig-user";

const MONGODB_URI = process.env.MONGODB_URI!;
if (!MONGODB_URI) throw new Error("❌ Missing MONGODB_URI in .env");

let cached = global.mongoose as {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

if (!cached) cached = global.mongoose = { conn: null, promise: null };

export async function connectToDatabase() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false });
  }

  cached.conn = await cached.promise;

  cached.conn.Token = cached.conn.model("Token", TokenSchema);
  cached.conn.Alert = cached.conn.model("Alert", AlertSchema);
  cached.conn.User = cached.conn.model("User", UserSchema);
  cached.conn.Count = cached.conn.model("Count", CountSchema);
  cached.conn.Event = cached.conn.model("Event", EventSchema);
  cached.conn.GigUser = cached.conn.model("GigUser", GigUserSchema);

  return cached.conn;
}
