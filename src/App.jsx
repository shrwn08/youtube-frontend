import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUserData } from "./Redux/persist";
// import { loadUser } from "./Redux/slices/userSlice.js";
import "./App.css";
import Routes from "./routes/Routes";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, isLoading } = useSelector((state) => state.user);

  useEffect(() => {
    // Check for token and load user when app starts
    const initializeAuth = async () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        try {
          await loadUserData(token, dispatch);
        } catch (error) {
          console.error("Failed to load user data:", error);
          localStorage.removeItem("authToken");
        }
      }
    };

    initializeAuth();
  }, [dispatch]);

  if (isLoading && !isAuthenticated) {
    return <div className="app-loading">Loading...</div>;
  }

  return (
    <>
      <Routes />
    </>
  );
}

export default App;
