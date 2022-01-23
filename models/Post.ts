import mongoose from "mongoose";
const Schema = mongoose.Schema;
import { dbConnection } from "../utils/DB";

dbConnection();

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    thumbnail: {
      type: Object,
      publicId: String,
      url: String,
    },
    categorie: {
      type: String,
      default: "blog",
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    shortDescription: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);

export default Post;
