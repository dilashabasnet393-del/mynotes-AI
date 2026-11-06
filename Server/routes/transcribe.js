import express from "express";
import multer from "multer";
import OpenAI from "openai";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 25 * 1024 * 1024,
  },
});

router.post("/", upload.single("audio"), async (req, res) => {
  try {
    if (!process.env.GROQ_API_KEY) {
      return res.status(500).json({
        message: "GROQ_API_KEY is missing in server/.env",
      });
    }

    const client = new OpenAI({
      apiKey: process.env.GROQ_API_KEY,
      baseURL: "https://api.groq.com/openai/v1",
    });

    if (!req.file) {
      return res.status(400).json({ message: "No audio file uploaded" });
    }

    const transcription = await client.audio.transcriptions.create({
      file: new File([req.file.buffer], req.file.originalname, {
        type: req.file.mimetype,
      }),
      model: "whisper-large-v3-turbo",
    });

    res.json({
      text: transcription.text,
    });
  } catch (error) {
    console.error(
      "TRANSCRIPTION ERROR:",
      error.response?.data || error.message
    );

    res.status(500).json({
      message: "Could not transcribe audio. Check backend terminal.",
    });
  }
});

export default router;