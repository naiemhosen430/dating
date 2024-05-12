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

    const id = NextRequest.url.split("sendrequest/")[1];

    const updatedUser = await User.updateOne(
      { _id: id },
      { $push: { friendrequest: myData.id } }
    );



    const me = await User.findOne({ _id: myData.id });
    const friend = await User.findOne({ _id: id });

    // Return success message and newly created chat object
    return Response.json({
      message: "Successfull",
      data: me,
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