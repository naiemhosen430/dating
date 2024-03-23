import { model, models, Schema } from "mongoose";

const chatSchema = Schema(
  {
    chatids: {
      type: Array,
      required: true,
      default: [],
    },
    lastmessage: {
      type: String,
      required: true,
      default: "Tap to chat",
    },
  },
  {
    timestamps: true,
  }
);

const Chat = model("chat", chatSchema);
export default Chat;
