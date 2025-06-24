import nodemailer from 'nodemailer';

export const sendOTP = async (to: string, otp: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER!,
      pass: process.env.EMAIL_PASS!
    }
  });

  await transporter.sendMail({
    from: `"Smart Habit Tracker" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'OTP Verification',
    text: `Your OTP code is: ${otp}`,
  });
};


export const sendEmail = async (to: string, subject: string, text: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER!,
      pass: process.env.EMAIL_PASS!
    }
  });

  await transporter.sendMail({
    from: `"Smart Habit Tracker" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
  });
};
