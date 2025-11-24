import React, { useContext, useState, useRef, useMemo, useEffect } from "react";
import StoreContext from "../hooks/context/context";
import { IoMdClose } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { uploadVideo, confirmUploadCompletion, resetUploadState } from "../Redux/slices/videoSlice";
import { toast } from "react-toastify";

const VideoUpload = () => {
  const { handleCloseVideoUpload } = useContext(StoreContext);
  const [step, setStep] = useState(1);
  const [videoFile, setVideoFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [videoId, setVideoId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
  });
  
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  
  // Select state from Redux - make sure we're reading from the right place
  const videoState = useSelector((state) => state.video);
  const { isLoading, uploadProgress, error, isUploadComplete } = videoState;

  // Debug: Log EVERYTHING
  // useEffect(() => {
  //   console.log("🔍 FULL Redux State:", videoState);
  //   console.log("🔍 Component State Update:", {
  //     isLoading,
  //     uploadProgress,
  //     error,
  //     isUploadComplete,
  //     hasVideoFile: !!videoFile
  //   });
  // }, [isLoading, uploadProgress, error, isUploadComplete, videoFile, videoState]);

  console.log(uploadProgress)

  const categories = useMemo(() => [
    "Film & Animation",
    "Autos & Vehicles",
    "Music",
    "Pets & Animals",
    "Sports",
    "Travel & Events",
    "Gaming",
    "People & Blogs",
    "Comedy",
    "Entertainment",
    "News & Politics",
    "Howto & Style",
    "Education",
    "Science & Technology",
    "Nonprofits & Activism"
  ], []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      console.log("❌ No file selected");
      return;
    }

    console.log("📁 File selected:");
    console.log("  - Name:", file.name);
    console.log("  - Size:", (file.size / 1024 / 1024).toFixed(2), "MB");
    console.log("  - Type:", file.type);

    if (!file.type.startsWith('video/')) {
      console.error("❌ Not a video file:", file.type);
      toast.error('Please select a video file');
      return;
    }

    if (file.size > 500 * 1024 * 1024) {
      console.error("❌ File too large:", (file.size / 1024 / 1024).toFixed(2), "MB");
      toast.error('Video file must be less than 500MB');
      return;
    }

    setVideoFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    
    if (!formData.title) {
      const fileName = file.name.replace(/\.[^/.]+$/, "");
      setFormData(prev => ({ ...prev, title: fileName }));
    }
    
    console.log("✅ File set successfully");
  };

  const handleUpload = () => {
    console.log("═══════════════════════════════════════");
    console.log("🚀 HANDLE UPLOAD CALLED");
    console.log("═══════════════════════════════════════");
    
    console.log("Video File:", videoFile);
    console.log("Video File Name:", videoFile?.name);
    console.log("Form Data:", formData);
    console.log("Dispatch function:", typeof dispatch);
    console.log("uploadVideo function:", typeof uploadVideo);

    if (!videoFile) {
      console.error("❌ No video file!");
      toast.error('Please select a video file');
      return;
    }

    console.log("✅ Video file exists, proceeding with upload...");

    const uploadData = {
      videoFile: videoFile,
      title: formData.title || videoFile.name,
      description: formData.description || "",
      category: formData.category || "Entertainment"
    };
    
    console.log("📦 Upload data prepared:", uploadData);
    console.log("📤 About to dispatch uploadVideo...");

    // Use .then/.catch instead of async/await for debugging
    dispatch(uploadVideo(uploadData))
      .then((result) => {
        console.log("✅✅✅ UPLOAD PROMISE RESOLVED ✅✅✅");
        console.log("Result:", result);
        
        if (result.type.endsWith('/fulfilled')) {
          console.log("🎉 Upload succeeded!");
          const data = result.payload;
          console.log("Payload:", data);
          
          setVideoId(data.data?.videoId || data.videoId);
          toast.success('Video uploaded successfully!');
          setStep(2);
        } else if (result.type.endsWith('/rejected')) {
          console.error("❌ Upload was rejected");
          console.error("Error payload:", result.payload);
          toast.error(result.payload?.message || 'Upload failed');
        }
      })
      .catch((err) => {
        console.error("❌❌❌ UPLOAD PROMISE REJECTED ❌❌❌");
        console.error("Error:", err);
        toast.error(err?.message || 'Upload failed');
      });
    
    console.log("📤 Dispatch called, waiting for response...");
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

    if (!formData.title.trim()) {
      toast.error('Title is required');
      return;
    }

    if (!formData.category) {
      toast.error('Category is required');
      return;
    }

    try {
      if (videoId) {
        console.log("📝 Confirming completion for video:", videoId);
        await dispatch(confirmUploadCompletion(videoId)).unwrap();
      }
      
      toast.success('Video published successfully!');
      handleClose();
    } catch (err) {
      toast.error(err?.message || 'Failed to publish video');
      console.error("Submit failed:", err);
    }
  };

  const handleClose = () => {
    console.log("🚪 Closing upload modal");
    handleCloseVideoUpload();
    dispatch(resetUploadState());
    setStep(1);
    setVideoFile(null);
    setPreviewUrl("");
    setVideoId(null);
    setFormData({ title: "", description: "", category: "" });
  };

  // Safe progress value
  const currentProgress = typeof uploadProgress === 'number' && !isNaN(uploadProgress) 
    ? uploadProgress 
    : 0;

  return (
    <div className="h-screen w-screen bg-[rgba(0,0,0,0.5)] fixed top-0 left-0 flex justify-center items-center z-50">
      <div className="h-2/3 w-10/12 max-w-3xl bg-white rounded-xl border-2 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="h-16 w-full flex justify-between items-center px-6 border-b-2">
          <h2 className="text-xl font-bold">
            {step === 1 ? "Upload Video" : "Video Details"}
          </h2>
          <button
            type="button"
            onClick={handleClose}
            disabled={isLoading}
            className="h-6 w-6 text-red-600 text-2xl hover:cursor-pointer hover:text-red-700 disabled:opacity-50"
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
              <div className="flex-1 flex flex-col items-center justify-center overflow-y-auto">
                <div className="w-full max-w-md mb-6">
                  <video
                    src={previewUrl}
                    controls
                    className="w-full rounded-lg"
                  />
                </div>
                
                <div className="w-full max-w-md mb-4 space-y-3">
                  <p className="text-center text-sm text-gray-700">
                    <span className="font-medium">{videoFile.name}</span>
                    <span className="text-gray-500 ml-2">
                      ({(videoFile.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                  </p>
                  
                  {/* Debug Info Box */}
                  <div className="text-xs bg-blue-50 border border-blue-200 p-3 rounded space-y-1">
                    <p className="font-bold text-blue-900 mb-2">🔍 Debug Info:</p>
                    <p><strong>isLoading:</strong> <span className={isLoading ? "text-green-600" : "text-red-600"}>{String(isLoading)}</span></p>
                    <p><strong>uploadProgress:</strong> <span className="text-blue-600">{currentProgress}%</span></p>
                    <p><strong>isUploadComplete:</strong> <span className={isUploadComplete ? "text-green-600" : "text-gray-600"}>{String(isUploadComplete)}</span></p>
                    <p><strong>hasError:</strong> <span className={error ? "text-red-600" : "text-green-600"}>{error ? 'Yes' : 'No'}</span></p>
                    {error && <p className="text-red-600"><strong>Error:</strong> {error?.message}</p>}
                  </div>
                  
                  {/* Progress Bar */}
                  {isLoading && (
                    <div className="space-y-2">
                      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-blue-600 h-full transition-all duration-300 ease-out flex items-center justify-center"
                          style={{ width: `${currentProgress}%` }}
                        >
                          {currentProgress > 8 && (
                            <span className="text-xs font-bold text-white px-2">
                              {currentProgress}%
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-700">
                          {currentProgress < 5 && "Preparing upload..."}
                          {currentProgress >= 5 && currentProgress < 95 && "Uploading to cloud..."}
                          {currentProgress >= 95 && currentProgress < 98 && "Saving video data..."}
                          {currentProgress >= 98 && "Finalizing..."}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {currentProgress}% complete
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Success message */}
                  {isUploadComplete && !isLoading && (
                    <div className="flex items-center justify-center gap-2 text-green-600 py-2 bg-green-50 rounded-lg">
                      <FaCheckCircle className="text-xl" />
                      <span className="text-sm font-medium">Upload complete! Click "Start Upload" to proceed.</span>
                    </div>
                  )}

                  {/* Error message */}
                  {error && !isLoading && (
                    <div className="text-center py-2 px-4 bg-red-50 rounded-lg border border-red-200">
                      <p className="text-red-600 text-sm font-medium">
                        {error.message || 'Upload failed'}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      console.log("🔄 Changing video - resetting state");
                      setVideoFile(null);
                      setPreviewUrl("");
                      setVideoId(null);
                      dispatch(resetUploadState());
                      if (fileInputRef.current) {
                        fileInputRef.current.value = "";
                      }
                    }}
                    disabled={isLoading}
                    className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    Change Video
                  </button>
                  
                  {/* TEST: Simple button with inline onClick */}
                  <button
                    onClick={(e) => {
                      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
                      console.log("🎬 BUTTON CLICKED EVENT");
                      console.log("Event:", e);
                      console.log("Event type:", e.type);
                      console.log("Button disabled?", isLoading || isUploadComplete);
                      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
                      
                      if (isLoading || isUploadComplete) {
                        console.log("⚠️ Button should be disabled!");
                        return;
                      }
                      
                      handleUpload();
                    }}
                    disabled={isLoading || isUploadComplete}
                    className={`px-6 py-2 rounded text-white font-medium transition ${
                      isLoading
                        ? "bg-blue-400 cursor-wait"
                        : isUploadComplete
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-blue-600 hover:bg-blue-700"
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {isLoading 
                      ? `Uploading ${currentProgress}%` 
                      : isUploadComplete 
                      ? "✓ Uploaded - Fill Details Below" 
                      : "Start Upload"}
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 p-6 overflow-y-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleFormChange}
                  required
                  maxLength={100}
                  placeholder="Add a title that describes your video"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.title.length}/100
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  rows={4}
                  maxLength={5000}
                  placeholder="Tell viewers about your video"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.description.length}/5000
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleFormChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end space-x-4 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  disabled={isLoading}
                  className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100 disabled:opacity-50 transition"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed font-medium transition"
                >
                  {isLoading ? 'Publishing...' : 'Publish'}
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