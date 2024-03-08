import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { signUpAsync } from '../../Redux/reducers/usersReducer';

const Signup = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = (e) => {
        e.preventDefault();
        dispatch(signUpAsync({ email, username, password }));
        setEmail("");
        setPassword("");
        setUsername("");
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form className="w-full max-w-sm" onSubmit={(e) => handleSignup(e)}>
                <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-semibold mb-1">Email</label>
                    <input type="email" id="email" className="w-full border border-gray-300 rounded px-3 py-2" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-sm font-semibold mb-1">Username</label> {/* Username input field */}
                    <input type="text" id="username" className="w-full border border-gray-300 rounded px-3 py-2" value={username} onChange={(e) => setUsername(e.target.value)} /> {/* Username input field */}
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-semibold mb-1">Password</label>
                    <input type="password" id="password" className="w-full border border-gray-300 rounded px-3 py-2" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Sign Up</button>
                <p className="text-center mt-4">Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link></p>
            </form>
        </div>
    );
};

export default Signup;
