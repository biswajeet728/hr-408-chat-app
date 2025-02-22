import React from "react";
import { MessageSquare } from "lucide-react";

function NoChatSelected() {
  return (
    <div className="flex flex-col flex-grow bg-[#F6F6F6] h-full items-center justify-center">
      {/* Icon Display */}
      <div className="flex justify-center items-center w-full gap-4 mb-4">
        <div className="relative">
          <div
            className="w-16 h-16 rounded-2xl bg-slate-200 flex items-center
             justify-center animate-pulse"
          >
            <MessageSquare className="w-8 h-8 text-slate-400" />
          </div>
        </div>
      </div>

      {/* Welcome Text */}
      <div className="flex flex-col items-center justify-center px-4 md:px-0">
        <h2 className="text-2xl font-bold">Welcome to Chat APp!</h2>
        <p className="text-slate-500 text-center">
          Select a conversation from the sidebar to start chatting
        </p>
      </div>
    </div>
  );
}

export default NoChatSelected;
