import { NextApiRequest, NextApiResponse } from "next";
import User from "../../../models/User";
import bcrypt from "bcrypt";

type Data<T> = {
  success: boolean;
  statusCode: number;
  message?: string;
  error?: string;
  data?: T;
};

// Get user info
export default async function UpdateUser(
  req: NextApiRequest,
  res: NextApiResponse<Data<object>>
) {
  try {
    //   If request method is not PUT
    if (req.method !== "PUT") {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        error: "Only accept `PUT` request",
      });
    }

    // Normalize data
    for (const i in req.body) {
      if (i === "password" || i === "socialLinks") continue;
      req.body[i] = String(req.body[i]).trim();
    }
    let { name, password } = req.body;

    const user = await User.findOne({});
    if (!user) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        error: "No user found to edit",
      });
    }

    let isPassValid;
    //   Match the password
    if (password) {
      if (!req.body.newPassword) {
        return res.status(400).json({
          success: false,
          statusCode: 400,
          error: "Password is provided, but new password is empty",
        });
      }
      isPassValid = await bcrypt.compare(password, user.password);
    }

    if (!isPassValid && password) {
      return res
        .status(400)
        .json({ success: false, statusCode: 400, error: "Incorrect password" });
    }

    //   Hash password
    let hashPassword;
    if (isPassValid) {
      hashPassword = await bcrypt.hash(req.body.newPassword, 11);
    }
    req.body.password = hashPassword;

    //   Save user to db
    await User.findOneAndUpdate({}, { $set: { ...req.body } });

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User updated successfully",
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, statusCode: 500, error: "Server error" });
  }
}
