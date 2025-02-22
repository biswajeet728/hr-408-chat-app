import React, { useEffect } from "react";
import { cn } from "../lib/util";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SearchBar from "./Search";
import UserSkeleton from "./UserSkeleton";
import { useUserInfo } from "../store/useUiStore";
import { XIcon } from "lucide-react";

function MobileNavBar() {
  const { getUsersList, users, isUsersLoading, selectedUser, setSelectedUser } =
    useChatStore();
  const [searchTerm, setSearchTerm] = React.useState("");

  const { onlineUsers } = useAuthStore();

  const { mobileNav, toggleMobileNav } = useUserInfo();

  useEffect(() => {
    getUsersList();
  }, [getUsersList]);

  const searchUsers = (e) => {
    setSearchTerm(e.target.value);
  };
  const filteredUsers = React.useMemo(() => {
    if (!searchTerm) return users; // Show full user list if no search
    return users?.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  return (
    <div
      className={cn(
        "flex flex-col h-full border-l border-slate-300 border-opacity-75",
        "absolute top-0 left-0 w-[300px] bg-white",
        "transform transition-transform duration-300",
        "transform transition-transform duration-300 ease-in-out",
        // Changed from translate-x-full to -translate-x-full for left-side hiding
        !!mobileNav ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex flex-col w-[300px] h-full border-r border-slate-300 border-opacity-75">
        <div className="p-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Chat App</h2>

            {/* close button */}
            <button
              className="bg-slate-100 rounded-md p-2"
              type="button"
              onClick={toggleMobileNav}
            >
              <XIcon size={20} />
            </button>
          </div>

          {/* search */}
          <div className="flex items-center bg-slate-200 bg-opacity-40 rounded-lg mt-3">
            <SearchBar onChange={(e) => searchUsers(e)} />
          </div>
        </div>

        {/* skeleton loader */}
        <div
          className={cn(
            "p-0 flex-1 overflow-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-slate-300 scrollbar-track-slate-100 scrollbar-track-rounded-full hover:scrollbar-thumb-slate-400 hover:scrollbar-track-slate-200",
            {
              "px-4": isUsersLoading,
            }
          )}
        >
          {isUsersLoading ? (
            <UserSkeleton />
          ) : (
            <div className="flex-1 min-h-screen p-1">
              {filteredUsers?.map((user, index) => {
                return (
                  <div
                    className={cn(
                      "flex items-center justify-between hover:bg-slate-100 p-2 rounded-lg mt-2 cursor-pointer",
                      {
                        "bg-slate-100": selectedUser?._id === user._id,
                      }
                    )}
                    key={index}
                    onClick={() => {
                      setSelectedUser(user);
                      toggleMobileNav();
                    }}
                  >
                    <div className="flex items-start">
                      <div className="relative w-10 h-10">
                        <img
                          src={user?.image || "https://i.pravatar.cc/300"}
                          alt={user.name}
                          className="w-full h-full object-cover rounded-full"
                        />

                        {/* online status */}
                        {onlineUsers.includes(user._id) && (
                          <div
                            className={cn(
                              "absolute w-3 h-3 bg-green-400 rounded-full bottom-0 right-0"
                            )}
                          ></div>
                        )}
                      </div>
                      <div className="ml-4 flex flex-col gap-1">
                        <h3 className="text-sm font-semibold">{user.name}</h3>
                        <p className="text-slate-500 text-xs">
                          {user.email || "No email"}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MobileNavBar;
