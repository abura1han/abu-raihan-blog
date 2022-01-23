import type { NextApiRequest, NextApiResponse } from "next";
import Post from "../../../models/Post";
import { updateImage } from "../../../utils/Cloudinary";

type Data = {
  success: boolean;
  statusCode: number;
  message?: string;
  error?: string;
  data?:
    | {
        title: string;
        thumbnail: string;
        categorie: string;
        slug: string;
        shortDescription: string;
        description: string;
        createdAt: string;
        updatedAt: number;
      }
    | any;
};

// Update post
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { postId } = req.body;
  try {
    // If request method is not put
    if (req.method !== "PUT") {
      return res
        .status(400)
        .json({ success: false, statusCode: 400, error: "Bad request method" });
    }

    //   IF post id is not provided
    if (!postId) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        error: "Post id is required to update a post",
      });
    }

    // Validate and normalize req.body
    const properties = [
      "postId",
      "title",
      "thumbnail",
      "categorie",
      "slug",
      "shortDescription",
      "description",
    ];

    // Check user provided data
    for (const i in req.body) {
      if (!properties.includes(i)) {
        return res.status(400).json({
          success: false,
          statusCode: 400,
          error: `Invalid filed ${i}`,
        });
      }

      // Normalize data
      req.body[i] = req.body[i].trim();
    }

    const { title } = req.body;

    let slug;
    if (title) {
      // Replace `whitespace` to `-`
      slug = title.replace(/\s|\t/gm, "-");
    }

    // Find the post
    const post = await Post.findOne({ _id: postId });
    if (!post) {
      return res
        .status(400)
        .json({ success: false, statusCode: 400, error: "Invalid post id" });
    }

    // Update cloudinary image
    let updateRes;
    if (req.body.thumbnail) {
      updateRes = await updateImage(
        post.thumbnail.publicId,
        req.body.thumbnail
      );
      if (!updateRes) {
        return res
          .status(500)
          .json({ success: false, statusCode: 500, error: "Server error" });
      }
    }

    const updateData = {
      ...req.body,
      slug,
      thumbnail: { url: updateRes?.secure_url, publicId: updateRes?.public_id },
    };

    // Update the post
    const updatePost = await Post.updateOne(
      { _id: postId },
      { $set: updateData },
      { $new: true }
    );

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Post updated successfully",
      data: updatePost,
    });
  } catch (error: any) {
    console.error(error.name);

    if (error.name === "MongoServerError") {
      return res
        .status(500)
        .json({ success: false, statusCode: 500, error: error.message });
    }

    res
      .status(500)
      .json({ success: false, statusCode: 500, error: "Server error" });
  }
}

export const getServerSideProps = () => {
  return { user: "Abu" };
};
