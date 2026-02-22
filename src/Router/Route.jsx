import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Chatbot from '../components/Chatbot';
import DrProfile from '../components/DrProfile';
import Home from '../components/Home';
import Layout from '../components/Layout';
import Login from '../components/Login';
import RecentBlog from '../components/RecentBlog';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout></Layout>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: 'recent-blog',
        element: <RecentBlog></RecentBlog>,
      },
      {
        path: 'chatbot',
        element: <Chatbot></Chatbot>,
      },
      {
        path: 'dr-profile/:profileId',
        element: <DrProfile></DrProfile>,
      },
      {
        path: 'login',
        element: <Login></Login>,
      },
    ],
  },
]);

export default router;
