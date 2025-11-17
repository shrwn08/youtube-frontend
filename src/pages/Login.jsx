import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../Redux/slices/userSlice";
import { toast } from "react-toastify";

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.user);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await dispatch(loginUser(userData)).unwrap();
      toast.success("Login successful!");
      setUserData({ email: "", password: "" });
      navigate("/");
    } catch (err) {
      toast.error(err?.message || "Login failed");
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] flex justify-center items-center">
      <div className="w-11/12 h-full flex justify-center items-center flex-col gap-3 sm:w-4/5 md:w-2/3 lg:w-1/3">
        <h1 className="text-center text-4xl font-bold">Log In</h1>

        <form
          className="w-full flex flex-col items-center gap-3"
          onSubmit={handleSubmit}
        >
          <div className="w-11/12 h-14">
            <input
              type="email"
              placeholder="Email"
              className="w-full h-full border rounded-full pl-5"
              value={userData.email}
              onChange={handleOnChange}
              name="email"
              required
            />
          </div>

          <div className="w-11/12 h-14 relative">
            {showPassword ? (
              <FaRegEyeSlash
                className="absolute top-1/3 right-5 text-xl cursor-pointer"
                onClick={handleShowPassword}
              />
            ) : (
              <FaRegEye
                className="absolute top-1/3 right-5 text-xl cursor-pointer"
                onClick={handleShowPassword}
              />
            )}
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full h-full border rounded-full pl-5"
              onChange={handleOnChange}
              name="password"
              value={userData.password}
              required
            />
          </div>

          <div className="w-11/12 h-14">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-full border rounded-full bg-red-500 text-white font-bold hover:bg-red-600 disabled:opacity-50"
            >
              {isLoading ? "Logging in..." : "Log In"}
            </button>
          </div>
        </form>

        <Link to="/signup">
          <div className="cursor-pointer hover:text-blue-600">
            Create an account
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Login;