import React, { useContext, useEffect } from "react";
import TextLogo from "../assets/youtube.svg";
import { IoMdMenu } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { CiMenuKebab } from "react-icons/ci";
import { RxAvatar } from "react-icons/rx";
import { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import StoreContext from "../hooks/context/context";
import { useSelector, useDispatch } from "react-redux";
import { loadCurrentUser } from "../Redux/slices/userSlice";
import ProfileMenu from "./ProfileMenu";
import Channel from "./Channel";
import { GrUploadOption } from "react-icons/gr";
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
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [clickSearchIcon, setClickSearchIcon] = useState(false);
  const hideSearchBar = ["/login", "/signup"].includes(useLocation().pathname);

  // Load user on mount if token exists
  useEffect(() => {
    if (localStorage.getItem("authToken") && !user) {
      dispatch(loadCurrentUser());
    }
  }, [dispatch, user]);

  const handleClickOnSearchIcon = () => {
    setClickSearchIcon(true);
  };

  const handleClickOnSearchIconOut = () => {
    setClickSearchIcon(false);
  };

  const hasChannel = user?.hasOwnChannel;

  return (
    <>
      {!clickSearchIcon ? (
        <header className="w-full h-20 flex justify-center items-center py-2">
          <div className="w-49/50 h-full flex justify-between items-center">
            <div className="flex items-center">
              <div onClick={toggleSidebar} className="z-100">
                <IoMdMenu className="w-8 h-8 text-light-primarytext mr-4 cursor-pointer" />
              </div>
              <Link to="/">
                <img
                  src={TextLogo}
                  alt="YouTube logo"
                  className="w-20 hover:cursor-pointer"
                />
              </Link>
            </div>

            {!hideSearchBar && (
              <div className="w-1/3 h-10 rounded-full border hidden overflow-hidden sm:flex">
                <input
                  className="w-10/12 h-full px-4 focus:outline-none"
                  placeholder="Search"
                />
                <button className="w-2/12 h-full bg-gray-100 flex justify-center items-center border-l hover:cursor-pointer">
                  <CiSearch className="h-5 w-5" />
                </button>
              </div>
            )}

            <button
              className="border-none sm:hidden"
              onClick={handleClickOnSearchIcon}
            >
              <CiSearch className="w-6 h-6 font-semibold" />
            </button>

            <div className="flex gap-3 items-center">
              <CiMenuKebab className="w-6 h-6 text-light-primarytext ml-4 cursor-pointer" />

              {isAuthenticated && (
                <>
                  {!hasChannel ? (
                    <button
                      className="py-2 px-4 border-2 font-semibold border-blue-600 rounded-full text-blue-600 hover:bg-blue-50"
                      onClick={handleCreateChannelForm}
                    >
                      Create Channel
                    </button>
                  ) : (
                    <button
                      className="py-2 px-4 border-2 font-semibold border-blue-600 rounded-full text-blue-600 hover:bg-blue-50"
                      onClick={handleUploadVideoBtn}
                    >
                      <GrUploadOption />
                    </button>
                  )}
                </>
              )}

              {isAuthenticated ? (
                <div
                  className="h-12 w-12 bg-amber-700 rounded-full flex justify-center items-center hover:cursor-pointer"
                  onClick={handleProfileMenuOpen}
                >
                  <p className="text-2xl font-medium text-white">
                    {user?.fullname?.[0]?.toUpperCase() || "U"}
                  </p>
                </div>
              ) : (
                <Link to="/signup">
                  <div className="w-24 h-10 border border-blue-600 rounded-full flex items-center justify-center gap-1 hover:bg-blue-50">
                    <RxAvatar className="h-6 w-6 text-blue-600" />
                    <p className="text-blue-600 text-md">Sign up</p>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </header>
      ) : (
        <header className="w-screen h-16 flex justify-center items-center">
          <div className="w-49/50 flex justify-between items-center">
            <div onClick={handleClickOnSearchIconOut}>
              <IoArrowBack className="w-6 h-6 text-light-primarytext mr-4 cursor-pointer" />
            </div>
            <div className="w-2/3 h-full flex justify-between items-center rounded-full overflow-hidden">
              <input className="w-full h-10 rounded-l-full border pl-5" />
              <button className="w-14 h-10 flex justify-center items-center rounded-r-full border-l-none border">
                <CiSearch className="h-6 w-6 font-semibold" />
              </button>
            </div>
          </div>
        </header>
      )}
      {profileMenuOpen && <ProfileMenu />}
      {openChannelFrom && <Channel />}
      {openUploadVideoPage && <VideoUpload />}
    </>
  );
}

export default Header;