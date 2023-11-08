import User from "@/models/userModel";
import bcrypt from "bcryptjs";
const jwt = require("jsonwebtoken");
import { dbconnect } from "@/utils/mongo";

export async function POST(NextRequest) {
  await dbconnect();
  try {
    const data = await NextRequest.json();

    const checkUser = await User.findOne({ email: data.email });

    if (!checkUser || checkUser.password == "") {
      const userObj = {
        name: data.name,
        email: data.email,
        password: data.password,
        age: data.age,
        gender: data.gender,
        country: data.country,
        interest: data.interest,
      };
      const user = await User.create(userObj);
      return Response.json({
        statusCode: 404,
        id: user._id,
        message: "You don't have account. Now set the password to continue",
      });
    }
    return Response.json({
      statusCode: 200,
      Message: data,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function PUT(NextRequest) {
  try {
    await dbconnect();
    const data = await NextRequest.json();

    const hashPass = bcrypt.hashSync(data.password, 10);

    console.log({ data });
    await User.updateOne(
      { email: data.email },
      {
        $set: {
          name: data.name,
          email: data.email,
          password: hashPass,
          age: data.age,
          gender: data.gender,
          country: data.country,
          interest: data.interest,
        },
      }
    );
    const user = await User.findOne({ email: data.email });

    const secretKey = process.env.TOKEN_SECRET;
    const userData = {
      userId: user._id,
      email: user.email,
      role: user.role,
    };
    const expirationTimestamp =
      Math.floor(Date.now() / 1000) + 100 * 365 * 24 * 60 * 60;
    const token = jwt.sign(
      { ...userData, exp: expirationTimestamp },
      secretKey
    );

    return Response.json({
      statusCode: 200,
      message: "success",
      data: token,
    });
  } catch (error) {
    console.log(error);
  }
}
