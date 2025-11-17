import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../API/axiosConfig.js";

const initialState = {
  notifications: [],
  unreadCount: 0,
  isLoading: false,
  isError: false,
  error: null,
};

// Get Notifications
export const getNotifications = createAsyncThunk(
  "notification/getNotifications",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/notifications");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

// Mark as Read
export const markAsRead = createAsyncThunk(
  "notification/markAsRead",
  async (notificationId, { rejectWithValue }) => {
    try {
      await axiosInstance.patch(`/notifications/${notificationId}/read`);
      return { notificationId };
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

// Mark All as Read
export const markAllAsRead = createAsyncThunk(
  "notification/markAllAsRead",
  async (_, { rejectWithValue }) => {
    try {
      await axiosInstance.patch("/notifications/read-all");
      return null;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get Notifications
    builder
      .addCase(getNotifications.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNotifications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notifications = action.payload.notifications;
        state.unreadCount = action.payload.unreadCount;
      })
      .addCase(getNotifications.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      });

    // Mark as Read
    builder.addCase(markAsRead.fulfilled, (state, action) => {
      const notification = state.notifications.find(
        (n) => n._id === action.payload.notificationId
      );
      if (notification) {
        notification.read = true;
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
    });

    // Mark All as Read
    builder.addCase(markAllAsRead.fulfilled, (state) => {
      state.notifications.forEach((n) => (n.read = true));
      state.unreadCount = 0;
    });
  },
});

export default notificationSlice.reducer;