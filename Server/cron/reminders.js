import cron from "node-cron";
import Reminder from "../models/Reminder.js";
import sendReminderEmail from "../utils/sendEmail.js";

cron.schedule("* * * * *", async () => {
  try {
    const now = new Date();

    const dueReminders = await Reminder.find({
      sent: false,
      remindAt: { $lte: now },
    });

    for (const reminder of dueReminders) {
      await sendReminderEmail(reminder.email, reminder.text);

      reminder.sent = true;
      await reminder.save();

      console.log("Reminder email sent:", reminder.text);
    }
  } catch (error) {
    console.error("Reminder cron error:", error.message);
  }
});