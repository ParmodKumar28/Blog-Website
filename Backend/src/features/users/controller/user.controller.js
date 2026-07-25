// User controller — handles auth and profile management
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  createUser,
  findUserByEmail,
  getUserById,
  updateUserProfile,
} from "../model/user.repository.js";
import ErrorHandler from "../../../utils/ErrorHandler.js";

// Shared helper: strips sensitive fields from a user document
const sanitizeUser = (user) => ({
  _id: user._id,
  username: user.username,
  email: user.email,
  profileImage: user.profileImage || "",
  blogs: user.blogs,
  createdAt: user.createdAt,
});

// POST /api/user/register
export const registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return next(new ErrorHandler(400, "Enter username, email, and password properly!"));
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return next(new ErrorHandler(400, "User already exists"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await createUser({ username, email, password: hashedPassword });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    return next(new ErrorHandler(400, error));
  }
};

// POST /api/user/login
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorHandler(400, "Please provide email and password"));
    }

    const user = await findUserByEmail(email);
    if (!user) return next(new ErrorHandler(400, "Invalid credentials"));

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return next(new ErrorHandler(400, "Invalid credentials"));

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // httpOnly cookie — not accessible from JS, secure by design
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 3600 * 1000, // 7 days
    });

    res.json({ message: "Login successful", token, user: sanitizeUser(user) });
  } catch (error) {
    return next(new ErrorHandler(400, error));
  }
};

// GET /api/user/me  — restore session from httpOnly cookie (no localStorage needed)
export const getCurrentUser = async (req, res, next) => {
  try {
    // req.user is already attached by verifyToken middleware
    const user = await getUserById(req.user._id);
    if (!user) return next(new ErrorHandler(404, "User not found"));

    res.json({ user: sanitizeUser(user) });
  } catch (error) {
    return next(new ErrorHandler(500, error));
  }
};

// PUT /api/user/profile  — update username and/or profile picture
export const updateProfile = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const updateData = {};

    if (req.body.username && req.body.username.trim()) {
      updateData.username = req.body.username.trim();
    }

    // If a file was uploaded, store its relative path
    if (req.file) {
      updateData.profileImage = `/uploads/${req.file.filename}`;
    }

    if (Object.keys(updateData).length === 0) {
      return next(new ErrorHandler(400, "No data provided to update"));
    }

    const updatedUser = await updateUserProfile(userId, updateData);
    res.json({ message: "Profile updated successfully", user: sanitizeUser(updatedUser) });
  } catch (error) {
    return next(new ErrorHandler(500, error));
  }
};

// POST /api/user/logout
export const logoutUser = async (req, res, next) => {
  try {
    res.clearCookie("token", { httpOnly: true, sameSite: "lax" });
    res.json({ message: "Logout successful" });
  } catch (error) {
    return next(new ErrorHandler(500, error));
  }
};
