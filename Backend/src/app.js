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
import helmet from "helmet"; // Added for security headers
import morgan from "morgan"; // Added for request logging
import rateLimit from "express-rate-limit"; // Added for basic rate limiting

// Routers imports
import userRouter from "../src/features/users/routes/user.routes.js";
import blogRouter from "../src/features/blogs/routes/blog.routes.js";

// Creating server
const app = express();

// Resolve __dirname in ES module context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Setting up cors
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:8000",
  process.env.FRONTEND_URL ? process.env.FRONTEND_URL.replace(/\/$/, "") : null,
  // Add explicit Netlify deployment URLs here instead of relying on a weak substring check
  process.env.NETLIFY_URL ? process.env.NETLIFY_URL.replace(/\/$/, "") : null,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or Postman)
      if (!origin) return callback(null, true);

      // Removed unsafe "!origin.includes('malicious')" check — replaced with strict whitelist match
      const isAllowed = allowedOrigins.includes(origin);

      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow credentials (cookies/headers)
  }),
);

// Security headers middleware (helps prevent common attacks like XSS, clickjacking, etc.)
app.use(helmet());

// Request logging middleware (helps in debugging and monitoring requests)
app.use(morgan("dev"));

// Basic rate limiting to prevent brute-force / DDoS style abuse
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: "Too many requests, please try again later.",
  },
});
app.use(apiLimiter);

// Serve uploaded profile images as static files
app.use("/uploads", express.static(path.join(__dirname, "../../uploads")));

// Cookie parser
app.use(cookieParser());

// Body parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the Blogverse API :)");
});

// Routes
app.use("/api/user", userRouter);
app.use("/api/blog", blogRouter);

// Handling invalid routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Invalid api! Enter valid api here please",
  });
});

// Error handler middleware
app.use(ErrorHandlerMiddleware);

// Exporting server
export default app;
