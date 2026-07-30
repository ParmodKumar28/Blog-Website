/**
 * Utility functions and data catalogs for Blog management,
 * formatting, category image resolution, and accurate read times.
 */
import { CATEGORY_COVERS } from "./blog.constants";

const DEFAULT_COVERS_ARRAY = Object.values(CATEGORY_COVERS);

// Returns cover image URL for a blog post.
export const getBlogCoverImage = (blog, index = 0) => {
  if (
    blog?.imageUrl &&
    typeof blog.imageUrl === "string" &&
    blog.imageUrl.trim() !== ""
  ) {
    return blog.imageUrl.trim();
  }

  const cat = blog?.category?.trim();
  if (cat) {
    const matchedKey = Object.keys(CATEGORY_COVERS).find(
      (k) => k.toLowerCase() === cat.toLowerCase(),
    );
    if (matchedKey && CATEGORY_COVERS[matchedKey]) {
      return CATEGORY_COVERS[matchedKey];
    }
  }

  const str = blog?._id || blog?.title || `${index}`;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
  }
  const pos = Math.abs(hash) % DEFAULT_COVERS_ARRAY.length;
  return DEFAULT_COVERS_ARRAY[pos];
};

// Formats raw category string cleanly.
export const getFormattedCategory = (cat) => {
  if (!cat || typeof cat !== "string" || cat.trim() === "") return "General";
  const trimmed = cat.trim();
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
};

// Formats ISO date string into readable publication date.
export const getFormattedDate = (dateString) => {
  if (!dateString) return "Recently Published";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Recently Published";
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

/**
 * Resolves author username with fallbacks.
 * Priority: populated user.username → user.email prefix → ID match against signedUser → default
 */
export const getAuthorName = (blog, signedUser = null) => {
  // 1. Populated user object from Mongoose .populate()
  if (blog?.user && typeof blog.user === "object") {
    if (blog.user.username && blog.user.username.trim()) {
      return blog.user.username.trim();
    }
    // Derive readable name from email if username missing
    if (blog.user.email && blog.user.email.includes("@")) {
      const prefix = blog.user.email.split("@")[0];
      return prefix.charAt(0).toUpperCase() + prefix.slice(1);
    }
  }

  // 2. Blog user ID matches the currently logged-in user
  const blogUserId = blog?.user?._id || blog?.user;
  const currentUserId = signedUser?._id || signedUser?.id;
  if (
    blogUserId &&
    currentUserId &&
    blogUserId.toString() === currentUserId.toString()
  ) {
    if (signedUser?.username) return signedUser.username;
  }

  return "DevBlog Author";
};

// Calculates accurate read time (~200 words/min).
export const getAccurateReadTime = (blog) => {
  if (
    blog?.readTime &&
    blog.readTime.trim() !== "" &&
    blog.readTime !== "3 min read"
  ) {
    return blog.readTime;
  }
  const content = blog?.content || "";
  const cleanText = content
    .replace(/<[^>]*>/g, " ")
    .replace(/[#*`_~>-]/g, "")
    .trim();
  const wordCount = cleanText
    ? cleanText.split(/\s+/).filter(Boolean).length
    : 0;
  const minutes = Math.max(1, Math.ceil(wordCount / 200));
  return `${minutes} min read`;
};
