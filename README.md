# NoteHaven — AI Notes App

NoteHaven is a full-stack notes application built with React, Node.js, Express, and MongoDB. Users can create, view, edit, and delete notes, with AI-assisted title generation.

## Tech Stack

- React + Vite
- React Router
- Tailwind CSS
- Node.js + Express
- MongoDB
- OpenAI API

## Features

- Create notes
- View saved notes
- Edit notes
- Delete notes
- AI title suggestions
- Responsive navbar and footer

## Architecture

```mermaid
flowchart TB
    subgraph Client["Client (Browser) — React 19 + Vite + React Router"]
        UI["Pages / UI\nWelcome, Login, Signup\nNotes, CreateNote, EditNote\nReminders, About, Layout"]
        APIClient["Axios API client\nbaseURL: http://localhost:5000/api\nwithCredentials: true"]
        UI --> APIClient
    end

    subgraph Server["Backend — Node.js + Express (:5000)"]
        Entry["Express app\nCORS (http://localhost:5173, credentials)\nJSON parser, cookie-parser"]
        AuthR["/api/auth\nsignup, login, me, logout"]
        NotesR["/api/notes\nCRUD (auth-protected)"]
        AIR["/api/ai\nGemini: title/improve/summary/tags"]
        TxR["/api/transcribe\nMulter audio upload -> transcription"]
        RemR["/api/reminders\nlist/create/delete (auth-protected)"]
        MW["Auth middleware\nJWT from cookie"]
        Cron["node-cron (every minute)\ncron/reminders.js"]
        Mail["Mail util\nnodemailer (Gmail)"]

        Entry --> AuthR
        Entry --> NotesR
        Entry --> AIR
        Entry --> TxR
        Entry --> RemR

        NotesR -. uses .-> MW
        RemR -. uses .-> MW
        AuthR -. "GET /me" uses .-> MW
        Cron --> Mail
    end

    subgraph Data["Data — MongoDB (Mongoose)"]
        DB[("MongoDB")]
        User[("User")]
        Note[("Note")]
        Reminder[("Reminder")]
        DB --- User
        DB --- Note
        DB --- Reminder
    end

    subgraph External["External services"]
        Gemini["Google Gemini API\ngemini-1.5-flash"]
        Groq["Groq OpenAI-compatible API\nwhisper-large-v3-turbo"]
        SMTP["Gmail SMTP"]
    end

    APIClient <-->|"HTTP + JWT cookie"| Entry

    AuthR <--> User
    NotesR <--> Note
    RemR <--> Reminder
    Cron -->|"find due unsent reminders"| Reminder
    Cron -->|"mark sent"| Reminder

    AIR -->|"generateContent"| Gemini
    TxR -->|"audio.transcriptions.create"| Groq
    Mail -->|"sendMail"| SMTP
```

- **Auth**: local signup/login issues a JWT stored in an HTTP-only cookie; protected routes use auth middleware.
- **Core data**: user-scoped notes and reminders stored in MongoDB via Mongoose models.
- **AI & voice**: `/api/ai` uses Google Gemini (`GEMINI_API_KEY`); `/api/transcribe` uploads audio with Multer and transcribes via Groq Whisper (`GROQ_API_KEY`).
- **Reminders**: a cron job runs every minute to email due reminders via Nodemailer (`SMTP_USER`/`SMTP_PASS`) and mark them sent.

## Setup

1. Install backend dependencies:

```bash
cd Server
npm install
```

2. Install frontend dependencies:

```bash
cd client
npm install
```

3. Create a `.env` file in `Server` with:

```env
MONGO_URI=your_mongodb_connection_string
OPENAI_API_KEY=your_api_key
PORT=5000
```

4. Start backend:

```bash
cd Server
node server.js
```

5. Start frontend:

```bash
cd client
npm run dev
```