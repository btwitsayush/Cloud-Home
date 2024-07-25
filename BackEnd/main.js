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

app.use(cors({origin:true}))

app.use('/api/v1/auth',authRouter)
app.use(verifyToken);
app.use('/api/v1/otp',otpRouter)
app.use('/api/v1/folder',folderRouter)
app.use('/api/v1/file',fileRouter)
app.use('/api/v1/file-folder',fileFolderRouter)

app.listen(process.env.PORT,()=>{
    console.log(`server started at port ${`https://localhost:${process.env.PORT}`}`);
})