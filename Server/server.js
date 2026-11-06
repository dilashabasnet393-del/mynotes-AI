import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import noteRoutes from "./routes/notes.js";
import authRoutes from "./routes/auth.js";
import aiRoutes from "./routes/ai.js";
import transcribeRoutes from "./routes/transcribe.js";
import reminderRoutes from "./routes/reminders.js";
import "./cron/reminders.js";

dotenv.config();
console.log("GROQ key loaded:", process.env.GROQ_API_KEY ? "YES" : "NO");
console.log("GEMINI key loaded:", process.env.GEMINI_API_KEY ? "YES" : "NO");
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json({ limit: "25mb" }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/transcribe", transcribeRoutes);
app.use("/api/reminders", reminderRoutes);

app.get("/", (req, res) => {
  res.send("NoteHaven backend is running");
});

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});