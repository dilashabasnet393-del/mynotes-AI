import express from "express";
import Note from "../models/Note.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.use(auth);

router.get("/", async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id }).sort({
      pinned: -1,
      createdAt: -1,
    });

    res.json(notes);
  } catch {
    res.status(500).json({ message: "Could not load notes" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, content, tags, summary } = req.body;

    const note = await Note.create({
      user: req.user.id,
      title,
      content,
      tags: tags || [],
      summary: summary || "",
    });

    res.status(201).json(note);
  } catch {
    res.status(500).json({ message: "Could not create note" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json(note);
  } catch {
    res.status(500).json({ message: "Could not load note" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
      },
      req.body,
      { new: true }
    );

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json(note);
  } catch {
    res.status(500).json({ message: "Could not update note" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json({ message: "Note deleted" });
  } catch {
    res.status(500).json({ message: "Could not delete note" });
  }
});

export default router;