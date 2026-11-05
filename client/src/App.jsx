import { useEffect, useState } from "react";
import { BookOpen, Search, Trash2, Plus, NotebookPen } from "lucide-react";
import api from "./api";
import NoteCard from "./components/NoteCard";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function getNotes() {
    setLoading(true);
    setError("");

    try {
      const response = await api.get("/notes");
      setNotes(response.data);
    } catch {
      setError("Could not load notes. Please check your server.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getNotes();
  }, []);

  async function handleSaveNote(event) {
    event.preventDefault();

    try {
      await api.post("/notes", { title, content });
      setTitle("");
      setContent("");
      getNotes();
    } catch {
      setError("Could not save your note.");
    }
  }

  async function handleDeleteNote(id) {
    if (!window.confirm("Delete this note permanently?")) return;

    try {
      await api.delete(`/notes/${id}`);
      getNotes();
    } catch {
      setError("Could not delete this note.");
    }
  }

  const filteredNotes = notes.filter((note) => {
    const text = search.toLowerCase();
    return (
      note.title.toLowerCase().includes(text) ||
      note.content.toLowerCase().includes(text)
    );
  });

  return (
    <div className="min-h-screen bg-slate-soft text-ink">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-navy-900 text-white">
              <NotebookPen size={20} />
            </div>
            <div>
              <h1 className="text-lg font-semibold tracking-tight">
                NoteHaven
              </h1>
              <p className="text-xs text-slate-500">
                Organize ideas. Keep what matters.
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            <a className="transition hover:text-navy-900" href="#">
              Home
            </a>
            <a className="transition hover:text-navy-900" href="#">
              My Notes
            </a>
            <a className="transition hover:text-navy-900" href="#">
              About
            </a>
          </div>

          <button className="flex items-center gap-2 rounded-xl bg-navy-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-navy-700">
            <Plus size={16} />
            New Note
          </button>
        </nav>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        <section className="mb-12 grid gap-8 lg:grid-cols-[380px_1fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-2">
              <BookOpen size={18} className="text-amber-brand" />
              <h2 className="text-lg font-semibold">Create a note</h2>
            </div>

            <form onSubmit={handleSaveNote} className="space-y-4">
              <input
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-navy-700 focus:bg-white"
                placeholder="Note title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                required
              />

              <textarea
                className="min-h-40 w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-relaxed outline-none transition focus:border-navy-700 focus:bg-white"
                placeholder="Write your idea, plan, or reminder..."
                value={content}
                onChange={(event) => setContent(event.target.value)}
                required
              ></textarea>

              <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-brand px-4 py-3 text-sm font-semibold text-navy-900 transition hover:brightness-95">
                <Plus size={16} />
                Save Note
              </button>
            </form>
          </div>

          <div>
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">
                  Your notes
                </h2>
                <p className="text-sm text-slate-500">
                  {filteredNotes.length}{" "}
                  {filteredNotes.length === 1 ? "note" : "notes"} saved
                </p>
              </div>

              <div className="relative w-full sm:max-w-xs">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-4 text-sm outline-none transition focus:border-navy-700"
                  placeholder="Search notes..."
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </div>
            </div>

            {error && (
              <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </p>
            )}

            {loading && (
              <p className="text-sm text-slate-500">Loading your notes...</p>
            )}

            {!loading && !error && filteredNotes.length === 0 && (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-14 text-center">
                <BookOpen size={32} className="mx-auto mb-4 text-slate-300" />
                <h3 className="text-lg font-semibold">No notes found</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Create your first note using the form beside this section.
                </p>
              </div>
            )}

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filteredNotes.map((note) => (
                <NoteCard
                  key={note._id}
                  note={note}
                  onDelete={handleDeleteNote}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} NoteHaven</p>
          <p>Built with React, Express, and MongoDB</p>
        </div>
      </footer>
    </div>
  );
}

export default App;