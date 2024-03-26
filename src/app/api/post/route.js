import Post from "@/models/post.model";
import { dbconnect } from "@/utils/mongo";

export async function GET(req) {
  await dbconnect();

  try {
    // Aggregate to get 50 random and recent posts
    const randomAndRecentPosts = await Post.aggregate([
      { $match: {} }, // Match all documents (posts)
      { $sample: { size: 50 } }, // Select a random sample of 50 posts
      { $sort: { createdAt: -1 } }, // Sort the sampled posts by createdAt field in descending order (recent posts first)
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
