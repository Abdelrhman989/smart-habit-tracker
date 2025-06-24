import { Request, Response } from "express";
import HabitTrack from "../models/HabitTrack";
import Habit from "../models/Habit";
import moment from "moment";
import mongoose from "mongoose";

export const markHabitCompleted = async (req: Request, res: Response) => {
  const { habitId } = req.params;
  const userId = req.user!.id;
  const today = moment().format("YYYY-MM-DD");

  try {
    const habit = await Habit.findOne({ _id: habitId, createdBy: userId });
    if (!habit) return res.status(404).json({ message: "Habit not found" });

    const tracked = await HabitTrack.findOneAndUpdate(
      { habitId, userId, date: today },
      { completed: true },
      { upsert: true, new: true }
    );

    res.json({ message: "Habit marked as done", data: tracked });
  } catch (error) {
    console.error(error); // Add this line to log the error
    res.status(500).json({ message: "Server Error" });
  }
};

export const getHabitTracking = async (req: Request, res: Response) => {
  const { habitId } = req.params;
  const userId = req.user!.id;

  try {
    const data = await HabitTrack.find({ habitId, userId }).sort({ date: 1 });
    res.json({ data });
  } catch (error) {
    console.error(error); // Add this line to log the error
    res.status(500).json({ message: "Server Error" });
  }
};

export const getHabitStats = async (req: Request, res: Response) => {
  const { habitId } = req.params;
  const userId = req.user!.id;

  try {
    const totalTracked = await HabitTrack.countDocuments({ habitId, userId });
    const totalCompleted = await HabitTrack.countDocuments({
      habitId,
      userId,
      completed: true,
    });

    const completionRate =
      totalTracked > 0 ? Math.round((totalCompleted / totalTracked) * 100) : 0;

    res.json({
      habitId,
      totalTracked,
      totalCompleted,
      completionRate, // مثال: 75%
    });
  } catch (error) {
    console.error(error); // Add this line to log the error
    res.status(500).json({ message: "Server Error" });
  }
};

export const getAllStats = async (req: Request, res: Response) => {
  const userId = req.user!.id;

  try {
    const stats = await HabitTrack.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: "$habitId",
          totalTracked: { $sum: 1 },
          totalCompleted: { $sum: { $cond: ["$completed", 1, 0] } },
        },
      },
      {
        $project: {
          habitId: "$_id",
          totalTracked: 1,
          totalCompleted: 1,
          completionRate: {
            $cond: [
              { $gt: ["$totalTracked", 0] },
              {
                $round: [
                  {
                    $multiply: [
                      { $divide: ["$totalCompleted", "$totalTracked"] },
                      100,
                    ],
                  },
                  0,
                ],
              },
              0,
            ],
          },
        },
      },
    ]);

    res.json({ stats });
  } catch (error) {
    console.error(error); // Add this line to log the error
    res.status(500).json({ message: "Server Error" });
  }
};
