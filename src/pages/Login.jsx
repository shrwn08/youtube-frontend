import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../Redux/slices/userSlice.js";
import { toast } from "react-toastify";

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {}, []);
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(userData)).unwrap();
    toast.success("User login successfully.");
    setUserData({
      email: "",
      password: "",
    });
    navigate("/");
  };

  return (
    <div className="w-full min-h-[calc(100vh-4rem)]  flex justify-center items-center">
      <div className="w-11/12 h-full flex justify-center items-center flex-col gap-3 sm:w-4/5  md:w-2/3  lg:w-1/3">
        <h1 className="text-center text-4xl font-bold">Log In</h1>
        {/* log in form */}

        <form
          className="w-full flex flex-col items-center gap-3"
          onSubmit={handleSubmit}
        >
          {/* Email */}
          <div className="w-11/12 h-14">
            <input
              type="email"
              placeholder="Email"
              className="w-full h-full border rounded-full pl-5 "
              value={userData.email}
              onChange={handleOnChange}
              name="email"
            />
          </div>
          {/* Password */}
          <div className="w-11/12 h-14 relative">
            {showPassword ? (
              <div
                className="absolute top-1/3 right-5 text-xl hover:cursor-pointer"
                onClick={handleShowPassword}
              >
                <FaRegEyeSlash />
              </div>
            ) : (
              <div
                className="absolute top-1/3 right-5 text-xl hover:cursor-pointer "
                onClick={handleShowPassword}
              >
                <FaRegEye />
              </div>
            )}
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full h-full border rounded-full pl-5 "
              onChange={handleOnChange}
              name="password"
              value={userData.password}
            />
          </div>

          {/* Sign in button */}
          <div className="w-11/12 h-14">
            <button
              type="submit"
              className="w-full h-full border rounded-full bg-red-500 text-white font-bold"
            >
              Log In
            </button>
          </div>
        </form>
        <Link to="/signin">
          <div className="hover:cursor-pointer hover:text-blue-600">
            Create an account
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Login;
