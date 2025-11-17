import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../API/axiosConfig.js";

const initialState = {
  history: [],
  isLoading: false,
  isError: false,
  error: null,
};

// Get Watch History
export const getHistory = createAsyncThunk(
  "history/getHistory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/history/my-history");
      return response.data.videos;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

// Add to History
export const addToHistory = createAsyncThunk(
  "history/addToHistory",
  async (videoId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/history/${videoId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

// Clear History
export const clearHistory = createAsyncThunk(
  "history/clearHistory",
  async (_, { rejectWithValue }) => {
    try {
      await axiosInstance.delete("/history/clear");
      return null;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get History
    builder
      .addCase(getHistory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.history = action.payload;
      })
      .addCase(getHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      });

    // Clear History
    builder.addCase(clearHistory.fulfilled, (state) => {
      state.history = [];
    });
  },
});

export default historySlice.reducer;