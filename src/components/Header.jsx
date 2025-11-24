import React, { useContext, useEffect } from "react";
import TextLogo from "../assets/youtube.svg";
import { IoMdMenu } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { CiMenuKebab } from "react-icons/ci";
import { RxAvatar } from "react-icons/rx";
import { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import StoreContext from "../hooks/context/Context";
import { useSelector, useDispatch } from "react-redux";
import { loadCurrentUser } from "../Redux/slices/userSlice";
import ProfileMenu from "./ProfileMenu";
import Channel from "./Channel";
import { MdOutlineVideoCall } from "react-icons/md";
import VideoUpload from "./VideoUpload";

function Header() {
  const {
    toggleSidebar,
    handleCreateChannelForm,
    openChannelFrom,
    profileMenuOpen,
    handleProfileMenuOpen,
    handleUploadVideoBtn,
    openUploadVideoPage,
  } = useContext(StoreContext);

  const dispatch = useDispatch();
  const { isAuthenticated, user, isLoading } = useSelector((state) => state.user);
  const [clickSearchIcon, setClickSearchIcon] = useState(false);
  const hideSearchBar = ["/login", "/signup"].includes(useLocation().pathname);

  // Load user on mount if token exists
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token && !user) {
      dispatch(loadCurrentUser());
    }
  }, [dispatch, user]);

  const handleClickOnSearchIcon = () => {
    setClickSearchIcon(true);
  };

  const handleClickOnSearchIconOut = () => {
    setClickSearchIcon(false);
  };

  // Check if user has a channel
  const hasChannel = user?.hasOwnChannel === true;

  // Get first letter of user's name
  const getUserInitial = () => {
    if (user?.fullname) {
      return user.fullname[0].toUpperCase();
    }
    if (user?.username) {
      return user.username[0].toUpperCase();
    }
    return "U";
  };

  return (
    <>
      {!clickSearchIcon ? (
        <header className="w-full h-20 flex justify-center items-center py-2 border-b bg-white">
          <div className="w-49/50 h-full flex justify-between items-center">
            {/* Left section - Logo */}
            <div className="flex items-center gap-2">
              <div onClick={toggleSidebar} className="cursor-pointer">
                <IoMdMenu className="w-8 h-8 text-gray-700 hover:bg-gray-100 rounded-full p-1 transition" />
              </div>
              <Link to="/" className="flex items-center">
                <img
                  src={TextLogo}
                  alt="YouTube logo"
                  className="w-20 cursor-pointer"
                />
              </Link>
            </div>

            {/* Middle section - Search */}
            {!hideSearchBar && (
              <div className="w-1/3 h-10 rounded-full border hidden overflow-hidden sm:flex">
                <input
                  className="w-10/12 h-full px-4 focus:outline-none"
                  placeholder="Search"
                />
                <button className="w-2/12 h-full bg-gray-100 flex justify-center items-center border-l hover:bg-gray-200 transition">
                  <CiSearch className="h-5 w-5" />
                </button>
              </div>
            )}

            {/* Mobile search icon */}
            <button
              className="border-none sm:hidden p-2 hover:bg-gray-100 rounded-full"
              onClick={handleClickOnSearchIcon}
            >
              <CiSearch className="w-6 h-6 font-semibold" />
            </button>

            {/* Right section - Actions */}
            <div className="flex gap-2 items-center">
              {/* More menu - hidden on mobile */}
              <button className="p-2 hover:bg-gray-100 rounded-full hidden md:block">
                <CiMenuKebab className="w-6 h-6 text-gray-700" />
              </button>

              {/* CONDITIONAL RENDERING - Show Upload OR Create Channel */}
              {isAuthenticated && user && !isLoading && (
                <>
                  {hasChannel ? (
                    // ✅ USER HAS CHANNEL - Show Upload Button
                    <button
                      onClick={handleUploadVideoBtn}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition duration-200 font-medium shadow-sm"
                      title="Upload a video"
                    >
                      <MdOutlineVideoCall className="text-2xl" />
                      <span className="hidden sm:inline">Upload</span>
                    </button>
                  ) : (
                    // ❌ USER HAS NO CHANNEL - Show Create Channel Button
                    <button
                      onClick={handleCreateChannelForm}
                      className="flex items-center gap-2 px-4 py-2 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 rounded-full transition duration-200 font-medium"
                      title="Create your channel to start uploading videos"
                    >
                      <span>Create Channel</span>
                    </button>
                  )}
                </>
              )}

              {/* User profile or sign up */}
              {isAuthenticated && user ? (
                <div
                  className="h-10 w-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex justify-center items-center cursor-pointer shadow-md hover:shadow-lg transition-all duration-200"
                  onClick={handleProfileMenuOpen}
                  title={user.fullname || user.username}
                >
                  <p className="text-xl font-semibold text-white">
                    {getUserInitial()}
                  </p>
                </div>
              ) : (
                <Link to="/signup">
                  <div className="flex items-center gap-1 px-4 py-2 border border-blue-600 rounded-full hover:bg-blue-50 transition duration-200">
                    <RxAvatar className="h-6 w-6 text-blue-600" />
                    <p className="text-blue-600 text-sm font-medium">Sign up</p>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </header>
      ) : (
        // Mobile search expanded view
        <header className="w-screen h-16 flex justify-center items-center border-b bg-white">
          <div className="w-49/50 flex justify-between items-center gap-3">
            <button 
              onClick={handleClickOnSearchIconOut}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <IoArrowBack className="w-6 h-6 text-gray-700" />
            </button>
            <div className="flex-1 flex items-center rounded-full border overflow-hidden">
              <input 
                className="flex-1 h-10 px-4 focus:outline-none" 
                placeholder="Search"
                autoFocus
              />
              <button className="w-12 h-10 flex justify-center items-center border-l hover:bg-gray-100">
                <CiSearch className="h-6 w-6" />
              </button>
            </div>
          </div>
        </header>
      )}
      
      {/* Modals/Overlays */}
      {profileMenuOpen && <ProfileMenu />}
      {openChannelFrom && <Channel />}
      {openUploadVideoPage && <VideoUpload />}
    </>
  );
}

export default Header;