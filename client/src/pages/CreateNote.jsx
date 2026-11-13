import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, Wand2, Mic } from "lucide-react";
import api from "../api";

export default function CreateNote() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [saving, setSaving] = useState(false);
  const [aiLoading, setAiLoading] = useState("");

  async function askAI(action) {
    setAiLoading(action);

    try {
      const response = await api.post("/ai", { action, content });

      if (action === "title") {
        setTitle(response.data.result);
      } else if (action === "improve") {
        setContent(response.data.result);
      } else if (action === "tags") {
        setTags(response.data.result);
      }
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "AI request failed. Is the backend running?"
      );
    } finally {
      setAiLoading("");
    }
  }

  async function handleAudioUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    setAiLoading("audio");

    const formData = new FormData();
    formData.append("audio", file);

    try {
      const response = await api.post("/transcribe", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setContent((prev) => prev + "\n\n" + response.data.text);
    } catch (error) {
      alert(
        error.response?.data?.message || "Voice transcription failed"
      );
    } finally {
      setAiLoading("");
    }
  }

  async function saveNote(event) {
    event.preventDefault();
    setSaving(true);

    try {
      await api.post("/notes", {
        title,
        content,
        tags: tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      });

      navigate("/notes");
    } catch (error) {
      alert(error.response?.data?.message || "Could not save note");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-semibold text-navy-900">
        Create a note
      </h1>

      <form onSubmit={saveNote} className="mt-8 space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium">Title</label>

          <input
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />

          <div className="mt-2 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => askAI("title")}
              className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs"
            >
              <Sparkles size={14} />
              {aiLoading === "title" ? "Thinking..." : "AI Title"}
            </button>

            <button
              type="button"
              onClick={() => askAI("tags")}
              className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs"
            >
              <Sparkles size={14} />
              {aiLoading === "tags" ? "Generating..." : "AI Tags"}
            </button>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Note</label>

          <textarea
            className="min-h-48 w-full rounded-xl border border-slate-200 bg-white px-4 py-3"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            required
          ></textarea>

          <div className="mt-2 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => askAI("improve")}
              className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs"
            >
              <Wand2 size={14} />
              {aiLoading === "improve" ? "Improving..." : "Improve Writing"}
            </button>

            <label
              htmlFor="audio-upload"
              className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs"
            >
              <Mic size={14} />
              {aiLoading === "audio" ? "Transcribing..." : "Voice Note"}
            </label>

            <input
              id="audio-upload"
              type="file"
              accept="audio/*"
              onChange={handleAudioUpload}
              className="hidden"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Tags</label>

          <input
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3"
            value={tags}
            onChange={(event) => setTags(event.target.value)}
            placeholder="study, react, ideas"
          />
        </div>

        <button
          className="rounded-xl bg-amber-brand px-6 py-3 font-semibold text-navy-900"
          disabled={saving}
        >
          {saving ? "Saving..." : "Save note"}
        </button>
      </form>
    </div>
  );
}
