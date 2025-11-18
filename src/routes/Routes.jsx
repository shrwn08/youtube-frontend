import React from "react";
import { Routes as RouterRoutes, Route } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Layout from "../Layout/Layout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signin from "../pages/Signin";
import NotFound from "../pages/NotFound";
import PlayVideo from "../pages/PlayVideo";
import PlayShort from "../pages/PlayShort";
import ShortsPage from "../pages/ShortsPage";
import ChannelDashboard from "../pages/ChannelDashboard";
import SubscriptionsPage from "../pages/SubscriptionsPage";
import HistoryPage from "../pages/HistoryPage";
import ProfilePage from "../pages/ProfilePage";
import ProtectedRoute from "./ProtectedRoute";

const Routes = () => {
  return (
    <RouterRoutes>
      {/* Public routes with MainLayout (includes sidebar) */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/video/:videoId" element={<PlayVideo />} />
        <Route path="/shorts" element={<ShortsPage />} />
      </Route>

      {/* Shorts player - NO LAYOUT (full screen) */}
      <Route path="/shorts/:shortId" element={<PlayShort />} />

      {/* Auth routes - Simple Layout (no sidebar) */}
      <Route element={<Layout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signin />} />
      </Route>

      {/* Protected routes with MainLayout */}
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/my-channel" element={<ChannelDashboard />} />
        <Route path="/subscription" element={<SubscriptionsPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>

      {/* 404 route */}
      <Route path="*" element={<NotFound />} />
    </RouterRoutes>
  );
};

export default Routes;
