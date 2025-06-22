import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../Redux/slices/userSlice.js";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";

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
  const {  isError, error,  } = useSelector(
    (state) => state.user,
  );

  useEffect(() => {
    if (isError) {
      toast.error(error?.errors?.[0]?.messages || "Registration failed");
    }
  }, [isError, error]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userData.password !== repassword) {
      toast.error("Passwords don't match");
    } else {
      dispatch(createUser(userData)).unwrap();
      toast.success("User registered successfully.");
      navigate("/login");
      setUserData({
        fullname: "",
        username: "",
        email: "",
        password: "",
      });

      setRepassword("");
    }
  };
  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };
  const handleShowRepassword = () => {
    setShowRepassword((prevState) => !prevState);
  };

  console.log(userData);

  return (
    <div className="w-full  min-h-[calc(100vh-4rem)]  flex justify-center items-center ">
      <div className="w-11/12 h-full flex justify-center items-center flex-col gap-3 sm:w-4/5  md:w-2/3  lg:w-1/3">
        <h1 className="text-center text-4xl font-bold">Sign up</h1>
        {/* Sign in form */}

        <form
          className="w-full  flex flex-col items-center gap-3"
          onSubmit={handleSubmit}
        >
          <div className="w-11/12 h-14">
            <input
              type="text"
              placeholder="Fullname"
              className="w-full h-full border rounded-full pl-5 "
              onChange={handleOnChange}
              value={userData.fullname}
              name="fullname"
            />
          </div>
          {/*username */}
          <div className="w-11/12 h-14">
            <input
              type="text"
              placeholder="Username"
              className="w-full h-full border rounded-full pl-5 "
              onChange={handleOnChange}
              value={userData.username}
              name="username"
            />
          </div>
          {/* Email */}
          <div className="w-11/12 h-14">
            <input
              type="email"
              placeholder="Email"
              className="w-full h-full border rounded-full pl-5 "
              onChange={handleOnChange}
              name="email"
              value={userData.email}
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
          <div className="w-11/12 h-14 relative">
            {showRepassword ? (
              <div
                className="absolute top-1/3 right-5 text-xl hover:cursor-pointer"
                onClick={handleShowRepassword}
              >
                <FaRegEyeSlash />
              </div>
            ) : (
              <div
                className="absolute top-1/3 right-5 text-xl hover:cursor-pointer"
                onClick={handleShowRepassword}
              >
                <FaRegEye />
              </div>
            )}

            <input
              type={showRepassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="w-full h-full border rounded-full pl-5 "
              onChange={(e) => setRepassword(e.target.value)}
              name="repassword"
              value={repassword}
            />
          </div>
          <p>{isError && error.errors[0].messages}</p>
          {/* Sign in button */}
          <div className="w-11/12 h-14">
            <button
              type="submit"
              className="w-full h-full border rounded-full bg-red-500 text-white font-bold hover:cursor-pointer"
            >
              {/*{isLoading?"Loading...":"SingUp"}*/}
              Sign Up
            </button>
          </div>
        </form>
        <Link to="/login">
          <div className=" hover:text-blue-600 hover:cursor-pointer">
            Already have an account!
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Signin;
