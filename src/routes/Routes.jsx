import React from "react";
import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import Signin from "../pages/Signin";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import { RouterProvider } from "react-router-dom";
import Layout from "../Layout/Layout";
import Playvideo from "../pages/Playvideo";
import PlayShorts from "../pages/PlayShorts";
import MainLayout from "../Layout/MainLayout";
import ChannelDashboard from "../pages/ChannelDashboard";
import Test from "../components/Test";

const Routes = () => {
  const router = createBrowserRouter([
    {
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        { path: "/my-channel", element: <ChannelDashboard /> },
      ],
    },
    {
      element: <Layout />,
      children: [
        { path: "/login", element: <Login /> },
        {
          path: "/signup",
          element: <Signin />,
        },
        {
          path: "/video/:id",
          element: <Playvideo />,
        },
        {
          path: "/shorts/:id",
          element: <PlayShorts />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Routes;
