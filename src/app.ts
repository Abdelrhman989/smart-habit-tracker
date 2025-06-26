import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import connectDB from './config/db';
import authRoutes from './routes/auth.router';
import habitRoutes from './routes/habit.router';
import trackRoutes from './routes/track.router';
import { scheduleDailyReminders } from './jobs/reminder.job';
import exportRoutes from './routes/export.router';
import notificationRoutes from './routes/notification.router';

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

// Connect to DB
connectDB();

app.get('/', (req, res) => {
  res.send('Smart Habit Tracker API ✅');
});


app.use('/api/auth', authRoutes);
app.use('/api/habits', habitRoutes);
app.use('/api/track', trackRoutes);
app.use('/api/export', exportRoutes)
app.use('/api/notifications', notificationRoutes);
app.get('/api/notifications/vapid-public-key', (req, res) => {
  res.send({ publicKey: process.env.VAPID_PUBLIC_KEY });
});

// Schedule daily reminders
scheduleDailyReminders();


app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
