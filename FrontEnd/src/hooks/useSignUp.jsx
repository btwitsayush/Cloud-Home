import React from 'react'
import { useNavigate } from 'react-router-dom';
const useSignUp=()=> {

    const navigate=useNavigate();

    const signUp = async({name,email,password})=>{
        
        try{
        const res=await fetch(`${process.env.BACKEND_URL}/api/v1/auth/signup`,{
            method:"POST",
            body:JSON.stringify({name,email,password}),
            headers: {
                "content-type":"application/json"
            }
        });
        console.log(res);
        const data=await res.json();
        console.log(data);

        if(data.status=='success'){
            navigate('/login');

        }
    }
    catch(err){
        console.log(err);
        alert(err);
    }

    }
    
    return{signUp}
}

export default useSignUp