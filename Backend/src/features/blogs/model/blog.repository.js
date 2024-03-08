// Blog repository is here for database communication's
import ErrorHandler from "../../../utils/ErrorHandler.js";
import User from "../../users/model/user.schema.js";
import Blog from "./blog.schema.js";

// Create new blog
export const createBlog = async (blogData) => {
  try {
    const blog = new Blog(blogData);
    const newBlog = await blog.save();

    // Update user's blogs array
    await User.findByIdAndUpdate(blogData.user, {
      $push: { blogs: newBlog._id },
    });

    return newBlog;
  } catch (error) {
    throw new ErrorHandler(400, "Error creating blog");
  }
};

// Get all blogs
export const getAllBlogs = async () => {
  try {
    return await Blog.find();
  } catch (error) {
    throw new ErrorHandler(400, "Error fetching blogs");
  }
};

// Get blog by ID
export const getBlogById = async (blogId) => {
  try {
    return await Blog.findById(blogId);
  } catch (error) {
    throw new ErrorHandler(400, "Error fetching blog by ID");
  }
};

// Update blog
export const updateBlog = async (blogId, blogData) => {
  try {
    return await Blog.findByIdAndUpdate(blogId, blogData, { new: true });
  } catch (error) {
    throw new ErrorHandler(400, "Error updating blog");
  }
};

// Delete blog
export const deleteBlog = async (blogId) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(blogId);

    // Remove deleted blog from user's blogs array
    await User.findByIdAndUpdate(deletedBlog.user, {
      $pull: { blogs: deletedBlog._id },
    });

    return deletedBlog;
  } catch (error) {
    throw new ErrorHandler(400, "Error deleting blog");
  }
};
