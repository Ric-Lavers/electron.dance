import { model, models, Schema } from 'mongoose'

export const CountSchema = new Schema(
  {
    count: { type: Number, required: true },
    id: { type: String, unique: true },
    name: String,
  },
  { timestamps: true }
)

//@ts-ignore
export default models.Count || model('Count', CountSchema)
