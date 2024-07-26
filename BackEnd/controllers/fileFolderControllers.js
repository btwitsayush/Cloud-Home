const fileFolderModel = require("../model/fileFolderModel");


const getFileFolder=async (req,res)=>{

    try{
    const{_id}=req.user;
    // console.log(req.body);
    const{parentId}=req.body;
    // console.log(parentId);
    const fileFolders=await fileFolderModel.find({userId:_id,parentId});

    res.status(200).json({
        status:"success",
        data:{
            fileFolders
        }
    })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            status:"fail",
            message:"Internal Server Error"
        })
    }
   

}

const deleteFileFolder=async(req,res)=>{
    try{
    const{_id}=req.user;
    // console.log("id=",_id);
    const{parentId,name}=req.body;
    // console.log("parentId",parentId);
    // console.log("name",name);

    const isFileFolderExist=await fileFolderModel.findOneAndDelete({
        userId:_id,
        parentId,
        name
    });

    if(isFileFolderExist){
        res.status(200).json({
            status:"success",
            message:"File/Folder deleted",
            data:{
                isFileFolderExist
            }
        })

    }


    }
    catch(err){
        console.log(err);
        res.status(500).json({
            status:"fail",
            message:"Internal Server Error"
        })

    }
   

}


module.exports={
    getFileFolder,
    deleteFileFolder
}