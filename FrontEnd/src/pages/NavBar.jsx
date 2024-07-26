import React from 'react'
import { useDispatch } from 'react-redux'
import { appLogOut } from '../store/slices/authSlice';
import { Link } from 'react-router-dom';
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
        <Link to="/" className="navbar-link">Home</Link>
        <Link to="/about-us" className="navbar-link">About Us</Link>
        <Link to="/contact-us" className="navbar-link">Contact Us</Link>
        <button onClick={handleLogout} className="navbar-btn">Logout</button>
      </div>
    </nav>
    
    </>
  )
}

export default NavBar