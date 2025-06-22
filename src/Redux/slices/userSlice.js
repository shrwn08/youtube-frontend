import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import backend_URL from "../../API/API.jsx";

const loadInitialState = () => {
  const token = localStorage.getItem("token");
  if (token) {
    // Set axios auth header if token exists
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  return {
    user: null,
    token: token || null,
    isLoading: false,
    isAuthenticated: !!token,
    isError: false,
    error: null,
  };
};

const initialState = loadInitialState();

export const createUser = createAsyncThunk(
  "createUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${backend_URL}/auth/create`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  },
);

export const loginUser = createAsyncThunk(
  "loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${backend_URL}/auth/login`, userData, {
        headers: {
          "Content-Type": "application/json",
        
        },
         
      });
      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);

        axios.defaults.headers.common["Authorization"] =
          `Bearer ${response.data.token}`;
      }
      return {user : response.data.user,
        token : response.data.token
      };
    } catch (err) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  },
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      localStorage.removeItem("authToken");
      delete axios.defaults.headers.common["Authorization"];
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
    loadUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    //register
    builder
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isError = false;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      });

    //Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      });
  },
});
export const { logoutUser, loadUser } = userSlice.actions;
export default userSlice.reducer;
