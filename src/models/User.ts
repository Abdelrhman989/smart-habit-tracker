import mongoose, { Document, Schema } from 'mongoose';
import { Types } from 'mongoose';

export interface IUser extends Document {
  _id: Types.ObjectId;
  email: string;
  password: string;
  otp?: string;
  otpExpires?: Date;
  verified: boolean;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    otp: { type: String },
    otpExpires: { type: Date },
    verified: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('User', userSchema);
