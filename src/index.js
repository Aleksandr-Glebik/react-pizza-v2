import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'

import App from './App'
import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';

import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";

const router = createBrowserRouter([
{
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
        {
            path: "/",
            element: <Home />
        },
        {
            path: '/cart',
            element: <Cart />
        },
        {
            path: "*",
            element: <NotFound />
        }
    ]
},
]);

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<RouterProvider router={router} />)