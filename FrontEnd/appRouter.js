import React from "react";
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Login from "./src/pages/Login";
import SignUp from "./src/pages/SignUp";
import Homepage from "./src/pages/Homepage";
import { useSelector } from "react-redux";
import OtpPage from "./src/pages/OtpPage";


const AppRouter=()=>{

     const {isAuthorized,isEmailVerifed}= useSelector((e)=>e.auth); //accessing value of auth from app store
//    const isAuthorized=true
//    const isEmailVerifed=true

    const router=createBrowserRouter([
        {
            path:'/',
            element: isAuthorized ? <>{isEmailVerifed ? <Homepage />:<Navigate to="/otp" />} </>:<Navigate to="/signup" />

        },
        {
            path:"/login",
            element:isAuthorized && isEmailVerifed? <Navigate to="/" /> : <Login />
        },
        {
            path:"/signup",
            element: isAuthorized ? <Navigate to="/" /> :<SignUp />
        },{
            path:"/otp",
            element:isAuthorized && !isEmailVerifed ?<OtpPage /> : <Navigate to="/" />
        }
    ])


    return(
        <>
        
        <RouterProvider router={router} />
       
        
        </>
    )
}

export default AppRouter;
