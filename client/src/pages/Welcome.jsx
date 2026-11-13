import { Link } from "react-router-dom";
import {
  Notebook,
  Sparkles,
  Mic,
  Bell,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "../auth/useAuth";

export default function Welcome() {
  const { user } = useAuth();
  return (
    <div className="min-h-screen bg-white">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-navy-900 text-white">
            <Notebook size={18} />
          </div>
          <span className="text-lg font-bold text-navy-900">NoteHaven</span>
        </div>

        <div className="flex items-center gap-3">
          {user ? <Link to="/notes" className="rounded-xl bg-navy-900 px-5 py-2 text-sm font-semibold text-white">Open my notes</Link> : <><Link
            to="/login"
            className="rounded-xl px-4 py-2 text-sm font-medium text-slate-600 hover:text-navy-900"
          >
            Log in
          </Link>
          <Link
            to="/signup"
            className="rounded-xl bg-navy-900 px-5 py-2 text-sm font-semibold text-white"
          >
            Get started
          </Link></>}
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 pb-20 pt-16 text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-xs font-semibold text-navy-900">
          <Sparkles size={14} />
          AI-powered note taking
        </span>

        <h1 className="mx-auto mt-6 max-w-3xl text-5xl font-bold leading-tight text-navy-900">
          Capture ideas. Improve writing. Never forget what matters.
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
          NoteHaven helps you create organized notes, generate titles with AI,
          improve your writing, turn voice notes into text, and receive email
          reminders.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            to={user ? "/notes" : "/signup"}
            className="flex items-center gap-2 rounded-xl bg-amber-brand px-7 py-4 font-semibold text-navy-900"
          >
            {user ? "Open my notes" : "Create free account"}
            <ArrowRight size={18} />
          </Link>

          <Link
            to="/about"
            className="rounded-xl border border-slate-200 px-7 py-4 font-semibold text-navy-900"
          >
            Learn more
          </Link>
        </div>

        <div className="mx-auto mt-16 grid max-w-4xl gap-5 md:grid-cols-3">
          <div className="rounded-2xl bg-slate-50 p-6 text-left">
            <Sparkles className="text-navy-900" />
            <h3 className="mt-3 font-semibold text-navy-900">AI writing help</h3>
            <p className="mt-1 text-sm text-slate-600">
              Generate titles, improve grammar, summarize notes, and create tags.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-6 text-left">
            <Mic className="text-navy-900" />
            <h3 className="mt-3 font-semibold text-navy-900">Voice notes</h3>
            <p className="mt-1 text-sm text-slate-600">
              Upload or record audio and convert it into editable text.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-6 text-left">
            <Bell className="text-navy-900" />
            <h3 className="mt-3 font-semibold text-navy-900">Email reminders</h3>
            <p className="mt-1 text-sm text-slate-600">
              Set a time and receive a reminder directly in your inbox.
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 py-8 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} NoteHaven. Built with the MERN stack.
      </footer>
    </div>
  );
}
