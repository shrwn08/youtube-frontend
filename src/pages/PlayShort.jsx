import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getShorts } from "../Redux/slices/videoSlice";
import { addToHistory } from "../Redux/slices/historySlice";
import { likeVideo, unlikeVideo } from "../Redux/slices/likedSlice";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaComment, FaShare } from "react-icons/fa";
import { BiSolidDislike, BiDislike } from "react-icons/bi";
import { MdMoreVert } from "react-icons/md";

const PlayShort = () => {
  const { shortId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { shorts, isLoading } = useSelector((state) => state.video);
  const { user } = useSelector((state) => state.user);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);

  useEffect(() => {
    dispatch(getShorts());
  }, [dispatch]);

  useEffect(() => {
    if (shortId && shorts.length > 0) {
      const index = shorts.findIndex((s) => s._id === shortId);
      if (index !== -1) {
        setCurrentIndex(index);
      }
    }
  }, [shortId, shorts]);

  useEffect(() => {
    // Add current short to history
    if (shorts[currentIndex]) {
      dispatch(addToHistory(shorts[currentIndex]._id));
    }
  }, [currentIndex, shorts, dispatch]);

  const handleScroll = (direction) => {
    if (direction === "up" && currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      navigate(`/shorts/${shorts[newIndex]._id}`);
    } else if (direction === "down" && currentIndex < shorts.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      navigate(`/shorts/${shorts[newIndex]._id}`);
    }
  };

  const handleLike = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    
    if (isLiked) {
      dispatch(unlikeVideo(shorts[currentIndex]._id));
      setIsLiked(false);
    } else {
      dispatch(likeVideo(shorts[currentIndex]._id));
      setIsLiked(true);
      setIsDisliked(false);
    }
  };

  const handleDislike = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    
    setIsDisliked(!isDisliked);
    if (isLiked) {
      setIsLiked(false);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-full bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading shorts...</p>
        </div>
      </div>
    );
  }

  if (!shorts || shorts.length === 0) {
    return (
      <div className="w-full h-full bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <p className="text-xl mb-4">No shorts available</p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-white text-black rounded-lg hover:bg-gray-200"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const currentShort = shorts[currentIndex];

  return (
    <div className="w-full h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {/* Navigation arrows */}
      {currentIndex > 0 && (
        <button
          onClick={() => handleScroll("up")}
          className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 backdrop-blur-sm"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 15l7-7 7 7"
            />
          </svg>
        </button>
      )}

      {currentIndex < shorts.length - 1 && (
        <button
          onClick={() => handleScroll("down")}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 backdrop-blur-sm"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      )}

      {/* Main content container */}
      <div className="relative w-full max-w-md h-full flex items-center justify-center">
        {/* Video */}
        <video
          key={currentShort._id}
          src={currentShort.videoUrl}
          controls={false}
          autoPlay
          loop
          playsInline
          className="w-full h-full object-contain"
          onClick={(e) => {
            if (e.target.paused) {
              e.target.play();
            } else {
              e.target.pause();
            }
          }}
        />

        {/* Bottom info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white">
          {/* Channel info */}
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-white font-semibold flex-shrink-0">
              {currentShort.user?.username?.[0]?.toUpperCase() || "U"}
            </div>
            <div className="flex-1">
              <p className="font-semibold">@{currentShort.user?.username}</p>
            </div>
            <button className="px-4 py-1 bg-white text-black rounded-full text-sm font-semibold hover:bg-gray-200">
              Subscribe
            </button>
          </div>

          {/* Title */}
          <h3 className="font-medium mb-2 line-clamp-2">{currentShort.title}</h3>

          {/* Stats */}
          <p className="text-sm opacity-90">
            {currentShort.views?.toLocaleString() || 0} views
          </p>
        </div>

        {/* Right side action buttons */}
        <div className="absolute right-4 bottom-20 flex flex-col gap-6 text-white">
          {/* Like button */}
          <div className="flex flex-col items-center">
            <button
              onClick={handleLike}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800/50 hover:bg-gray-700/50 backdrop-blur-sm"
            >
              {isLiked ? (
                <AiFillHeart className="text-2xl text-red-500" />
              ) : (
                <AiOutlineHeart className="text-2xl" />
              )}
            </button>
            <span className="text-xs mt-1">
              {(currentShort.likes || 0) + (isLiked ? 1 : 0)}
            </span>
          </div>

          {/* Dislike button */}
          <div className="flex flex-col items-center">
            <button
              onClick={handleDislike}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800/50 hover:bg-gray-700/50 backdrop-blur-sm"
            >
              {isDisliked ? (
                <BiSolidDislike className="text-2xl" />
              ) : (
                <BiDislike className="text-2xl" />
              )}
            </button>
            <span className="text-xs mt-1">Dislike</span>
          </div>

          {/* Comment button */}
          <div className="flex flex-col items-center">
            <button className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800/50 hover:bg-gray-700/50 backdrop-blur-sm">
              <FaComment className="text-xl" />
            </button>
            <span className="text-xs mt-1">Comment</span>
          </div>

          {/* Share button */}
          <div className="flex flex-col items-center">
            <button className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800/50 hover:bg-gray-700/50 backdrop-blur-sm">
              <FaShare className="text-xl" />
            </button>
            <span className="text-xs mt-1">Share</span>
          </div>

          {/* More button */}
          <div className="flex flex-col items-center">
            <button className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800/50 hover:bg-gray-700/50 backdrop-blur-sm">
              <MdMoreVert className="text-2xl" />
            </button>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="absolute top-4 right-4 text-white text-sm bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">
          {currentIndex + 1} / {shorts.length}
        </div>
      </div>
    </div>
  );
};

export default PlayShort;