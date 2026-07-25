import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { blogsSelector, fetchBlogsAsync } from '../../Redux/reducers/blogsReducer';
import { usersSelector } from '../../Redux/reducers/usersReducer';
import { FeaturedHeroSkeleton, BlogCardSkeleton } from '../common/Skeleton';
import {
  CATEGORIES,
  getBlogCoverImage,
  getFormattedCategory,
  getAuthorName,
  getAccurateReadTime,
} from '../../utils/blogHelpers';

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
            <FeaturedHeroSkeleton />
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
