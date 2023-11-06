import { model, models, Schema } from "mongoose";

const userSchema = Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: false,
      default: "",
    },
    password: {
      type: String,
      required: true,
    },
    verificationcode: {
      type: String,
      required: false,
      default: "",
    },
    role: {
      type: String,
      required: false,
      default: "user",
    },
    cetagory: {
      type: Array,
      required: false,
      default: [],
    },
    question: {
      type: Array,
      required: false,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const User = model("user", userSchema);
export default User;
