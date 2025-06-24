import cron from 'node-cron';
import moment from 'moment';
import User from '../models/User';
import Habit from '../models/Habit';
import HabitTrack from '../models/HabitTrack';
import { sendEmail } from '../utils/sendEmail'; 
import NotificationSub from '../models/NotificationSub';
import { sendPushNotification } from '../utils/sendPushNotification';

// export const scheduleDailyReminders = () => {
//     // Schedule a job to run every day at 8 AM   
//     //cron.schedule('* * * * *', async () => {
//     // Note: This is a simple example and may need to be adjusted based on your specific use case.
//   cron.schedule('0 8 * * *', async () => {
//     const today = moment().format('dddd').toLowerCase(); // ex: 'monday'
//     const todayDate = moment().format('YYYY-MM-DD');

//     const users = await User.find({ verified: true });

//     for (const user of users) {
//       const habits = await Habit.find({
//         createdBy: user._id,
//         $or: [
//           { frequency: 'daily' },
//           { frequency: 'weekly', days: today }
//         ]
//       });

//       let pendingHabits = [];

//       for (const habit of habits) {
//         const tracked = await HabitTrack.findOne({
//           userId: user._id,
//           habitId: habit._id,
//           date: todayDate
//         });

//         if (!tracked || !tracked.completed) {
//           pendingHabits.push(habit.title);
//         }
//       }

//       if (pendingHabits.length > 0) {
//         const habitList = pendingHabits.map(h => `• ${h}`).join('\n');
//         await sendEmail(user.email, 'Habit Reminder', `Don't forget your habits today:\n\n${habitList}`);
//       }
//     }

//     console.log(`✅ Reminder job ran at ${moment().format('HH:mm')}`);
//   });
// };

export const scheduleDailyReminders = () => {
  // Schedule a job to run every day at 8 AM
  cron.schedule('0 8 * * *', async () => {
    const today = moment().format('dddd').toLowerCase(); // ex: 'monday'
    const todayDate = moment().format('YYYY-MM-DD');
    const users = await User.find({ verified: true });

    for (const user of users) {
      const habits = await Habit.find({
        createdBy: user._id,
        $or: [
          { frequency: 'daily' },
          { frequency: 'weekly', days: today }
        ]
      });

      let pendingHabits: string[] = [];

      for (const habit of habits) {
        const tracked = await HabitTrack.findOne({
          userId: user._id,
          habitId: habit._id,
          date: todayDate
        });

        if (!tracked || !tracked.completed) {
          pendingHabits.push(habit.title);
        }
      }

      if (pendingHabits.length > 0) {
        const subs = await NotificationSub.find({ userId: user._id });

        for (const sub of subs) {
          await sendPushNotification(
            {
              endpoint: sub.endpoint,
              keys: {
                auth: sub.keys.auth,
                p256dh: sub.keys.p256dh
              }
            },
            {
              title: '🧠 SmartHabit Reminder',
              body: `You have ${pendingHabits.length} habit(s) to complete today.`
            }
          );
        }
      }
    }

    console.log(`🔔 Reminder job ran at ${moment().format('HH:mm')}`);
  });
};
