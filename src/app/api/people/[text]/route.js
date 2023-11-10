import User from "@/models/userModel";
import { dbconnect } from "@/utils/mongo";

export async function GET() {
  await dbconnect();
  const text = req.url.split("text/")[1];
  const users = await User.find({
    interest: { $regex: text, $options: "i" },
  }).select(
    "-password -email -blocklist -friends -verificationcode -recent -rendom"
  );
  return Response.json({
    data: users,
    message: "success",
    statusCode: 200,
  });
}
