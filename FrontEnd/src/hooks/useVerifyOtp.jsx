import { appLogOut,emailVerified } from "../store/slices/authSlice"; 
import { useDispatch, useSelector } from "react-redux";

const useVerifyOtp=()=>{
    const{token}=useSelector((e)=>e.auth);
    const dispatch=useDispatch();

        const verifyOtp=async(otp)=>{
            console.log("otp inside verify otp=",otp);
        const res=await fetch(`${process.env.BACKEND_URL}/api/v1/otp/verify-otp`,{
            method:"POST",
            body:JSON.stringify({otp}),
            headers:{
                "content-type":"application/json",
                authorization: `Bearer ${token}`,

            }
        })

        const data=await res.json();
        console.log("verify otp data=",data);

        if(data.message=="Unauthorized"){
            console.log(data.message);
            dispatch(appLogOut())
        }
        else if(data.message=="Verification successfull"){
            data.message
            alert(data.message)
            dispatch(emailVerified())
        }else{
        data.message
        alert(data.message);
        }

    }
    return{verifyOtp};
}

export default useVerifyOtp;