import getDetaFromToken from "@/helper/getDetaFromToken";
import Chat from "@/models/chat.Model";
import User from "@/models/userModel";
import { dbconnect } from "@/utils/mongo";

export async function POST(NextRequest) {
  await dbconnect(); // Assuming this function connects to your MongoDB database

  try {
    const myData = getDetaFromToken(); // Retrieve data from token
    const data = await NextRequest.json(); // Get JSON data from the request body
    const id = Request.url.split("chat/")[1]; // Extract chat ID from the URL

    // Check if a chat with the given IDs exists
    const checkUser = await Chat.findOne({
      $or: [
        { chatids: { $all: [id, data.id] } },
        { chatids: { $all: [data.id, id] } },
      ],
    });

    if (checkUser) {
      // If the chat exists, return success message and data
      return Response.json({
        message: "Successfull",
        data: checkUser,
        statusCode: 200,
      });
    }

    // If the chat does not exist, create a new chat object
    const chatobject = Chat({
      chatids: [id, data.id],
    });

    // Save the new chat object to the database
    await chatobject.save();

    const me = await User.findOne({ _id: myData.id }).select("-password");
    const friend = await User.findOne({ _id: id }).select("-password");

    // Return success message and newly created chat object
    return Response.json({
      message: "Successfull",
      data: chatobject,
      me: chatobject,
      friend,
      statusCode: 200,
    });
  } catch (error) {
    console.log(error); // Log any errors that occur
  }
}
