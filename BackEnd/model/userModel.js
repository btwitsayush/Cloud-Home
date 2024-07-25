const mongoose =require('mongoose');
const bcrypt = require('bcrypt');


const userSchema =new mongoose.Schema({
    name:String,
    imageUrl:String,
    isEmailVerifed:{
        type:Boolean,
        default:false
    },
    email:{
        type:String,
        unique:true,
        required:["Email is required"]
    },
    password:{
        type:String,
        required:["password is required"]
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    updatedAt:{
        type:Date,
        default:Date.now()
    }
})

userSchema.methods.verifyPassword=async (password,hashedPassword)=>{
    return  bcrypt.compare(password,hashedPassword);
}

userSchema.pre('save', async function(next) {

    // password will be hashed only when new user entered or existing user updated it's password

    if(this.isModified("password")){

        const hashedPassword= await bcrypt.hash(this.password,12);
        this.password=hashedPassword;
        next();
    }
    else{

        next();
    }
  });


const userModel=mongoose.model("Users",userSchema);
module.exports=userModel;