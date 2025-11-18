import React from "react";
import { Routes as RouterRoutes, Route } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signin from "../pages/Signin";
import NotFound from "../pages/NotFound";
import PlayVideo from "../pages/PlayVideo";
import PlayShort from "../pages/PlayShort";
import ShortsPage from "../pages/ShortsPage";
import ChannelDashboard from "../pages/ChannelDashboard";
import ProtectedRoute from "./ProtectedRoute";

const Routes = () => {
  return (
    <RouterRoutes>
      {/* Public routes with layout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/video/:videoId" element={<PlayVideo />} />
        <Route path="/shorts" element={<ShortsPage />} />
        <Route path="/shorts/:shortId" element={<PlayShort />} />
      </Route>

      {/* Auth routes without layout */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signin />} />

      {/* Protected routes with layout */}
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

const SubscriptionsPage = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Subscriptions</h1>
    <p className="text-gray-600">Your subscribed channels will appear here</p>
  </div>
);

const HistoryPage = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Watch History</h1>
    <p className="text-gray-600">Your watch history will appear here</p>
  </div>
);

const ProfilePage = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
    <p className="text-gray-600">Profile settings coming soon</p>
  </div>
);

export default Routes;