import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 text-sm text-slate-500">
        <p>© {new Date().getFullYear()} NoteHaven</p>
        <div className="flex gap-4"><Link to="/privacy" className="hover:text-navy-900">Privacy</Link><Link to="/terms" className="hover:text-navy-900">Terms</Link></div>
      </div>
    </footer>
  );
}
