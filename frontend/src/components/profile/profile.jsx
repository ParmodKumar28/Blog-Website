import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { blogsSelector, fetchBlogsAsync, deleteBlogAsync } from '../../Redux/reducers/blogsReducer';
import { usersSelector } from '../../Redux/reducers/usersReducer';
import ConfirmModal from '../common/ConfirmModal';
import { ProfileSkeleton } from '../common/Skeleton';
import {
  getBlogCoverImage,
  getAccurateReadTime,
  getFormattedCategory,
  getFormattedDate,
} from '../../utils/blogHelpers';
import { toast } from 'react-toastify';
import { Mail, BookOpen, Clock, Trash2, ArrowRight, PenSquare, Edit3 } from 'lucide-react';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { blogs, isLoading } = useSelector(blogsSelector);
  const { signedUser, isSignIn } = useSelector(usersSelector);

  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    dispatch(fetchBlogsAsync());
  }, [dispatch]);

  // Redirect to login if user is not signed in
  useEffect(() => {
    if (!isSignIn && !signedUser) {
      navigate('/login');
    }
  }, [isSignIn, signedUser, navigate]);

  if (!isSignIn || !signedUser) {
    return null;
  }

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  // Filter blogs created by current author
  const userBlogs = blogs.filter((b) => {
    const blogUserId = b.user?._id || b.user;
    const currentUserId = signedUser._id;
    const matchesId = blogUserId && currentUserId && blogUserId.toString() === currentUserId.toString();
    const matchesUsername = b.user?.username && signedUser.username && b.user.username.toLowerCase() === signedUser.username.toLowerCase();
    return matchesId || matchesUsername;
  });

  const handleDeleteConfirm = async () => {
    if (!deleteTargetId) return;
    setIsDeleting(true);
    try {
      await dispatch(deleteBlogAsync(deleteTargetId)).unwrap();
      setDeleteTargetId(null);
    } catch (err) {
      toast.error(typeof err === 'string' ? err : 'Failed to delete story');
    } finally {
      setIsDeleting(false);
    }
  };

  const username = signedUser.username || 'Author';
  const email = signedUser.email || 'author@example.com';
  const initial = username.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-zinc-50/50 py-10 px-4 sm:px-6 lg:px-8 pb-20">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Author Header Card */}
        <div className="bg-white rounded-2xl border border-zinc-200 p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            
            {/* Avatar Circle */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-zinc-900 text-white font-bold flex items-center justify-center text-3xl sm:text-4xl shadow-md border-4 border-white flex-shrink-0">
              {initial}
            </div>

            {/* Profile Information */}
            <div className="space-y-3 text-center sm:text-left flex-1">
              <div>
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest border border-zinc-200 rounded px-2 py-0.5 bg-zinc-50">
                  Verified Author
                </span>
                <h1 className="text-2xl sm:text-3xl font-bold font-serif-editorial text-zinc-900 mt-1">
                  {username}
                </h1>
              </div>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-zinc-600">
                <span className="flex items-center gap-1.5 font-medium">
                  <Mail className="w-3.5 h-3.5 text-zinc-400" />
                  {email}
                </span>
                <span className="text-zinc-300">•</span>
                <span className="flex items-center gap-1.5 font-medium">
                  <BookOpen className="w-3.5 h-3.5 text-zinc-400" />
                  {userBlogs.length} {userBlogs.length === 1 ? 'Published Story' : 'Published Stories'}
                </span>
              </div>
            </div>

            {/* Write New Story Action */}
            <Link
              to="/posts/new"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-zinc-900 text-white text-xs font-semibold rounded-lg hover:bg-zinc-800 transition shadow-xs self-center sm:self-start"
            >
              <PenSquare className="w-3.5 h-3.5" />
              <span>Write Story</span>
            </Link>

          </div>
        </div>

        {/* My Published Stories Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
            <h2 className="text-xl font-bold font-serif-editorial text-zinc-900">
              My Published Stories ({userBlogs.length})
            </h2>
          </div>

          {userBlogs.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-zinc-200 p-8 space-y-3">
              <div className="w-12 h-12 rounded-full bg-zinc-100 text-zinc-400 flex items-center justify-center mx-auto text-xl">
                ✍️
              </div>
              <h3 className="text-lg font-bold text-zinc-800 font-serif-editorial">
                No Stories Published Yet
              </h3>
              <p className="text-zinc-500 text-xs max-w-sm mx-auto">
                Share your ideas, tutorials, and engineering perspectives with the community.
              </p>
              <Link
                to="/posts/new"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-zinc-900 text-white text-xs font-semibold rounded-lg hover:bg-zinc-800 transition mt-2"
              >
                <PenSquare className="w-3.5 h-3.5" />
                <span>Write Your First Story</span>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {userBlogs.map((blog, idx) => {
                const coverImg = getBlogCoverImage(blog, idx);
                const readTime = getAccurateReadTime(blog);
                const formattedCat = getFormattedCategory(blog.category);
                const formattedDate = getFormattedDate(blog.createdAt);

                return (
                  <div
                    key={blog._id}
                    className="bg-white rounded-xl border border-zinc-200 overflow-hidden shadow-xs hover:border-zinc-300 transition flex flex-col sm:flex-row items-stretch"
                  >
                    {/* Story Cover Thumbnail */}
                    <div className="sm:w-48 aspect-[16/9] sm:aspect-auto overflow-hidden bg-zinc-100 flex-shrink-0 relative">
                      <img
                        src={coverImg}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 left-2">
                        <span className="tag-pill bg-white/90 backdrop-blur-xs text-[10px]">
                          {formattedCat}
                        </span>
                      </div>
                    </div>

                    {/* Story Content Info */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <div className="flex items-center gap-2 text-[11px] text-zinc-400 mb-1">
                          <span>{formattedDate}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-zinc-400" />
                            {readTime}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold font-serif-editorial text-zinc-900 leading-snug hover:text-blue-600 transition">
                          <Link to={`/posts/${blog._id}`}>{blog.title}</Link>
                        </h3>
                        {blog.subtitle && (
                          <p className="text-xs text-zinc-500 font-serif-editorial italic mt-1 line-clamp-2">
                            {blog.subtitle}
                          </p>
                        )}
                      </div>

                      {/* Card Action Controls */}
                      <div className="pt-3 border-t border-zinc-100 flex items-center justify-between">
                        <Link
                          to={`/posts/${blog._id}`}
                          className="text-xs font-semibold text-zinc-900 hover:underline flex items-center gap-1"
                        >
                          <span>Read Story</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>

                        <div className="flex items-center gap-2">
                          <Link
                            to={`/posts/${blog._id}/edit`}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-700 hover:text-zinc-900 transition px-2.5 py-1 rounded hover:bg-zinc-100 border border-zinc-200"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </Link>

                          <button
                            type="button"
                            onClick={() => setDeleteTargetId(blog._id)}
                            className="inline-flex items-center gap-1 text-xs font-medium text-rose-600 hover:text-rose-800 transition px-2.5 py-1 rounded hover:bg-rose-50 border border-transparent hover:border-rose-200"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(deleteTargetId)}
        title="Delete Story"
        message="Are you sure you want to permanently delete this story from your profile? This action cannot be undone."
        confirmText="Delete Story"
        cancelText="Cancel"
        isLoading={isDeleting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
};

export default Profile;
