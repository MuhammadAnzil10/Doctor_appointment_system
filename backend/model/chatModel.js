import mongoose from "mongoose";

// const chatSchema = new mongoose.Schema({
//   chatName:{type:String},
//   users:[
//     {
//       type:mongoose.Schema.Types.ObjectId,
//       ref:"User"
//     }
//   ],
//   latestMessage:{
//     type:mongoose.Schema.Types.ObjectId,
//     ref:'Message'
//   }
// },{timestamps:true})

const chatSchema = new mongoose.Schema(
  {
    user:{ type: mongoose.Schema.Types.ObjectId, ref: "User" },
    doctor:{ type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
