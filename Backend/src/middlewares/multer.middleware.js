// Multer middleware for handling profile image file uploads
import multer from "multer";
import path from "path";
import fs from "fs";

// Store uploaded files in the /uploads directory
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(process.cwd(), "uploads");

    // Create the directory automatically if missing
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Unique filename: userId_timestamp.ext
    const userId = req.user?._id || "user";
    const ext = path.extname(file.originalname);
    cb(null, `${userId}_${Date.now()}${ext}`);
  },
});

// Only accept image files
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
});

export default upload;
