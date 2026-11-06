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