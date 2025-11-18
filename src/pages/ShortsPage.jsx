import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getShorts } from "../Redux/slices/videoSlice";
import ShortCard from "../components/ShortCard";

const ShortsPage = () => {
  const dispatch = useDispatch();
  const { shorts, isLoading, isError } = useSelector((state) => state.video);

  useEffect(() => {
    dispatch(getShorts());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p>Loading shorts...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-500 mb-4">Failed to load shorts</p>
          <button
            onClick={() => dispatch(getShorts())}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!shorts || shorts.length === 0) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-500 mb-2">No shorts available</p>
          <p className="text-sm text-gray-400">Check back later for new shorts</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-6">
      <h1 className="text-2xl font-bold mb-6">Shorts</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {shorts.map((short) => (
          <ShortCard key={short._id} short={short} />
        ))}
      </div>
    </div>
  );
};

export default ShortsPage;