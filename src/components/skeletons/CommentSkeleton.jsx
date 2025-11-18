const CommentSkeleton = () => {
  return (
    <div className="flex gap-3 py-4 animate-pulse">
      {/* Avatar */}
      <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0"></div>

      {/* Comment content */}
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-300 rounded w-32"></div>
        <div className="space-y-2">
          <div className="h-3 bg-gray-300 rounded w-full"></div>
          <div className="h-3 bg-gray-300 rounded w-4/5"></div>
        </div>
        <div className="h-3 bg-gray-300 rounded w-24"></div>
      </div>
    </div>
  );
};

export default CommentSkeleton;