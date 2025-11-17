import React, { useContext, useState, useRef } from "react";
import StoreContext from "../hooks/context/context";
import { IoMdClose } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { uploadVideo, resetUploadState } from "../Redux/slices/videoSlice";

const VideoUpload = () => {
  const { handleCloseVideoUpload } = useContext(StoreContext);
  const [step, setStep] = useState(1); // 1 = upload, 2 = form
  const [videoFile, setVideoFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
  });
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const { isLoading, uploadProgress, error } = useSelector((state) =>
    state.video
  );

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!videoFile) return;

    const formData = new FormData();
    formData.append("video", videoFile);

    try {
      await dispatch(uploadVideo(formData)).unwrap();
      setStep(2); // Move to form step after successful upload
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    // along with the video ID to update the video details
    console.log("Form submitted:", formData);
    handleCloseVideoUpload();
    dispatch(resetUploadState());
  };

  console.log("error", error)
  return (
    <div className="h-screen w-screen bg-[rgba(0,0,0,0.5)] fixed top-0 left-0 flex justify-center items-center z-50">
      <div className="h-2/3 w-10/12 max-w-3xl bg-white rounded-xl border-2 flex flex-col overflow-hidden">
        <div className="h-16 w-full flex justify-between items-center px-6 border-b-2">
          <h2 className="text-xl font-bold">
            {step === 1 ? "Upload Video" : "Video Details"}
          </h2>
          <button
            type="button"
            onClick={() => {
              handleCloseVideoUpload();
              dispatch(resetUploadState());
            }}
            className="h-6 w-6 text-red-600 text-2xl hover:cursor-pointer"
          >
            <IoMdClose />
          </button>
        </div>

        {step === 1 ? (
          <div className="w-full h-full flex flex-col bg-[#F5F5F5] p-6">
            {!videoFile ? (
              <div className="flex-1 flex flex-col justify-center items-center">
                <div className="w-40 h-40 bg-white rounded-full flex justify-center items-center mb-6">
                  <FaCheckCircle className="text-6xl text-gray-400" />
                </div>
                <p className="mb-4 text-gray-600">
                  Drag and drop video files or
                </p>
                <input
                  type="file"
                  className="hidden"
                  id="file-upload"
                  accept="video/*"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                />
                <label
                  htmlFor="file-upload"
                  className="button cursor-pointer px-6 py-2 text-md font-semibold bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Select File
                </label>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center">
                <div className="w-full max-w-md mb-6">
                  <video
                    src={previewUrl}
                    controls
                    className="w-full rounded-lg"
                  />
                </div>
                <div className="w-full max-w-md mb-4">
                  {isLoading ? (
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  ) : (
                    <p className="text-center">
                      {videoFile.name} (
                      {Math.round(videoFile.size / 1024 / 1024)}MB)
                    </p>
                  )}
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      setVideoFile(null);
                      setPreviewUrl("");
                      fileInputRef.current.value = "";
                    }}
                    className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
                  >
                    Change Video
                  </button>
                  <button
                    onClick={handleUpload}
                    disabled={isLoading}
                    className={`px-6 py-2 rounded text-white ${
                      isLoading
                        ? "bg-blue-400"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    {isLoading ? `Uploading... ${uploadProgress}%` : "Upload"}
                  </button>
                </div>
                {error && <p className="mt-4 text-red-500">{error}</p>}
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 p-6 overflow-y-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleFormChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleFormChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a category</option>
                  <option value="education">Education</option>
                  <option value="entertainment">Entertainment</option>
                  <option value="gaming">Gaming</option>
                  <option value="music">Music</option>
                  <option value="technology">Technology</option>
                </select>
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoUpload;
