import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const useGetFileFolder=()=> {
  
    const {token}=useSelector((e)=>e.auth);
    const[fileFolders,setFileFolders]=useState([]);

    const getFileFolders =async(parentId=null)=>{
        console.log(parentId);

        try {
            const res = await fetch(`${process.env.BACKEND_URL}/api/v1/file-folder`, {
                method: 'POST',
                body:JSON.stringify({parentId}),
                headers: {
                    "content-type":"application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            const data=await res.json();
            console.log("get file folder=",data);

           setFileFolders(data.data.fileFolders);
        } 
        catch(err){
            alert(err)
        }
    }
  

    return {getFileFolders,fileFolders,setFileFolders}
}

export default useGetFileFolder