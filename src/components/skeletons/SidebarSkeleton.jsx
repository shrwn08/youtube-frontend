const SidebarSkeleton = () => {
  return (
    <div className="w-52 flex flex-col gap-2 p-3 animate-pulse">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="flex items-center gap-4 px-4 py-3 rounded-lg">
          <div className="w-6 h-6 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded w-20"></div>
        </div>
      ))}
    </div>
  );
};

export default SidebarSkeleton;