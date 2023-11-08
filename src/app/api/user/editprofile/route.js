import User from "@/models/userModel";
import { dbconnect } from "@/utils/mongo";

export async function POST(NextRequest) {
  try {
    await dbconnect();
    const data = await NextRequest.json();

    console.log({ data });
    await User.updateOne(
      { email: data.email },
      {
        $set: {
          name: data.name,
          age: data.age,
          country: data.country,
          interest: data.interest,
        },
      }
    );

    return Response.json({
      statusCode: 200,
      message: "Profile has updated",
    });
  } catch (error) {
    return Response.json({
      statusCode: 498,
      message: "Server error",
    });
  }
}
