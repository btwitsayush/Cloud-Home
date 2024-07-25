const express=require('express');
const folderRouter=express.Router();

const{createFolder}=require('../controllers/folderControllers.js');

folderRouter.route('/create').post(createFolder);

module.exports =folderRouter;