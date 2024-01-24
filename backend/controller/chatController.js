import asyncHandler from "express-async-handler";
import Chat from "../model/chatModel.js";
import User from "../model/userModel.js";

const accessChat = asyncHandler(async (req, res) => {
  const userId = req.body.userId;

  let isChat = await Chat.find({
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-pasword")
    .populate("latestMessage");
 
  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name email",
  });

  if (isChat.length > 0) {
   return res.status(200).json(isChat[0]);
  } else {
    let chatData = {
      chatName: "sender",
      users: [req.user._id, userId],
    };
    const chat = await Chat.create(chatData);

    const fullChat = await Chat.findOne({ _id: chat._id }).populate(
      "users",
      '-password'
    )

   return res.status(201).json(fullChat);
  }
});

const getChats = asyncHandler(async (req, res) => {
  const chats = await Chat.find({
    users: { $elemMatch: { $eq: req.user._id } },
  })
    .populate("users", "-password")
    .populate("latestMessage")
    .sort({ updatedAt: -1 });

  const results = await User.populate(chats, {
    path: "latestMessage.sender",
    select: "name email",
  });
  return res.status(200).json(chats);
});

export { accessChat, getChats };
