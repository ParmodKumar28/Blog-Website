import React, { useState } from 'react';
import { createBlogAsync, updateBlogAsync } from '../../Redux/reducers/blogsReducer';
import { useDispatch } from 'react-redux';

const PostForm = () => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const blogData = { title, content };
        dispatch(createBlogAsync(blogData));
        setTitle("");
        setContent("");
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
