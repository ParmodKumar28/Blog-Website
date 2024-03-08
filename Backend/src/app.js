// This is the main file here iam creating server instanace and routing and middleware applied
// Dotenv at the top for configuring
import "./dotenv.js";

// Imports
import express from "express";
import { ErrorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware.js";

// Routers imports
import userRouter from "../src/features/users/routes/user.routes.js";
import blogRouter from "../src/features/blogs/routes/blog.routes.js";

// Creating server
const app = express();

// Body parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Default route
app.get("/", (req, res, next) => {
  res.send("Welcome to the Blog app :)");
});

// Routes
app.use("/api/user", userRouter);
app.use("/api/blog", blogRouter);

// Handling invalid routes
app.use((req, res, next) => {
  res.json({
    success: false,
    error: "Invalid api! Enter valid api here please",
  });
});

// Error handler middleware
app.use(ErrorHandlerMiddleware);

// Exporting server
export default app;
