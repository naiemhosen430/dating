import getDetaFromToken from "@/helper/getDetaFromToken";
import Chat from "@/models/chat.Model";
import User from "@/models/userModel";
import { dbconnect } from "@/utils/mongo";

export async function PUT(NextRequest) {
  await dbconnect();
  try {
    const myData = getDetaFromToken();
    if (!myData) {
      return Response.json(
        {
          message: "Something wrong",
          statusCode: 498,
        },
        { status: 498 }
      );
    }

    const id = NextRequest.url.split("addfriend/")[1];

    const mydatafapi = await User.findOne({ _id: myData.id });
    const frienddata = await User.findOne({ _id: id });

    const mysendreq = mydatafapi?.friendrequest?.filter((fid)=> fid !== id)
    const friendsendreq = frienddata?.friendrequest?.filter((fid)=> fid !== myData.id)

    const myfriendid = [...mydatafapi?.friends, id]
    const friendfriendid = [...frienddata?.friends, myData.id]

    const updatedUser = await User.updateOne(
      { _id: id },
      { $set: { friends: friendfriendid, friendrequest: friendsendreq } }
    );

    if (!updatedUser) {
      return Response.json(
        {
          message: "Something wrong",
          statusCode: 498,
        },
        { status: 498 }
      );
    }

    const updatemine = await User.updateOne(
      { _id: myData?.id },
      { $set: { friends: myfriendid, friendrequest: mysendreq } }
    );

    if (!updatemine) {
      return Response.json(
        {
          message: "Something wrong",
          statusCode: 498,
        },
        { status: 498 }
      );
    }

    const updatechat = await Chat.updateOne(
      {
        $or: [
          { chatids: { $all: [id, myData.id] } },
          { chatids: { $all: [myData.id, id] } },
        ],
      },
      {
        $set: {
          type: "friend",
        },
      }
    );

    const chatu = await Chat.findOne({
      $or: [
        { chatids: { $all: [id, myData.id] } },
        { chatids: { $all: [myData.id, id] } },
      ],
    });

    if (!updatechat) {
      return Response.json(
        {
          message: "Something wrong",
          statusCode: 498,
        },
        { status: 498 }
      );
    }

    const me = await User.findOne({ _id: myData.id });
    const friend = await User.findOne({ _id: id });

    // Return success message and newly created chat object
    return Response.json({
      message: "Successfull",
      data: chatu,
      me: me,
      friend,
      statusCode: 200,
    });
  } catch (error) {
    return Response.json(
      {
        message: "Something wrong",
        statusCode: 498,
      },
      { status: 498 }
    );
  }
}