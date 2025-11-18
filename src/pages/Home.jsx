import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideos } from "../Redux/slices/videoSlice";
import VideoItems from "../components/VideoItems";
import CapsulButtons from "../components/CapsulButtons";
import VideoGridSkeleton from "../components/skeletons/VideoGridSkeleton";

function Home() {
  const dispatch = useDispatch();
  const { videos, isLoading, isError } = useSelector((state) => state.video);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    dispatch(getAllVideos());
  }, [dispatch]);

  useEffect(() => {
    if (videos) {
      if (selectedCategory) {
        setFilteredVideos(
          videos.filter((video) => video.category === selectedCategory)
        );
      } else {
        setFilteredVideos(videos);
      }
    }
  }, [videos, selectedCategory]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  if (isError) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <div className="text-center">
          <svg
            className="w-16 h-16 text-red-500 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-xl text-red-500 mb-4">Failed to load videos</p>
          <button
            onClick={() => dispatch(getAllVideos())}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <CapsulButtons onCategorySelect={handleCategorySelect} />
      {isLoading ? (
        <VideoGridSkeleton count={12} />
      ) : (
        <VideoItems videos={filteredVideos} />
      )}
    </div>
  );
}

export default Home;