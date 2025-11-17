import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice.js";
import channelSlice from "./slices/channelSlice.js"
import videoSlice  from "./slices/videoSlice.js";
// import themeSlice from "./slices/themeSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    channel : channelSlice,
    video : videoSlice,
  },
  devTools: "production",
});

export default store;
