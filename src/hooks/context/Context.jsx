import { createContext, useState } from "react";

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(null);
  const [openChannelFrom, setOpenChannelForm] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleCreateChannelForm = () =>{
    setOpenChannelForm(true);
  }
  const handleCancelChannelForm = () =>{
    setOpenChannelForm(false);
  
  }

  return (
    <StoreContext.Provider
      value={{ sidebarOpen, setSidebarOpen, toggleSidebar, handleCreateChannelForm, openChannelFrom, handleCancelChannelForm, setOpenChannelForm }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContext;
