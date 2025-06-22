import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { StoreProvider } from "./hooks/context/context.jsx";
import store from "./Redux/store.js";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <StoreProvider>
        <App />
      </StoreProvider>
    </Provider>
  </StrictMode>,
);
