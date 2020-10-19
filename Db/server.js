const express=require("express");
const app=express();
const mongoose=require("mongoose");
mongoose
   .connect(
       'mongodb+srv://admin:<password>@cluster0-k9nyt.mongodb.net/test?retryWrites=true&w=majority', 
   {useNewUrlParser: true,
    useCreateIndex:true,
    useUnifiedTopology:true}
    )
   .then(function(db){
       console.log(db);
   })
   .catch(function(err){
       console.log(err);
   });

// define schema
let userSchema=new mongoose.Schema({
    name:String,
    email:String,
});
// define models
const userModel=new mongoose.model("UserModel",userSchema);

// UserModel
const newUsr=new userModel({
    name:"asdas$$",
    email:"asdada@gmail.com",
    phno:2341242
});
newUsr
    .save()
    .then(function(){
        console.log("A user is saved in UserModel");
    })
    .catch(function(err){
        console.log(err);
    })
 
app.listen(3000,function(){
    console.log("App is listening at port 3000");
});
