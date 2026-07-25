import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import blogService from "../../api/blogService";

// Async Thunks
// Fetch all blogs
export const fetchBlogsAsync = createAsyncThunk(
  "blogs/fetchBlogs",
  async () => {
    try {
      const data = await blogService.getAllBlogs();
      return data;
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
      const data = await blogService.createBlog(blogData);
      return data;
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
      const data = await blogService.updateBlog(blogId, blogData);
      return data;
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
      const data = await blogService.deleteBlog(blogId);
      return data;
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while deleting the blog.");
      throw error;
    }
  }
);

// Async Thunk to fetch a blog by ID
export const fetchBlogByIdAsync = createAsyncThunk(
  "blogs/fetchBlogById",
  async (blogId) => {
    try {
      const data = await blogService.getBlogById(blogId);
      return data;
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while fetching the blog.");
      throw error;
    }
  }
);

// Initial State
const INITIAL_STATE = {
  blogs: [],
  isLoading: false,
  blog: {},
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

    // FetchBlogByIdAsync thunk extra reducers start here
    // When fulfilled
    builder.addCase(fetchBlogByIdAsync.fulfilled, (state, action) => {
      state.blog = action.payload;
    });
    // FetchBlogByIdAsync thunk extra reducers end here
  },
});

// Extract blog reducer from the slice
export const blogsReducer = blogSlice.reducer;

// Extract actions from the slice

// State from the reducer and exporting state
export const blogsSelector = (state) => state.blogsReducer;
