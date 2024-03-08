import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { blogsSelector, fetchBlogsAsync } from '../../Redux/reducers/blogsReducer';
import { useDispatch, useSelector } from 'react-redux';
import { Audio } from 'react-loader-spinner';

// Home page componenet here
const Home = () => {
    const dispatch = useDispatch();
    const { blogs, isLoading } = useSelector(blogsSelector);

    useEffect(() => {
        // Dispatching action to fetch all blogs here
        dispatch(fetchBlogsAsync());
    }, [dispatch]);

    return (
        <div className="container mx-auto">
            {isLoading ? (
                <Audio
                    height="80"
                    width="80"
                    radius="9"
                    color="green"
                    ariaLabel="loading"
                    wrapperStyle
                    wrapperClass
                /> // Show loader while fetching data
            ) : (
                <div>
                    {blogs.length === 0 ? (
                        <p>No blogs found.</p> // Show message if no blogs are available
                    ) : (
                        <>
                            <h1 className="text-3xl font-bold mt-8 mb-4 text-center">All Blog Posts</h1>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-5">
                                {blogs.map((blog, index) => (
                                    <div key={index} className="bg-white shadow-md p-4 mb-4">
                                        <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                                        <p className="text-gray-600">{blog.content.substring(0, 100)}</p>
                                        <Link to={`/posts/${blog._id}`} className="text-blue-500 mt-2 block">Read more</Link>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

export default Home;
