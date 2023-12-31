import { useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./Navbar";
import SideBar from "./sidebar/Sidebar";

const PrivateLayout = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  return (
    <main className="max-w-[1400px] mx-auto flex">
      <SideBar
        isSideBarOpen={isSideBarOpen}
        setIsSideBarOpen={setIsSideBarOpen}
      />
      <div className={`flex flex-col space-y-5 items-center w-full`}>
        <NavBar
          isSideBarOpen={isSideBarOpen}
          setIsSideBarOpen={setIsSideBarOpen}
        />

        <div className="flex p-4 md:gap-3  justify-between items-start w-full">
          <Outlet />
          {/* <Chat /> */}
        </div>
      </div>
    </main>
  );
};

export default PrivateLayout;
