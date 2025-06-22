import {useSelector} from "react-redux";
import { CiLight } from "react-icons/ci";
import { MdNightlight } from "react-icons/md";



const ProfileMenu = () => {
    const {user} = useSelector(state=>state.user);

    console.log(user);
  return (
    <div className="profile-menu w-56 h-auto py-2 bg-zinc-600 rounded-xl text-white absolute top-15 right-5 z-100 flex flex-col items-center justify-center">
        {/* profile card */}
        <div className="w-10/12 h-auto py-2 border-b-2 border-gray-300 flex justify-center items-center gap-2">
            <div className="profile-img h-16 w-16 rounded-full bg-orange-500 text-white text-4xl font-semibold flex items-center justify-center">
                {user && user.fullname[0]}
            </div>
            <div>
                <p className="text-lg font-bold">{user && user.fullname}</p>
                <p className="text-lg font-bold">@{user && user.username}</p>
            </div>

        </div>
        {/*Day/night toggle button*/}
        <div className="w-10/12 h-auto py-2 border-b-2 border-gray-300 text-xl font-semibold">
            <div className="flex gap-2">
                <CiLight /> light
            </div>
            <div className="flex gap-2">
                <MdNightlight /> Dark
            </div>
        </div>
    </div>
  );
};

export default ProfileMenu;
