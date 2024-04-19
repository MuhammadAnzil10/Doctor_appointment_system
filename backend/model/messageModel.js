import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat", required: true },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "senderModel",
      required: true,
    },
    senderModel: { type: String, enum: ["User", "Doctor"], required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
