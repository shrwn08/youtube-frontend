import { FaHome } from "react-icons/fa";
import { SiYoutubeshorts } from "react-icons/si";
import { MdSubscriptions } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaHistory } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;
  
  const menuItems = [
    { path: "/", icon: FaHome, label: "Home" },
    { path: "/shorts", icon: SiYoutubeshorts, label: "Shorts" },
    { path: "/subscription", icon: MdSubscriptions, label: "Subscriptions" },
    { path: "/profile", icon: CgProfile, label: "You" },
    { path: "/history", icon: FaHistory, label: "History" },
  ];

  return (
    <div className="w-52 flex flex-col gap-2 p-3 absolute z-50 bg-white sm:relative sm:z-0">
      {menuItems.map((item) => (
        <Link key={item.path} to={item.path}>
          <div
            className={`hover:cursor-pointer flex items-center gap-4 px-4 py-3 rounded-lg transition ${
              isActive(item.path)
                ? "bg-gray-100 font-semibold"
                : "hover:bg-gray-50"
            }`}
          >
            <item.icon className="text-xl" />
            <div className="text-sm">{item.label}</div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;