import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { blogsSelector, fetchBlogsAsync, deleteBlogAsync } from '../../Redux/reducers/blogsReducer';
import { usersSelector } from '../../Redux/reducers/usersReducer';
import ConfirmModal from '../common/ConfirmModal';
import { ProfileSkeleton } from '../common/Skeleton';
import AuthorProfileCard from './AuthorProfileCard';
import UserStoryCard from './UserStoryCard';
import { toast } from 'react-toastify';
import { PenSquare } from 'lucide-react';

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

  return (
    <div className="min-h-screen bg-zinc-50/50 py-10 px-4 sm:px-6 lg:px-8 pb-20">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Author Profile Header Card */}
        <AuthorProfileCard
          username={username}
          email={email}
          storyCount={userBlogs.length}
        />

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
              {userBlogs.map((blog, idx) => (
                <UserStoryCard
                  key={blog._id}
                  blog={blog}
                  index={idx}
                  onDeleteClick={setDeleteTargetId}
                />
              ))}
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
