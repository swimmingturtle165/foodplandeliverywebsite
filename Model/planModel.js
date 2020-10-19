// const express=require("express");
// const app=express();
const mongoose=require("mongoose");
const secrets=require("../Config/secret");
mongoose
   .connect(secrets.DB_LINK, 
   {useNewUrlParser: true,
    useCreateIndex:true,
    useUnifiedTopology:true}
    )
   .then(function(db){
    console.log("Plan db is connected");

   })
   .catch(function(err){
       console.log(err);
   });

// define schema
const planSchema = new mongoose.Schema({
    name:{
       type: String,
       required:true,
       unique:true,
       maxlength:[40,"Your plan length is more than 40"]
    },
    duration:{
        type:Number,
        required:[true,"You need to provide duration"]

    },
    ratingsAverage:{
        type:Number
    },
    price: {
        type: Number,
        required: true,
      },
    discount:{
        type:Number,
        validate:function(){

            return this.discount<this.price;
        },
        message:"Discount must be less than price",
        },
        

    
    });
// define models
const planModel= mongoose.model("PlanModel",planSchema);

module.exports=planModel;
