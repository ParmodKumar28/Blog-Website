// Sign up component
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { signUpAsync } from '../../Redux/reducers/usersReducer';

const Signup = () => {
    // Dispatcher's and states
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Signup button handler
    const handleSignup = (e) => {
        e.preventDefault();
        dispatch(signUpAsync({ email, username, password }));
        setEmail("");
        setPassword("");
        setUsername("");
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                <form onSubmit={handleSignup} className="space-y-4">
                    <h2 className="text-3xl font-bold text-center text-gray-800">Sign Up</h2>
                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email</label>
                        <input type="email" id="email" className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 focus:border-blue-500 focus:outline-none" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="username" className="block text-sm font-semibold text-gray-700">Username</label>
                        <input type="text" id="username" className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 focus:border-blue-500 focus:outline-none" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-semibold text-gray-700">Password</label>
                        <input type="password" id="password" className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 focus:border-blue-500 focus:outline-none" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out">
                        Create Account
                    </button>
                    <p className="text-center text-sm text-gray-600">
                        Already have an account? <Link to="/login" className="text-blue-500 hover:text-blue-600 transition duration-300 ease-in-out">Log in</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Signup;
