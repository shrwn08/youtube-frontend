import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Your Profile</h1>

        {/* Profile Card */}
        <div className="bg-white border rounded-lg p-6 mb-6">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-4xl font-bold">
              {user?.fullname?.[0]?.toUpperCase() || "U"}
            </div>
            <div>
              <h2 className="text-2xl font-bold">{user?.fullname}</h2>
              <p className="text-gray-600">@{user?.username}</p>
              <p className="text-sm text-gray-500 mt-1">{user?.email}</p>
            </div>
          </div>

          {/* Channel Status */}
          <div className="border-t pt-4">
            <h3 className="font-semibold mb-2">Channel Status</h3>
            {user?.hasOwnChannel ? (
              <div className="flex items-center gap-2 text-green-600">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>You have a channel</span>
              </div>
            ) : (
              <p className="text-gray-600">No channel yet</p>
            )}
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {user?.hasOwnChannel && (
            <Link
              to="/my-channel"
              className="p-4 border rounded-lg hover:bg-gray-50 transition"
            >
              <h3 className="font-semibold mb-1">Your Channel</h3>
              <p className="text-sm text-gray-600">Manage your channel</p>
            </Link>
          )}
          <Link
            to="/history"
            className="p-4 border rounded-lg hover:bg-gray-50 transition"
          >
            <h3 className="font-semibold mb-1">Watch History</h3>
            <p className="text-sm text-gray-600">View your watch history</p>
          </Link>
          <Link
            to="/subscription"
            className="p-4 border rounded-lg hover:bg-gray-50 transition"
          >
            <h3 className="font-semibold mb-1">Subscriptions</h3>
            <p className="text-sm text-gray-600">Manage subscriptions</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;