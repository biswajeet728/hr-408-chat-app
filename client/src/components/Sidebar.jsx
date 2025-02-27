import React, { useEffect } from "react";
import { cn } from "../lib/util";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import UserSkeleton from "./UserSkeleton";
import SearchBar from "./Search";

function SideBar() {
  const {
    getUsersList,
    users,
    isUsersLoading,
    selectedUser,
    setSelectedUser,
    addMessageAlert,
    newMessageAlerts,
  } = useChatStore();
  const [searchTerm, setSearchTerm] = React.useState("");

  const { onlineUsers, socket } = useAuthStore();

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

  const alertEventHandler = React.useCallback(
    (data) => {
      addMessageAlert(data?.senderId, data?.message);
    },
    [addMessageAlert]
  );

  useEffect(() => {
    socket?.on("newMessageAlert", alertEventHandler);
  }, [socket]);

  return (
    <div className="hidden md:flex flex-col w-[300px] h-full border-r border-slate-300 border-opacity-75">
      <div className="p-3">
        <h2 className="text-xl font-semibold">Chat App</h2>

        {/* search */}
        <div className="hidden md:flex items-center bg-slate-200 bg-opacity-40 rounded-lg mt-3">
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
              const alertInfo = newMessageAlerts[user._id] || {
                count: 0,
                lastMessage: "",
              };
              return (
                <div
                  className={cn(
                    "flex items-center justify-between hover:bg-slate-100 p-2 rounded-lg mt-2 cursor-pointer",
                    {
                      "bg-slate-100": selectedUser?._id === user._id,
                    }
                  )}
                  key={index}
                  onClick={() => setSelectedUser(user)}
                >
                  <div className="flex items-center justify-between">
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
                        {alertInfo.lastMessage || user.email}
                      </p>
                    </div>
                  </div>

                  {alertInfo.count > 0 && (
                    <div className="w-4 h-4 bg-blue-500 text-white text-xs font-bold flex items-center justify-center rounded-full">
                      {alertInfo.count}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default SideBar;
