import { model, Schema, InferSchemaType, HydratedDocument, models, Model } from "mongoose"

export const EventSchema = new Schema(
  {
    uri: String,
    url: {
      type: String,
      unique: true,
    },
    title: String,
    artists: [String],
    description: String,
    organiser: String,
    image: String,
    startDate: Date,
    endDate: Date,
    location: String,
    price: Number,
    public: {
      type: Boolean,
      default: true,
    },
    community: String,
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
)
EventSchema.index({ startDate: 1 }, { unique: true })

type EventSchemaType = InferSchemaType<typeof EventSchema>
export type EventDoc = EventSchemaType & {
  _id: string
}
export type EventDocument = HydratedDocument<EventDoc>

//@ts-ignore
const EventModel = (models.Event as Model<EventDoc>) || model<EventDoc>("Event", EventSchema)

export default EventModel
