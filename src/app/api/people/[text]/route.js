import User from "@/models/userModel";
import { dbconnect } from "@/utils/mongo";

export async function GET(req) {
  await dbconnect();
  const text = req.url.split("people/")[1];

  const users = await User.aggregate([
    { $match: { interest: { $regex: text, $options: "i" } } },
    { $sample: { size: 10 } },
  ]).project({
    password: 0,
    email: 0,
    blocklist: 0,
    friends: 0,
    verificationcode: 0,
    recent: 0,
    rendom: 0,
  });
  
  return Response.json({
    data: users,
    message: "success",
    statusCode: 200,
  });
}