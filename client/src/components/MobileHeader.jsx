import { LogOutIcon, MenuIcon } from "lucide-react";
import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { cn } from "../lib/util";
import { useUserInfo } from "../store/useUiStore";

function MobileHeader() {
  const { logout } = useAuthStore();
  const { selectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const { toggleMenu, toggleMobileNav } = useUserInfo();
  return (
    <div className="w-full flex items-center justify-between md:hidden">
      <button
        className="bg-slate-100 rounded-md p-2"
        type="button"
        onClick={toggleMobileNav}
      >
        <MenuIcon size={20} />
      </button>

      <div className="flex items-center gap-3 md:gap-0">
        {selectedUser && (
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() =>
              toggleMenu({
                email: selectedUser?.email || "johndoe@gmail.com",
                name: selectedUser?.name || "John Doe",
                phone: selectedUser?.phone || 1234567890,
                image:
                  selectedUser?.image ||
                  "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
              })
            }
          >
            <div className="relative w-9 h-9">
              <img
                src={selectedUser?.image || "https://i.pravatar.cc/300"}
                alt={selectedUser.name}
                className="w-full h-full object-cover rounded-full"
              />

              {/* online status */}
              {selectedUser?._id && onlineUsers?.includes(selectedUser._id) && (
                <div
                  className={cn(
                    "absolute w-3 h-3 bg-green-400 rounded-full bottom-0 right-0"
                  )}
                ></div>
              )}
            </div>

            <span className="text-base md:text-lg font-bold text-slate-900">
              {selectedUser?.name}
            </span>
          </div>
        )}
      </div>

      <button className="bg-transparent" type="button" onClick={logout}>
        <LogOutIcon size={20} />
      </button>
    </div>
  );
}

export default MobileHeader;
