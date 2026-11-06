import express from "express";
import Reminder from "../models/Reminder.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.use(auth);

router.get("/", async (req, res) => {
  try {
    const reminders = await Reminder.find({ user: req.user.id }).sort({
      remindAt: 1,
    });

    res.json(reminders);
  } catch {
    res.status(500).json({ message: "Could not load reminders" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { text, remindAt } = req.body;

    if (!text || !remindAt) {
      return res.status(400).json({
        message: "Reminder text and time are required",
      });
    }

    const reminder = await Reminder.create({
      user: req.user.id,
      text,
      remindAt,
      email: req.user.email,
    });

    res.status(201).json(reminder);
  } catch {
    res.status(500).json({ message: "Could not create reminder" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Reminder.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    res.json({ message: "Reminder deleted" });
  } catch {
    res.status(500).json({ message: "Could not delete reminder" });
  }
});

export default router;