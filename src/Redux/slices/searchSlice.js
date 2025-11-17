import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../API/axiosConfig.js";

const initialState = {
  searchResults: [],
  searchQuery: "",
  isLoading: false,
  isError: false,
  error: null,
};

// Search Videos
export const searchVideos = createAsyncThunk(
  "search/searchVideos",
  async (searchParams, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/search/videos", {
        params: searchParams,
      });
      return response.data.videos;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
      state.searchQuery = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchVideos.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(searchVideos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchVideos.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      });
  },
});

export const { setSearchQuery, clearSearchResults } = searchSlice.actions;
export default searchSlice.reducer;