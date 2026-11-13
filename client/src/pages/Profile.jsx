import { useState } from "react";
import api from "../api";
import { useAuth } from "../auth/useAuth";

export default function Profile() {
  const { user, refreshUser } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function save(event) {
    event.preventDefault(); setMessage(""); setError("");
    try {
      const { data } = await api.put("/auth/profile", { name });
      setName(data.user.name);
      await refreshUser();
      setMessage("Profile updated.");
    } catch (err) { setError(err.response?.data?.message || "Could not update profile."); }
  }

  return <section className="mx-auto max-w-xl px-6 py-12">
    <h1 className="text-3xl font-semibold text-navy-900">Your profile</h1>
    <form onSubmit={save} className="mt-6 space-y-4 rounded-2xl bg-white p-6 shadow-sm">
      <label className="block text-sm font-medium">Name<input className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3" value={name} onChange={(e) => setName(e.target.value)} maxLength={80} required /></label>
      <label className="block text-sm font-medium">Email<input className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3" value={user?.email || ""} readOnly /></label>
      {message && <p role="status" className="text-green-700">{message}</p>}{error && <p role="alert" className="text-red-600">{error}</p>}
      <button className="rounded-xl bg-navy-900 px-5 py-3 font-semibold text-white">Save profile</button>
    </form>
  </section>;
}
