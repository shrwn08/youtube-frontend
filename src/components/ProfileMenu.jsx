import { useDispatch, useSelector } from "react-redux";
import { CiLight } from "react-icons/ci";
import { MdNightlight } from "react-icons/md";
import { logoutUser } from "../Redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import StoreContext from "../hooks/context/context";
import { toast } from "react-toastify";

const ProfileMenu = () => {
  const { user } = useSelector(state => state.user);
  const { setProfileMenuOpen } = useContext(StoreContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOutBtn = () => {
    dispatch(logoutUser());
    setProfileMenuOpen(false);
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <div className="profile-menu w-64 h-auto py-2 bg-white shadow-lg rounded-xl border border-gray-200 absolute top-20 right-5 z-50 flex flex-col">
      {/* Profile card */}
      <div className="w-full px-4 py-3 border-b border-gray-200 flex items-center gap-3">
        <div className="profile-img h-12 w-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 text-white text-xl font-semibold flex items-center justify-center flex-shrink-0">
          {user?.fullname?.[0]?.toUpperCase() || "U"}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-800 truncate">
            {user?.fullname || "User"}
          </p>
          <p className="text-xs text-gray-500 truncate">
            @{user?.username || "username"}
          </p>
        </div>
      </div>
      
      {/* Menu items */}
      <div className="py-2">
        {/* Theme toggle - placeholder for now */}
        <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition">
          <div className="flex items-center gap-3 text-gray-700">
            <CiLight className="text-xl" />
            <span className="text-sm">Appearance</span>
          </div>
        </div>

        {/* Channel/Profile link */}
        {user?.hasOwnChannel && (
          <div
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition"
            onClick={() => {
              navigate('/my-channel');
              setProfileMenuOpen(false);
            }}
          >
            <div className="flex items-center gap-3 text-gray-700">
              <span className="text-sm">Your Channel</span>
            </div>
          </div>
        )}

        {/* Logout button */}
        <div
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition border-t border-gray-200 mt-2"
          onClick={handleLogOutBtn}
        >
          <span className="text-sm text-red-600 font-medium">Log Out</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileMenu;