import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHistory, clearHistory } from "../Redux/slices/historySlice";
import VideoCard from "../components/VideoCard";

const HistoryPage = () => {
  const dispatch = useDispatch();
  const { history, isLoading } = useSelector((state) => state.history);

  useEffect(() => {
    dispatch(getHistory());
  }, [dispatch]);

  const handleClearHistory = () => {
    if (window.confirm("Are you sure you want to clear your watch history?")) {
      dispatch(clearHistory());
    }
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Watch History</h1>
        {history && history.length > 0 && (
          <button
            onClick={handleClearHistory}
            className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
          >
            Clear All History
          </button>
        )}
      </div>

      {!history || history.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">No watch history yet</p>
          <a href="/" className="text-blue-600 hover:underline">
            Start watching videos
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
          {history.map((item) => (
            <VideoCard key={item._id} video={item.videoId} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
