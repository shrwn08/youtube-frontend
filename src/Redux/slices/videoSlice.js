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

// Upload Video with direct Cloudinary upload
export const uploadVideo = createAsyncThunk(
  "video/uploadVideo",
  async ({ videoFile, title, description, category }, { rejectWithValue, dispatch }) => {
    try {
      console.log("=== 🎬 STARTING UPLOAD PROCESS ===");
      console.log("File:", videoFile.name, "Size:", (videoFile.size / 1024 / 1024).toFixed(2), "MB");

      // Step 1: Get signature from backend (0% -> 5%)
      console.log("📝 Step 1: Getting upload signature...");
      dispatch(setUploadProgress(2));
      
      const signatureResponse = await axiosInstance.post('/videos/upload-signature');
      const signature = signatureResponse.data;
      
      console.log("✅ Got signature:", {
        cloudName: signature.cloudName,
        folder: signature.folder,
        hasSignature: !!signature.signature
      });
      
      dispatch(setUploadProgress(5));

      // Step 2: Upload directly to Cloudinary (5% -> 95%)
      console.log("📤 Step 2: Uploading to Cloudinary...");
      
      const cloudinaryResult = await new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append('file', videoFile);
        formData.append('timestamp', signature.timestamp);
        formData.append('signature', signature.signature);
        formData.append('api_key', signature.apiKey);
        formData.append('folder', signature.folder || 'video-upload');

        const xhr = new XMLHttpRequest();

        // Track upload progress
        xhr.upload.addEventListener('progress', (e) => {
          if (e.lengthComputable) {
            const percentComplete = Math.round((e.loaded / e.total) * 100);
            // Map 0-100 to 5-95 range
            const adjustedProgress = 5 + Math.round(percentComplete * 0.9);
            
            console.log(`📊 Upload progress: ${percentComplete}% (adjusted: ${adjustedProgress}%)`);
            dispatch(setUploadProgress(adjustedProgress));
          }
        });

        xhr.addEventListener('load', () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            try {
              const result = JSON.parse(xhr.responseText);
              console.log("✅ Cloudinary upload complete:", {
                url: result.secure_url,
                publicId: result.public_id,
                duration: result.duration
              });
              resolve(result);
            } catch (e) {
              console.error("❌ Failed to parse Cloudinary response:", e);
              reject(new Error('Invalid response from Cloudinary'));
            }
          } else {
            console.error("❌ Cloudinary upload failed:", xhr.status, xhr.responseText);
            reject(new Error(`Upload failed with status ${xhr.status}`));
          }
        });

        xhr.addEventListener('error', (e) => {
          console.error("❌ Network error during upload:", e);
          reject(new Error('Network error during upload'));
        });

        xhr.addEventListener('abort', () => {
          console.error("❌ Upload aborted");
          reject(new Error('Upload aborted'));
        });

        const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${signature.cloudName}/video/upload`;
        console.log("🌐 Uploading to:", cloudinaryUrl);
        
        xhr.open('POST', cloudinaryUrl);
        xhr.send(formData);
      });

      dispatch(setUploadProgress(96));

      // Step 3: Save video metadata to database (96% -> 100%)
      console.log("💾 Step 3: Saving metadata to database...");
      dispatch(setUploadProgress(97));
      
      const videoData = {
        title: title || videoFile.name,
        description: description || "",
        category: category || "Entertainment",
        videoUrl: cloudinaryResult.secure_url,
        cloudinaryPublicId: cloudinaryResult.public_id,
        duration: Math.ceil(cloudinaryResult.duration || 0)
      };

      console.log("📝 Saving video data:", videoData);
      
      const response = await axiosInstance.post('/videos/save-video', videoData);
      
      console.log("✅ Video saved to database:", response.data);
      dispatch(setUploadProgress(100));
      
      return response.data;
      
    } catch (error) {
      console.error("=== ❌ UPLOAD ERROR ===");
      console.error("Error message:", error.message);
      console.error("Error response:", error.response?.data);
      console.error("Full error:", error);
      
      dispatch(setUploadProgress(0));
      
      return rejectWithValue({
        message: error.response?.data?.message || error.message || 'Upload failed',
        details: error.response?.data
      });
    }
  }
);

// Confirm Upload Completion
export const confirmUploadCompletion = createAsyncThunk(
  "video/confirmCompletion",
  async (videoId, { rejectWithValue }) => {
    try {
      console.log("✅ Confirming upload completion for:", videoId);
      const response = await axiosInstance.post(`/videos/${videoId}/complete`);
      return response.data;
    } catch (error) {
      console.error("❌ Failed to confirm completion:", error);
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
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
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
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
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    setUploadProgress: (state, action) => {
      const progress = action.payload;
      
      // Validate progress value
      if (typeof progress !== 'number' || isNaN(progress)) {
        console.warn("⚠️ Invalid progress value:", progress);
        return;
      }
      
      // Clamp between 0 and 100
      const clampedProgress = Math.max(0, Math.min(100, Math.round(progress)));
      
      // Always update to ensure UI reflects changes
      state.uploadProgress = clampedProgress;
      console.log(`✓ Redux state updated: ${clampedProgress}%`);
    },
    resetUploadState: (state) => {
      state.currentVideo = null;
      state.uploadProgress = 0;
      state.isUploadComplete = false;
      state.isError = false;
      state.error = null;
      state.isLoading = false;
      console.log("✓ Redux: Upload state reset");
    },
    setCurrentVideo: (state, action) => {
      state.currentVideo = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Upload Video
    builder
      .addCase(uploadVideo.pending, (state) => {
        console.log("✓ Redux: Upload PENDING - Starting...");
        state.isLoading = true;
        state.isError = false;
        state.error = null;
        state.isUploadComplete = false;
        state.uploadProgress = 0;
      })
      .addCase(uploadVideo.fulfilled, (state, action) => {
        console.log("✓ Redux: Upload FULFILLED - Success!");
        state.isLoading = false;
        state.currentVideo = action.payload.data;
        state.isUploadComplete = true;
        state.uploadProgress = 100;
        state.isError = false;
      })
      .addCase(uploadVideo.rejected, (state, action) => {
        console.log("✗ Redux: Upload REJECTED - Failed!");
        console.log("Error payload:", action.payload);
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
        state.uploadProgress = 0;
        state.isUploadComplete = false;
      });

    // Get All Videos
    builder
      .addCase(getAllVideos.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getAllVideos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.videos = action.payload;
        state.isError = false;
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
        state.isError = false;
      })
      .addCase(getShorts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.shorts = action.payload;
        state.isError = false;
      })
      .addCase(getShorts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      });

    // Confirm Upload
    builder
      .addCase(confirmUploadCompletion.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(confirmUploadCompletion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentVideo = action.payload.data;
      })
      .addCase(confirmUploadCompletion.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      });
  },
});

export const { setUploadProgress, resetUploadState, setCurrentVideo } = 
  videoSlice.actions;
export default videoSlice.reducer;