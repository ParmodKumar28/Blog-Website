import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginAsync } from '../../Redux/reducers/usersReducer';

// Login form
const Login = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Handle login
    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(loginAsync({ email, password }));
        setEmail("");
        setPassword("");
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form className="w-full max-w-sm" onSubmit={(e) => handleLogin(e)}>
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-semibold mb-1">Email</label>
                    <input type="email" id="email" className="w-full border border-gray-300 rounded px-3 py-2" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-semibold mb-1">Password</label>
                    <input type="password" id="password" className="w-full border border-gray-300 rounded px-3 py-2" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Login</button>
                <p className="text-center mt-4">Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline">Sign up</Link></p>
            </form>
        </div>
    );
};

export default Login;
