# NoteHaven

Full-stack note-taking app built with React, Vite, Express, and MongoDB. Account authentication uses a JWT in an HTTP-only cookie.

## Run locally

1. Install dependencies in `server` and `client` with `npm install`.
2. Copy `server/.env.example` to `server/.env`, then set `MONGO_URI` to your MongoDB connection string and replace `JWT_SECRET` with a long random value. Add other provider keys only for features that need them. Keep `.env` out of Git.
3. Optionally set `CLIENT_ORIGIN=http://localhost:5173` in `server/.env` (this is the default).
4. Start the API from `server` with `npm run dev`.
5. Start the UI from `client` with `npm run dev`; open the Vite URL shown in the terminal.
6. Set `VITE_API_URL` in `client/.env` only if the API is not at `http://localhost:5000` (omit `/api`).

## Authentication walkthrough

1. Signup validates input, normalizes the email, hashes the password, stores a MongoDB `User`, and sets an HTTP-only cookie.
2. Login checks the password hash and sets the same cookie.
3. The frontend calls `GET /api/auth/me` at startup to restore the signed-in user.
4. `POST /api/auth/logout` clears the cookie.
5. Protected React routes send guests to `/login` and return them to their requested page after login. Notes and reminders also require authentication on the API.
6. Signed-in users can edit their name at `/profile` and change their password at `/settings`.
7. `/`, `/about`, `/privacy`, and `/terms` are public routes.

## Check with two users

Use two separate browser profiles (or one normal and one private window) so each keeps a separate cookie jar.

The backend integration check can also be run against a dedicated test database: start the API with `MONGO_URI` set to that database and `PORT=5011`, then run `AUTH_TEST_API_URL=http://127.0.0.1:5011/api node scripts/test-auth-flow.mjs` from `server`. The script creates unique test accounts and removes their users and notes when finished. Do not point the test API at a production database.

1. In browser A, sign up as a first test user and create a note with a unique title such as `A-only test`.
2. In browser B, sign up as a different email and create a note titled `B-only test`.
3. Confirm each account sees only its own note, and that each `/api/auth/me` response contains that account's name and email.
4. Confirm `/api/auth/me` without a session returns 401, and that a guest opening `/notes` is sent to `/login`.
5. Log out of browser A. Confirm its cookie is cleared and `/notes` redirects to `/login`; browser B should remain signed in.
6. Remove the two test accounts and their test notes from the development database when finished.

## Legal pages

The Privacy Policy and Terms pages are starter copy. Review them and replace the operator/contact details and practices with the real service policies before publishing.
