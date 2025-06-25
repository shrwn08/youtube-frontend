import React, { useContext } from "react";
import StoreContext from "../hooks/context/context";
import { IoMdClose } from "react-icons/io";
import { FaArrowUpFromBracket } from "react-icons/fa6";



const VideoUpload = () => {
  const { handleCloseVideoUpload } = useContext(StoreContext);

  return (
    <div className="h-screen w-screen bg-[rgba(255,255,255,8)] absolute flex justify-center items-center">
      <div className="h-2/3 w-10/12 bg-white rounded-xl border-2 flex flex-col">
        <div className="h-16 w-full flex justify-between items-center px-2 border-b-2">
          <h2 className="text-xl font-bold">Upload Video</h2>
          <button
            type="button"
            onClick={handleCloseVideoUpload}
            className="h-6 w-6 text-red-600 text-2xl hover:cursor-pointer"
          >
            <IoMdClose />
          </button>
        </div>
        <div className="w-full h-full flex flex-col bg-[#F5F5F5]">
          <div className="uploading symbol flex-[3]  flex justify-center items-center">
            {/* Content goes here */}
            
              <div className="w-40 h-40 bg-white rounded-full flex justify-center items-center">

                    <FaArrowUpFromBracket className="text-6xl" />

              </div>
            
              
          </div>
          <div className='upload flex-[1] flex justify-center items-center'>
        <input 
            type="file" 
            className="hidden" 
            id="file-upload"
        />
        <label 
            htmlFor="file-upload" 
            className="button cursor-pointer px-4 py-2 text-md font-semibold bg-white text-blue-600 rounded"
        >
            Upload
        </label>
    </div>
        </div>
      </div>
    </div>
  );
};

export default VideoUpload;
