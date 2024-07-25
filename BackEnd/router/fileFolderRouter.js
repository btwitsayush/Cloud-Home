const express=require('express');
const fileFolderRouter=express.Router();

const{getFileFolder,deleteFileFolder}=require('../controllers/fileFolderControllers.js');


fileFolderRouter.route('/')
.post(getFileFolder)

fileFolderRouter.route('/delete')
.delete(deleteFileFolder);

module.exports=fileFolderRouter;