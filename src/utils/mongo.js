import mongoose, { connection } from "mongoose";

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

export async function dbconnect() {
  try {
    mongoose.connect(process.env.MONGODB_URL, options);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("db connected");
    });
    return true;
  } catch (error) {
    return false;
    console.log(err);
  }
}
