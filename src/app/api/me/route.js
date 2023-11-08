import getDetaFromToken from "@/helper/getDetaFromToken";
import User from "@/models/userModel";

import { dbconnect } from "@/utils/mongo";

export async function GET() {
  await dbconnect();
  const data = getDetaFromToken();
  const result = await User.findOne({ email: data.email }).select("-password");

  return Response.json({ statusCode: 200, message: "success", data: result });
}
