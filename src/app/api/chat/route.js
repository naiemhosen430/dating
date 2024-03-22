import getDetaFromToken from "@/helper/getDetaFromToken";
import Chat from "@/models/chat.Model";
import { dbconnect } from "@/utils/mongo";

export async function GET(req) {
  await dbconnect();
  const myData = getDetaFromToken();

  try {
    const chats = await Chat.find({ chatids: { $in: [myData.id] } });

    return Response.json({
      data: chats,
      message: "success",
      statusCode: 200,
    });
  } catch (error) {
    console.error("Error fetching chats:", error);
    return Response.json({
      message: "Failed to fetch chats",
      statusCode: 500,
    });
  }
}
