import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import backend_URL from "../../API/API";
import axios from "axios";

const initialState = {
  video: null,
  isLoading: false,
  isError: false,
  error: null,
  uploadProgress: 0,
  isUploadComplete: false
};

// Properly defined async thunk with FormData handling
export const uploadVideo = createAsyncThunk(
  "video/uploadVideo",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${backend_URL}/videos/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          // Note: To update progress, you'll need to dispatch a separate action
          console.log(`Upload Progress: ${progress}%`);
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    // You can add manual progress updates if needed
    setUploadProgress: (state, action) => {
      state.uploadProgress = action.payload;
    },
    resetUploadState: (state) => {
      Object.assign(state, initialState);
    }
  },
  extraReducers: (builder) => {
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
        state.video = action.payload;
        state.isUploadComplete = true;
        state.uploadProgress = 100;
      })
      .addCase(uploadVideo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
        state.uploadProgress = 0;
      });
  },
});

// Export actions
export const { setUploadProgress, resetUploadState } = videoSlice.actions;

// Export reducer
export default videoSlice.reducer;