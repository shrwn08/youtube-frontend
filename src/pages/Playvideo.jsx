import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axiosInstance from "../API/axiosConfig";
import { addToHistory } from "../Redux/slices/historySlice";
import VideoPlayerSkeleton from "../components/skeletons/VideoPlayerSkeleton";

const PlayVideo = () => {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/videos/${videoId}`);
        setVideo(response.data.video);
        
        // Add to watch history
        dispatch(addToHistory(videoId));
      } catch (error) {
        console.error("Failed to fetch video:", error);
      } finally {
        setLoading(false);
      }
    };

    if (videoId) {
      fetchVideo();
    }
  }, [videoId, dispatch]);

  if (loading) {
    return <VideoPlayerSkeleton />;
  }

  if (!video) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl mb-4">Video not found</p>
          <a href="/" className="text-blue-600 hover:underline">
            Go back home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full p-6">
      <div className="max-w-6xl mx-auto">
        {/* Video Player */}
        <div className="w-full aspect-video bg-black rounded-lg mb-4">
          <video
            src={video.videoUrl}
            controls
            className="w-full h-full"
            autoPlay
          />
        </div>

        {/* Video Info */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold mb-2">{video.title}</h1>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-white font-semibold">
                {video.user?.username?.[0]?.toUpperCase()}
              </div>
              <div>
                <p className="font-medium">{video.user?.username}</p>
                <p className="text-sm text-gray-600">
                  {video.views?.toLocaleString()} views
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-gray-100 rounded-lg p-4">
          <p className="text-sm text-gray-700 whitespace-pre-wrap">
            {video.description || "No description"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlayVideo;