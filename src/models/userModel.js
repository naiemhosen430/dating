import { model, models, Schema } from "mongoose";

const userSchema = Schema(
  {
    name: {
      type: String,
      required: false,
      default: "",
    },
    email: {
      type: String,
      required: true,
      default: "",
    },
    age: {
      type: Number,
      required: false,
      default: 0,
    },
    country: {
      type: String,
      required: false,
      default: "",
    },
    gender: {
      type: String,
      required: false,
      default: "",
    },
    password: {
      type: String,
      required: false,
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
    friends: {
      type: Array,
      required: false,
      default: [],
    },
    rendom: {
      type: Array,
      required: false,
      default: [],
    },
    blocklist: {
      type: Array,
      required: false,
      default: [],
    },
    recent: {
      type: Array,
      required: false,
      default: [],
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
