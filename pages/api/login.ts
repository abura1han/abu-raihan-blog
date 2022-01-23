import { NextApiRequest, NextApiResponse } from "next";
import User from "../../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res
      .status(400)
      .json({ success: false, statusCode: 400, error: "Bad request method" });
  }
  const { email, password } = req.body;
  try {
    if (!email) {
      return res
        .status(400)
        .json({ success: false, statusCode: 400, error: "Email is required" });
    }
    if (!password) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        error: "Password is required",
      });
    }

    // Validation
    const user = await User.findOne({ email }, { photo: 0 });
    if (!user) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        error: "Incorrect email on password",
      });
    }

    const isPassValid = await bcrypt.compare(password, user.password);
    if (!isPassValid) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        error: "Incorrect email on password",
      });
    }

    //   Genereate acces token
    const payload = {
      user: user._id,
    };
    const accessToken = jwt.sign(
      payload,
      String(process.env.access_token_secret),
      {
        expiresIn: "40m",
      }
    );

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Login successful",
      data: { accessToken },
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, statusCode: 500, error: "Server error" });
  }
}
