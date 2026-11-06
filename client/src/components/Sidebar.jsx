import { NavLink } from "react-router-dom";
import {
  Home,
  Notebook,
  PlusCircle,
  Bell,
  Info,
  Sparkles,
} from "lucide-react";

export default function Sidebar() {
  const linkClass =
    "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition";

  return (
    <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white p-4 md:block">
      <div className="mb-8 px-2">
        <h2 className="text-lg font-bold text-navy-900">NoteHaven</h2>
        <p className="text-xs text-slate-500">AI-powered notes</p>
      </div>

      <nav className="space-y-1">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `${linkClass} ${
              isActive
                ? "bg-navy-50 text-navy-900"
                : "text-slate-600 hover:bg-slate-50"
            }`
          }
        >
          <Home size={18} />
          Home
        </NavLink>

        <NavLink
          to="/notes"
          className={({ isActive }) =>
            `${linkClass} ${
              isActive
                ? "bg-navy-50 text-navy-900"
                : "text-slate-600 hover:bg-slate-50"
            }`
          }
        >
          <Notebook size={18} />
          My Notes
        </NavLink>

        <NavLink
          to="/notes/new"
          className={({ isActive }) =>
            `${linkClass} ${
              isActive
                ? "bg-navy-50 text-navy-900"
                : "text-slate-600 hover:bg-slate-50"
            }`
          }
        >
          <PlusCircle size={18} />
          New Note
        </NavLink>

        <NavLink
          to="/reminders"
          className={({ isActive }) =>
            `${linkClass} ${
              isActive
                ? "bg-navy-50 text-navy-900"
                : "text-slate-600 hover:bg-slate-50"
            }`
          }
        >
          <Bell size={18} />
          Reminders
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            `${linkClass} ${
              isActive
                ? "bg-navy-50 text-navy-900"
                : "text-slate-600 hover:bg-slate-50"
            }`
          }
        >
          <Info size={18} />
          About
        </NavLink>
      </nav>

      <div className="mt-8 rounded-xl bg-amber-50 p-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-navy-900">
          <Sparkles size={16} />
          AI Tools
        </div>
        <p className="mt-1 text-xs text-slate-600">
          Generate titles, improve writing, and transcribe voice notes.
        </p>
      </div>
    </aside>
  );
}