import User from "@/models/userModel";
import { dbconnect } from "@/utils/mongo";

export async function GET(Request) {
  await dbconnect();
  const id = Request.url.split("profile/")[1];

  const data = await User.findOne({ _id: id });

  return Response.json({
    data: data,
    message: "success",
    statusCode: 200,
  });
}
