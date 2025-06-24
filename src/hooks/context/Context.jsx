import { createContext, useState } from "react";

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(null);
  const [openChannelFrom, setOpenChannelForm] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [openUploadVideoPage, setOpenUploadVideoPage] = useState(false);
  
  const handleProfileMenuOpen = () => {
    setProfileMenuOpen((prev) => !prev);
    if (openUploadVideoPage) setOpenUploadVideoPage(false);
  };
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleCreateChannelForm = () => {
    setOpenChannelForm(true);
  };
  
  const handleCancelChannelForm = () => {
    setOpenChannelForm(false);
  };

  // Renamed this to be more specific about closing video upload
  const handleCloseVideoUpload = () => {
    setOpenUploadVideoPage(false);
  };

  const handleUploadVideoBtn = () => {
 
    setOpenUploadVideoPage(true);
 
};

  return (
    <StoreContext.Provider
      value={{ 
        sidebarOpen, 
        setSidebarOpen, 
        toggleSidebar, 
        handleCreateChannelForm, 
        openChannelFrom, 
        handleCancelChannelForm, 
        setOpenChannelForm,
        profileMenuOpen, 
        setProfileMenuOpen,
        handleProfileMenuOpen, 
        openUploadVideoPage, 
        handleCloseVideoUpload,  // Updated name here
        handleUploadVideoBtn ,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContext;