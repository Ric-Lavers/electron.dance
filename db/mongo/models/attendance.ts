import { model, Schema, InferSchemaType, HydratedDocument, models, Model } from 'mongoose'

export const AttendanceSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true, index: true },
    status: { type: String, enum: ['going', 'maybe'] },
    community: String,
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
)

AttendanceSchema.index({ userId: 1, eventId: 1 }, { unique: true })
AttendanceSchema.index({ eventId: 1, status: 1, updatedAt: -1 })

type AttendanceSchemaType = InferSchemaType<typeof AttendanceSchema>
export type AttendanceDoc = AttendanceSchemaType & {
  _id: string
}
export type AttendanceDocument = HydratedDocument<AttendanceDoc>

//@ts-ignore
const AttendanceModel =
  (models.Attendance as Model<AttendanceDoc>) || model<AttendanceDoc>('Attendance', AttendanceSchema)

export default AttendanceModel
