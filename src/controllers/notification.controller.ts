import { Request, Response } from 'express';
import NotificationSub from '../models/NotificationSub';

export const saveSubscription = async (req: Request, res: Response) => {
  const { subscription } = req.body;
  const userId = req.user!.id;

  try {
    await NotificationSub.findOneAndUpdate(
      { userId, endpoint: subscription.endpoint },
      {
        userId,
        endpoint: subscription.endpoint,
        keys: subscription.keys
      },
      { upsert: true, new: true }
    );

    res.json({ message: 'Subscription saved' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving subscription' });
  }
};
