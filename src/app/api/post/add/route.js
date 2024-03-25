import getDetaFromToken from "@/helper/getDetaFromToken";
import Post from "@/models/post.model";
import { dbconnect } from "@/utils/mongo";

export async function POST(NextRequest) {
  console.log("hello");
  dbconnect();
  try {
    const data = await NextRequest.json();

    const myInfo = getDetaFromToken();

    const newPost = Post({
      postcontent: data.content,
      userid: myInfo.id,
      tags: data.tags,
      hidefrom: data.hidefrom,
      mentions: data.mentions,
      bgcolor: data.bgcolor,
      textcolor: data.textcolor,
    });

    await newPost.save();

    return Response.json({
      statusCode: 200,
      message: "Post Added",
    });
  } catch (error) {
    return Response.json({
      statusCode: 498,
      message: "Server error",
    });
  }
}
