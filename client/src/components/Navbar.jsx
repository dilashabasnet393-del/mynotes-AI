import { Link, NavLink, useNavigate } from "react-router-dom";
import { NotebookPen, LogOut } from "lucide-react";
import api from "../api";

export default function Navbar() {
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await api.post("/auth/logout");
    } catch {
      // Even if request fails, send user to login
    } finally {
      navigate("/login");
    }
  }

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-navy-900 text-white">
            <NotebookPen size={20} />
          </div>

          <span className="text-lg font-semibold">NoteHaven</span>
        </Link>

        <div className="flex items-center gap-6 text-sm font-medium text-slate-600">
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
            to="/reminders"
            className={({ isActive }) =>
              isActive ? "text-navy-900" : "transition hover:text-navy-900"
            }
          >
            Reminders
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "text-navy-900" : "transition hover:text-navy-900"
            }
          >
            About
          </NavLink>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 transition hover:border-navy-700 hover:text-navy-900"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
}