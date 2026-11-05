import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Save, Sparkles } from "lucide-react";
import api from "../api";

export default function CreateNote() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [aiLoading, setAiLoading] = useState("");

  async function askAI(action) {
    setAiLoading(action);

    try {
      const response = await api.post("/ai", { action, content });

      if (action === "title") {
        setTitle(response.data.result);
      }
    } catch {
      alert("AI request failed");
    } finally {
      setAiLoading("");
    }
  }

  async function saveNote(event) {
    event.preventDefault();
    setSaving(true);

    try {
      await api.post("/notes", { title, content });
      navigate("/notes");
    } catch {
      alert("Could not save note");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-semibold text-navy-900">Create a note</h1>
      <p className="mt-2 text-slate-500">
        Write your idea, then use AI to suggest a title.
      </p>

      <form onSubmit={saveNote} className="mt-8 space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium">Title</label>
          <input
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-navy-700"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />

          <button
            type="button"
            onClick={() => askAI("title")}
            className="mt-2 flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium transition hover:border-navy-700"
          >
            <Sparkles size={14} />
            {aiLoading === "title" ? "Thinking..." : "Suggest AI title"}
          </button>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Note</label>
          <textarea
            className="min-h-48 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-navy-700"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            required
          ></textarea>
        </div>

        <button
          className="flex items-center gap-2 rounded-xl bg-amber-brand px-6 py-3 font-semibold text-navy-900 transition hover:brightness-95"
          disabled={saving}
        >
          <Save size={18} />
          {saving ? "Saving..." : "Save note"}
        </button>
      </form>
    </div>
  );
}