import { useState } from "react";
import api from "../api";

export default function Settings() {
  const [currentPassword, setCurrent] = useState("");
  const [newPassword, setNew] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  async function changePassword(event) {
    event.preventDefault(); setMessage(""); setError("");
    try {
      const { data } = await api.put("/auth/password", { currentPassword, newPassword });
      setMessage(data.message); setCurrent(""); setNew("");
    } catch (err) { setError(err.response?.data?.message || "Could not update password."); }
  }
  return <section className="mx-auto max-w-xl px-6 py-12">
    <h1 className="text-3xl font-semibold text-navy-900">Settings</h1>
    <form onSubmit={changePassword} className="mt-6 space-y-4 rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold">Change password</h2>
      <input aria-label="Current password" type="password" autoComplete="current-password" placeholder="Current password" className="w-full rounded-xl border border-slate-200 px-4 py-3" value={currentPassword} onChange={(e) => setCurrent(e.target.value)} required />
      <input aria-label="New password" type="password" autoComplete="new-password" placeholder="New password (at least 8 characters)" minLength={8} maxLength={128} className="w-full rounded-xl border border-slate-200 px-4 py-3" value={newPassword} onChange={(e) => setNew(e.target.value)} required />
      {message && <p role="status" className="text-green-700">{message}</p>}{error && <p role="alert" className="text-red-600">{error}</p>}
      <button className="rounded-xl bg-navy-900 px-5 py-3 font-semibold text-white">Update password</button>
    </form>
  </section>;
}
