import Post from "@/models/post.model";
import { dbconnect } from "@/utils/mongo";

export async function GET(Request) {
  await dbconnect();
  try {
    const id = Request.url.split("friendpost/")[1];

    if (!id) {
      return Response.json({
        statusCode: 498,
        message: "Unauthorized",
      });
    }

    const postdata = await Post.find({ userid: id });

    return Response.json({
      statusCode: 200,
      data: postdata?.reverse(),
      message: "Success ",
    });
  } catch (error) {
    return Response.json({
      statusCode: 498,
      message: "Server error",
    });
  }
}
