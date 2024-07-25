const fileFolderModel = require("../model/fileFolderModel");


const getFileFolder=async (req,res)=>{

    try{
    const{_id}=req.user;
    console.log(req.body);
    const{parentId}=req.body;
    console.log(parentId);
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

module.exports={
    getFileFolder
}