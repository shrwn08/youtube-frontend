import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import MiniSidebar from "../components/MiniSidebar";
import StoreContext from "../hooks/context/context";

const MainLayout = () => {
  const { sidebarOpen, toggleSidebar } = useContext(StoreContext);

  return (
    <div className="w-screen h-screen overflow-hidden flex flex-col">
      <Header />
      
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <div className="hidden sm:block">
          {sidebarOpen ? <Sidebar /> : <MiniSidebar />}
        </div>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 sm:hidden"
            onClick={toggleSidebar}
          >
            <div
              className="absolute left-0 top-0 h-full bg-white shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <Sidebar />
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;