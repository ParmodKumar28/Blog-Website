import axiosClient from "./axiosClient";

const blogService = {
  // Fetch all blogs
  getAllBlogs: async () => {
    const response = await axiosClient.get("/blog");
    return response.data;
  },

  // Fetch single blog by ID
  getBlogById: async (blogId) => {
    const response = await axiosClient.get(`/blog/${blogId}`);
    return response.data;
  },

  // Create a new blog post
  createBlog: async (blogData) => {
    const response = await axiosClient.post("/blog", blogData);
    return response.data;
  },

  // Update existing blog by ID
  updateBlog: async (blogId, blogData) => {
    const response = await axiosClient.put(`/blog/${blogId}`, blogData);
    return response.data;
  },

  // Delete blog by ID
  deleteBlog: async (blogId) => {
    const response = await axiosClient.delete(`/blog/${blogId}`);
    return response.data;
  },
};

export default blogService;
