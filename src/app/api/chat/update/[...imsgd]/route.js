import Chat from "@/models/chat.Model";
import { dbconnect } from "@/utils/mongo";

export async function PUT(NextRequest, res) {
  // Assuming 'res' is your Express response object
  await dbconnect();
  try {
    const msgdata = await NextRequest.json();
    const id = NextRequest.url.split("updatelastmsg/")[1];

    // Check if a chat with the given IDs exists
    await Chat.updateOne(
      { _id: id },
      {
        $set: {
          lastmessage: msgdata.lastmessage,
        },
      }
    );

    // If the chat exists, return success message and data
    return Response.json({
      message: "Successfull",
      statusCode: 200,
    });
  } catch (error) {
    console.error("Error:", error);
  }
}
