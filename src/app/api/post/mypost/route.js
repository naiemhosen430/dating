import getDetaFromToken from "@/helper/getDetaFromToken";
import Post from "@/models/post.model";
import { dbconnect } from "@/utils/mongo";

export async function GET() {
  await dbconnect();
  try {
    let myInfo = getDetaFromToken();
    if (!myInfo) {
      return Response.json({
        statusCode: 498,
        message: "Unauthorized",
      });
    }

    const postdata = await Post.find({ userid: myInfo?.id });

    return Response.json({
      statusCode: 200,
      data: postdata,
      message: "Success",
    });
  } catch (error) {
    return Response.json({
      statusCode: 498,
      message: "Server error",
    });
  }
}
