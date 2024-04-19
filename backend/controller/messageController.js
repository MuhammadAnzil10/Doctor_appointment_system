import asyncHanlder from "express-async-handler";
import Message from "../model/messageModel.js";
import User from "../model/userModel.js";
import Chat from "../model/chatModel.js";

const sendMessage = asyncHanlder(async (req, res) => {
  const { content, chatId, userId, senderModel } = req.body;
  console.log(req.body);
  if (!content || !chatId) {
    res.status(400);
    throw new Error("Missing fields");
  }

  let newMessage = {
    sender: userId,
    content,
    chat: chatId,
    senderModel,
  };

  let message = await Message.create(newMessage);

  message = await message.populate("sender", "name ");
  message = await message.populate({
    path: "chat",
    populate: {
      path: "doctor",
      select: "-password -verificationCode",
    },
  });

  message = await User.populate(message, {
    path: "chat.user",
    select: "name email",
  });

  await Chat.findByIdAndUpdate(req.body.chatId, {
    latestMessage: message,
  });

  res.status(200).json(message);
});

const allMessage = asyncHanlder(async (req, res) => {
  const chatId = req.params.chatId;
  let messages = await Message.find({ chat: chatId })
    .populate("sender", "name email")
    .populate({
      path: "chat",
      populate: {
        path: "doctor",
        select: "name email images",
      },
    });

  res.status(200).json(messages);
});

export { sendMessage, allMessage };
