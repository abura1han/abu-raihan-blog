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
export default async function CreateUser(
  req: NextApiRequest,
  res: NextApiResponse<Data<object>>
) {
  let { name, email, bio, socialLinks, address, password } = req.body;
  try {
    //   If request method is not POST
    if (req.method !== "POST") {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        error: "Only accept `POST` request",
      });
    }

    //   User data checking
    if (!name) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        error: "Please fillup the required filed 'name'",
      });
    }

    if (!email) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        error: "Please fillup the required filed 'email'",
      });
    }

    if (!bio) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        error: "Please fillup the required filed 'bio'",
      });
    }

    if (!socialLinks) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        error: "Please fillup the required filed 'socialLinks'",
      });
    }

    if (!address) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        error: "Please fillup the required filed 'address'",
      });
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        error: "Please fillup the required filed 'password'",
      });
    }

    // Normalize data
    name = name.trim();
    email = email.trim();
    bio = bio.trim();

    // If user exist then prevent to create the user
    const isUserExist = await User.findOne({});
    if (isUserExist) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        error: `Multiple user creation is not allowed`,
      });
    }

    //   Hash the password
    const hashPassword = await bcrypt.hash(password, 11);

    //   Save user to db
    const user = await User.create({
      name,
      email,
      bio,
      address,
      socialLinks,
      password: hashPassword,
    });
    await user.save();

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User creation successful",
      data: {
        ...user._doc,
        password: "Your given password",
      },
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, statusCode: 500, error: "Server error" });
  }
}
