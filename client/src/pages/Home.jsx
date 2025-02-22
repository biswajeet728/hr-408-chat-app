import React from "react";
import SideBar from "../components/Sidebar";
import MainArea from "../components/MainArea";
import UserInfo from "../components/UserInfoRightBar";
import MobileNavBar from "../components/MobileNavBar";

function Home() {
  return (
    <div className="p-2 md:p-5 min-h-screen h-screen flex box-border">
      <div className="flex w-full h-full bg-white relative overflow-hidden z-20">
        <SideBar />
        <MainArea />
        <UserInfo />
        <MobileNavBar />
      </div>
    </div>
  );
}

export default Home;
