import { NextApiRequest, NextApiResponse } from "next";

type Data = {
  success: boolean;
  statusCode: number;
  message?: string;
  error?: string;
  data?: string;
};

// Admin root route
// This route for show site status, health, total contents, trafics
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    res
      .status(200)
      .json({ success: true, statusCode: 200, message: "Admin logged in" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, statusCode: 500, error: "Server error" });
  }
}
