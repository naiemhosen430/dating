import { model, models, Schema } from "mongoose";

const postSchema = Schema(
  {
    postcontent: {
      type: String,
      required: true,
      default: "",
    },
    userid: {
      type: String,
      required: true,
      default: "",
    },
    images: {
      type: Array,
      required: false,
      default: [],
    },
    tags: {
      type: Array,
      required: false,
      default: [],
    },
    reactions: {
      type: Array,
      required: false,
      default: [],
    },
    comments: {
      type: Array,
      required: false,
      default: [],
    },
    hidefrom: {
      type: Array,
      required: false,
      default: [],
    },
    mentions: {
      type: Array,
      required: false,
      default: [],
    },
    bgcolor: {
      type: String,
      required: false,
      default: "",
    },
    textcolor: {
      type: String,
      required: false,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Post = model("post", postSchema);
export default Post;
