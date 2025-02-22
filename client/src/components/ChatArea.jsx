import React, { useEffect } from "react";
import { Loader } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import NoChatSelected from "./NoChatSelected";
import MessageInput from "./MessageInput";
import { cn, formatMessageTime } from "../lib/util";

function ChatArea() {
  const {
    selectedUser,
    messages,
    getMessages,
    isMessagesLoading,
    initializeMessages,
    uninitializeMessages,
  } = useChatStore();
  const messageEndRef = React.useRef(null);

  const { authUser } = useAuthStore();

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Fetch messages on selected user change
  React.useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser?._id);
      initializeMessages();
    }

    return () => {
      uninitializeMessages();
    };
  }, [selectedUser, getMessages, initializeMessages, uninitializeMessages]);

  return (
    <div className="flex flex-col flex-grow bg-[#F6F6F6] h-full overflow-hidden">
      {/* No chat selected */}
      {isMessagesLoading ? (
        <div className="flex items-center justify-center h-full">
          <Loader className="w-10 h-10 text-slate-400 animate-spin" />
        </div>
      ) : !selectedUser ? (
        <NoChatSelected />
      ) : messages?.length === 0 && selectedUser ? (
        <div className="flex items-center justify-center h-full">
          <h1 className="text-base font-medium text-slate-500 text-center">
            No messages yet. <br /> Start the conversation by typing a message
            below.
          </h1>
        </div>
      ) : (
        <React.Fragment>
          {/* Message List Container */}
          <div
            className="flex-1 overflow-y-auto p-3 space-y-4 flex flex-col
            scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-slate-300 scrollbar-track-slate-100 scrollbar-track-rounded-full
             hover:scrollbar-thumb-slate-400 hover:scrollbar-track-slate-200"
          >
            {messages?.map((message, index) => (
              <div
                key={index}
                className={cn("flex items-start gap-2 w-full", {
                  "justify-start": message.senderId !== authUser?._id, // Receiver's message (left)
                  "justify-end": message.senderId === authUser?._id, // Sender's message (right)
                })}
                ref={index === messages.length - 1 ? messageEndRef : null}
              >
                <div
                  className={cn("flex items-start gap-2", {
                    "flex-row-reverse": message.senderId === authUser?._id, // Sender's message (right)
                  })}
                >
                  {/* Profile Image (Always Visible) */}
                  <img
                    src={
                      message.senderId === authUser?._id
                        ? authUser?.image
                        : selectedUser?.image
                    }
                    alt="profile"
                    className="w-9 h-9 object-cover rounded-full"
                  />

                  {/* Message Container */}
                  <div
                    className={cn(
                      "p-2 rounded-lg shadow-md max-w-xs flex flex-col",
                      {
                        "bg-white text-slate-700":
                          message.senderId !== authUser?._id,
                        "bg-blue-950 text-white":
                          message.senderId === authUser?._id,
                      }
                    )}
                  >
                    {message.text}

                    <time className="text-xs opacity-50 text-right mt-1 block">
                      {formatMessageTime(message.createdAt)}
                    </time>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <MessageInput />
        </React.Fragment>
      )}
    </div>
  );
}

export default ChatArea;
