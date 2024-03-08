import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Home from "./components/Home/home";
import PostForm from "./components/Post Form/postForm";
import Login from "./components/login/login";
import PostDetail from "./components/Post/post";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "./Redux/store";
import Page404 from "./components/Page 404/Page404";
import Signup from "./components/sign-up/signup";

const App = () => {
  // Creating router
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      errorElement: <Page404 />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/posts/new",
          element: <PostForm />,
        },
        {
          path: "/signup",
          element: <Signup />,
        },
      ],
    },
  ]);
  return (
    <>
      {/* Providing store to all routes */}
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
      {/* Notification container */}
      <ToastContainer />
    </>
  );
};

export default App;
