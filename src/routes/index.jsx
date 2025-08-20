import React from "react";
import { useRoutes } from "react-router-dom";
import Home from "@/pages/User/Home";
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";

export default function AppRoutes() {
  return useRoutes([
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
  ]);
}
