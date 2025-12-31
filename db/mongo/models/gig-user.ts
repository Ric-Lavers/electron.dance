import { model, Schema, InferSchemaType, HydratedDocument, PopulatedDoc, models, Model } from 'mongoose'
import { customAlphabet } from 'nanoid'
import { TokenSchema, TokenDoc } from './token'
import { DerivedProfile, deriveProfileFromTokens } from '../utils'

const nano = customAlphabet("electronDance2026", 10);

export const GigUserSchema = new Schema(
  {
    id: {
      type: String,
      default: () => nano(),
    },
    tokens: [{ type: Schema.Types.ObjectId, ref: "Token" }],
    gigsAdmin: [{ type: Schema.Types.ObjectId, ref: "Event" }],
    gigs: [
      {
        _id: { type: Schema.Types.ObjectId, ref: "Event" },
        groupId: String,
      },
    ],

    // following: [{ type: Schema.Types.ObjectId, ref: "GigUser" }],

    lastLoginMethod: { type: String },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// One virtual that returns the computed profile object
GigUserSchema.virtual("profile").get(async function (this: UserDocument) {
  await this.populate("tokens");
  // `this` is a Mongoose document
  //@ts-ignore
  return deriveProfileFromTokens((this.tokens as TokenDoc[]) || []);
});

// Convenience virtuals
GigUserSchema.virtual("email").get(function (this: UserDocument) {
  return this.profile?.email;
});

GigUserSchema.virtual("name").get(function (this: UserDocument) {
  return this.profile?.name;
});

// You said: avatarUrl: profileImage – pick whichever you want to use in code
GigUserSchema.virtual("avatarUrl").get(function (this: UserDocument) {
  return this.profile?.avatarUrl;
});

GigUserSchema.virtual("profileImage").get(function (this: UserDocument) {
  return this.profile?.avatarUrl;
});

// Optional: virtual for which provider “owns” the profile
GigUserSchema.virtual("profileProvider").get(function (this: UserDocument) {
  return this.profile?.provider;
});

export type TokenData = InferSchemaType<typeof TokenSchema>;
type UserSchemaType = InferSchemaType<typeof GigUserSchema>;
export type UserDoc = UserSchemaType & {
  tokens: PopulatedDoc<TokenDoc & Document>[];
  // virtuals:
  profile: DerivedProfile;
  email?: string;
  name?: string;
  avatarUrl?: string;
  profileImage?: string;
  profileProvider?: DerivedProfile["provider"];
};
export type UserDocument = HydratedDocument<UserDoc>;
//@ts-ignore
const GigUserModel =
  (models.GigUser as Model<UserDoc>) ||
  model<UserDoc>("GigUser", GigUserSchema);

export default GigUserModel
