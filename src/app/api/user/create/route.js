import User from "@/models/userModel";
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

    const userObj = {
      name: data.name,
      email: data.email,
      password: data.password,
      age: data.age,
      gender: data.gender,
      country: data.country,
      interest: data.interest,
    };

    console.log({ data });
    await User.updateOne(
      { email: data.email },
      {
        $set: {
          userObj,
        },
      }
    );
    const user = await User.findOne({ email: data.email });
    return Response.json({
      statusCode: 200,
      Message: user,
    });
  } catch (error) {
    console.log(error);
  }
}
