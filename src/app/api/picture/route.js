import Picture from "@/models/picture.model";
import { dbconnect } from "@/utils/mongo";

export async function GET(request) {
  await dbconnect();
  try {
      let data;
      if (request?.query?.tag) {
          const searchRegex = new RegExp(request?.query?.tag, 'i');
          data = await Picture.find({
              $or: [
                  { name: { $regex: searchRegex } },
                  { tag: { $regex: searchRegex } }
              ]
          }).limit(20);
      } else {
          data = await Picture.aggregate([{ $sample: { size: 20 } }]);
      }

      return Response.json({
          statusCode: 200,
          data,
          message: "Success",
      }, {
          status: 200
      });

  } catch (error) {
      return Response.json({ message: error?.message }, { status: 498 });
  }
}


  export async function POST(NextRequest) {
    await dbconnect();
    try {
  
      const data = await NextRequest.json();

    const postedData = await Picture.create(data);

    return Response.json({
        statusCode: 200,
        data:postedData,
        message:
        "Success",
    },{
        status: 200
    });
  

    } catch (error) {
      return Response.json({ message:error?.message }, { status: 498 })
    }
  }