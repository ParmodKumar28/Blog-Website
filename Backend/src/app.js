// This is the main file here iam creating server instanace and routing and middleware applied
// Dotenv at the top for configuring
import "./dotenv.js";

// Imports
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { ErrorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware.js";
import cookieParser from "cookie-parser";
import cors from "cors";

// Routers imports
import userRouter from "../src/features/users/routes/user.routes.js";
import blogRouter from "../src/features/blogs/routes/blog.routes.js";

// Creating server
const app = express();

// Resolve __dirname in ES module context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve uploaded profile images as static files
app.use("/uploads", express.static(path.join(__dirname, "../../uploads")));

// Setting up cors
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:8000",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or Postman)
      if (!origin) return callback(null, true);
      
      const isAllowed =
        allowedOrigins.includes(origin) ||
        (origin.endsWith(".netlify.app") && !origin.includes("malicious"));

      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow credentials (cookies/headers)
  })
);

// Cookie parser
app.use(cookieParser());

// Body parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Default route
app.get("/", (req, res, next) => {
  res.send("Welcome to the Blogverse API :)");
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
