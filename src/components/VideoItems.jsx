import React from "react";
import { Link } from "react-router-dom";

const VideoItems = ({ videos = [] }) => {
  if (!videos || videos.length === 0) {
    return (
      <div className="w-full min-h-[50vh] flex justify-center items-center">
        <p className="text-xl text-gray-500">No videos available</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 p-6">
      {videos.map((video) => (
        <Link
          to={`/video/${video._id}`}
          key={video._id}
          className="cursor-pointer w-full"
        >
          {/* Thumbnail */}
          <div className="relative">
            <img
              src={video.thumbnail || video.thumbnails?.high || "https://via.placeholder.com/320x180"}
              alt={video.title}
              className="w-full h-[240px] object-cover rounded-xl"
            />
            <span className="absolute bottom-3 right-2 bg-black/90 text-white text-sm px-2 py-1 rounded-md">
              {formatDuration(video.duration)}
            </span>
          </div>

          {/* Video info */}
          <div className="flex mt-4 gap-3">
            {/* Channel avatar */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex-shrink-0 flex items-center justify-center text-white font-semibold">
              {video.user?.username?.[0]?.toUpperCase() || "U"}
            </div>

            {/* Text info */}
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-[16px] line-clamp-2 leading-tight mb-1">
                {video.title}
              </h3>
              <p className="text-gray-600 text-[14px]">
                {video.user?.username || "Unknown"}
              </p>
              <p className="text-gray-500 text-[14px] mt-1">
                {video.views?.toLocaleString() || 0} views • {formatTimeAgo(video.createdAt)}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

// Helper function to format duration
const formatDuration = (seconds) => {
  if (!seconds) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

// Helper function to format time ago
const formatTimeAgo = (date) => {
  if (!date) return "Recently";
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";
  
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";
  
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";
  
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";
  
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " minutes ago";
  
  return "Just now";
};

export default VideoItems;