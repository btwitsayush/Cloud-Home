const express=require('express');
const fileFolderRouter=express.Router();

const{getFileFolder}=require('../controllers/fileFolderControllers.js');


fileFolderRouter.route('/').post(getFileFolder);

module.exports=fileFolderRouter;