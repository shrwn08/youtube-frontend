import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../API/axiosConfig.js";

const initialState = {
  playlists: [],
  currentPlaylist: null,
  isLoading: false,
  isError: false,
  error: null,
};

// Get User's Playlists
export const getMyPlaylists = createAsyncThunk(
  "playlist/getMyPlaylists",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/playlists/my-playlists");
      return response.data.playlists;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

// Create Playlist
export const createPlaylist = createAsyncThunk(
  "playlist/createPlaylist",
  async (playlistData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/playlists", playlistData);
      return response.data.playlist;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

// Get Playlist by ID
export const getPlaylistById = createAsyncThunk(
  "playlist/getPlaylistById",
  async (playlistId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/playlists/${playlistId}`);
      return response.data.playlist;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

// Add Video to Playlist
export const addVideoToPlaylist = createAsyncThunk(
  "playlist/addVideo",
  async ({ playlistId, videoId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/playlists/${playlistId}/videos/${videoId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    clearCurrentPlaylist: (state) => {
      state.currentPlaylist = null;
    },
  },
  extraReducers: (builder) => {
    // Get My Playlists
    builder
      .addCase(getMyPlaylists.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMyPlaylists.fulfilled, (state, action) => {
        state.isLoading = false;
        state.playlists = action.payload;
      })
      .addCase(getMyPlaylists.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      });

    // Create Playlist
    builder
      .addCase(createPlaylist.fulfilled, (state, action) => {
        state.playlists.unshift(action.payload);
      });

    // Get Playlist by ID
    builder
      .addCase(getPlaylistById.fulfilled, (state, action) => {
        state.currentPlaylist = action.payload;
      });
  },
});

export const { clearCurrentPlaylist } = playlistSlice.actions;
export default playlistSlice.reducer;
