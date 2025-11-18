const ChannelCardSkeleton = () => {
  return (
    <div className="flex items-center gap-4 p-4 animate-pulse">
      {/* Channel avatar */}
      <div className="w-16 h-16 rounded-full bg-gray-300 flex-shrink-0"></div>

      {/* Channel info */}
      <div className="flex-1 space-y-2">
        <div className="h-5 bg-gray-300 rounded w-48"></div>
        <div className="h-4 bg-gray-300 rounded w-32"></div>
      </div>

      {/* Subscribe button */}
      <div className="h-10 w-28 bg-gray-300 rounded-full"></div>
    </div>
  );
};

export default ChannelCardSkeleton;