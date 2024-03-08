import React from 'react';
import { Link, Outlet } from 'react-router-dom';

// Navbar
const Navbar = () => {
    return (
        <>
            <nav className="bg-blue-500 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <Link to="/" className="text-white font-semibold text-lg">Blog's</Link>
                    <div>
                        <Link to="/posts/new" className="text-white mr-4">New Post</Link>
                        <Link to="/login" className="text-white">Login</Link>
                    </div>
                </div>
            </nav>

            {/* Displaying children's */}
            <Outlet />
        </>
    );
}

export default Navbar;
