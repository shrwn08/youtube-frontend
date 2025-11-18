const VideoPlayerSkeleton = () => {
  return (
    <div className="w-full h-full p-6 animate-pulse">
      <div className="max-w-6xl mx-auto">
        {/* Video player skeleton */}
        <div className="w-full aspect-video bg-gray-300 rounded-lg mb-4"></div>

        {/* Title skeleton */}
        <div className="mb-4">
          <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>

          {/* Channel info skeleton */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gray-300"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-300 rounded w-32"></div>
                <div className="h-3 bg-gray-300 rounded w-24"></div>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="h-10 w-24 bg-gray-300 rounded-full"></div>
              <div className="h-10 w-24 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Description skeleton */}
        <div className="bg-gray-100 rounded-lg p-4 space-y-2">
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          <div className="h-4 bg-gray-300 rounded w-4/6"></div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerSkeleton;