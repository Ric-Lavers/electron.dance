import { models, model, Schema, Model, Document, ObjectId } from 'mongoose'

export const TokenSchema = new Schema(
  {
    // from the api service
    userUri: { type: String },
    // from the this app
    userId: { type: String },
    provider: { type: String, required: true, index: true },
    accessToken: { type: String, required: true },
    refreshToken: { type: String },
    expiresAt: { type: Date },

    data: Object,
  },
  { timestamps: true }
)
export interface TokenDoc extends Document<ObjectId> {
  userUri: string
  provider: string
  accessToken: string
  refreshToken: string
  expiresAt: Date
  data: any
}
//@ts-ignore
const TokenModel = (models.Token as Model<TokenDoc> | undefined) || model<TokenDoc>('Token', TokenSchema)

export default TokenModel
