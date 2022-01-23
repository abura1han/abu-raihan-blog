// Site status
import type { NextApiRequest, NextApiResponse } from "next";
import Post from "../../../models/Post";

type Data = {
  success: boolean;
  statusCode: number;
  message?: string;
  error?: string;
  totalPostCount?: number;
  data?: {};
};

// Projects route
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const projects = await Post.find({ categorie: "project" });

    // Total post count
    const totalPostCount = projects.length;

    res.status(200).json({
      success: true,
      statusCode: 200,
      totalPostCount,
      data: projects,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, statusCode: 500, error: "Server error" });
  }
}
