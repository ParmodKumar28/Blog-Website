import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchBlogByIdAsync, deleteBlogAsync, blogsSelector } from '../../Redux/reducers/blogsReducer';

// Blog detail page componenet here
const BlogDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { blog } = useSelector(blogsSelector);
    const navigate = useNavigate();

    useEffect(() => {
        // Dispatching action to fetch the blog by ID
        dispatch(fetchBlogByIdAsync(id));
    }, [dispatch, id]);

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this blog?')) {
            dispatch(deleteBlogAsync(id));
            navigate("/");
        }
    };

    if (!blog) {
        return <p className="text-center mt-8">Loading...</p>;
    }

    return (
        <div className="container mx-auto p-4">
            <div className="bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg shadow-lg overflow-hidden">
                <div className="p-6 md:p-8">
                    <h1 className="text-4xl font-serif font-bold mb-4 text-white">{blog.title}</h1>
                    <p className="text-gray-200 text-lg">{blog.content}</p>
                    <button className="transition duration-300 ease-in-out transform hover:-translate-y-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 mt-4 rounded-md" onClick={handleDelete}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default BlogDetail;
