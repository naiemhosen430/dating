import mongoose, { connection } from "mongoose";

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

export function dbconnect() {
  try {
    mongoose.connect(process.env.MONGODB_URL, options);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("db connected");
    });
  } catch (error) {
    console.log(err);
  }
}
