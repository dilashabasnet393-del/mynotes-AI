import "dotenv/config";
import assert from "node:assert/strict";
import mongoose from "mongoose";
import Note from "../models/Note.js";
import User from "../models/User.js";

const baseUrl = process.env.AUTH_TEST_API_URL || "http://127.0.0.1:5000/api";
const suffix = `${Date.now()}-${process.pid}`;
const emailA = `auth-test-a-${suffix}@example.invalid`;
const emailB = `auth-test-b-${suffix}@example.invalid`;
const passwordA = "phase10-test-password-a";
const passwordB = "phase10-test-password-b";

async function request(path, method = "GET", cookie, body) {
  return fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      ...(cookie ? { cookie } : {}),
      ...(body ? { "content-type": "application/json" } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
}

function cookieFrom(response) {
  const setCookie = response.headers.getSetCookie()[0] || "";
  return { value: setCookie.split(";")[0], header: setCookie };
}

try {
  const signupA = await request("/auth/signup", "POST", null, {
    name: "Auth Test A", email: emailA, password: passwordA,
  });
  assert.equal(signupA.status, 201, "user A signup should succeed");
  const cookieA = cookieFrom(signupA);
  assert.match(cookieA.header, /HttpOnly/i, "signup cookie should be HTTP-only");

  const signupB = await request("/auth/signup", "POST", null, {
    name: "Auth Test B", email: emailB, password: passwordB,
  });
  assert.equal(signupB.status, 201, "user B signup should succeed");
  const cookieB = cookieFrom(signupB);

  const meA = await request("/auth/me", "GET", cookieA.value);
  assert.equal(meA.status, 200);
  assert.equal((await meA.json()).user.email, emailA);
  assert.equal((await request("/auth/me")).status, 401, "guest /auth/me should be unauthorized");

  const noteA = await request("/notes", "POST", cookieA.value, {
    title: `A-only-${suffix}`, content: "Private test note A",
  });
  const noteB = await request("/notes", "POST", cookieB.value, {
    title: `B-only-${suffix}`, content: "Private test note B",
  });
  assert.equal(noteA.status, 201);
  assert.equal(noteB.status, 201);

  const notesA = await (await request("/notes", "GET", cookieA.value)).json();
  const notesB = await (await request("/notes", "GET", cookieB.value)).json();
  assert.deepEqual(notesA.map((note) => note.title), [`A-only-${suffix}`]);
  assert.deepEqual(notesB.map((note) => note.title), [`B-only-${suffix}`]);

  const logout = await request("/auth/logout", "POST", cookieA.value);
  assert.equal(logout.status, 200);
  assert.match(logout.headers.getSetCookie()[0] || "", /(max-age=0|expires=thu, 01 jan 1970)/i);
  assert.equal((await request("/notes")).status, 401, "cleared browser session should be unauthorized");

  const login = await request("/auth/login", "POST", null, {
    email: emailB, password: passwordB,
  });
  assert.equal(login.status, 200);
  const loginCookie = cookieFrom(login);
  assert.match(loginCookie.header, /HttpOnly/i);
  const meB = await request("/auth/me", "GET", loginCookie.value);
  assert.equal((await meB.json()).user.email, emailB);

  console.log("PASS: two-user signup, HTTP-only cookies, /auth/me, note isolation, login, and logout");
} finally {
  await mongoose.connect(process.env.MONGO_URI);
  const users = await User.find({ email: { $in: [emailA, emailB] } }).select("_id");
  await Note.deleteMany({ user: { $in: users.map((user) => user._id) } });
  await User.deleteMany({ email: { $in: [emailA, emailB] } });
  await mongoose.disconnect();
}
