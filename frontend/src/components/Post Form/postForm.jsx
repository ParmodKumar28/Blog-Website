import React, { useState } from 'react';
import { createBlogAsync } from '../../Redux/reducers/blogsReducer';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// Post form component
const PostForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    // Submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(createBlogAsync({ title, content })).unwrap();
            setTitle("");
            setContent("");
            navigate("/");
        } catch (err) {
            // Error notification is handled in thunk
        }
    };

    return (
        <form onSubmit={(e) => handleSubmit(e)} className="container mx-auto w-96 border-2 p-5 mt-10">
            <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-semibold text-gray-600">Title</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border border-gray-300 rounded p-2 w-full"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="content" className="block text-sm font-semibold text-gray-600">Content</label>
                <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="border border-gray-300 rounded p-2 w-full"
                    rows="6"
                ></textarea>
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
        </form>
    );
}

export default PostForm;
