import { Link, NavLink } from "react-router-dom";
import { NotebookPen } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/notes" className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-navy-900 text-white">
            <NotebookPen size={20} />
          </div>
          <span className="text-lg font-semibold">NoteHaven</span>
        </Link>

        <div className="flex items-center gap-7 text-sm font-medium text-slate-600">
          <NavLink
            to="/notes"
            className={({ isActive }) =>
              isActive ? "text-navy-900" : "transition hover:text-navy-900"
            }
          >
            My Notes
          </NavLink>

          <NavLink
            to="/notes/new"
            className={({ isActive }) =>
              isActive ? "text-navy-900" : "transition hover:text-navy-900"
            }
          >
            New Note
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "text-navy-900" : "transition hover:text-navy-900"
            }
          >
            About
          </NavLink>
        </div>
      </nav>
    </header>
  );
}