import express from "express";

const router = express.Router();

router.post("/", async (req, res) => {
  const { action, content } = req.body;

  if (!content?.trim()) {
    return res.status(400).json({ error: "Note content is required" });
  }

  const result =
    action === "title"
      ? "AI title feature coming soon"
      : "AI summary feature coming soon";

  res.json({ result });
});

export default router;