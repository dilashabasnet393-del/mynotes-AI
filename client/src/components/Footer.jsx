export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 text-sm text-slate-500">
        <p>© {new Date().getFullYear()} NoteHaven</p>
        <p>Built with React, Express, and MongoDB</p>
      </div>
    </footer>
  );
}