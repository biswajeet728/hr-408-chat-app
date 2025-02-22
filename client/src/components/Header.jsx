import React, { useTransition } from "react";
import { Loader, LogOut } from "lucide-react";
import { useUserInfo } from "../store/useUiStore";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { cn } from "../lib/util";

function Header() {
  const { toggleMenu } = useUserInfo();
  const { selectedUser } = useChatStore();
  const { disconnectSocket, onlineUsers, logout } = useAuthStore();
  const [isPending, startTransition] = useTransition();
  return (
    <header className="p-3 w-full border-b border-slate-300 border-opacity-75 hidden md:block">
      <div className="flex justify-between items-center">
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
              <div className="relative w-8 h-8">
                <img
                  src={selectedUser?.image || "https://i.pravatar.cc/300"}
                  alt={selectedUser.name}
                  className="w-full h-full object-cover rounded-full"
                />

                {/* online status */}
                {selectedUser?._id &&
                  onlineUsers?.includes(selectedUser._id) && (
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

        <button
          type="button"
          onClick={async () => {
            startTransition(() => {
              logout();
              disconnectSocket();
            });
          }}
        >
          {isPending ? (
            <Loader
              size={20}
              className="text-slate-100 cursor-pointer animate-spin"
            />
          ) : (
            <LogOut size={20} className="text-slate-500 cursor-pointer" />
          )}
        </button>
      </div>
    </header>
  );
}

export default Header;
