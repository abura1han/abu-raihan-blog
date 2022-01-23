import { NextApiRequest, NextApiResponse } from "next";
import Post from "../../../models/Post";

// Response type
type Data = {
  success: boolean;
  statusCode: number;
  message?: string;
  error?: string;
  data?: object;
};

// Single post route
export default async function hanlder(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    //   Only get requrest allowed
    if (req.method !== "GET") {
      return res
        .status(400)
        .json({ success: false, statusCode: 400, error: "Bad request method" });
    }

    const { postSlug } = req.query;

    //   Fetch post
    const post = await Post.findOne({ slug: postSlug }, { __v: 0 });
    if (!post) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        error: "Invalid post id",
      });
    }

    res.status(200).json({ success: true, statusCode: 200, data: post });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, statusCode: 500, error: "Server error" });
  }
}
