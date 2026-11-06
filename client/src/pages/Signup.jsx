import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function update(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      await api.post("/auth/signup", form);
      navigate("/notes");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-navy-900">
          Create your account
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Start organizing your ideas with AI-powered notes.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            name="name"
            placeholder="Full name"
            className="w-full rounded-xl border border-slate-200 px-4 py-3"
            value={form.name}
            onChange={update}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full rounded-xl border border-slate-200 px-4 py-3"
            value={form.email}
            onChange={update}
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full rounded-xl border border-slate-200 px-4 py-3"
            value={form.password}
            onChange={update}
            required
          />

          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            className="w-full rounded-xl bg-navy-900 py-3 font-semibold text-white"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Sign up"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-navy-900">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}