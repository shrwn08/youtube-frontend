import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCurrentUser } from "./Redux/slices/userSlice";
import { ToastContainer } from "react-toastify";
import { StoreProvider } from "./hooks/context/Context";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Routes from "./routes/Routes";

function App() {
  const dispatch = useDispatch();
  const {  isLoading, user } = useSelector((state) => state.user);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("authToken");
      
      // Only load user if token exists AND user is not already loaded
      if (token && !user) {
        try {
          await dispatch(loadCurrentUser()).unwrap();
        } catch (error) {
          console.error("Failed to load user data:", error);
          localStorage.removeItem("authToken");
        }
      }
    };

    initializeAuth();
  }, [dispatch, user]);

  // Show loading only on initial mount when we have token but no user
  if (isLoading && localStorage.getItem("authToken") && !user) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <StoreProvider>
      <Routes />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </StoreProvider>
  );
}

export default App;