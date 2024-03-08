import React from 'react';
import { useDispatch } from 'react-redux';

const PostDetail = (blog) => {
    const dispatch = useDispatch();

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mt-8 mb-4">{blog.title}</h1>
            <p className="text-gray-600">{blog.content}</p>
        </div>
    );
}

export default PostDetail;
