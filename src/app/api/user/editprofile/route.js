import getDetaFromToken from "@/helper/getDetaFromToken";
import User from "@/models/userModel";
import { dbconnect } from "@/utils/mongo";

export async function POST(NextRequest) {
  await dbconnect();
  try {
    const data = await NextRequest.json();

    const myInfo = getDetaFromToken();
    await User.updateOne(
      { email: myInfo.email },
      {
        $set: data,
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
