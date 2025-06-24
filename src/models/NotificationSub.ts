import mongoose, { Document, Schema, Types } from 'mongoose';

export interface INotificationSub extends Document {
  userId: Types.ObjectId;
  endpoint: string;
  keys: {
    auth: string;
    p256dh: string;
  };
}

const notificationSubSchema = new Schema<INotificationSub>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  endpoint: { type: String, required: true },
  keys: {
    auth: { type: String, required: true },
    p256dh: { type: String, required: true },
  }
}, { timestamps: true });

notificationSubSchema.index({ userId: 1, endpoint: 1 }, { unique: true });

export default mongoose.model<INotificationSub>('NotificationSub', notificationSubSchema);
