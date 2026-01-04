import { model, Schema, InferSchemaType, HydratedDocument, PopulatedDoc, models, Model } from "mongoose"
import { customAlphabet } from "nanoid"
import { TokenSchema, TokenDoc } from "./token"
import { DerivedProfile, deriveProfileFromTokens } from "../utils"

const nano = customAlphabet("electronDance2026", 10)

export const UserSchema = new Schema(
  {
    id: {
      type: String,
      default: () => nano(),
    },
    tokens: [{ type: Schema.Types.ObjectId, ref: "Token" }],
    gigsAdmin: [{ type: Schema.Types.ObjectId, ref: "Event" }],

    // following: [{ type: Schema.Types.ObjectId, ref: "GigUser" }],

    lastLoginMethod: { type: String },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
)

// One virtual that returns the computed profile object
UserSchema.virtual("profile").get(async function (this: UserDocument) {
  await this.populate("tokens")
  // `this` is a Mongoose document
  //@ts-ignore
  return deriveProfileFromTokens((this.tokens as TokenDoc[]) || [])
})

// Convenience virtuals
UserSchema.virtual("email").get(function (this: UserDocument) {
  return this.profile?.email
})

UserSchema.virtual("name").get(function (this: UserDocument) {
  return this.profile?.name
})

// You said: avatarUrl: profileImage – pick whichever you want to use in code
UserSchema.virtual("avatarUrl").get(function (this: UserDocument) {
  return this.profile?.avatarUrl
})

UserSchema.virtual("profileImage").get(function (this: UserDocument) {
  return this.profile?.avatarUrl
})

// Optional: virtual for which provider “owns” the profile
UserSchema.virtual("profileProvider").get(function (this: UserDocument) {
  return this.profile?.provider
})

export type TokenData = InferSchemaType<typeof TokenSchema>
type UserSchemaType = InferSchemaType<typeof UserSchema>
export type UserDoc = UserSchemaType & {
  tokens: PopulatedDoc<TokenDoc & Document>[]
  // virtuals:
  profile: DerivedProfile
  email?: string
  name?: string
  avatarUrl?: string
  profileImage?: string
  profileProvider?: DerivedProfile["provider"]
}
export type UserDocument = HydratedDocument<UserDoc>
//@ts-ignore
const UserModel = (models.User as Model<UserDoc>) || model<UserDoc>("User", UserSchema)

export default UserModel
