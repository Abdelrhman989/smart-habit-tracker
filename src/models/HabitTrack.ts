import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IHabitTrack extends Document {
  habitId: Types.ObjectId;
  userId: Types.ObjectId;
  date: string; // YYYY-MM-DD
  completed: boolean;
}

const habitTrackSchema = new Schema<IHabitTrack>(
  {
    habitId: { type: Schema.Types.ObjectId, ref: 'Habit', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: String, required: true },
    completed: { type: Boolean, default: true },
  },
  { timestamps: true }
);

habitTrackSchema.index({ habitId: 1, userId: 1, date: 1 }, { unique: true });

export default mongoose.model<IHabitTrack>('HabitTrack', habitTrackSchema);
