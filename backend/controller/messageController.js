import asyncHanlder from "express-async-handler";
import Message from "../model/messageModel.js";
import User from "../model/userModel.js";
import Chat from "../model/chatModel.js";

const sendMessage = asyncHanlder(async (req,res) => {
  const { content, chatId } = req.body;
  if (!content || !chatId){
    res.status(400)
    throw new Error("Missing fields");
  }

  let newMessage ={
    sender:req.user_id,
    content,
    chat:chatId
    
  }

  let message = await Message.create(newMessage)

  message = await message.populate('sender','name ')
  message = await message.populate('chat')
  message = await User.populate(message,{
    path:'chat.user',
    select:'name email'
  })

  await Chat.findByIdAndUpdate(req.body.chatId,{
    latestMessage:message,
  })

  res.status(200).json(message); 

   
});

const allMessage = asyncHanlder(async(req,res)=>{


const chatId = req.params.chatId;
let messagess=await Message.find({chat:chatId}).populate('sender','name email').populate('chat')

res.status(200).json(messagess) 
})

export { sendMessage, allMessage };
