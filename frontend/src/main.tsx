import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Root from './components/features/root/Root';
import ErrorPage from './components/ErrorPage'
import Home from './components/features/home/Home'
import Login from './components/features/login/Login'
import Register from './components/features/login/Register'
import { ErrorProvider } from './contexts/ErrorContext'; // Adjust the path as needed

import './globalStyles/index.scss'
import "./globalStyles/formElements.scss"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                // Redirect to /home when visiting the root.
                path: "/",
                element: <Navigate to="home" replace />,
            },
            {
                path: "home",
                element: <Home />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "register",
                element: <Register />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ErrorProvider>
            <RouterProvider router={router} />
        </ErrorProvider>
    </React.StrictMode>
);

