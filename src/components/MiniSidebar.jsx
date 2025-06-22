import React from "react";
import { FaHome } from "react-icons/fa";
import { SiYoutubeshorts } from "react-icons/si";
import { FaHistory } from "react-icons/fa";
import { MdSubscriptions } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";

const MiniSidebar = () => {
  return (
    <div className="w-20  flex-col items-center gap-3 hidden sm:flex">
      <Link to="/">
        <div className="hover:cursor-pointer flex flex-col items-center ">
          <FaHome className="text-2xl" />
          <div className="text-xs font-bold">Home</div>
        </div>
      </Link>
      <Link to="/shorts">
        <div className="hover:cursor-pointer flex flex-col items-center">
          <SiYoutubeshorts className="text-2xl" />
          <div className="text-xs font-bold">Shorts</div>
        </div>
      </Link>
      <Link to="/subscription">
        <div className="hover:cursor-pointer flex flex-col items-center">
          <MdSubscriptions className="text-2xl" />
          <div className="text-xs font-bold">Subscription</div>
        </div>
      </Link>
      <Link to="/profile">
        <div className="hover:cursor-pointer flex flex-col items-center">
          <CgProfile className="text-2xl" />
          <div className="text-xs font-bold">You</div>
        </div>
      </Link>
      <Link to="/history">
        <div className="hover:cursor-pointer flex flex-col justify-start items-center">
          <FaHistory className="text-2xl" />
          <div className="text-sm font-bold">History</div>
        </div>
      </Link>
    </div>
  );
};

export default MiniSidebar;
