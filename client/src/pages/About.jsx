import { Link } from "react-router-dom";
import { Notebook, Sparkles, Mic, Bell } from "lucide-react";

export default function About() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-4xl font-bold text-navy-900">About NoteHaven</h1>

      <p className="mt-4 text-lg text-slate-600">
        NoteHaven is a full-stack AI-powered note-taking application built with
        the MERN stack. It helps students, developers, and professionals capture
        ideas, organize knowledge, improve their writing, and remember important
        tasks through email reminders.
      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <Notebook className="text-navy-900" />
          <h2 className="mt-3 text-lg font-semibold">Smart Notes</h2>
          <p className="mt-2 text-slate-600">
            Create, edit, search, pin, and delete notes. Every note is stored
            securely in MongoDB and connected to your account.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <Sparkles className="text-navy-900" />
          <h2 className="mt-3 text-lg font-semibold">AI Assistance</h2>
          <p className="mt-2 text-slate-600">
            Use AI to generate a clear title, improve grammar and clarity,
            summarize long notes, and suggest useful topic tags.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <Mic className="text-navy-900" />
          <h2 className="mt-3 text-lg font-semibold">Voice to Text</h2>
          <p className="mt-2 text-slate-600">
            Speak your idea instead of typing it. Upload an audio note and
            NoteHaven converts it into editable text using speech recognition.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <Bell className="text-navy-900" />
          <h2 className="mt-3 text-lg font-semibold">Email Reminders</h2>
          <p className="mt-2 text-slate-600">
            Write anything important, choose a time, and receive an email
            reminder so you never forget it.
          </p>
        </div>
      </div>

      <div className="mt-12 rounded-2xl bg-navy-900 p-8 text-white">
        <h2 className="text-2xl font-semibold">Built with MERN</h2>
        <p className="mt-3 text-slate-200">
          React and Vite power the frontend. Node.js and Express handle the REST
          API, authentication, AI requests, and reminder scheduling. MongoDB
          stores users, notes, and reminders.
        </p>

        <Link
          to="/notes"
          className="mt-6 inline-block rounded-xl bg-amber-brand px-6 py-3 font-semibold text-navy-900"
        >
          Open Notebook
        </Link>
      </div>
    </div>
  );
}