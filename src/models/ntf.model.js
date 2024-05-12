import { model, models, Schema } from "mongoose";

const ntfSchema = Schema(
  {
    host: {
      type: String,
      required: true,
      default: "",
    },
    hostid: {
      type: String,
      required: true,
      default: "",
    },
    picture: {
        type: String,
        required: true,
        default: "",
    },
    action: {
        type: String,
        required: true,
        default: "",
    },
    content: {
      type: String,
      required: true,
      default: "",
    },
    link: {
      type: String,
      required: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Ntf = model("ntf", ntfSchema);
export default Ntf;
