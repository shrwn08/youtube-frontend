import React, { useContext } from 'react'
import StoreContext from '../hooks/context/context';

const VideoUpload = () => {
        const {handleCloseVideoPage, openUploadVideoPage} = useContext(StoreContext);

        console.log(openUploadVideoPage);
    
  return (
    <div className='h-screen w-screen bg-[rgba(255,255,255,8)] absolute flex justify-center items-center'>
        <div className='h-2/3 w-10/12 bg-white rounded-xl border-2'>
            <div className='h-16 w-full flex justify-between items-center px-2 border-b-2'>
                <h2>Upload Video</h2>
                <button type='button' onClick={handleCloseVideoPage}>X</button>
            </div>
        </div>
    </div>
  )
}

export default VideoUpload