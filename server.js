const express=require("express");
const app=express();
const path=require("path");
const userRouter=require("./Router/userRouter");
const planRouter=require("./Router/planRouter");
const viewRouter=require("./Router/viewRouter");
const cookieParser=require("cookie-parser");





// middleware
app.use(express.json());
app.use(cookieParser());

app.use(express.static("public"))

// express => rendering endine specify
app.set("view engine", "pug");
// view folder
app.set("views", path.join(__dirname, "view"));




app.use("/api/plans",planRouter);
app.use("/api/users",userRouter);
app.use("/", viewRouter);



// app.get("/protect",function(req,res){
//     console.log(req.headers);
//     res.json({
//         data:req.headers,
//     })
// })



app.listen(3000,function(){
    console.log("Server has started at port 3000");
});

