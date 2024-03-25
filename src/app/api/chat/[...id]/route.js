import getDetaFromToken from "@/helper/getDetaFromToken";
import Chat from "@/models/chat.Model";
import User from "@/models/userModel";
import { dbconnect } from "@/utils/mongo";

export async function POST(NextRequest) {
  const myData = getDetaFromToken();
  const idwithparams = NextRequest.url.split("chat/")[1];
  const id = idwithparams.split("?")[0];
  const queryString = idwithparams.split("?")[1];

  let recently = "";
  if (queryString) {
    const params = new URLSearchParams(queryString);
    recently = params.get("recently") || "";
  }

  await dbconnect();
  try {
    // Check if a chat with the given IDs exists
    const checkUser = await Chat.findOne({
      $or: [
        { chatids: { $all: [id, myData.id] } },
        { chatids: { $all: [myData.id, id] } },
      ],
    });

    const me = await User.findOne({ _id: myData.id || "" }).select("-password");
    const friend = await User.findOne({ _id: id }).select("-password");

    if (checkUser) {
      // If the chat exists, return success message and data
      return Response.json({
        message: "Successfull",
        data: checkUser,
        me: me,
        friend,
        statusCode: 200,
      });
    }

    // If the chat does not exist, create a new chat object
    const chatobject = Chat({
      chatids: [id, myData.id],
      type: recently ? "recently" : "random",
    });

    // Save the new chat object to the database
    await chatobject.save();

    // Return success message and newly created chat object
    return Response.json({
      message: "Successfull",
      data: chatobject,
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
