// User's reducer is here here all state management is handled related to users and handlers
// Imports
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import userService from "../../api/userService";

// Async Thunks
// Sign up
export const signUpAsync = createAsyncThunk(
  "users/signup",
  async ({ email, username, password }) => {
    try {
      const data = await userService.signUp({ email, username, password });
      return data;
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error); // Display the error message in a toast
      } else {
        toast.error("An error occurred. Please try again later.");
      }
      throw error; // Throw the error to trigger the rejected case
    }
  }
);
// Sign up ends

// Login
export const loginAsync = createAsyncThunk(
  "users/lgin",
  async ({ email, password }) => {
    try {
      const data = await userService.login({ email, password });
      return data;
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error); // Display the error message in a toast
      } else {
        toast.error("An error occurred. Please try again later.");
      }
      throw error;
    }
  }
);
// Login ends

// Logout
export const logoutAsync = createAsyncThunk(
  "users/logout",
  async () => {
    try {
      const data = await userService.logout();
      return data;
    } catch (error) {
      console.log(error);
      toast.error("Logout failed. Please try again.");
      throw error;
    }
  }
);
// Logout ends

// Initial State
const INITIAL_STATE = {
  isSignIn: Cookies.get("isSignIn") === "true",
  token: "",
  signedUser: {},
  signUpLoading: false,
  loginLoading: false,
};

// Slice
const usersSlice = createSlice({
  // Slice name
  name: "users",

  // Initial State
  initialState: INITIAL_STATE,

  // Reducers
  reducers: {},

  // Extra reducer's
  extraReducers: (builder) => {
    // signUpAsync thunk extra reducer's start's here
    // When pending
    builder.addCase(signUpAsync.pending, (state, action) => {
      state.signUpLoading = true;
    });

    // When fulfilled
    builder.addCase(signUpAsync.fulfilled, (state, action) => {
      state.signUpLoading = false;
      toast.success("User registered you can now login!");
    });

    // When rejected
    builder.addCase(signUpAsync.rejected, (state, action) => {
      state.signUpLoading = false; // Set signUpLoading to false in case of rejection
    });
    // signUpAsync thunk extra reducer's end's

    // loginAsync thunk start's here
    // When pending
    builder.addCase(loginAsync.pending, (state, action) => {
      state.loginLoading = true;
    });

    // When fulfilled
    builder.addCase(loginAsync.fulfilled, (state, action) => {
      state.loginLoading = false;
      state.token = action.payload.token;
      state.signedUser = action.payload.user;
      state.isSignIn = true;
      // Note: Server sets the secure httpOnly token cookie automatically.
      // We only store the client UI flag in cookie:
      Cookies.set("isSignIn", "true");
      toast.success("Login Successful!");
    });

    // When rejected
    builder.addCase(loginAsync.rejected, (state, action) => {
      state.loginLoading = false;
    });
    // loginAsync thunk ends

    // logoutAsync thunk starts here
    builder.addCase(logoutAsync.fulfilled, (state, action) => {
      state.isSignIn = false;
      state.token = "";
      state.signedUser = {};
      Cookies.remove("token");
      Cookies.remove("isSignIn");
      toast.success("Logged out successfully!");
    });
    // logoutAsync thunk ends
  },
});

// Extract user reducer from the slice
export const usersReducer = usersSlice.reducer;

// Extract actions from the slice

// State from the reducer and exporting state
export const usersSelector = (state) => state.usersReducer;
