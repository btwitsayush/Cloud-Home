import React from 'react'
import { useDispatch } from 'react-redux'
import { appLogOut } from '../store/slices/authSlice';

const NavBar=()=> {

    const dispatch= useDispatch();

    const handleLogout=()=>{

        dispatch(appLogOut())

    }
  return (
    <>
    
    <button onClick={handleLogout}>Logout</button>
    
    </>
  )
}

export default NavBar