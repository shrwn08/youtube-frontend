import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMySubscriptions } from "../Redux/slices/subscriptionSlice";

const SubscriptionsPage = () => {
  const dispatch = useDispatch();
  const { subscriptions, isLoading } = useSelector((state) => state.subscription);

  useEffect(() => {
    dispatch(getMySubscriptions());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!subscriptions || subscriptions.length === 0) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Subscriptions</h1>
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">You haven't subscribed to any channels yet</p>
          <a href="/" className="text-blue-600 hover:underline">
            Discover channels
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Subscriptions</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {subscriptions.map((sub) => (
          <div
            key={sub._id}
            className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-white font-semibold text-xl flex-shrink-0">
              {sub.channelId?.channel_name?.[0]?.toUpperCase() || "C"}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">{sub.channelId?.channel_name}</h3>
              <p className="text-sm text-gray-600">
                {sub.channelId?.subscribersCount || 0} subscribers
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionsPage;