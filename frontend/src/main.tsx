import React from 'react'
import { RecoilRoot } from 'recoil';
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Root from './components/features/root/Root';
import ErrorPage from './components/errorPage/ErrorPage';
import Home from './components/features/home/Home'
import Login from './components/features/login/Login'
import Profile from './components/features/profile/Profile';
import Register from './components/features/login/Register'
import { FlashMessageProvider } from './contexts/FlashMessageContext'; // Adjust the path as needed

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
                path: "profile",
                element: <Profile />
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
        <RecoilRoot>
            <FlashMessageProvider>
                <RouterProvider router={router} />
            </FlashMessageProvider>
        </RecoilRoot>
    </React.StrictMode>
);

