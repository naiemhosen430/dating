import getDetaFromToken from "@/helper/getDetaFromToken";
import Post from "@/models/post.model";
import { dbconnect } from "@/utils/mongo";

export async function POST(Request) {
  await dbconnect();
  const mydata = getDetaFromToken();
  const id = Request.url.split("like/")[1];

  const existingReaction = await Post.findOne({
    _id: id,
    "reactions.userid": mydata.id,
  });

  if (existingReaction) {
    await Post.updateOne(
      { _id: id },
      {
        $pull: {
          reactions: { userid: mydata.id },
        },
      }
    );

    const postdata = await Post.findOne({ _id: id });
    const alldata = await Post.find();

    return Response.json({
      alldata,
      data: postdata,
      message: "Succes unlike",
      statusCode: 200,
    });
  }

  const reactionsObj = {
    userid: mydata.id,
    cmnttime: Date.now(),
    id: Date.now(),
  };

  await Post.updateOne(
    { _id: id },
    {
      $push: {
        reactions: reactionsObj,
      },
    }
  );

  const postdata = await Post.findOne({ _id: id });
  const alldata = await Post.find();

  return Response.json({
    data: postdata,
    alldata,
    message: "Your reaction has been added to this post.",
    statusCode: 200,
  });
}
