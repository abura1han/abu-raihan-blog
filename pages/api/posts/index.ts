// Site status
import type { NextApiRequest, NextApiResponse } from "next";
import Post from "../../../models/Post";

type Data = {
  success: boolean;
  statusCode: number;
  message?: string;
  error?: string;
  data?: {
    totalPostCount: number;
    blogPostCount: number;
    projectCount: number;
    problemSolvingCount: number;
    blogPosts: {}[];
    projects: {}[];
    problemSolving: {}[];
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const blogPosts = await Post.find({ categorie: "blog" });
    const projects = await Post.find({ categorie: "project" });
    const problemSolving = await Post.find({ categorie: "problem-solving" });

    // Total post count
    const totalPostCount =
      blogPosts.length + projects.length + problemSolving.length;
    // Blog posts count
    const blogPostCount = blogPosts.length;
    // Project posts count
    const projectCount = projects.length;
    // Blog post count
    const problemSolvingCount = problemSolving.length;

    res.status(200).json({
      success: true,
      statusCode: 200,
      data: {
        totalPostCount,
        blogPostCount,
        projectCount,
        problemSolvingCount,
        blogPosts,
        projects,
        problemSolving,
      },
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, statusCode: 500, error: "Server error" });
  }
}
