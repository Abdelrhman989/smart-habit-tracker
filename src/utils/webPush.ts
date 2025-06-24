import webpush from 'web-push';

webpush.setVapidDetails(
  "mailto:abdelrahman.mansour059@gmail.com",
  process.env.VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

export default webpush;
