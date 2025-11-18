import { Link } from "react-router-dom";
import { FaPlay } from "react-icons/fa";

const ShortCard = ({ short }) => {
  const formatViews = (count) => {
    if (!count) return "0 views";
    if (count >= 1000000) return (count / 1000000).toFixed(1) + "M views";
    if (count >= 1000) return (count / 1000).toFixed(1) + "K views";
    return count + " views";
  };

  return (
    <Link
      to={`/shorts/${short._id}`}
      className="relative group cursor-pointer overflow-hidden rounded-lg"
    >
      {/* Thumbnail with aspect ratio */}
      <div className="relative aspect-[9/16] bg-gray-900">
        <img
          src={
            short.thumbnail ||
            short.thumbnails?.high ||
            "https://via.placeholder.com/270x480?text=Short"
          }
          alt={short.title}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          loading="lazy"
        />

        {/* Play overlay */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
          <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
            <FaPlay className="text-2xl text-black ml-1" />
          </div>
        </div>

        {/* Duration badge */}
        <div className="absolute top-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
          {short.duration}s
        </div>
      </div>

      {/* Info */}
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent text-white">
        <h3 className="font-medium text-sm line-clamp-2 mb-1">{short.title}</h3>
        <p className="text-xs opacity-90">{formatViews(short.views)}</p>
      </div>
    </Link>
  );
};

export default ShortCard;