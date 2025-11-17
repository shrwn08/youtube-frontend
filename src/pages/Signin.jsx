import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../Redux/slices/userSlice";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

const Signin = () => {
  const [userData, setUserData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
  });
  const [repassword, setRepassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRepassword, setShowRepassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.user);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userData.password !== repassword) {
      toast.error("Passwords don't match");
      return;
    }

    try {
      await dispatch(createUser(userData)).unwrap();
      toast.success("Registration successful!");
      setUserData({
        fullname: "",
        username: "",
        email: "",
        password: "",
      });
      setRepassword("");
      navigate("/login");
    } catch (err) {
      toast.error(err?.message || err?.errors?.[0]?.messages || "Registration failed");
    }
  };

  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleShowRepassword = () => {
    setShowRepassword((prevState) => !prevState);
  };

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] flex justify-center items-center">
      <div className="w-11/12 h-full flex justify-center items-center flex-col gap-3 sm:w-4/5 md:w-2/3 lg:w-1/3">
        <h1 className="text-center text-4xl font-bold">Sign up</h1>

        <form
          className="w-full flex flex-col items-center gap-3"
          onSubmit={handleSubmit}
        >
          <div className="w-11/12 h-14">
            <input
              type="text"
              placeholder="Fullname"
              className="w-full h-full border rounded-full pl-5"
              onChange={handleOnChange}
              value={userData.fullname}
              name="fullname"
              required
            />
          </div>

          <div className="w-11/12 h-14">
            <input
              type="text"
              placeholder="Username"
              className="w-full h-full border rounded-full pl-5"
              onChange={handleOnChange}
              value={userData.username}
              name="username"
              required
            />
          </div>

          <div className="w-11/12 h-14">
            <input
              type="email"
              placeholder="Email"
              className="w-full h-full border rounded-full pl-5"
              onChange={handleOnChange}
              name="email"
              value={userData.email}
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

          <div className="w-11/12 h-14 relative">
            {showRepassword ? (
              <FaRegEyeSlash
                className="absolute top-1/3 right-5 text-xl cursor-pointer"
                onClick={handleShowRepassword}
              />
            ) : (
              <FaRegEye
                className="absolute top-1/3 right-5 text-xl cursor-pointer"
                onClick={handleShowRepassword}
              />
            )}
            <input
              type={showRepassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="w-full h-full border rounded-full pl-5"
              onChange={(e) => setRepassword(e.target.value)}
              name="repassword"
              value={repassword}
              required
            />
          </div>

          <div className="w-11/12 h-14">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-full border rounded-full bg-red-500 text-white font-bold hover:bg-red-600 disabled:opacity-50"
            >
              {isLoading ? "Creating account..." : "Sign Up"}
            </button>
          </div>
        </form>

        <Link to="/login">
          <div className="hover:text-blue-600 cursor-pointer">
            Already have an account!
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Signin;