import { ErrorHandler } from "../lib/error.js";
import { getConnectedSocketUsers, io } from "../lib/socket.js";
import { TryCatch } from "../middlewares/error.middleware.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getUsersList = TryCatch(async (req, res, next) => {
  const loogedInUser = req.user;

  const list = await User.find({ _id: { $ne: loogedInUser._id } }).select(
    "-password"
  );

  res.status(200).json({
    success: true,
    list,
  });
});

export const getUsersMessages = TryCatch(async (req, res, next) => {
  const { id: userToChatId } = req.params;
  const myId = req.user._id;

  console.log(myId, userToChatId);

  const messages = await Message.find({
    $or: [
      { senderId: myId, receiverId: userToChatId },
      { senderId: userToChatId, receiverId: myId },
    ],
  });

  res.status(200).json({
    success: true,
    messages,
  });
});

export const sendMessage = TryCatch(async (req, res, next) => {
  const { text } = req.body;
  const { id: receiver } = req.params;
  const sender = req.user._id;

  if (!text) {
    return next(new ErrorHandler("Message can't be empty", 400));
  }

  const message = new Message({
    senderId: sender,
    receiverId: receiver,
    text,
  });

  await message.save();

  // socket code here
  const receiverSocketId = getConnectedSocketUsers(receiver);

  if (receiverSocketId) {
    io.to(receiverSocketId).emit("getNewMessage", message);
  }

  res.status(201).json({
    success: true,
    message,
  });
});
