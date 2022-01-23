import type { NextApiRequest, NextApiResponse } from "next";
import Post from "../../../models/Post";
import { uploadImage } from "../../../utils/Cloudinary";

// Response types
type Data = {
  success: boolean;
  statusCode: number;
  message?: string;
  error?: string;
  data?: {
    title: string;
    thumbnail: string;
    categorie: string;
    slug: string;
    shortDescription: string;
    description: string;
    createdAt: string;
    updatedAt: number;
  };
};

// Create post
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    // If request is not post
    if (req.method !== "POST") {
      return res
        .status(400)
        .json({ success: false, statusCode: 400, error: "Bad request method" });
    }

    let { title, thumbnail, categorie, shortDescription, description } =
      req.body;

    // Validate req data
    if (!title) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        error: "Please fill up the required filed `title`",
      });
    }

    if (!thumbnail) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        error: "Please fill up the required filed `thumbnail`",
      });
    }

    if (!categorie) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        error: "Please fill up the required filed `categorie`",
      });
    }

    if (!shortDescription) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        error: "Please fill up the required filed `short description`",
      });
    }

    if (!description) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        error: "Please fill up the required filed `description`",
      });
    }

    // Normalize data
    title = title.trim();
    thumbnail = thumbnail.trim();
    categorie = categorie.trim();

    // Post slug
    const slug = title.replace(/\s|\t/gm, "-");

    shortDescription = shortDescription.trim();
    description = description.trim();

    // If same post slug exist
    const isSlugExist = await Post.findOne({ slug });
    if (isSlugExist) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        error: "Slug must be unique",
      });
    }

    // Upload thumbnail to cloudinary
    const uploadRes = await uploadImage(thumbnail);
    // Create a post
    const post = await Post.create({
      title,
      thumbnail: {
        publicId: uploadRes.public_id,
        url: uploadRes.secure_url,
      },
      categorie,
      slug,
      shortDescription,
      description,
    });
    await post.save();

    res.status(200).json({
      success: true,
      statusCode: 200,
      data: post,
    });
  } catch (error) {
    console.error(error);
    // if (error.name)
    res
      .status(500)
      .json({ success: false, statusCode: 500, error: "Server error" });
  }
}

export const getServerSideProps = () => {
  return { user: "Abu" };
};
