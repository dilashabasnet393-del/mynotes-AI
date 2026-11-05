import { Trash2, CalendarDays } from "lucide-react";

function NoteCard({ note, onDelete }) {
  const createdDate = new Date(note.createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <article className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md">
      <div>
        <div className="mb-3 flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold leading-snug text-navy-900">
            {note.title}
          </h3>

          <button
            onClick={() => onDelete(note._id)}
            className="rounded-lg p-1.5 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
            aria-label="Delete note"
          >
            <Trash2 size={16} />
          </button>
        </div>

        <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-600">
          {note.content}
        </p>
      </div>

      <footer className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-4 text-xs text-slate-400">
        <CalendarDays size={14} />
        Saved on {createdDate}
      </footer>
    </article>
  );
}

export default NoteCard;