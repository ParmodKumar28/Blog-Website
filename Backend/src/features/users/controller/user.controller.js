// controllers/userController.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser, findUserByEmail } from "../model/user.repository.js";
import ErrorHandler from "../../../utils/ErrorHandler.js";

// Sign up
export const registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Check if username, email, and password are provided
    if (!username || !email || !password) {
      return next(
        new ErrorHandler(400, "Enter username, email, and password properly!")
      );
    }

    // Check if user already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return next(new ErrorHandler(400, "User already exists"));
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await createUser({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    return next(new ErrorHandler(400, error));
  }
};

// Login
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorHandler(400, "Please provide email and password"));
    }

    // Check if user exists
    const user = await findUserByEmail(email);
    if (!user) {
      return next(new ErrorHandler(400, "Invalid credentials"));
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(new ErrorHandler(400, "Invalid credentials"));
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Set token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 3600 * 1000, // 7 days in milliseconds
    });

    // Return sanitized user object (without password hash)
    const sanitizedUser = {
      _id: user._id,
      username: user.username,
      email: user.email,
      blogs: user.blogs,
      createdAt: user.createdAt,
    };

    res.json({ message: "Login successful", token, user: sanitizedUser });
  } catch (error) {
    return next(new ErrorHandler(400, error));
  }
};

// Logout
export const logoutUser = async (req, res, next) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "lax",
    });
    res.json({ message: "Logout successful" });
  } catch (error) {
    return next(new ErrorHandler(500, error));
  }
};
