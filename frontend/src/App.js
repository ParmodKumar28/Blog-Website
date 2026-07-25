import React, { useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import store from "./Redux/store";
import Navbar from "./components/navbar/navbar";
import ProtectedRoute from "./components/Protected Routes/ProtectedRoute";
import { fetchCurrentUserAsync } from "./Redux/reducers/usersReducer";

// Route component imports
import Home from "./components/Home/home";
import Login from "./components/login/login";
import Signup from "./components/sign-up/signup";
import PostForm from "./components/Post Form/postForm";
import PostDetail from "./components/Post/post";
import Profile from "./components/profile/profile";
import Page404 from "./components/Page 404/Page404";

// Router configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    errorElement: <Page404 />,
    children: [
      { index: true, element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      {
        path: "/posts/new",
        element: <ProtectedRoute><PostForm /></ProtectedRoute>,
      },
      {
        path: "/posts/:id/edit",
        element: <ProtectedRoute><PostForm /></ProtectedRoute>,
      },
      { path: "/posts/:id", element: <PostDetail /> },
      {
        path: "/profile",
        element: <ProtectedRoute><Profile /></ProtectedRoute>,
      },
    ],
  },
]);

// Inner component that has access to Redux dispatch
const AppContent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // On every app load, silently call /me to restore session from httpOnly cookie.
    // This is the industry-standard approach — no localStorage needed.
    dispatch(fetchCurrentUserAsync());
  }, [dispatch]);

  return <RouterProvider router={router} />;
};

const App = () => {
  return (
    <Provider store={store}>
      <AppContent />
      <ToastContainer position="bottom-right" autoClose={3000} />
    </Provider>
  );
};

export default App;
