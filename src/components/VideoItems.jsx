import React from "react";

const VideoItems = () => {
  const videos = [
    {
      videoId: "xYz123AbcDE",
      title: "How to Learn JavaScript in 2025",
      channelTitle: "CodeAcademyPro",
      channelIcon: "💻",
      viewCount: 125034,
      timeAgo: "3 days ago",
      duration: "15:23",
      thumbnailUrl: "https://i.ytimg.com/vi/xYz123AbcDE/hqdefault.jpg",
    },
    {
      videoId: "mNOp456DefGH",
      title: "Top 10 AI Tools You Should Try",
      channelTitle: "TechExplained",
      channelIcon: "🤖",
      viewCount: 203421,
      timeAgo: "1 week ago",
      duration: "9:45",
      thumbnailUrl: "https://i.ytimg.com/vi/mNOp456DefGH/hqdefault.jpg",
    },
    {
      videoId: "QrSt789IjkLM",
      title: "Live Coding: Build a Chat App with Node.js",
      channelTitle: "DevWithAlex",
      channelIcon: "👨‍💻",
      viewCount: 85321,
      timeAgo: "2 days ago",
      duration: "1:02:10",
      thumbnailUrl: "https://i.ytimg.com/vi/QrSt789IjkLM/hqdefault.jpg",
    },
  ];

  return (
    // <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 p-6">
    //   {videos.map((video) => (
    //     <div
    //       key={video.videoId}
    //       className="cursor-pointer w-full max-w-[400px]"
    //     >
    //       {/* Thumbnail with duration */}
    //       <div className="relative">
    //         <img
    //           src={video.thumbnailUrl}
    //           alt={video.title}
    //           className="w-full h-[240px] z-0 object-cover rounded-xl"
    //         />
    //         <span className="absolute bottom-3 right-2 bg-black/90 text-white text-sm px-2 py-1 rounded-md">
    //           {video.duration}
    //         </span>
    //       </div>

    //       {/* Video info */}
    //       <div className="flex mt-4 gap-3">
    //         {/* Channel icon */}
    //         <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center text-xl">
    //           {video.channelIcon}
    //         </div>

    //         {/* Text info */}
    //         <div className="flex-1 min-w-0">
    //           <h3 className="font-medium text-[16px] line-clamp-2 leading-tight mb-1">
    //             {video.title}
    //           </h3>
    //           <p className="text-gray-600 text-[14px]">{video.channelTitle}</p>
    //           <p className="text-gray-500 text-[14px] mt-1">
    //             {`${video.viewCount.toLocaleString()} views • ${video.timeAgo}`}
    //           </p>
    //         </div>
    //       </div>
    //     </div>
    //   ))}
    // </div>
    <>
      I am videoItems
    </>
  );
};

export default VideoItems;
