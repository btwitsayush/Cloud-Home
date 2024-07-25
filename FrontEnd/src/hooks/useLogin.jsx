import React from 'react'
import { appLogIn } from '../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { appLogIn} from '../store/slices/authSlice';
import { useDispatch } from 'react-redux';
const useLogin=()=> {
    
    const navigate=useNavigate();
    
    const dispatch=useDispatch();
    const login = async({email,password})=>{

        
        try{
        const res=await fetch(`${process.env.BACKEND_URL}/api/v1/auth/login`,{
            method:"POST",
            body:JSON.stringify({email,password}),
            headers: {
                "content-type":"application/json"
            }
        });
        console.log(res);
        const data=await res.json();
        console.log(data);
        if(data.status==='success'){
            navigate('/');
            dispatch(appLogIn(data));
        }

       
    }
    catch(err){
        console.log(err);
        alert(err);
    }

    }
    
    return{login}
}

export default useLogin;