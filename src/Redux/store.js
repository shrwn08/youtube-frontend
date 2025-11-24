import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice.js";
import channelSlice from "./slices/channelSlice.js";
import videoSlice from "./slices/videoSlice.js";
import historySlice from "./slices/historySlice.js";
import likedSlice from "./slices/likedSlice.js";
import subscriptionSlice from "./slices/subscriptionSlice.js";
import playlistSlice from "./slices/playlistSlice.js";
import notificationSlice from "./slices/notificationSlice.js";
import searchSlice from "./slices/searchSlice.js";
import commentSlice from "./slices/commentSlice.js";

// Load only specific fields from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('reduxState');
    if (serializedState === null) {
      return undefined;
    }
    
    const savedState = JSON.parse(serializedState);
    
    // FIXED: Only restore persisted data, let slices handle their own initialState
    return {
      video: {
        videos: savedState.video?.videos || [],
        shorts: savedState.video?.shorts || [],
        // ✅ Don't set these - let the slice initialState handle them
        // currentVideo: null,
        // isLoading: false,
        // isError: false,
        // error: null,
        // uploadProgress: 0,
        // isUploadComplete: false,
      },
      user: savedState.user || undefined,
      // Other slices use their default initialState
    };
  } catch (err) {
    console.error("Could not load state", err);
    return undefined;
  }
};

// Save only persistent data to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify({
      video: {
        videos: state.video.videos,
        shorts: state.video.shorts,
        // ✅ Don't save upload state - it's temporary
      },
      user: {
        user: state.user.user,
        token: state.user.token,
        isAuthenticated: state.user.isAuthenticated,
      },
    });
    localStorage.setItem('reduxState', serializedState);
  } catch (err) {
    console.error("Could not save state", err);
  }
};

const preloadedState = loadState();

const store = configureStore({
  reducer: {
    user: userSlice,
    channel: channelSlice,
    video: videoSlice,
    history: historySlice,
    liked: likedSlice,
    subscription: subscriptionSlice,
    playlist: playlistSlice,
    notification: notificationSlice,
    search: searchSlice,
    comment: commentSlice,
  },
  preloadedState,
  devTools: import.meta.env.VITE_NODE_ENV !== "production",
});

// Throttle saves to prevent performance issues during uploads
let saveTimeout;
store.subscribe(() => {
  clearTimeout(saveTimeout);
  saveTimeout = setTimeout(() => {
    saveState(store.getState());
  }, 1000);
});

//  Expose store to window for debugging (only in development)
if (import.meta.env.VITE_NODE_ENV !== "production") {
  window.store = store;
  console.log("🔧 Redux store exposed to window.store for debugging");
}

export default store;