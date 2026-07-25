import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { blogsSelector, fetchBlogsAsync } from '../../Redux/reducers/blogsReducer';
import { usersSelector } from '../../Redux/reducers/usersReducer';
import { useDispatch, useSelector } from 'react-redux';
import { FeaturedHeroSkeleton, BlogCardSkeleton } from '../common/Skeleton';

const CATEGORIES = ["All", "Tech", "Design", "AI", "Tutorials", "Lifestyle"];

const CATEGORY_COVERS = {
  Tech: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800"><defs><linearGradient id="t" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%230f172a"/><stop offset="100%" stop-color="%231e293b"/></linearGradient></defs><rect width="1200" height="800" fill="url(%23t)"/><circle cx="600" cy="400" r="260" fill="none" stroke="%233b82f6" stroke-width="4" opacity="0.4"/><circle cx="600" cy="400" r="160" fill="none" stroke="%2360a5fa" stroke-width="3" opacity="0.6"/><line x1="200" y1="400" x2="1000" y2="400" stroke="%23475569" stroke-width="2" opacity="0.5"/><line x1="600" y1="100" x2="600" y2="700" stroke="%23475569" stroke-width="2" opacity="0.5"/></svg>`,
  
  Design: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800"><rect width="1200" height="800" fill="%231e1e24"/><path d="M0,133 H1200 M0,266 H1200 M0,400 H1200 M0,533 H1200 M0,666 H1200" stroke="%232e2e38" stroke-width="3"/><path d="M200,0 V800 M400,0 V800 M600,0 V800 M800,0 V800 M900,0 V800 M1000,0 V800 M1100,0 V800" stroke="%232e2e38" stroke-width="3"/><rect x="380" y="240" width="440" height="320" rx="16" fill="%232563eb" opacity="0.85"/></svg>`,

  AI: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800"><rect width="1200" height="800" fill="%2309090b"/><circle cx="300" cy="250" r="14" fill="%23a855f7"/><circle cx="600" cy="200" r="18" fill="%23c084fc"/><circle cx="900" cy="250" r="14" fill="%23a855f7"/><circle cx="400" cy="500" r="16" fill="%2338bdf8"/><circle cx="800" cy="500" r="16" fill="%2338bdf8"/><circle cx="600" cy="650" r="14" fill="%23818cf8"/><line x1="300" y1="250" x2="600" y2="200" stroke="%23c084fc" stroke-width="3" opacity="0.6"/><line x1="600" y1="200" x2="900" y2="250" stroke="%23c084fc" stroke-width="3" opacity="0.6"/><line x1="300" y1="250" x2="400" y2="500" stroke="%2338bdf8" stroke-width="3" opacity="0.6"/><line x1="600" y1="200" x2="400" y2="500" stroke="%2338bdf8" stroke-width="3" opacity="0.6"/><line x1="600" y1="200" x2="800" y2="500" stroke="%2338bdf8" stroke-width="3" opacity="0.6"/><line x1="900" y1="250" x2="800" y2="500" stroke="%2338bdf8" stroke-width="3" opacity="0.6"/><line x1="400" y1="500" x2="600" y2="650" stroke="%23818cf8" stroke-width="3" opacity="0.6"/><line x1="800" y1="500" x2="600" y2="650" stroke="%23818cf8" stroke-width="3" opacity="0.6"/><circle cx="600" cy="380" r="40" fill="%23a855f7" opacity="0.3"/><circle cx="600" cy="380" r="20" fill="%23c084fc"/></svg>`,

  Tutorials: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800"><rect width="1200" height="800" fill="%2309090b"/><path d="M360,280 L220,400 L360,520" stroke="%2310b981" stroke-width="16" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M840,280 L980,400 L840,520" stroke="%2310b981" stroke-width="16" fill="none" stroke-linecap="round" stroke-linejoin="round"/><line x1="650" y1="240" x2="550" y2="560" stroke="%2310b981" stroke-width="14" stroke-linecap="round"/></svg>`,

  Lifestyle: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800"><rect width="1200" height="800" fill="%23f4f4f5"/><rect x="250" y="180" width="700" height="440" rx="20" fill="%23ffffff" stroke="%23e4e4e7" stroke-width="6"/><line x1="250" y1="540" x2="950" y2="540" stroke="%23e4e4e7" stroke-width="4"/><circle cx="600" cy="360" r="48" fill="%2318181b"/></svg>`,

  General: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800"><rect width="1200" height="800" fill="%23fafafa"/><circle cx="600" cy="400" r="200" fill="%2318181b"/><circle cx="600" cy="400" r="130" fill="%23ffffff"/></svg>`
};

const DEFAULT_COVERS_ARRAY = Object.values(CATEGORY_COVERS);

export const getBlogCoverImage = (blog, index = 0) => {
  // 1. If explicit valid image URL exists on blog, use it!
  if (blog?.imageUrl && typeof blog.imageUrl === 'string' && blog.imageUrl.trim() !== "") {
    return blog.imageUrl.trim();
  }

  // 2. Case-insensitive category matching
  const cat = blog?.category?.trim();
  if (cat) {
    const matchedKey = Object.keys(CATEGORY_COVERS).find(
      (k) => k.toLowerCase() === cat.toLowerCase()
    );
    if (matchedKey && CATEGORY_COVERS[matchedKey]) {
      return CATEGORY_COVERS[matchedKey];
    }
  }

  // 3. Fallback deterministic hash
  const str = blog?._id || blog?.title || `${index}`;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
  }
  const pos = Math.abs(hash) % DEFAULT_COVERS_ARRAY.length;
  return DEFAULT_COVERS_ARRAY[pos];
};

export const getFormattedCategory = (cat) => {
  if (!cat || typeof cat !== 'string' || cat.trim() === "") return "General";
  const trimmed = cat.trim();
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
};

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

export const getAuthorName = (blog, signedUser = null) => {
  if (blog?.user?.username) {
    return blog.user.username;
  }
  if (typeof blog?.user === 'string' && signedUser && (blog.user === signedUser._id || blog.user === signedUser.id)) {
    return signedUser.username;
  }
  return 'DevBlog Author';
};

export const getAccurateReadTime = (blog) => {
  if (blog?.readTime && blog.readTime.trim() !== "" && blog.readTime !== "3 min read") {
    return blog.readTime;
  }
  const content = blog?.content || "";
  const cleanText = content.replace(/<[^>]*>/g, ' ').replace(/[#*`_~>-]/g, '').trim();
  const wordCount = cleanText ? cleanText.split(/\s+/).filter(Boolean).length : 0;
  const minutes = Math.max(1, Math.ceil(wordCount / 200));
  return `${minutes} min read`;
};

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { blogs, isLoading } = useSelector(blogsSelector);
  const { signedUser } = useSelector(usersSelector);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    dispatch(fetchBlogsAsync());
  }, [dispatch]);

  const filteredBlogs = selectedCategory === "All"
    ? blogs
    : blogs.filter((b) => b.category?.toLowerCase() === selectedCategory.toLowerCase());

  // Separate top featured article from rest of list
  const featuredBlog = filteredBlogs.length > 0 ? filteredBlogs[0] : null;
  const secondaryBlogs = filteredBlogs.length > 1 ? filteredBlogs.slice(1) : (selectedCategory !== "All" ? filteredBlogs : []);

  return (
    <div className="min-h-screen bg-zinc-50/50 pb-20">
      {/* Editorial Header Section */}
      <section className="border-b border-zinc-200 bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">
              The Developer Journal
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 font-serif-editorial leading-tight">
              Engineering, Design & Thoughtful Perspectives
            </h1>
            <p className="text-zinc-500 text-base sm:text-lg font-normal leading-relaxed">
              Curated articles, practical tutorials, and insights written by builders and engineers.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-6 border-b border-zinc-200 mt-10 overflow-x-auto no-scrollbar pt-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`pb-3 text-sm font-semibold transition border-b-2 whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'border-zinc-900 text-zinc-900'
                    : 'border-transparent text-zinc-500 hover:text-zinc-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Area with Skeleton Loading State */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {isLoading ? (
          <div className="space-y-12">
            {/* Featured Spotlight Skeleton */}
            <FeaturedHeroSkeleton />

            {/* Grid Skeletons */}
            <div className="space-y-6">
              <div className="w-36 h-6 bg-zinc-200/80 rounded-md border-b border-zinc-200 pb-2 animate-pulse" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <BlogCardSkeleton key={num} />
                ))}
              </div>
            </div>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-zinc-200 p-8">
            <h3 className="text-xl font-bold text-zinc-800 mb-1 font-serif-editorial">No Stories Published</h3>
            <p className="text-zinc-500 text-sm max-w-sm mx-auto mb-6">
              No articles are available in the <span className="font-semibold text-zinc-700">{selectedCategory}</span> topic yet.
            </p>
            <Link
              to="/posts/new"
              className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900 text-white text-xs font-semibold rounded-lg hover:bg-zinc-800 transition"
            >
              Write First Story
            </Link>
          </div>
        ) : (
          <div className="space-y-12">

            {/* Featured Hero Story */}
            {featuredBlog && (
              <article
                onClick={() => navigate(`/posts/${featuredBlog._id}`)}
                className="bg-white rounded-2xl border border-zinc-200/80 overflow-hidden shadow-xs hover:border-zinc-400 hover:shadow-md transition duration-200 group cursor-pointer"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
                  <div className="md:col-span-7 aspect-[16/10] md:aspect-auto overflow-hidden bg-zinc-100">
                    <img
                      src={getBlogCoverImage(featuredBlog, 0)}
                      alt={featuredBlog.title}
                      className="w-full h-full object-cover group-hover:scale-102 transition duration-500"
                    />
                  </div>
                  <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="tag-pill">
                          {getFormattedCategory(featuredBlog.category)}
                        </span>
                        <span className="text-xs text-zinc-400 font-medium">
                          {getAccurateReadTime(featuredBlog)}
                        </span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 font-serif-editorial leading-tight group-hover:text-blue-600 transition">
                        {featuredBlog.title}
                      </h2>
                      <p className="text-zinc-600 text-sm leading-relaxed line-clamp-3 font-normal">
                        {featuredBlog.subtitle || (featuredBlog.content ? featuredBlog.content.replace(/<[^>]*>/g, '').substring(0, 140) + '...' : '')}
                      </p>
                    </div>

                    <div className="pt-6 border-t border-zinc-100 flex items-center justify-between mt-6">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-zinc-900 text-white font-bold flex items-center justify-center text-xs">
                          {getAuthorName(featuredBlog, signedUser).charAt(0).toUpperCase()}
                        </div>
                        <span className="text-xs font-semibold text-zinc-800">
                          {getAuthorName(featuredBlog, signedUser)}
                        </span>
                      </div>
                      <span className="text-xs font-semibold text-zinc-900 group-hover:translate-x-1 transition flex items-center gap-1">
                        Read Article <span>→</span>
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            )}

            {/* Secondary Articles Grid */}
            {secondaryBlogs.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-zinc-900 font-serif-editorial border-b border-zinc-200 pb-3">
                  {selectedCategory === 'All' ? 'More Stories' : `${selectedCategory} Articles`}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {secondaryBlogs.map((blog, idx) => {
                    const coverImg = getBlogCoverImage(blog, idx + 1);
                    const authorName = getAuthorName(blog, signedUser);
                    const readTime = getAccurateReadTime(blog);
                    const formattedCat = getFormattedCategory(blog.category);

                    return (
                      <article
                        key={blog._id}
                        onClick={() => navigate(`/posts/${blog._id}`)}
                        className="editorial-card rounded-xl overflow-hidden flex flex-col justify-between group cursor-pointer hover:border-zinc-400 hover:shadow-md transition duration-200"
                      >
                        <div>
                          <div className="aspect-[16/9] overflow-hidden bg-zinc-100 relative">
                            <img
                              src={coverImg}
                              alt={blog.title}
                              className="w-full h-full object-cover group-hover:scale-103 transition duration-300"
                            />
                            <div className="absolute top-3 left-3">
                              <span className="tag-pill bg-white/90 backdrop-blur-xs border-zinc-200">
                                {formattedCat}
                              </span>
                            </div>
                          </div>

                          <div className="p-5">
                            <h4 className="text-lg font-bold text-zinc-900 font-serif-editorial leading-snug line-clamp-2 mb-2 group-hover:text-blue-600 transition">
                              {blog.title}
                            </h4>
                            <p className="text-zinc-600 text-xs leading-relaxed line-clamp-2">
                              {blog.subtitle || (blog.content ? blog.content.replace(/<[^>]*>/g, '').substring(0, 100) + '...' : '')}
                            </p>
                          </div>
                        </div>

                        <div className="px-5 pb-4 pt-0 flex items-center justify-between border-t border-zinc-100 mt-auto pt-3">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-zinc-200 text-zinc-800 font-bold flex items-center justify-center text-[10px]">
                              {authorName.charAt(0).toUpperCase()}
                            </div>
                            <span className="text-[11px] font-semibold text-zinc-700">{authorName}</span>
                          </div>
                          <span className="text-[11px] text-zinc-400 font-medium">
                            {readTime}
                          </span>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            )}

          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
