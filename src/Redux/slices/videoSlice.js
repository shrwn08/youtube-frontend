import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../API/axiosConfig.js";

const initialState = {
  videos: [],
  shorts: [],
  currentVideo: null,
  isLoading: false,
  isError: false,
  error: null,
  uploadProgress: 0,
  isUploadComplete: false,
};

// Upload Video
export const uploadVideo = createAsyncThunk(
  "video/uploadVideo",
  async (formData, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosInstance.post("/videos/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          dispatch(setUploadProgress(progress));
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

// Confirm Upload Completion
export const confirmUploadCompletion = createAsyncThunk(
  "video/confirmCompletion",
  async (videoId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/videos/${videoId}/complete`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

// Get All Videos
export const getAllVideos = createAsyncThunk(
  "video/getAllVideos",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/videos/videos");
      return response.data.videos;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

// Get Shorts
export const getShorts = createAsyncThunk(
  "video/getShorts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/videos/shorts");
      return response.data.videos;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    setUploadProgress: (state, action) => {
      state.uploadProgress = action.payload;
    },
    resetUploadState: (state) => {
      state.currentVideo = null;
      state.uploadProgress = 0;
      state.isUploadComplete = false;
      state.isError = false;
      state.error = null;
    },
    setCurrentVideo: (state, action) => {
      state.currentVideo = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Upload Video
    builder
      .addCase(uploadVideo.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
        state.isUploadComplete = false;
        state.uploadProgress = 0;
      })
      .addCase(uploadVideo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentVideo = action.payload.data;
        state.isUploadComplete = true;
        state.uploadProgress = 100;
      })
      .addCase(uploadVideo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
        state.uploadProgress = 0;
      });

    // Get All Videos
    builder
      .addCase(getAllVideos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllVideos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.videos = action.payload;
      })
      .addCase(getAllVideos.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      });

    // Get Shorts
    builder
      .addCase(getShorts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getShorts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.shorts = action.payload;
      })
      .addCase(getShorts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      });

    // Confirm Upload
    builder
      .addCase(confirmUploadCompletion.fulfilled, (state, action) => {
        state.currentVideo = action.payload.data;
      });
  },
});

export const { setUploadProgress, resetUploadState, setCurrentVideo } = videoSlice.actions;
export default videoSlice.reducer;
