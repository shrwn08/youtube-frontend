import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../API/axiosConfig.js";

const initialState = {
  likedVideos: [],
  isLoading: false,
  isError: false,
  error: null,
};

// Get Liked Videos
export const getLikedVideos = createAsyncThunk(
  "liked/getLikedVideos",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/likes/my-liked-videos");
      return response.data.videos;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

// Like Video
export const likeVideo = createAsyncThunk(
  "liked/likeVideo",
  async (videoId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/likes/${videoId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

// Unlike Video
export const unlikeVideo = createAsyncThunk(
  "liked/unlikeVideo",
  async (videoId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/likes/${videoId}`);
      return { videoId };
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

const likedSlice = createSlice({
  name: "liked",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get Liked Videos
    builder
      .addCase(getLikedVideos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLikedVideos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.likedVideos = action.payload;
      })
      .addCase(getLikedVideos.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      });

    // Unlike Video
    builder.addCase(unlikeVideo.fulfilled, (state, action) => {
      state.likedVideos = state.likedVideos.filter(
        (video) => video.videoId._id !== action.payload.videoId
      );
    });
  },
});

export default likedSlice.reducer;