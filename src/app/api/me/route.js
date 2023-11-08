import getDetaFromToken from "@/helper/getDetaFromToken";
import User from "@/models/userModel";

const { dbconnect } = require("@/utils/mongo");

export async function GET() {
  await dbconnect();
  try {
    const data = getDetaFromToken();
    console.log({ data });
    const result = await User.findOne({ emaul: data.emaul }).exec();
    console.log({ result });
    return Response.json({
      statusCode: 200,
      message: "success",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
}
