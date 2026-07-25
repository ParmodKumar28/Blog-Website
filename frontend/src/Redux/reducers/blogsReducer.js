import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import blogService from "../../api/blogService";

// Async Thunks
// Fetch all blogs
export const fetchBlogsAsync = createAsyncThunk(
  "blogs/fetchBlogs",
  async (_, { rejectWithValue }) => {
    try {
      const data = await blogService.getAllBlogs();
      return data;
    } catch (error) {
      console.log(error);
      const msg = error.response?.data?.error || "An error occurred while fetching blogs.";
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

// Create new blog
export const createBlogAsync = createAsyncThunk(
  "blogs/createBlog",
  async (blogData, { rejectWithValue }) => {
    try {
      const data = await blogService.createBlog(blogData);
      return data;
    } catch (error) {
      console.log(error);
      const msg = error.response?.data?.error || "An error occurred while creating the blog.";
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

// Update blog by ID
export const updateBlogAsync = createAsyncThunk(
  "blogs/updateBlog",
  async ({ blogId, blogData }, { rejectWithValue }) => {
    try {
      const data = await blogService.updateBlog(blogId, blogData);
      return data;
    } catch (error) {
      console.log(error);
      const msg = error.response?.data?.error || "An error occurred while updating the blog.";
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

// Delete blog by ID
export const deleteBlogAsync = createAsyncThunk(
  "blogs/deleteBlog",
  async (blogId, { rejectWithValue }) => {
    try {
      const data = await blogService.deleteBlog(blogId);
      return data;
    } catch (error) {
      console.log(error);
      const msg = error.response?.data?.error || "An error occurred while deleting the blog.";
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

// Async Thunk to fetch a blog by ID
export const fetchBlogByIdAsync = createAsyncThunk(
  "blogs/fetchBlogById",
  async (blogId, { rejectWithValue }) => {
    try {
      const data = await blogService.getBlogById(blogId);
      return data;
    } catch (error) {
      console.log(error);
      const msg = error.response?.data?.error || "An error occurred while fetching the blog.";
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

// Initial State
const INITIAL_STATE = {
  blogs: [],
  isLoading: false,
  blog: null,
  error: null,
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
    // FetchBlogsAsync
    builder.addCase(fetchBlogsAsync.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchBlogsAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.blogs = action.payload;
    });
    builder.addCase(fetchBlogsAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // CreateBlogAsync
    builder.addCase(createBlogAsync.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(createBlogAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      const createdBlog = action.payload?.blog || action.payload;
      if (createdBlog && createdBlog._id) {
        state.blogs.push(createdBlog);
      }
      toast.success("Blog created successfully.");
    });
    builder.addCase(createBlogAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // UpdateBlogAsync
    builder.addCase(updateBlogAsync.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(updateBlogAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      const updatedBlog = action.payload?.blog || action.payload;
      if (updatedBlog && updatedBlog._id) {
        const index = state.blogs.findIndex(
          (blog) => blog._id === updatedBlog._id
        );
        if (index !== -1) {
          state.blogs[index] = updatedBlog;
        }
      }
      toast.success("Blog updated successfully.");
    });
    builder.addCase(updateBlogAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // DeleteBlogAsync
    builder.addCase(deleteBlogAsync.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deleteBlogAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      const deletedId = action.meta.arg;
      state.blogs = state.blogs.filter(
        (blog) => blog._id !== deletedId
      );
      toast.success("Blog deleted successfully.");
    });
    builder.addCase(deleteBlogAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // FetchBlogByIdAsync
    builder.addCase(fetchBlogByIdAsync.pending, (state) => {
      state.isLoading = true;
      state.blog = null;
      state.error = null;
    });
    builder.addCase(fetchBlogByIdAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.blog = action.payload?.blog || action.payload;
    });
    builder.addCase(fetchBlogByIdAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

// Extract blog reducer from the slice
export const blogsReducer = blogSlice.reducer;

// Extract actions from the slice

// State from the reducer and exporting state
export const blogsSelector = (state) => state.blogsReducer;
