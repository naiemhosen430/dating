import User from "@/models/userModel";
import bcrypt from "bcryptjs";
const jwt = require("jsonwebtoken");
import { dbconnect } from "@/utils/mongo";

export async function POST(NextRequest) {
  await dbconnect();
  try {
    const data = await NextRequest.json();

    const checkUser = await User.findOne({ email: data.email }).select(
      "password email _id email role"
    );

    if (!checkUser || checkUser.password == "") {
      return Response.json({
        statusCode: 404,
        message: "Something wents wrong !!!",
      });
    }

    const checkPassword = await bcrypt.compare(
      data.password,
      checkUser.password
    );

    if (!checkPassword) {
      return Response.json({
        statusCode: 404,
        message: "Wrong password!!! Try again",
      });
    }

    const secretKey = process.env.TOKEN_SECRET;
    const userData = {
      userId: checkUser._id,
      email: checkUser.email,
      role: checkUser.role,
    };
    const expirationTimestamp =
      Math.floor(Date.now() / 1000) + 100 * 365 * 24 * 60 * 60;
    const token = jwt.sign(
      { ...userData, exp: expirationTimestamp },
      secretKey
    );

    return Response.json({
      statusCode: 200,
      data: token,
    });
  } catch (error) {
    console.log(error);
  }
}
