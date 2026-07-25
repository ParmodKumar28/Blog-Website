// Blog schema is here also model
import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    subtitle: {
      type: String,
      default: "",
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      default: "General",
    },
    readTime: {
      type: String,
      default: "3 min read",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Creating model
const Post = mongoose.model("Post", postSchema);

// Exporting Model
export default Post;
