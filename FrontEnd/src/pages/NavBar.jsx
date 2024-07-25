import React from 'react'
import { useDispatch } from 'react-redux'
import { appLogOut } from '../store/slices/authSlice';
import "./CSS/NavBar.css";

const NavBar=()=> {

    const dispatch= useDispatch();

    const handleLogout=()=>{

        dispatch(appLogOut())

    }
  return (
    <>
    
    {/* <button onClick={handleLogout}>Logout</button> */}
    <nav className="navbar-container">
      <div className="navbar-logo">
        Cloud-Home
      </div>
      <div className="navbar-links">
        <a href="#home" className="navbar-link">Home</a>
        <a href="#about-us" className="navbar-link">About Us</a>
        <a href="#contact-us" className="navbar-link">Contact Us</a>
        <button onClick={handleLogout} className="navbar-btn">Logout</button>
      </div>
    </nav>
    
    </>
  )
}

export default NavBar