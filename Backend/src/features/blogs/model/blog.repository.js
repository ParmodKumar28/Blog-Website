// Blog repository is here for database communication's
import ErrorHandler from "../../../utils/ErrorHandler.js";
import Blog from "./blog.schema.js";

// Create new blog
export const createBlog = async (blogData) => {
  try {
    const blog = new Blog(blogData);
    return await blog.save();
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
    return await Blog.findByIdAndDelete(blogId);
  } catch (error) {
    throw new ErrorHandler(400, "Error deleting blog");
  }
};
