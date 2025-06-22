import React, { useContext } from "react";
import StoreContext from "../hooks/context/context";
import Header from "../components/Header";
import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";
import MiniSidebar from "../components/MiniSidebar";

const MainLayout = () => {
  const { sidebarOpen } = useContext(StoreContext);
  return (
    <section className="flex flex-col h-screen overflow-hidden">
      <Header />
      <div className="flex  min-h-screen">
        {sidebarOpen ? (
          <div className="w-40  ">
            <Sidebar />
          </div>
        ) : (
          <div className="w-24  ">
            <MiniSidebar />
          </div>
        )}
        <main className="w-full ">
          <Outlet />
        </main>
      </div>
    </section>
  );
};

export default MainLayout;
