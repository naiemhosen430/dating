import getDetaFromToken from "@/helper/getDetaFromToken";
import Chat from "@/models/chat.Model";
import User from "@/models/userModel";
import { dbconnect } from "@/utils/mongo";

export async function DELETE(NextRequest, res) {
  // Assuming 'res' is your Express response object
  await dbconnect();
  try {
    const id = NextRequest.url.split("delete/")[1];
    const myData = getDetaFromToken();

    // delete oparation
    const chatdata = await Chat.findOne({ _id: id });
    const friendid = chatdata?.chatids?.filter((cid)=> cid)
    await Chat.deleteOne({ _id: id });

    const myInfo = await User.findOne({_id: myData.id})
    const friendInfo = await User.findOne({_id: id})

    const myfriends = myInfo?.friends?.filter((fid)=> fid !== id)

    await User.updateOne({_id: myData.id},{
      $set: {
        friends: myfriends
      }
    }) 

    const friendfriends = myInfo?.friends?.filter((fid)=> fid !== id)

    await User.updateOne({_id: myData.id},{
      $set: {
        friends: friendfriends
      }
    }) 

    const msgData = await Chat.find({ chatids: { $in: [myData.id] } })
      .sort({ updatedAt: -1 })
      .exec();

    // If the chat exists, return success message and data
    return Response.json({
      message: "Successfull",
      data: msgData,
      statusCode: 200,
    });
  } catch (error) {
    console.error("Error:", error);
  }
}
