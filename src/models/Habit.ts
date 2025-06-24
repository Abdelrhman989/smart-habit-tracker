import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IHabit extends Document {
  title: string;
  description?: string;
  createdBy: Types.ObjectId;
  frequency: 'daily' | 'weekly';
  days: string[]; // ex: ['mon', 'tue']
  createdAt: Date;
}

const habitSchema = new Schema<IHabit>(
  {
    title: { type: String, required: true },
    description: { type: String },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    frequency: { type: String, enum: ['daily', 'weekly'], default: 'daily' },
    days: [{ type: String }], // applicable if weekly
  },
  { timestamps: true }
);

export default mongoose.model<IHabit>('Habit', habitSchema);
