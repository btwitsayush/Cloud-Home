const fileFolderModel = require("../model/fileFolderModel");

const createFolder=async(req,res)=>{
    try{
    const {name,parentId}=req.body;
    const {_id}=req.user;

    const isFileNameExists=await fileFolderModel.findOne({
        name,
        userId:_id,
        parentId
    });

    if(isFileNameExists){
      return  res.status(400).json({
        status:"fail",
        message:"Folder name already exists"
      })
    }

    const newFolder=await fileFolderModel.create({
        name,
        userId:_id,
        type:"folder",
        parentId
    })

   return res.status(201).json({
        status:"success",
        message:"Folder created"
    })
}
catch(err){
    console.log(err);

   return res.status(500).json({
        status:"fail",
        message:"Internal server error"
    })
}
}

module.exports={
    createFolder
}