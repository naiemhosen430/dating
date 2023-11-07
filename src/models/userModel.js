import { model, models, Schema } from "mongoose";

const userSchema = Schema(
  {
    name: {
      type: String,
      required: true,
      default: "",
    },
    email: {
      type: String,
      required: true,
      default: "",
    },
    age: {
      type: Number,
      required: true,
      default: 0,
    },
    country: {
      type: String,
      required: true,
      default: "",
    },
    gender: {
      type: String,
      required: true,
      default: "",
    },
    password: {
      type: String,
      required: true,
      default: "",
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
    interest: {
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
