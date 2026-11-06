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
import Layout from "./components/Layout.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "notes", element: <Notes /> },
      { path: "notes/new", element: <CreateNote /> },
      { path: "notes/:id/edit", element: <EditNote /> },
      { path: "reminders", element: <Reminders /> },
      { path: "about", element: <About /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);