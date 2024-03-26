import getDetaFromToken from "@/helper/getDetaFromToken";
import Post from "@/models/post.model";
import { dbconnect } from "@/utils/mongo";

export async function GET(NextRequest) {
  dbconnect();
  try {
    const myInfo = getDetaFromToken();

    const postdata = await Post.findOne({ userid: myInfo, id }).sort({
      createdAt: 1,
    });

    return Response.json({
      statusCode: 200,
      data: postdata,
      message: "Post Added",
    });
  } catch (error) {
    return Response.json({
      statusCode: 498,
      message: "Server error",
    });
  }
}
