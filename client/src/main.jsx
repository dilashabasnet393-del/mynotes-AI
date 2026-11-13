import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";

import Welcome from "./pages/Welcome.jsx";
import Notes from "./pages/Notes.jsx";
import CreateNote from "./pages/CreateNote.jsx";
import EditNote from "./pages/EditNote.jsx";
import About from "./pages/About.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Reminders from "./pages/Reminders.jsx";
import NotFound from "./pages/NotFound.jsx";
import Profile from "./pages/Profile.jsx";
import Settings from "./pages/Settings.jsx";
import Privacy from "./pages/Privacy.jsx";
import Terms from "./pages/Terms.jsx";
import Layout from "./components/Layout.jsx";
import { AuthProvider } from "./auth/AuthContext.jsx";
import { GuestRoute, ProtectedRoute } from "./auth/RouteGuards.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />,
  },
  {
    element: <GuestRoute />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
    ],
  },
  { path: "/about", element: <About /> },
  {
    element: <ProtectedRoute />,
    children: [{
      path: "/",
      element: <Layout />,
      children: [
        { path: "notes", element: <Notes /> },
        { path: "notes/new", element: <CreateNote /> },
        { path: "notes/:id/edit", element: <EditNote /> },
        { path: "reminders", element: <Reminders /> },
        { path: "profile", element: <Profile /> },
        { path: "settings", element: <Settings /> },
      ],
    }],
  },
  { path: "/privacy", element: <Privacy /> },
  { path: "/terms", element: <Terms /> },
  {
    path: "*",
    element: <NotFound />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider><RouterProvider router={router} /></AuthProvider>
  </StrictMode>
);
