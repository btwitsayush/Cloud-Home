
const userModel = require('../model/userModel.js');
const jwt=require('jsonwebtoken')


const getUserByEmail = async (email) => {
    const user = await userModel.findOne({ email });
    return user;
}
const generateJWTToken=(object)=>{
    const token=jwt.sign(
        {
            exp:Math.floor(Date.now()/1000)+(60*60)*100, //seconds
            data:object,
        },
        process.env.JWT_SECRET_KEY
    );
    return token;
}

const validationMiddleware = (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                status: "fail",
                message: "Please fill all the fields",
                data: {

                }
            })
        }
        next();
    }
    catch (err) {
        return res.status(500).json({
            status: "Internal Server error",
            message: err.message
        })
    }
}

const signUp = async (req, res) => {

    try {
        const { name, email, password } = req.body;

        const user = await getUserByEmail(email);

        if (user) {
            return res.status(400).json({
                status: "fail",
                msg: "Email already exist"
            })
        }

        const newUser = await userModel.create({
            name,
            email,
            password
        })
        console.log("newUser=", newUser);

        return res.status(201).json({
            status: "success",
            msg: "user created",
            data: {
                user: {
                    _id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                    isEmailVerifed: newUser.isEmailVerifed
                }
            }
        })
    }
    catch (err) {

        res.status(500).json({
            message: err.message
        });

    }


}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await getUserByEmail(email);

        if (!user) {
            return res.status(400).json({
                staus: "fail",
                message: "Email doesn't exist",
                data: {

                }
            })
        }

        const isPassword = await user.verifyPassword(password, user.password);

        if (!isPassword) {
            return res.status(400).json({
                status: "fail",
                message: "Invalid Password",
                data: {

                }
            })
        }
        res.status(200).json({
            status: "success",
            data: {
                user: {
                    _id: user._id,
                    email: user.email,
                    name: user.name,
                    isEmailVerifed: user.isEmailVerifed,
                },
                token: generateJWTToken({ _id: user._id, email: user.email })
            }
        })
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
}

module.exports = {
    validationMiddleware,
    signUp,
    login


}