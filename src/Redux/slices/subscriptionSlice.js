import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../API/axiosConfig.js";

const initialState = {
  subscriptions: [],
  isLoading: false,
  isError: false,
  error: null,
};

// Get My Subscriptions
export const getMySubscriptions = createAsyncThunk(
  "subscription/getMySubscriptions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/subscriptions/my-subscriptions");
      return response.data.subscriptions;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

// Subscribe to Channel
export const subscribeToChannel = createAsyncThunk(
  "subscription/subscribe",
  async (channelId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/subscriptions/${channelId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

// Unsubscribe from Channel
export const unsubscribeFromChannel = createAsyncThunk(
  "subscription/unsubscribe",
  async (channelId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/subscriptions/${channelId}`);
      return { channelId };
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get Subscriptions
    builder
      .addCase(getMySubscriptions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMySubscriptions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.subscriptions = action.payload;
      })
      .addCase(getMySubscriptions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      });

    // Subscribe
    builder.addCase(subscribeToChannel.fulfilled, (state, action) => {
      state.subscriptions.push(action.payload.subscription);
    });

    // Unsubscribe
    builder.addCase(unsubscribeFromChannel.fulfilled, (state, action) => {
      state.subscriptions = state.subscriptions.filter(
        (sub) => sub.channelId._id !== action.payload.channelId
      );
    });
  },
});

export default subscriptionSlice.reducer;