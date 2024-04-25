import { model, models, Schema } from "mongoose";

const pictureSchema = Schema(
  {
    name: {
      type: String,
      required: true,
      default: "",
    },
    link: {
      type: String,
      required: true,
      default: "",
    },
    tag: {
      type: Array,
      required: true,
      default: [],
    },
  
  },
  {
    timestamps: true,
  }
);

const Picture = model("picture", pictureSchema);
export default Picture;
