import { model, models, Schema } from "mongoose"

export const AlertSchema = new Schema(
  {
    number: String,
    type: { type: String, require: true },
    sent: { type: Boolean, require: true },
    data: Object,
  },
  { timestamps: true }
)

AlertSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 })
//@ts-ignore
export default models.Alert || model("Alert", AlertSchema)
