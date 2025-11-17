import React from "react";
import { FaHome } from "react-icons/fa";
import { SiYoutubeshorts } from "react-icons/si";
import { FaHistory } from "react-icons/fa";
import { MdSubscriptions } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { Link, useLocation } from "react-router-dom";

const MiniSidebar = () => {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;
  
  const menuItems = [
    { path: "/", icon: FaHome, label: "Home" },
    { path: "/shorts", icon: SiYoutubeshorts, label: "Shorts" },
    { path: "/subscription", icon: MdSubscriptions, label: "Subs" },
    { path: "/profile", icon: CgProfile, label: "You" },
    { path: "/history", icon: FaHistory, label: "History" },
  ];

  return (
    <div className="w-20 flex-col items-center gap-4 py-2 hidden sm:flex">
      {menuItems.map((item) => (
        <Link key={item.path} to={item.path}>
          <div
            className={`hover:cursor-pointer flex flex-col items-center gap-1 px-2 py-3 rounded-lg transition ${
              isActive(item.path)
                ? "bg-gray-100"
                : "hover:bg-gray-50"
            }`}
          >
            <item.icon className={`text-2xl ${isActive(item.path) ? "text-red-600" : ""}`} />
            <div className={`text-xs ${isActive(item.path) ? "font-semibold" : ""}`}>
              {item.label}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MiniSidebar;