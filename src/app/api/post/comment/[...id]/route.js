import getDetaFromToken from "@/helper/getDetaFromToken";
import Post from "@/models/post.model";
import { dbconnect } from "@/utils/mongo";

export async function POST(Request) {
  await dbconnect();
  const mydata = getDetaFromToken();
  const id = Request.url.split("comment/")[1];
  const messagedata = await Request.json();

  const commentObj = {
    userid: mydata.id,
    message: messagedata.message,
    cmnttime: Date.now(),
    reply: [],
    reactions: [],
    id: Date.now(),
  };

  const data = await Post.updateOne(
    { _id: id },
    {
      $push: {
        comments: commentObj,
      },
    }
  );

  const postdata = await Post.findOne({ _id: id });
  const alldata = await Post.find();

  return Response.json({
    alldata,
    data: postdata,
    message: "success",
    statusCode: 200,
  });
}
