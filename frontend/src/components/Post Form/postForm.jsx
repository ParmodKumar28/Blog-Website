import React, { useState } from 'react';
import { createBlogAsync, updateBlogAsync } from '../../Redux/reducers/blogsReducer';
import { useDispatch } from 'react-redux';

const PostForm = ({ onSubmit, initialValues }) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState(initialValues.title || '');
    const [content, setContent] = useState(initialValues.content || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        const blogData = { title, content };
        if (initialValues._id) {
            dispatch(updateBlogAsync({ blogId: initialValues._id, blogData }));
        } else {
            dispatch(createBlogAsync(blogData));
        }
    };

    return (
        <form onSubmit={(e) => handleSubmit(e)} className="container mx-auto">
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
