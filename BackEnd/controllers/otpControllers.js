const userModel = require('../model/userModel.js');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const otpModel = require('../model/otpModel.js');

const sendOTPMail = async (email, otp) => {
    try {
        let mailer = nodemailer.createTransport({
            service: 'gmail',
            secure: true,
            port: 465,
            auth: {
                user: process.env.NODEMAILER_MAIL_USER,
                pass: process.env.NODEMAILER_MAIL_PASSWORD,

            }
        })

        const response = await mailer.sendMail({
            from: "srivastvaayush6393@gmail.com",
            to: email,
            subject: "OTP for login",
            html: `
        <html>
        <body>
        <h1>OTP for cloud home is </h1>
        <h1>${otp}</h1>
        </body>
        
        </html>
        `

        })
        return true;
        // console.log(response);
    }
    catch (err) {
        console.log("Inside catch block");
        console.log(err);
        return false;

    }
}

const generateOtp = async (req, res) => {
    // const {email}=req.query;

    try {
        const { email, _id } = req.user;
        // console.log("user","==",email);
        const restrictedTimeForOTP = 10 * 60 * 100;

        const isOTPMailSent = await otpModel.findOne({
            email,
            createdAt: {
                // what is gte?
                $gte: Date.now() - restrictedTimeForOTP
            }
        });
        console.log(isOTPMailSent);

        if (isOTPMailSent) {
            return res.status(200).json({
                status: "success",
                message: `Otp is already sent to ${email}`,
                data: {
                    createdAt: isOTPMailSent.createdAt,
                }
            })

        }

        const randomOTP = Math.floor(Math.random() * 9000 + 1000);
        console.log(randomOTP);


        const isMailSent = await sendOTPMail(email, randomOTP);

        if (!isMailSent) {
            return res.status(500).json({
                status: "fail",
                message: `Otp not sent to ${email}`,
                data: {}
            })
        }
        await otpModel.create({
            otp: randomOTP,
            email,
            userId: _id

        })

        res.status(200).json({
            status: "success",
            message: `Email sent to ${email}`,
            data: {}
        })
    }
    catch (err) {
        console.log("err occured=", err);
        res.status(500).json({
            status: "fail",
            message: "internal Server Error",
            data: err,
        })
    }
}

const verifyOtp = async (req, res) => {

    try {

        const { otp } = req.body;
        const { email } = req.user;

        const restrictedTimeForOTP = 10 * 60 * 100;

        const isOTPMailSent = await otpModel.findOne({
            email,
            createdAt: {
                // what is gte?
                $gte: Date.now() - restrictedTimeForOTP
            }
        });

        if (!isOTPMailSent) {
            return res.status(404).json({
                status: "fail",
                message: "Verification failed.Please generate new OTP"
            })
        }

        const hashedOtp = isOTPMailSent.otp;
        const isOtpValid = await isOTPMailSent.verifyOtp(otp+"", hashedOtp); //verifyOtp from otpModel

        if (!isOtpValid) {
            return res.status(400).json({
                status: "fail",
                message: "Invalid OTP",
            })
        }
        await userModel.findOneAndUpdate({ email },
            { isEmailVerifed: true });

        res.status(200).json({
            status: "success",
            message: "Verification successfull",
            data: {}
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: "fail",
            message: "internal Server Error",
            data: err,

        })
    }
}

module.exports = {
    generateOtp,
    verifyOtp
}