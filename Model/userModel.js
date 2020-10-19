// const express=require("express");
// const app=express();
const mongoose=require("mongoose");
const secrets=require("../Config/secret");
const crypto=require("crypto");

mongoose
   .connect(secrets.DB_LINK, 
   {useNewUrlParser: true,
    useCreateIndex:true,
    useUnifiedTopology:true}
    )
    .then(function(db){
        console.log("User db is connected");
    
       })
   .catch(function(err){
       console.log(err);
   });

// define schema
let userSchema=new mongoose.Schema({
    // name email role password confirm password
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:7,
        select:false,
    },
    confirmPassword:{
        type:String,
        minlength:7,
        required:true,
        validate:function(){
            return this.password==this.confirmPassword;
        },
        message:"Password don't match",
    },
    role:{
        type:String,
        enum:["admin","user","restaurant_owner","delivery_boy"],
        default:"user",
    },
    resetToken: String,
    resetTokenExpires: Date
   
});
userSchema.pre("save", function () {
    // db => confirmpassword
    this.confirmPassword = undefined;
  });

  userSchema.methods.createResetToken = function () {
    // token generate
    const resetToken = crypto.randomBytes(32).toString("hex");
  
    this.resetToken = resetToken;
  
    this.resetTokenExpires = Date.now() + 1000 * 10 * 60;
  
    return resetToken;
  
  }
  userSchema.methods.resetPasswordHandler = function (password,confirmPassword) {
    // token generate
   
  
    this.password = password;
    this.confirmPassword=confirmPassword;  
    this.resetTokenExpires = undefined;
    this.resetToken=undefined;
  
  
  }
  
// define models
const userModel = mongoose.model("UserModel", userSchema);


// UserModel
module.exports=userModel;

