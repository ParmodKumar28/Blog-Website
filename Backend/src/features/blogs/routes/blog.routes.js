// Blog router is here all blog route's
import express from "express";
import {
  createNewBlog,
  getAllBlogsHandler,
  getBlogByIdHandler,
  updateBlogHandler,
  deleteBlogHandler,
} from "../controller/blog.controller.js";
import verifyToken from "../../../middlewares/auth.js";

const router = express.Router();

// Create a new blog
router.post("/", verifyToken, createNewBlog);

// Get all blogs
router.get("/", getAllBlogsHandler);

// Get blog by ID
router.get("/:id", getBlogByIdHandler);

// Update blog by ID
router.put("/:id", verifyToken, updateBlogHandler);

// Delete blog by ID
router.delete("/:id", verifyToken, deleteBlogHandler);

// Exporting router
export default router;
