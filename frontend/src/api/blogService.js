import axiosClient from "./axiosClient";

const blogService = {
  getAllBlogs: async () => {
    const response = await axiosClient.get("/blog");
    return response.data;
  },

  getBlogById: async (blogId) => {
    const response = await axiosClient.get(`/blog/${blogId}`);
    return response.data;
  },

  createBlog: async (blogData) => {
    const response = await axiosClient.post("/blog", blogData);
    return response.data;
  },

  updateBlog: async (blogId, blogData) => {
    const response = await axiosClient.put(`/blog/${blogId}`, blogData);
    return response.data;
  },

  deleteBlog: async (blogId) => {
    const response = await axiosClient.delete(`/blog/${blogId}`);
    return response.data;
  },
};

export default blogService;
