import Post from "@/models/post.model";
import { dbconnect } from "@/utils/mongo";

export async function GET(req) {
  await dbconnect();

  try {
    // Aggregate to get 50 random and recent posts
    const randomAndRecentPosts = await Post.aggregate([
      { $match: {} }, 
      { $sample: { size: 10 } }, 
      { $sort: { createdAt: -1 } }, 
    ]);

    return Response.json({
      data: randomAndRecentPosts,
      message: "success",
      statusCode: 200,
    });
  } catch (error) {
    console.error("Error fetching random and recent posts:", error);
    return Response.json({
      message: "Failed to fetch random and recent posts",
      statusCode: 500,
    });
  }
}
