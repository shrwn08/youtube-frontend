import React, { useContext } from "react";
import TextLogo from "../assets/youtube.svg";
import { IoMdMenu } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { CiMenuKebab } from "react-icons/ci";
import { RxAvatar } from "react-icons/rx";
import { IoArrowBack } from "react-icons/io5";
import { Link} from "react-router-dom";
import "../style/sidebar.css";
import StoreContext from "../hooks/context/context";
import { useSelector } from "react-redux";

function ChannelHeader() {
  const { toggleSidebar } = useContext(StoreContext);
  const {user} = useSelector(state=>state.user);
console.log(user)
  return (
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

    {/* Fixed Search Bar for Larger Screens */}
    {/* Add your search bar component here */}
  </div>
</header>
  );
}

export default ChannelHeader;
