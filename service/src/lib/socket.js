import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      process.env.CLIENT_URL,
    ],
    credentials: true,
  },
});

export const getConnectedSocketUsers = (userId) => {
  return userSocketMap[userId];
};

let userSocketMap = {};
export let userChatMap = {};

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) {
    userSocketMap[userId] = socket.id;
  }

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("chatIsOpened", ({ senderId, receiverId }) => {
    console.log("chat is opened", senderId, receiverId);
    userChatMap[senderId] = receiverId;
  });

  socket.on("chatIsClosed", ({ senderId }) => {
    delete userChatMap[senderId];
  });

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);

    delete userSocketMap[userId];

    delete userChatMap[userId];

    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, server, app };
