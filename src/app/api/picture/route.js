import Picture from "@/models/picture.model";
import { dbconnect } from "@/utils/mongo";

export async function GET(request) {
  await dbconnect();
  try {
      let data;
      if (request.query.search) {
          // If search query parameter is provided, find images matching name or tag
          const searchRegex = new RegExp(request.query.search, 'i');
          data = await Picture.find({
              $or: [
                  { name: { $regex: searchRegex } },
                  { tag: { $regex: searchRegex } }
              ]
          }).limit(20);
      } else {
          // If no search query parameter is provided, get a random sample of 20 pictures
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