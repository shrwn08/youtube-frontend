import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideos } from "../Redux/slices/videoSlice";
import VideoItems from "../components/VideoItems";

function Home() {
  const dispatch = useDispatch();
  const { videos, isLoading, isError } = useSelector((state) => state.video);

  useEffect(() => {
    dispatch(getAllVideos());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <p className="text-xl">Loading videos...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <p className="text-xl text-red-500">Failed to load videos</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <VideoItems videos={videos} />
    </div>
  );
}

export default Home;