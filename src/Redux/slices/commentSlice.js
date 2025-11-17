import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../API/axiosConfig.js";

const initialState = {
  comments: [],
  isLoading: false,
  isError: false,
  error: null,
};

// Get Comments for Video
export const getComments = createAsyncThunk(
  "comment/getComments",
  async (videoId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/comments/videos/${videoId}`);
      return response.data.comments;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

// Create Comment
export const createComment = createAsyncThunk(
  "comment/createComment",
  async ({ videoId, content }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/comments/videos/${videoId}`, { content });
      return response.data.comment;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    clearComments: (state) => {
      state.comments = [];
    },
  },
  extraReducers: (builder) => {
    // Get Comments
    builder
      .addCase(getComments.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.comments = action.payload;
      })
      .addCase(getComments.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      });

    // Create Comment
    builder
      .addCase(createComment.fulfilled, (state, action) => {
        state.comments.unshift(action.payload);
      });
  },
});

export const { clearComments } = commentSlice.actions;
export default commentSlice.reducer;