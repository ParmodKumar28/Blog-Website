// Blog controller to communicate with route's and repository
import ErrorHandler from "../../../utils/ErrorHandler.js";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
} from "../model/blog.repository.js";

// Create blog
export const createNewBlog = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const userId = req.user._id; // Extract user ID from request

    // Check if title, content, and user ID are provided
    if (!title || !content || !userId) {
      return next(
        new ErrorHandler(400, "Enter title, content, and user ID properly!")
      );
    }

    // Create new blog
    const newBlog = await createBlog({ title, content, user: userId });

    res
      .status(201)
      .json({ message: "Blog created successfully", blog: newBlog });
  } catch (error) {
    return next(new ErrorHandler(500, error));
  }
};

// Get all blogs
export const getAllBlogsHandler = async (req, res, next) => {
  try {
    const blogs = await getAllBlogs();
    res.json(blogs);
  } catch (error) {
    return next(new ErrorHandler(500, error));
  }
};

// Get blog by ID
export const getBlogByIdHandler = async (req, res, next) => {
  try {
    const blogId = req.params.id;
    const blog = await getBlogById(blogId);

    if (!blog) {
      return next(new ErrorHandler(404, "Blog not found"));
    }

    res.json(blog);
  } catch (error) {
    return next(new ErrorHandler(500, error));
  }
};

// Update blog
export const updateBlogHandler = async (req, res, next) => {
  try {
    const blogId = req.params.id;
    const { title, content } = req.body;

    // Check if title and content are provided
    if (!title || !content) {
      return next(new ErrorHandler(400, "Enter title and content properly!"));
    }

    // Update blog
    const updatedBlog = await updateBlog(blogId, req.body);

    if (!updatedBlog) {
      return next(new ErrorHandler(404, "Blog not found"));
    }

    res.json({ message: "Blog updated successfully", blog: updatedBlog });
  } catch (error) {
    return next(new ErrorHandler(500, error));
  }
};

// Delete blog
export const deleteBlogHandler = async (req, res, next) => {
  try {
    const blogId = req.params.id;
    const userId = req.user._id; // Extract user ID from request

    // Check if the blog exists
    const blog = await getBlogById(blogId);
    if (!blog) {
      return next(new ErrorHandler(404, "Blog not found"));
    }

    // Check if the user is authorized to delete the blog
    if (blog.user.toString() !== userId.toString()) {
      return next(new ErrorHandler(403, "Unauthorized to delete this blog"));
    }

    // Delete the blog
    await deleteBlog(blogId);

    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    return next(new ErrorHandler(500, error));
  }
};
