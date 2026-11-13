import { Link, NavLink, useNavigate } from "react-router-dom";
import { NotebookPen, LogOut, UserRound, Settings } from "lucide-react";
import { useAuth } from "../auth/useAuth";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  async function handleLogout() {
    try {
      await logout();
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
          {user && <NavLink
            to="/notes"
            className={({ isActive }) =>
              isActive ? "text-navy-900" : "transition hover:text-navy-900"
            }
          >
            My Notes
          </NavLink>}

          {user && <NavLink
            to="/notes/new"
            className={({ isActive }) =>
              isActive ? "text-navy-900" : "transition hover:text-navy-900"
            }
          >
            New Note
          </NavLink>}

          {user && <NavLink
            to="/reminders"
            className={({ isActive }) =>
              isActive ? "text-navy-900" : "transition hover:text-navy-900"
            }
          >
            Reminders
          </NavLink>}

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "text-navy-900" : "transition hover:text-navy-900"
            }
          >
            About
          </NavLink>

          {user ? <>
          <NavLink to="/profile" className={({ isActive }) => isActive ? "text-navy-900" : "transition hover:text-navy-900"}><UserRound size={15} className="inline" /> Profile</NavLink>
          <NavLink to="/settings" className={({ isActive }) => isActive ? "text-navy-900" : "transition hover:text-navy-900"}><Settings size={15} className="inline" /> Settings</NavLink>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 transition hover:border-navy-700 hover:text-navy-900"
          >
            <LogOut size={16} />
            Logout
          </button></> : <><Link to="/login">Log in</Link><Link to="/signup" className="rounded-xl bg-navy-900 px-4 py-2 text-white">Sign up</Link></>}
        </div>
      </nav>
    </header>
  );
}
