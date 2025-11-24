import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../API/axiosConfig.js";

const initialState = {
  user: null,
  token: localStorage.getItem("authToken") || null,
  isLoading: false,
  isAuthenticated: !!localStorage.getItem("authToken"),
  isError: false,
  error: null,
};

// Create User (Register)
export const createUser = createAsyncThunk(
  "user/createUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/create", userData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Registration failed" });
    }
  }
);

// Login User
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/login", userData);
      
      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
      }
      
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Login failed" });
    }
  }
);

// Load Current User
export const loadCurrentUser = createAsyncThunk(
  "user/loadCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/auth/me");
      return response.data.user;
    } catch (err) {
      localStorage.removeItem("authToken");
      return rejectWithValue(err.response?.data || { message: "Failed to load user" });
    }
  }
);

// Upload Profile Picture
export const uploadProfilePicture = createAsyncThunk(
  "user/uploadProfilePicture",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/profile-upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data.user;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Upload failed" });
    }
  }
);

// ✅ NEW: Create Channel
export const createChannel = createAsyncThunk(
  "user/createChannel",
  async ({ userId, formData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/channel/create/${userId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data.user; // Return updated user
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Channel creation failed" });
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      localStorage.removeItem("authToken");
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isError = false;
      state.error = null;
    },
    clearError: (state) => {
      state.isError = false;
      state.error = null;
    },
    // ✅ NEW: Update user after channel creation (for optimistic updates)
    updateUserChannel: (state, action) => {
      if (state.user) {
        state.user.hasOwnChannel = true;
        state.user.channel = action.payload.channelId;
      }
    },
  },
  extraReducers: (builder) => {
    // Create User
    builder
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      });

    // Login User
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.isError = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
        state.isAuthenticated = false;
      });

    // Load Current User
    builder
      .addCase(loadCurrentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loadCurrentUser.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      });

    // Upload Profile Picture
    builder
      .addCase(uploadProfilePicture.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadProfilePicture.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(uploadProfilePicture.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      });

    // ✅ NEW: Create Channel
    builder
      .addCase(createChannel.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(createChannel.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload; // Update user with channel info
        state.isError = false;
      })
      .addCase(createChannel.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      });
  },
});

export const { logoutUser, clearError, updateUserChannel } = userSlice.actions;
export default userSlice.reducer;