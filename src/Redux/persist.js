import axios from "axios";
import backend_URL from "../API/API.jsx";
import { loadUser } from "./slices/userSlice.js";

export const loadUserData = async (token, dispatch) => {
  try {
    const response = await axios.get(`${backend_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(token)
    dispatch(loadUser({ user: response.data.user, token }));
    return true;
  } catch (err) {
    localStorage.removeItem("authToken");
    return false;
  }
};
