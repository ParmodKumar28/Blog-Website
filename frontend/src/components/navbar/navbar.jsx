import React from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { usersSelector, logoutAsync } from '../../Redux/reducers/usersReducer';
import { PenSquare, LogOut, LogIn, BookOpen, User } from 'lucide-react';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isSignIn, signedUser } = useSelector(usersSelector);

  const handleLogout = async () => {
    await dispatch(logoutAsync());
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200/80 transition-all">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Brand Identity */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-8 h-8 rounded-lg bg-zinc-900 text-white flex items-center justify-center font-bold text-xs shadow-xs group-hover:bg-zinc-800 transition duration-200">
                <BookOpen className="w-4 h-4" />
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-bold tracking-tight text-zinc-900 font-serif-editorial">
                  DevBlog
                </span>
                <span className="hidden sm:inline-block text-[10px] font-bold text-zinc-400 uppercase tracking-widest border border-zinc-200 rounded px-1.5 py-0.2 bg-zinc-50">
                  Journal
                </span>
              </div>
            </Link>

            {/* Navigation Controls */}
            <div className="flex items-center gap-3 sm:gap-4">
              <Link
                to="/"
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                  isActive('/')
                    ? 'bg-zinc-100 text-zinc-900'
                    : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50'
                }`}
              >
                Articles
              </Link>

              <Link
                to="/posts/new"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-zinc-900 text-white text-xs font-semibold rounded-lg hover:bg-zinc-800 transition shadow-xs"
              >
                <PenSquare className="w-3.5 h-3.5" />
                <span>Write Article</span>
              </Link>

              {isSignIn ? (
                <div className="flex items-center gap-2.5 pl-3 border-l border-zinc-200">
                  {/* Clickable Profile Badge */}
                  <Link
                    to="/profile"
                    className={`flex items-center gap-2 px-2.5 py-1 rounded-lg border transition ${
                      isActive('/profile')
                        ? 'bg-zinc-900 text-white border-zinc-900 shadow-xs'
                        : 'bg-zinc-50 text-zinc-800 border-zinc-200/80 hover:bg-zinc-100'
                    }`}
                    title="View Profile & Dashboard"
                  >
                    <div className={`w-5 h-5 rounded-full font-bold flex items-center justify-center text-[10px] ${
                      isActive('/profile') ? 'bg-white text-zinc-900' : 'bg-zinc-900 text-white'
                    }`}>
                      {signedUser?.username ? signedUser.username.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <span className="hidden sm:inline text-xs font-semibold">
                      {signedUser?.username || 'Author'}
                    </span>
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="inline-flex items-center gap-1 text-xs font-medium text-zinc-500 hover:text-rose-600 px-2 py-1 rounded hover:bg-rose-50 transition"
                    title="Sign Out"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 border border-zinc-300 rounded-lg text-zinc-700 hover:bg-zinc-50 transition"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                </Link>
              )}
            </div>

          </div>
        </div>
      </header>

      {/* Main Page Slot */}
      <Outlet />
    </>
  );
};

export default Navbar;
