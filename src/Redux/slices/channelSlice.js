import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../API/axiosConfig.js";

const initialState = {
  channel: null,
  isLoading: false,
  isError: false,
  error: null,
  isSuccess: false,
  uploadProgress: 0,
};

// Create Channel
export const createChannel = createAsyncThunk(
  "channel/create",
  async ({ formData, userId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `/channels/${userId}/create-channel`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            console.log(`Upload Progress: ${progress}%`);
          },
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue({
        message: err.response?.data?.message || err.message,
        status: err.response?.status,
        data: err.response?.data,
      });
    }
  }
);

const channelSlice = createSlice({
  name: "channel",
  initialState,
  reducers: {
    resetChannelState: (state) => {
      Object.assign(state, initialState);
    },
    setUploadProgress: (state, action) => {
      state.uploadProgress = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createChannel.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
        state.isSuccess = false;
        state.uploadProgress = 0;
      })
      .addCase(createChannel.fulfilled, (state, action) => {
        state.isLoading = false;
        state.channel = action.payload.channel;
        state.isSuccess = true;
        state.uploadProgress = 100;
        state.error = null;
      })
      .addCase(createChannel.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
        state.isSuccess = false;
        state.uploadProgress = 0;
      });
  },
});

export const { resetChannelState, setUploadProgress } = channelSlice.actions;
export default channelSlice.reducer;