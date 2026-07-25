// User state management — auth and profile
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import userService from "../../api/userService";

// Sign up
export const signUpAsync = createAsyncThunk(
  "users/signup",
  async ({ email, username, password }, { rejectWithValue }) => {
    try {
      return await userService.signUp({ email, username, password });
    } catch (error) {
      const msg = error.response?.data?.error || "Registration failed. Please try again.";
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

// Login
export const loginAsync = createAsyncThunk(
  "users/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      return await userService.login({ email, password });
    } catch (error) {
      const msg = error.response?.data?.error || "Login failed. Please try again.";
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

// Logout
export const logoutAsync = createAsyncThunk(
  "users/logout",
  async (_, { rejectWithValue }) => {
    try {
      return await userService.logout();
    } catch (error) {
      toast.error("Logout failed. Please try again.");
      return rejectWithValue("Logout failed");
    }
  }
);

// Restore session from httpOnly cookie (replaces localStorage approach)
// Called once on app mount — if the JWT cookie is valid, the server returns the user.
export const fetchCurrentUserAsync = createAsyncThunk(
  "users/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      return await userService.getMe();
    } catch {
      // Cookie missing or expired — not an error, just no session
      return rejectWithValue(null);
    }
  }
);

// Update profile (username and/or profile picture)
export const updateProfileAsync = createAsyncThunk(
  "users/updateProfile",
  async (formData, { rejectWithValue }) => {
    try {
      return await userService.updateProfile(formData);
    } catch (error) {
      const msg = error.response?.data?.error || "Profile update failed.";
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

// Initial State — no localStorage; session is restored via /me API call
const INITIAL_STATE = {
  isSignIn: Cookies.get("isSignIn") === "true",
  token: "",
  signedUser: null,   // null = unknown, {} = confirmed logged out
  signUpLoading: false,
  loginLoading: false,
  profileLoading: false,
  sessionRestored: false, // true once /me call completes (success or failure)
};

const usersSlice = createSlice({
  name: "users",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {

    // Sign up
    builder.addCase(signUpAsync.pending, (state) => { state.signUpLoading = true; });
    builder.addCase(signUpAsync.fulfilled, (state) => {
      state.signUpLoading = false;
      toast.success("Registered! You can now log in.");
    });
    builder.addCase(signUpAsync.rejected, (state) => { state.signUpLoading = false; });

    // Login
    builder.addCase(loginAsync.pending, (state) => { state.loginLoading = true; });
    builder.addCase(loginAsync.fulfilled, (state, action) => {
      state.loginLoading = false;
      state.token = action.payload.token;
      state.signedUser = action.payload.user;
      state.isSignIn = true;
      state.sessionRestored = true;
      Cookies.set("isSignIn", "true");
      toast.success("Login Successful!");
    });
    builder.addCase(loginAsync.rejected, (state) => { state.loginLoading = false; });

    // Logout
    builder.addCase(logoutAsync.fulfilled, (state) => {
      state.isSignIn = false;
      state.token = "";
      state.signedUser = null;
      state.sessionRestored = true;
      Cookies.remove("token");
      Cookies.remove("isSignIn");
      toast.success("Logged out successfully!");
    });

    // Restore session via /me — called silently on app mount
    builder.addCase(fetchCurrentUserAsync.fulfilled, (state, action) => {
      state.signedUser = action.payload.user;
      state.isSignIn = true;
      state.sessionRestored = true;
    });
    builder.addCase(fetchCurrentUserAsync.rejected, (state) => {
      // No valid session — clear everything
      state.signedUser = null;
      state.isSignIn = false;
      state.sessionRestored = true;
      Cookies.remove("isSignIn");
    });

    // Update profile
    builder.addCase(updateProfileAsync.pending, (state) => { state.profileLoading = true; });
    builder.addCase(updateProfileAsync.fulfilled, (state, action) => {
      state.profileLoading = false;
      state.signedUser = action.payload.user;
      toast.success("Profile updated successfully!");
    });
    builder.addCase(updateProfileAsync.rejected, (state) => { state.profileLoading = false; });
  },
});

export const usersReducer = usersSlice.reducer;
export const usersSelector = (state) => state.usersReducer;
