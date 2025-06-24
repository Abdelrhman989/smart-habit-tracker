import webpush from './webPush';
import { PushSubscription } from 'web-push';

export const sendPushNotification = async (
  subscription: PushSubscription,
  payload: { title: string; body: string }
) => {
  try {
    await webpush.sendNotification(
      subscription,
      JSON.stringify({
        title: payload.title,
        body: payload.body
      })
    );
  } catch (err: any) {
    if (err.statusCode === 410 || err.statusCode === 404) {
      console.log('❌ Subscription is no longer valid');
    } else {
      console.error('🔥 Error sending push:', err.message);
    }
  }
};
