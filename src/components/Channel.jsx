import StoreContext from "../hooks/context/Context"
import React, { useState, useRef, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createChannel } from "../Redux/slices/channelSlice"; 
import { useNavigate } from 'react-router-dom';

const Channel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { handleCancelChannelForm, setOpenChannelForm } = useContext(StoreContext); // Context for cancel
  const { isLoading, uploadProgress, error } = useSelector(state => state.channel);
  const {user} = useSelector(state=>state.user)
  
  const [channelName, setChannelName] = useState('');
  const [channelImage, setChannelImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (JPEG, PNG, etc.)');
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    setPreviewUrl(URL.createObjectURL(file));
    setChannelImage(file);
  };
console.log("i am user ",user.id)

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!channelName.trim() || !channelImage) {
      alert('Channel name and image are required');
      return;
    }

    const formData = new FormData();
    formData.append('channel_name', channelName);
    formData.append('channelImage', channelImage);

    try {
      await dispatch(createChannel({formData,userId : user.id})).unwrap();
      navigate("/my-channel");
      setOpenChannelForm(false)
      setChannelName("");
      setChannelImage(null)
      //working 

    } catch (error) {
      console.error("Creation failed:", error);
    }
  };




 

  return (
    <section className='w-screen h-screen fixed top-0 left-0 z-50 flex items-center justify-center backdrop-blur-md'>
      <div className='bg-white p-8 rounded-lg shadow-lg max-w-md w-full border border-gray-300'>
        <h2 className='text-2xl font-bold text-gray-800 mb-6 text-center'>Create Channel</h2>

        <form onSubmit={handleSubmit}>
          {/* Image upload preview */}
          <div className='flex justify-center mb-6'>
            <div 
              className='relative w-24 h-24 rounded-full border-2 border-gray-300 bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition overflow-hidden'
              onClick={() => fileInputRef.current.click()}
            >
              {previewUrl ? (
                <>
                  <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                  <button 
                    type="button"
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                    
                  >
                    ×
                  </button>
                </>
              ) : (
                <span className='text-gray-600 text-xs'>Add Icon</span>
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
            </div>
          </div>

          {/* Channel name input */}
          <input 
            type="text"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            placeholder="Enter channel name" 
            className='w-full px-4 py-2 rounded bg-gray-100 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 mb-6'
            required
          />

          {/* Error and progress indicators */}
          {error && <div className="text-red-500 text-sm mb-4">{error.message}</div>}
          {uploadProgress > 0 && uploadProgress < 100 && (
            <div className="mb-4">
              <progress value={uploadProgress} max="100" className="w-full" />
              <p className="text-xs text-gray-500 mt-1">Uploading: {uploadProgress}%</p>
            </div>
          )}

          {/* Buttons */}
          <div className='flex justify-end space-x-4'>
            <button 
              type="button"
              className='px-4 py-2 rounded text-gray-700 bg-gray-200 hover:bg-gray-300 transition'
              onClick={handleCancelChannelForm}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button 
              type="submit"
              className='px-4 py-2 rounded text-white bg-red-600 hover:bg-red-700 transition disabled:bg-red-400'
              disabled={isLoading}
            >
              {isLoading ? 'Creating...' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Channel;