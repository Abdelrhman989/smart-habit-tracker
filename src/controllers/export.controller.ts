import { Request, Response } from 'express';
import { Parser } from 'json2csv';
import HabitTrack from '../models/HabitTrack';
import PDFDocument from 'pdfkit';
import Habit from '../models/Habit';

export const exportHabitCSV = async (req: Request, res: Response) => {
  const userId = req.user!.id;

  try {
    const tracks = await HabitTrack.find({ userId }).populate('habitId');

    const data = tracks.map(track => ({
      habit: (track.habitId as any).title,
      date: track.date,
      completed: track.completed ? 'Yes' : 'No'
    }));

    const parser = new Parser({ fields: ['habit', 'date', 'completed'] });
    const csv = parser.parse(data);

    res.header('Content-Type', 'text/csv');
    res.attachment('habit-tracking.csv');
    return res.send(csv);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};


export const exportHabitPDF = async (req: Request, res: Response) => {
  const userId = req.user!.id;

  try {
    const habits = await Habit.find({ createdBy: userId });
    const tracks = await HabitTrack.find({ userId });

    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=habit-report.pdf');
    doc.pipe(res);

    doc.fontSize(18).text('📋 Smart Habit Tracker Report', { underline: true });
    doc.moveDown();

    for (const habit of habits) {
      const habitTracks = tracks.filter(t => t.habitId.toString() === (habit._id as string).toString());
      doc.fontSize(14).text(`• ${habit.title}`);
      doc.fontSize(12);

      habitTracks.forEach(t => {
        doc.text(`  - ${t.date} → ${t.completed ? '✅ Done' : '❌ Missed'}`);
      });

      doc.moveDown();
    }

    doc.end();
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
