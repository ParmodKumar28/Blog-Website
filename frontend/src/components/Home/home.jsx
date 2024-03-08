import React, { useEffect } from 'react';
import { blogsSelector, fetchBlogsAsync } from '../../Redux/reducers/blogsReducer';
import { useDispatch, useSelector } from 'react-redux';
import PostDetail from '../Post/post';
import { Audio } from 'react-loader-spinner';

const Home = () => {
    const dispatch = useDispatch();
    const { blogs, isLoading } = useSelector(blogsSelector);

    useEffect(() => {
        // Dispatching action to fetch all blog's here
        dispatch(fetchBlogsAsync());
    }, [dispatch]);

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mt-8 mb-4">All Blog Posts</h1>
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
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {blogs.map((blog, i) => (
                                <PostDetail key={i} blog={blog} />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Home;
