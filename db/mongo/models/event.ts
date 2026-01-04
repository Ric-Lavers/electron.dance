import { model, Schema, InferSchemaType, HydratedDocument, models, Model } from "mongoose"

export const EventSchema = new Schema(
  {
    uri: String,
    url: {
      type: String,
      required: true,
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
    public: Boolean,
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
)

type EventSchemaType = InferSchemaType<typeof EventSchema>
export type EventDoc = EventSchemaType & {
  _id: string
}
export type EventDocument = HydratedDocument<EventDoc>

//@ts-ignore
const EventModel = (models.Event as Model<EventDoc>) || model<EventDoc>("Event", EventSchema)

export default EventModel
