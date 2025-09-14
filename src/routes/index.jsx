import React from "react";
import { useRoutes } from "react-router-dom";
import Home from "@/pages/User/Home";
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import Article from "@/pages/User/ArticleContainer/Article";
import ArticleDetail from "@/pages/User/ArticleContainer/ArticleDetailContainer/ArticleDetail";
import RoleRoute from "@/lib/routes/RoleRoute";
import AdminArticle from "@/pages/Admin/AdminArticle/AdminArticle";
import AdminCategory from "@/pages/Admin/AdminCategory/AdminCategory";
import AdminProfile from "@/pages/Admin/AdminProfile/AdminProfile";
import AdminNotification from "@/pages/Admin/AdminNotification/AdminNotification";
import AdminResetPassword from "@/pages/Admin/AdminResetPassword/AdminResetPassword";
import AdminCategoryDetail from "@/pages/Admin/AdminCategory/AdminCategoryDetail";
import AdminArticleDetail from "@/pages/Admin/AdminArticle/AdminArticleDetail";

export default function AppRoutes() {
  return useRoutes([
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/article", element: <Article /> },
    { path: "/article/:id", element: <ArticleDetail /> },

    // admin
    {
      element: <RoleRoute roles={["admin"]} />,
      children: [
        { path: "/admin/article", element: <AdminArticle /> },
        { path: "/admin/article/:id", element: <AdminArticleDetail /> },
        { path: "/admin/category", element: <AdminCategory /> },
        { path: "/admin/category/:id", element: <AdminCategoryDetail /> },
        { path: "/admin/profile", element: <AdminProfile /> },
        { path: "/admin/notification", element: <AdminNotification /> },
        { path: "/admin/reset-password", element: <AdminResetPassword /> },
      ],
    },
  ]);
}
