import { Link } from "react-router-dom";
import { NotebookPen, Sparkles, ArrowRight } from "lucide-react";

export default function Welcome() {
  return (
    <div className="min-h-screen bg-slate-soft">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-navy-900 text-white">
            <NotebookPen size={20} />
          </div>
          <span className="text-lg font-semibold">NoteHaven</span>
        </div>

        <Link
          to="/notes"
          className="rounded-xl bg-navy-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-navy-700"
        >
          Open Notebook
        </Link>
      </header>

      <main className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-medium text-slate-600 shadow-sm">
            <Sparkles size={14} className="text-amber-brand" />
            AI-powered note organization
          </span>

          <h1 className="mt-6 text-5xl font-semibold leading-tight tracking-tight text-navy-900">
            A calm home for every idea you save.
          </h1>

          <p className="mt-5 max-w-lg text-lg text-slate-600">
            NoteHaven helps you write, organize, search, and understand your
            notes. Save ideas once and find them easily later.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/notes"
              className="flex items-center gap-2 rounded-xl bg-amber-brand px-6 py-3 font-semibold text-navy-900 transition hover:brightness-95"
            >
              Start writing
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/about"
              className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-medium text-navy-900 transition hover:border-navy-700"
            >
              Learn more
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-3 w-3 rounded-full bg-red-400"></div>
            <div className="h-3 w-3 rounded-full bg-amber-400"></div>
            <div className="h-3 w-3 rounded-full bg-green-400"></div>
          </div>

          <div className="space-y-4">
            <div className="h-4 w-3/4 rounded bg-slate-100"></div>
            <div className="h-4 w-full rounded bg-slate-100"></div>
            <div className="h-4 w-5/6 rounded bg-slate-100"></div>
            <div className="h-24 rounded-xl bg-slate-50"></div>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-6 text-sm text-slate-500">
          © {new Date().getFullYear()} NoteHaven
        </div>
      </footer>
    </div>
  );
}