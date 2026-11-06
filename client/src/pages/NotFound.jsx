import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-6 text-center">
      <h1 className="text-6xl font-bold text-navy-900">404</h1>
      <p className="mt-3 text-lg text-slate-600">
        This page could not be found.
      </p>
      <Link
        to="/"
        className="mt-6 rounded-xl bg-navy-900 px-6 py-3 font-semibold text-white"
      >
        Back to home
      </Link>
    </div>
  );
}