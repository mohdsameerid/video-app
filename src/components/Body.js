import { Outlet } from "react-router-dom";
import SideContainer from "./SideContainer";

const Body = () => {
  return (
    <div className="flex">
      {/* Sidebar sticks below the header as the page scrolls */}
      <SideContainer />
      <main className="flex-1 min-w-0 bg-white dark:bg-[#0d0d14]">
        <Outlet />
      </main>
    </div>
  );
};

export default Body;
