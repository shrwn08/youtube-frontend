import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice.js";
import channelSlice from "./slices/channelSlice.js"
// import themeSlice from "./slices/themeSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    channel : channelSlice,
  },
  devTools: "production",
});

export default store;
