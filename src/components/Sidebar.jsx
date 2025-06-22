
import { FaHome } from "react-icons/fa";
import { SiYoutubeshorts } from "react-icons/si";
import { MdSubscriptions } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaHistory } from "react-icons/fa";
import { Link } from "react-router";

const Sidebar = () => {
  return (
    <div className="w-40 flex flex-col items-start gap-5 pl-3 absolute z-100 sm:relative sm:Z-0">
      <Link to="/">
        <div className="hover:cursor-pointer flex justify-start items-center gap-3">
          <FaHome className="text-2xl" />
          <div className="text-sm font-bold">Home</div>
        </div>
      </Link>
      <Link to="/shorts">
        <div className="hover:cursor-pointer flex justify-start items-center gap-3">
          <SiYoutubeshorts className="text-2xl" />
          <div className="text-sm font-bold">Shorts</div>
        </div>
      </Link>
      <Link to="/subscription">
        <div className="hover:cursor-pointer flex justify-start items-center gap-3">
          <MdSubscriptions className="text-2xl" />
          <div className="text-sm font-bold">Subscription</div>
        </div>
      </Link>
      <Link to="/profile">
        <div className="hover:cursor-pointer flex justify-start items-center gap-3">
          <CgProfile className="text-2xl" />
          <div className="text-sm font-bold">You</div>
        </div>
      </Link>
      <Link to="/history">
        <div className="hover:cursor-pointer flex justify-start items-center gap-3">
          <FaHistory className="text-2xl" />
          <div className="text-sm font-bold">History</div>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
