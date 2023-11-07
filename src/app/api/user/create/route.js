import User from "@/models/userModel";
import { dbconnect } from "@/utils/mongo";

export async function POST(NextRequest) {
  dbconnect();
  try {
    const data = await NextRequest.json();

    const checkUser = await User.findOne({ email: data.email });

    if (!checkUser || checkUser.password == "") {
      const id = await User.create(data);
      return Response.json({
        statusCode: 404,
        id,
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

    const checkUser = await User.findOne({ email: data.email });

    if (!checkUser || checkUser.password == "") {
      await User.create(data);
      return Response.json({
        statusCode: 404,
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
