import asyncHandler from "express-async-handler";
import Chat from "../model/chatModel.js";
import User from "../model/userModel.js";

const accessChat = asyncHandler(async (req, res) => {
  const { userId, doctorId } = req.body;

  let isChat = await Chat.find({
    $and: [
      { user: userId },
      { doctor: doctorId},
    ],
  })
    .populate("user doctor", "-password -verificationCode")
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
      user: userId,
      doctor: doctorId,
    };
    const chat = await Chat.create(chatData);

    const fullChat = await Chat.findOne({ _id: chat._id }).populate(
      "user doctor",
      "-password"
    );

    return res.status(201).json(fullChat);
  }
});

const getChats = asyncHandler(async (req, res) => {
  const {userId} = req.params
  const userType = req.query.type;
 
  let query = {}
  if(userType === 'user'){
     query={user : userId}
  }else if(userType === 'doctor') {
       query= {doctor : userId}
  }
  const chats = await Chat.find(query)
    .populate("user doctor", "-password -verificationCode")
    .populate("latestMessage")
    .sort({ updatedAt: -1 });
  
  const results = await User.populate(chats, {
    path: "latestMessage.sender",
    select: "name email",
  });
  return res.status(200).json(chats);
});

export { accessChat, getChats };
