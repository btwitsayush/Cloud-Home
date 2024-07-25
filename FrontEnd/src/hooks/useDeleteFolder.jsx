import { useSelector } from "react-redux";
import useGetFileFolder from "./useGetFileFolder";

const useDeleteFolder=()=>{

    const { token } = useSelector((e) => e.auth);
    const{setFileFolders}=useGetFileFolder();
    const deleteFolder=async( {name,parentId })=>{

        try {
            const res = await fetch(`${process.env.BACKEND_URL}/api/v1/file-folder/delete`,{
                method: "DELETE",
                body: JSON.stringify({ name,parentId }),
                headers: {
                    "content-type": "application/json",
                    authorization: `Bearer ${token}`
                }
            });
            const data=await res.json();
            console.log("get file folder=",data);

           setFileFolders(data.data.fileFolders);
          
        }
         catch (err) {
            alert(err.message)
            
        }


    }
    return {deleteFolder}
}
export default useDeleteFolder;