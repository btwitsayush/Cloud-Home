const express=require('express');
const otpRouter=express.Router();

const{generateOtp,verifyOtp}=require('../controllers/otpControllers.js')


otpRouter.route('/generate-otp').get(generateOtp);
otpRouter.route('/verify-otp').post(verifyOtp);

module.exports=otpRouter;