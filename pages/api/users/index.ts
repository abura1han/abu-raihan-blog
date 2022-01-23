import { NextApiRequest, NextApiResponse } from "next";
import User from "../../../models/User";

type Data<T> = {
  success: boolean;
  statusCode: number;
  message?: string;
  error?: string;
  data?: T;
};

// Get user info
export default async function (
  req: NextApiRequest,
  res: NextApiResponse<Data<object>>
) {
  try {
    //   Only accept GET requres
    if (req.method !== "GET") {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        error: "Invalid requrest method",
      });
    }
    const user = await User.findOne({}, { password: 0, __v: 0 });
    res.status(200).json({ success: true, statusCode: 200, data: user });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, statusCode: 500, error: "Server error" });
  }
}
