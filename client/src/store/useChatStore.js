import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

const BASE_URL = "http://localhost:5000";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  newMessageAlerts: {},

  setSelectedUser: (user) => {
    const { selectedUser, clearMessageAlert } = get();

    // If switching to another user, emit chatClosed first
    if (selectedUser && selectedUser._id !== user._id) {
      get().emitChatClosed(selectedUser._id);
    }

    // Set new selected user
    set({ selectedUser: user });

    // Emit chatOpened
    get().emitChatOpened(user._id);

    // Clear message alert when opening the chat
    clearMessageAlert(user._id);
  },

  getUsersList: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users-list");
      set({ users: res.data.list });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data.messages });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (text) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        { text: text }
      );
      set({ messages: [...messages, res.data.message] });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  initializeMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket?.on("getNewMessage", (message) => {
      const isMessageSentFromSelectedUser =
        message.senderId === selectedUser._id;
      if (!isMessageSentFromSelectedUser) return;

      set({
        messages: [...get().messages, message],
      });
    });
  },

  addMessageAlert: (senderId, messageText) => {
    set((state) => ({
      newMessageAlerts: {
        ...state.newMessageAlerts,
        [senderId]: {
          count: (state.newMessageAlerts[senderId]?.count || 0) + 1,
          lastMessage: messageText, // Store the latest message
        },
      },
    }));
  },

  clearMessageAlert: (userId) => {
    set((state) => {
      const newAlerts = { ...state.newMessageAlerts };
      delete newAlerts[userId];
      return { newMessageAlerts: newAlerts };
    });
  },

  emitChatOpened: (receiverId) => {
    const socket = useAuthStore.getState().socket;
    const senderId = useAuthStore.getState().authUser._id;
    socket?.emit("chatIsOpened", { senderId, receiverId });
  },

  emitChatClosed: () => {
    const socket = useAuthStore.getState().socket;
    const senderId = useAuthStore.getState().authUser._id;
    socket?.emit("chatIsClosed", { senderId });
  },
  uninitializeMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket?.off("getNewMessage");
  },
}));
