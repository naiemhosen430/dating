import getDetaFromToken from "@/helper/getDetaFromToken";
import Chat from "@/models/chat.Model";
import { dbconnect } from "@/utils/mongo";

export async function DELETE(NextRequest, res) {
  // Assuming 'res' is your Express response object
  await dbconnect();
  try {
    const id = NextRequest.url.split("delete/")[1];
    const myData = getDetaFromToken();

    // delete oparation
    await Chat.deleteOne({ _id: id });

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
