const express=require('express');
const authRouter=express.Router();

const{validationMiddleware,signUp,login}=require('../controllers/authControllers.js');


authRouter.route('/signup').post(validationMiddleware,signUp);
authRouter.route('/login').post(login)

module.exports=authRouter;