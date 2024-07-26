const express=require('express');
const uploadFileMulter=require('../config/uploadFIleMulter.js')

const{createFile,viewFile}=require('../controllers/fileControllers.js')
const fileRouter=express.Router();


fileRouter.route('/').post(uploadFileMulter.single("file"),createFile);
fileRouter.route('/:id').post(viewFile);


module.exports=fileRouter;