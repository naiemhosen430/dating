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
    type: {
      type: String,
      enum: ["random", "recently", "friend"],
      required: true,
      default: "random",
    },
  },
  {
    timestamps: true,
  }
);

const Chat = model("chat", chatSchema);
export default Chat;
