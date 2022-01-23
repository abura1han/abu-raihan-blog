import { NextApiRequest, NextApiResponse } from "next";
import Post from "../../../models/Post";
import { removeImage } from "../../../utils/Cloudinary";

// Response types
type Data = {
  success: boolean;
  statusCode: number;
  message?: string;
  error?: string;
  data?: object;
};

// Delete post
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // Check request method
  if (req.method !== "DELETE") {
    return res
      .status(400)
      .json({ success: false, statusCode: 400, error: "Bad reqest method" });
  }

  // Get post id
  const { postId } = req.body;

  try {
    // If post id is not given
    if (!postId) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        error: "Post id is required to delete a post",
      });
    }

    // Delete the post
    const post = await Post.findOne({ _id: postId });
    if (!post) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        error: "Invalid post id",
      });
    }

    // Delete image from cloudinary
    const deleteImage = await removeImage(post.thumbnail.publicId);
    if (deleteImage.result !== "ok") {
      return res
        .status(500)
        .json({ success: false, statusCode: 500, error: "Server error" });
    }

    // Delete the post
    await post.delete();

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Post deleted successfully",
      data: { postId },
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, statusCode: 500, error: "Server error" });
  }
}
