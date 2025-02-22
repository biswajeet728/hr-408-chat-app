import { SendHorizontal } from "lucide-react";
import React, { useState } from "react";
import { useChatStore } from "../store/useChatStore";

function MessageInput() {
  const [text, setText] = useState("");
  const { sendMessage } = useChatStore();

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      await sendMessage(text.trim());

      // Clear form
      setText("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <form onSubmit={handleSendMessage}>
      <div className="flex items-center pt-2 md:mt-0 p-0 md:p-3 relative bg-white border-t border-gray-300">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 p-2 rounded-md outline-none bg-gray-100 border border-gray-300"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <SendHorizontal
          size={19}
          className="text-slate-500 cursor-pointer absolute right-7"
        />
      </div>
    </form>
  );
}

export default MessageInput;
