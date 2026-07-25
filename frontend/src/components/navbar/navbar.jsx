import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { usersSelector, logoutAsync } from '../../Redux/reducers/usersReducer';

// Navbar
const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isSignIn } = useSelector(usersSelector);

    const handleLogout = async () => {
        await dispatch(logoutAsync());
        navigate('/login');
    };

    return (
        <>
            <nav className="bg-blue-500 p-4 px-10">
                <div className="container mx-auto flex justify-between items-center">
                    <Link to="/" className="text-white font-semibold text-lg">Blog's</Link>
                    <div className="flex items-center">
                        <Link to="/posts/new" className="text-white mr-4">New Post</Link>
                        {isSignIn ? (
                            <button
                                onClick={handleLogout}
                                className="text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded transition duration-200"
                            >
                                Logout
                            </button>
                        ) : (
                            <Link to="/login" className="text-white">Login</Link>
                        )}
                    </div>
                </div>
            </nav>

            {/* Displaying children's */}
            <Outlet />
        </>
    );
};

export default Navbar;
