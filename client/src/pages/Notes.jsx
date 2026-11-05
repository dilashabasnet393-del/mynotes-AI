import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Plus } from "lucide-react";
import api from "../api";
import NoteCard from "../components/NoteCard";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function getNotes() {
    setLoading(true);

    try {
      const response = await api.get("/notes");
      setNotes(response.data);
    } catch {
      setError("Could not load notes.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getNotes();
  }, []);

  async function handleDelete(id) {
    if (!window.confirm("Delete this note?")) return;

    await api.delete(`/notes/${id}`);
    getNotes();
  }

  const filteredNotes = notes.filter((note) => {
    const text = search.toLowerCase();
    return (
      note.title.toLowerCase().includes(text) ||
      note.content.toLowerCase().includes(text)
    );
  });

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-navy-900">My Notes</h1>
          <p className="text-slate-500">
            {filteredNotes.length} notes in your notebook
          </p>
        </div>

        <Link
          to="/notes/new"
          className="flex items-center gap-2 rounded-xl bg-amber-brand px-5 py-3 font-semibold text-navy-900 transition hover:brightness-95"
        >
          <Plus size={18} />
          New Note
        </Link>
      </div>

      <div className="relative mb-8 max-w-md">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-9 pr-4 text-sm outline-none focus:border-navy-700"
          placeholder="Search notes..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      {error && <p className="text-red-600">{error}</p>}
      {loading && <p className="text-slate-500">Loading notes...</p>}

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {filteredNotes.map((note) => (
          <NoteCard key={note._id} note={note} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}