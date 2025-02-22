import { XIcon } from "lucide-react";
import React from "react";
import { useUserInfo } from "../store/useUiStore";
import { cn } from "../lib/util";

function UserInfo() {
  const { userData, toggleMenu } = useUserInfo();

  return (
    <div
      className={cn(
        "flex flex-col h-full border-l border-slate-300 border-opacity-75",
        "absolute top-0 right-0 w-[240px] bg-white",
        "transform transition-transform duration-300",
        !!userData ? "translate-x-0" : "translate-x-full"
      )}
    >
      <div className="p-3">
        <XIcon
          size={20}
          className="cursor-pointer"
          onClick={() => toggleMenu(null)}
        />

        {userData && (
          <div className="flex items-center flex-col gap-2 justify-center">
            <img
              src={userData?.image || "https://i.pravatar.cc/300"}
              alt="profile"
              className="w-20 h-20 object-cover rounded-full"
            />
            <h1 className="text-xl font-bold">{userData?.name}</h1>
            <p className="text-gray-500">{userData?.email}</p>
            <p className="text-gray-500">{userData?.phone}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserInfo;
