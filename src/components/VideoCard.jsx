import { Link } from "react-router-dom";

const VideoCard = ({ video }) => {
  // Format duration from seconds to MM:SS or HH:MM:SS
  const formatDuration = (seconds) => {
    if (!seconds) return "0:00";
    
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Format time ago
  const formatTimeAgo = (date) => {
    if (!date) return "Recently";
    
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);

    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
    };

    for (const [name, secondsInInterval] of Object.entries(intervals)) {
      const interval = Math.floor(seconds / secondsInInterval);
      if (interval >= 1) {
        return interval === 1 ? `1 ${name} ago` : `${interval} ${name}s ago`;
      }
    }

    return "Just now";
  };

  // Format view count
  const formatViews = (count) => {
    if (!count) return "0 views";
    
    if (count >= 1000000000) {
      return (count / 1000000000).toFixed(1) + "B views";
    }
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + "M views";
    }
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + "K views";
    }
    return count.toLocaleString() + " views";
  };

  if (!video) {
    return null;
  }

  return (
    <Link
      to={`/video/${video._id}`}
      className="cursor-pointer w-full hover:scale-[1.02] transition-transform duration-200"
    >
      {/* Thumbnail */}
      <div className="relative">
        <img
          src={
            video.thumbnail ||
            video.thumbnails?.high ||
            video.thumbnails?.default ||
            "https://via.placeholder.com/320x180?text=No+Thumbnail"
          }
          alt={video.title}
          className="w-full h-[240px] object-cover rounded-xl"
          loading="lazy"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/320x180?text=Video";
          }}
        />
        
        {/* Duration badge */}
        <span className="absolute bottom-2 right-2 bg-black/90 text-white text-xs font-semibold px-2 py-1 rounded">
          {formatDuration(video.duration)}
        </span>
      </div>

      {/* Video info */}
      <div className="flex mt-3 gap-3">
        {/* Channel avatar */}
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex-shrink-0 flex items-center justify-center text-white font-semibold text-sm">
          {video.user?.username?.[0]?.toUpperCase() || 
           video.user?.fullname?.[0]?.toUpperCase() || 
           "U"}
        </div>

        {/* Text info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-sm line-clamp-2 leading-snug mb-1 text-gray-900">
            {video.title}
          </h3>
          <p className="text-xs text-gray-600">
            {video.user?.username || video.user?.fullname || "Unknown Channel"}
          </p>
          <div className="flex items-center gap-1 text-xs text-gray-600 mt-0.5">
            <span>{formatViews(video.views)}</span>
            <span>•</span>
            <span>{formatTimeAgo(video.createdAt)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
