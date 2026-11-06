import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export default async function sendReminderEmail(to, text) {
  await transporter.sendMail({
    from: `"NoteHaven" <${process.env.SMTP_USER}>`,
    to,
    subject: "NoteHaven Reminder",
    text: `Reminder: ${text}`,
  });
}