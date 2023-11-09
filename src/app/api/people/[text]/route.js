import User from "@/models/userModel";
import { dbconnect } from "@/utils/mongo";

export async function GET() {
  await dbconnect();
  const users = await User.find().select(
    "-password -email -blocklist -friends -verificationcode -recent -rendom"
  );
  return Response.json({
    data: users,
    message: "success",
    statusCode: 200,
  });
}
