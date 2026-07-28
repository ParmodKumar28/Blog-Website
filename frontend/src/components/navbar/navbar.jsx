import React from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { usersSelector, logoutAsync } from '../../Redux/reducers/usersReducer';
import { PenSquare, LogOut, LogIn } from 'lucide-react';

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
              <div className="relative w-9 h-9 rounded-xl bg-zinc-900 text-white flex items-center justify-center font-bold shadow-md group-hover:bg-zinc-800 transition duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-zinc-950 via-zinc-900 to-zinc-800" />
                <span className="relative z-10 font-serif-editorial text-white text-lg tracking-tighter">B</span>
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-blue-500 rounded-tl-md" />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-lg font-extrabold tracking-tight text-zinc-900 font-serif-editorial leading-none">
                  Blogverse
                </span>
                <span className="hidden sm:block text-[9px] font-bold text-zinc-400 uppercase tracking-widest mt-0.5 leading-none">
                  Your Universe of Ideas
                </span>
              </div>
            </Link>

            {/* Navigation Controls */}
            <div className="flex items-center gap-1.5 sm:gap-4">
              <Link
                to="/"
                className={`px-2 py-1.5 sm:px-3 text-xs font-semibold rounded-lg transition ${
                  isActive('/')
                    ? 'bg-zinc-100 text-zinc-900'
                    : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50'
                }`}
              >
                Articles
              </Link>

              <Link
                to="/posts/new"
                className="inline-flex items-center gap-1.5 p-2 sm:px-3.5 sm:py-1.5 bg-zinc-900 text-white text-xs font-semibold rounded-lg hover:bg-zinc-800 transition shadow-xs"
                title="Write Article"
              >
                <PenSquare className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Write Article</span>
              </Link>

              {isSignIn ? (
                <div className="flex items-center gap-1.5 sm:gap-2.5 pl-1.5 sm:pl-3 border-l border-zinc-200">
                  {/* Clickable Profile Badge */}
                  <Link
                    to="/profile"
                    className={`flex items-center gap-1.5 sm:gap-2 px-1.5 py-1 sm:px-2.5 rounded-lg border transition ${
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
                    className="inline-flex items-center gap-1 text-xs font-medium text-zinc-500 hover:text-rose-600 p-1.5 sm:px-2 sm:py-1 rounded hover:bg-rose-50 transition"
                    title="Sign Out"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 sm:px-3.5 border border-zinc-300 rounded-lg text-zinc-700 hover:bg-zinc-50 transition"
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
