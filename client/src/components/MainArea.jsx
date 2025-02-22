import React from "react";
import MobileHeader from "./MobileHeader";
import Header from "./Header";
import ChatArea from "./ChatArea";

function MainArea() {
  return (
    // MainArea component
    <div className="w-full h-full flex flex-col overflow-hidden p-2 md:p-0">
      <MobileHeader />
      <hr className="border-t border-gray-300 my-2 inline-block md:hidden" />
      <Header />
      <ChatArea />
    </div>
  );
}

export default MainArea;
