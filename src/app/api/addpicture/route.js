import Picture from "@/models/picture.model";
import { dbconnect } from "@/utils/mongo";

export async function POST(NextRequest) {
    await dbconnect();
    try {
  
      const data = await NextRequest.json();

    const user = await Picture.create(data);

    return Response.json({
        statusCode: 200,
        message:
        "Success",
    },{
        status: 200
    });
  

    } catch (error) {}
  }