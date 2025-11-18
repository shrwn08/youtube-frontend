const VideoCardSkeleton = () => {
  return (
    <div className="w-full animate-pulse">
      {/* Thumbnail skeleton */}
      <div className="w-full h-[240px] bg-gray-300 rounded-xl"></div>

      {/* Info skeleton */}
      <div className="flex mt-4 gap-3">
        {/* Avatar skeleton */}
        <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0"></div>

        {/* Text skeleton */}
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-300 rounded w-4/5"></div>
          <div className="h-4 bg-gray-300 rounded w-3/5"></div>
          <div className="h-3 bg-gray-300 rounded w-2/5"></div>
        </div>
      </div>
    </div>
  );
};

export default VideoCardSkeleton;