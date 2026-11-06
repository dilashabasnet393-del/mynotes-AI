import { useCallback, useEffect, useState } from "react";
import { Bell, Trash2 } from "lucide-react";
import api from "../api";

export default function Reminders() {
  const [reminders, setReminders] = useState([]);
  const [text, setText] = useState("");
  const [remindAt, setRemindAt] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadReminders = useCallback(async () => {
    try {
      const response = await api.get("/reminders");
      setReminders(response.data);
      setError("");
    } catch (err) {
      setReminders([]);

      if (err.response?.status === 401) {
        setError("You must log in to continue.");
      } else {
        setError(
          err.response?.data?.message ||
            "Could not load reminders. Is the backend running?"
        );
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
  let isActive = true;

  async function fetchReminders() {
    try {
      const response = await api.get("/reminders");

      if (isActive) {
        setReminders(response.data);
        setError("");
      }
    } catch (err) {
      if (isActive) {
        setReminders([]);

        if (err.response?.status === 401) {
          setError("You must log in to continue.");
        } else {
          setError(
            err.response?.data?.message ||
              "Could not load reminders. Is the backend running?"
          );
        }
      }
    } finally {
      if (isActive) {
        setLoading(false);
      }
    }
  }

  fetchReminders();

  return () => {
    isActive = false;
  };
}, []);



  async function createReminder(event) {
    event.preventDefault();

    try {
      await api.post("/reminders", { text, remindAt });
      setText("");
      setRemindAt("");
      loadReminders();
    } catch (err) {
      alert(
        err.response?.data?.message || "Could not create reminder"
      );
    }
  }

  async function deleteReminder(id) {
    if (!window.confirm("Delete this reminder?")) return;

    try {
      await api.delete(`/reminders/${id}`);
      loadReminders();
    } catch (err) {
      alert(
        err.response?.data?.message || "Could not delete reminder"
      );
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-3xl font-semibold text-navy-900">Reminders</h1>
      <p className="mt-2 text-slate-500">
        Save something important and NoteHaven will email you at the chosen
        time.
      </p>

      {error && (
        <div className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <form
        onSubmit={createReminder}
        className="mt-8 rounded-2xl bg-white p-6 shadow-sm"
      >
        <label className="mb-2 block text-sm font-medium">
          What should you remember?
        </label>

        <textarea
          className="min-h-24 w-full rounded-xl border border-slate-200 px-4 py-3"
          value={text}
          onChange={(event) => setText(event.target.value)}
          required
        ></textarea>

        <label className="mb-2 mt-4 block text-sm font-medium">
          Reminder time
        </label>

        <input
          type="datetime-local"
          className="w-full rounded-xl border border-slate-200 px-4 py-3"
          value={remindAt}
          onChange={(event) => setRemindAt(event.target.value)}
          required
        />

        <button className="mt-4 flex items-center gap-2 rounded-xl bg-amber-brand px-6 py-3 font-semibold text-navy-900">
          <Bell size={18} />
          Set reminder
        </button>
      </form>

      <div className="mt-8 space-y-3">
        {loading && <p>Loading reminders...</p>}

        {!loading && !error && reminders.length === 0 && (
          <p className="rounded-xl bg-white p-6 text-slate-500">
            No reminders yet.
          </p>
        )}

        {reminders.map((reminder) => (
          <div
            key={reminder._id}
            className="flex items-center justify-between rounded-xl bg-white p-5 shadow-sm"
          >
            <div>
              <p className="font-medium text-navy-900">{reminder.text}</p>
              <p className="text-xs text-slate-500">
                {new Date(reminder.remindAt).toLocaleString()}
              </p>
              <p className="text-xs">
                {reminder.sent ? "Email sent" : "Pending"}
              </p>
            </div>

            <button
              onClick={() => deleteReminder(reminder._id)}
              className="rounded-lg p-2 text-red-500 hover:bg-red-50"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}