require("dotenv").config();
require('./config/db.js')
const express=require('express');
const app=express();
const cors =require('cors');

const authRouter=require('./router/authRouter.js')
const otpRouter=require('./router/otpRoutes.js')
const folderRouter=require('./router/folderRoutes.js')
const fileFolderRouter=require('./router/fileFolderRouter.js')
const verifyToken=require('./middlewares/verifyToke.js');
const fileRouter = require("./router/fileRouter.js");

app.use(express.json());
app.use(cors({ origin: true }));

// Open routes (signup, login don't need token)
app.use('/api/v1/auth', authRouter);

// Protected routes (all these require JWT token)
app.use('/api/v1/otp', verifyToken, otpRouter);
app.use('/api/v1/folder', verifyToken, folderRouter);
app.use('/api/v1/file', verifyToken, fileRouter);
app.use('/api/v1/file-folder', verifyToken, fileFolderRouter);


app.listen(process.env.PORT,()=>{
    console.log(`server started at port ${`https://localhost:${process.env.PORT}`}`);
})