import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// Base URL for blog posts
const BASE_URL_BLOGS = "http://localhost:8000/api/blog";

// Setting Axios default for credentials
axios.defaults.withCredentials = true;

// Async Thunks
// Fetch all blogs
export const fetchBlogsAsync = createAsyncThunk(
  "blogs/fetchBlogs",
  async () => {
    try {
      // Sending request to the server
      const response = await axios.get(`${BASE_URL_BLOGS}`);
      // If response is ok then return response.data
      if (response.statusText === "OK") {
        return response.data;
      }
      console.log(response.data);
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while fetching blogs.");
      throw error;
    }
  }
);

// Create new blog
export const createBlogAsync = createAsyncThunk(
  "blogs/createBlog",
  async (blogData) => {
    try {
      // Sending request to the server
      const response = await axios.post(`${BASE_URL_BLOGS}`, blogData);
      // If response is ok then return response.data
      if (response.statusText === "OK") {
        return response.data;
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while creating the blog.");
      throw error;
    }
  }
);

// Update blog by ID
export const updateBlogAsync = createAsyncThunk(
  "blogs/updateBlog",
  async ({ blogId, blogData }) => {
    try {
      // Sending request to the server
      const response = await axios.put(`${BASE_URL_BLOGS}/${blogId}`, blogData);
      // If response is ok then return response.data
      if (response.statusText === "OK") {
        return response.data;
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while updating the blog.");
      throw error;
    }
  }
);

// Delete blog by ID
export const deleteBlogAsync = createAsyncThunk(
  "blogs/deleteBlog",
  async (blogId) => {
    try {
      // Sending request to the server
      const response = await axios.delete(`${BASE_URL_BLOGS}/${blogId}`);
      // If response is ok then return response.data
      if (response.statusText === "OK") {
        return response.data;
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while deleting the blog.");
      throw error;
    }
  }
);

// Initial State
const INITIAL_STATE = {
  blogs: [],
  isLoading: false,
};

// Slice
const blogSlice = createSlice({
  // Slice name
  name: "blogs",

  // Initial State
  initialState: INITIAL_STATE,

  // Reducers
  reducers: {},

  // Extra reducers
  extraReducers: (builder) => {
    // FetchBlogsAsync thunk extra reducers start here
    // When pending
    builder.addCase(fetchBlogsAsync.pending, (state, action) => {
      state.isLoading = true;
    });

    // When fulfilled
    builder.addCase(fetchBlogsAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.blogs = action.payload;
    });

    // When rejected
    builder.addCase(fetchBlogsAsync.rejected, (state, action) => {
      state.isLoading = false;
    });
    // FetchBlogsAsync thunk extra reducers end here

    // CreateBlogAsync thunk extra reducers start here
    // When fulfilled
    builder.addCase(createBlogAsync.fulfilled, (state, action) => {
      state.blogs.push(action.payload);
      toast.success("Blog created successfully.");
    });
    // CreateBlogAsync thunk extra reducers end here

    // UpdateBlogAsync thunk extra reducers start here
    // When fulfilled
    builder.addCase(updateBlogAsync.fulfilled, (state, action) => {
      const index = state.blogs.findIndex(
        (blog) => blog._id === action.payload._id
      );
      if (index !== -1) {
        state.blogs[index] = action.payload;
        toast.success("Blog updated successfully.");
      }
    });
    // UpdateBlogAsync thunk extra reducers end here

    // DeleteBlogAsync thunk extra reducers start here
    // When fulfilled
    builder.addCase(deleteBlogAsync.fulfilled, (state, action) => {
      state.blogs = state.blogs.filter(
        (blog) => blog._id !== action.payload._id
      );
      toast.success("Blog deleted successfully.");
    });
    // DeleteBlogAsync thunk extra reducers end here
  },
});

// Extract blog reducer from the slice
export const blogsReducer = blogSlice.reducer;

// Extract actions from the slice

// State from the reducer and exporting state
export const blogsSelector = (state) => state.blogReducer;
