import User from "@/models/userModel";
import { dbconnect } from "@/utils/mongo";

export async function GET(req) {
  await dbconnect();
  const text = req.url.split("search/")[1];

  const users = await User.find({
    $or: [
      { name: { $regex: text, $options: "i" } },
      { interest: { $regex: text, $options: "i" } },
    ],
  }).select(
    "-password -email -blocklist -friends -verificationcode -recent -rendom"
  );

  console.log(users);

  return Response.json({
    message: "success",
    data: users,
    statusCode: 200,
  });
}
