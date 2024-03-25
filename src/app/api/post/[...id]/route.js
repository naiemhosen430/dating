import Post from "@/models/post.model";
import { dbconnect } from "@/utils/mongo";

export async function GET(Request) {
  await dbconnect();
  const id = Request.url.split("post/")[1];

  const data = await Post.findOne({ _id: id });

  return Response.json({
    data: data,
    message: "success",
    statusCode: 200,
  });
}
