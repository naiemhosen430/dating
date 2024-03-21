import { model, models, Schema } from "mongoose";

const chatSchema = Schema(
  {
    chatids: {
      type: Array,
      required: true,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Chat = model("chat", chatSchema);
export default Chat;
