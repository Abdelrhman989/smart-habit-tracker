import { Request, Response } from 'express';
import Habit from '../models/Habit';

export const createHabit = async (req: Request, res: Response) => {
  const { title, description, frequency, days } = req.body;
  if (!req.user || !req.user.id) {
    return res.status(401).json({ message: 'Unauthorized: user not found' });
  }
  try {
    const habit = await Habit.create({
      title,
      description,
      frequency,
      days,
      createdBy: req.user.id,
    });
    res.status(201).json(habit);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getHabits = async (req: Request, res: Response) => {
  if (!req.user || !req.user.id) {
    return res.status(401).json({ message: 'Unauthorized: user not found' });
  }
  try {
    const habits = await Habit.find({ createdBy: req.user.id });
    res.json(habits);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const updateHabit = async (req: Request, res: Response) => {
  if (!req.user || !req.user.id) {
    return res.status(401).json({ message: 'Unauthorized: user not found' });
  }
  const { id } = req.params;
  try {
    const habit = await Habit.findOneAndUpdate(
      { _id: id, createdBy: req.user.id },
      req.body,
      { new: true }
    );
    if (!habit) return res.status(404).json({ message: 'Habit not found' });
    res.json(habit);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const deleteHabit = async (req: Request, res: Response) => {
  if (!req.user || !req.user.id) {
    return res.status(401).json({ message: 'Unauthorized: user not found' });
  }
  const { id } = req.params;
  try {
    const habit = await Habit.findOneAndDelete({ _id: id, createdBy: req.user.id });
    if (!habit) return res.status(404).json({ message: 'Habit not found' });
    res.json({ message: 'Habit deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
