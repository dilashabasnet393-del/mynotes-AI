import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/", async (req, res) => {
  try {
    const { action, content } = req.body;

    if (content || content.trim().length < 10) {
      return res.status(400).json({
        message: "Please write at least a few words before using AI.",
      });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    let prompt = "";

    if (action === "title") {
      prompt = `Suggest one short, clear title for this note. Return only the title, without quotes:\n\n${content}`;
    } else if (action === "improve") {
      prompt = `Improve the grammar, spelling, clarity, and flow of this note. Keep the original meaning. Return only the improved note:\n\n${content}`;
    } else if (action === "summary") {
      prompt = `Summarize this note in 2-3 simple sentences. Return only the summary:\n\n${content}`;
    } else if (action === "tags") {
      prompt = `Suggest exactly 3 short topic tags for this note. Return only the tags separated by commas. Do not add numbering or explanations:\n\n${content}`;
    } else {
      return res.status(400).json({ message: "Invalid AI action" });
    }

    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();

    res.json({ result: text });
  } catch (error) {
    console.error("GEMINI ERROR:", error.response?.data || error.message);
    res.status(500).json({
      message: "AI request failed. Check backend terminal for details.",
    });
  }
});

export default router;