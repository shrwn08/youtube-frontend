import Header from "../components/Header";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <div className="flex flex-col ">
      <Header />
      <div className="flex">
        <main className=" w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
