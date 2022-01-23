import mongoose from "mongoose";
const Schema = mongoose.Schema;
import { dbConnection } from "../utils/DB";

dbConnection();

const UserSchema = new Schema(
  {
    image: {
      type: String,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    bio: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    socialLinks: {
      github: String,
      linkedin: String,
      facebook: String,
      discord: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
