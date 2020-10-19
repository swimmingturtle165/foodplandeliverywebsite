const userModel=require("../Model/userModel");
const jwt=require("jsonwebtoken");
const secrets=require("../Config/secret");
const nodemailer=require("nodemailer");

async function sendMail(usr_email,link,subject)
{
 try {
    var transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "0a011fce875789",
          pass: "bace5ac55b016c"
        }
      });
    // email options
    
    const emailOptions={
        from:"sachit@gmail.com",
        to:usr_email,
        subject:subject,
        text:link,
    }
        await transport.sendMail(emailOptions);
    }catch(err){
        console.log(err);
    }
}

async function signup(req,res){
    const user=req.body;

    try{
       const user=await userModel.create(req.body);
    //    welcome Mail
    sendMail(user.email,"Welcome to abcfoods.com","Welcome")
    .then (function(){
        console.log("Welcome Email has been sent to   "+user.email);
    })
    .catch(function(err){
        console.log(err);
    });

    //   res.status(200).json({
    //       mail:user.email,
    //       status:"Welcome to our food membership",
    //   });
     return  res.status(201).json({
        status:"user created",
        user,
    });
    }catch(err){
        res.status(201).json({
            status:"user can't be created",
            err,
        });
    }
   
};
async function isUserLoggedIn(req, res, next) {
    try {
      let token;
      if (req.cookies.jwt) {
        token = req.cookies.jwt
      }
      // console.log(token)
      if (token) {
        const payload = jwt.verify(token, secrets.JWT_SECRET);
        if (payload) {
          // user id 
          // console.log(payload)
          const user = await userModel.findById(payload.id);
          req.role = user.role;
          req.id = payload.id
          req.userName = user.name
          next();
        } else {
            throw new Error("Token is modified please login again");
        }
      } else {
        throw new Error("Please login first");
      }
    } catch (err) {
      // console.log(err);
      let clientType = req.get("User-Agent");
    // console.log(clientType);
        if (clientType.includes("Mozilla") == true) {
      //  backend express 
      return res.redirect("/login");
    }
    else {
      res.status(500).json({
        err: err.message,
      });
    }
    }
  }
  async function logout(req, res) {
    // token => loggedIN
    res.cookie("jwt", "wrongtoken", { httpOnly: true });
    res.status(200).json({
      status: "user LoggedOut"
    })
  
  }
  async function login(req, res) {
    try {
      if (req.body.email && req.body.password) {
        // find user
        const user = await userModel.findOne({ email: req.body.email }).select("+password");
        if (user) {
            if (user.password == req.body.password) {
                console.log(user);
            const id = user["_id"];
            const token = jwt.sign({ id }, secrets.JWT_SECRET);
            // header
            res.cookie("jwt", token, { httpOnly: true });
            return res.status(200).json({
              status: "succ",
              user,
              token
            });
          } else {
            throw new Error("email or password didn't match ");
          }
        } else {
          throw new Error("User not found");
        }
      }
  
      throw new Error("Invalid Input");
    } catch (err) {
      // console.log(err);
      return res.status(500).json({
        status: "user can't be loggedIn",
        err,
      });
    }
  }
// async function login(req,res){

//     try{
//         if(req.body.email && req.body.password)
//         {
//             const user =await userModel.findOne({email:req.body.email}).select("+password");
//             console.log(user);
//             if(user)
//             {
//                     if(user.password==req.body.password)
//                 {
//                     const id=user["_id"];
//                     const token =jwt.sign({id},secrets.JWT_SECRET);
//                     req.token=token;
//                     //  res.cookies.jwt=token;
//                 res.cookie("jwt", token, { httpOnly: true });

//                     //  next()
//                     //  ("jwt", token, { httpOnly: true });
                    
//                     return   res.status(200).json({
//                         status:"user logged in",
//                         user,
//                         token,
//                     });
//                 }
//                 else
//                 {
//                     throw new Error("Invalid id or password");

//                 }
//             }
//             else
//             {
//                   throw new Error("User not found");
//             }
            

//         }
//         throw new Error("Invalid input fields");
//     }catch(err)
//     {
//         res.status(201).json({
//             err,
//             status:"USer couldn't login"
//         });
//     }
    
// };

// async function protectRoute(req,res,next){

//     console.log("reached protect route");

//     try{
//         var token=req.body.token;
        
//         if(req.headers.authorization)
//         {
//             token=req.headers.authorization.split(" ").pop();
//             req.body.token=token;
//         }else if (req.verified) {
//             token = req.verified;
//             req.body.token=req.verified;
//           }
//           console.log("AS");
//           console.log(token);

//         if(token)
//         {
//             console.log("ASDASD");

//             const ctoken=req.body.token;
//             console.log("ASDASD");
//             const payload=jwt.verify(ctoken,secrets.JWT_SECRET);
            
//             console.log(payload);
//             if(payload){
//                 // console.log(payload);
//                 const user= await userModel.findById(payload.id);
//                 req.id=payload.id;
//                 req.role=user.role;
//                 // payload has the user_id
//                 next();
//             }
//             else{
//                 throw new Error("Token is modified login again");
//             }

//         }
//         else{
//             // next()
//             throw new Error("Please login first.");
//         }
//     }catch(err){
//         console.log(err);

//         res.status(201).json({
//             err,
//         });
//     }
    
// };
async function protectRoute(req, res, next) {
    try {
      let token;
      if (req.headers.authorization) {
        token = req.headers.authorization.split(" ").pop();
      } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
      }
      // console.log(token)
      if (token) {
        const payload = jwt.verify(token, secrets.JWT_SECRET);
        if (payload) {
          // user id 
          // console.log(payload)
          const user = await userModel.findById(payload.id);
          req.role = user.role;
          req.id = payload.id
          next();
        } else {
          throw new Error("Token is modified please login again");
        }
      } else {
        throw new Error("Please login first");
      }
    } catch (err) {
      console.log(err);
      // client postman => json reply
      // client browser => authorized page
      let clientType = req.get("User-Agent");
      // console.log(clientType);
          if (clientType.includes("Mozilla") == true) {
        //  backend express 
        return res.redirect("/login");
      }
      else {
        res.status(500).json({
          err: err.message,
        });
      }
  
    }
  }

async function isAdmin ( req,res,next) {
    console.log("reached isAdmin");
   try{
        if(req.role=="admin")
        {
            next();
        }
        else
        {
            res.status(401).json({
                status:"user not authorised",
                
            })
        }
   }catch(err){
        
    res.status(200).json({
        status:"user not authorised",
        err,
    })
   }
};

function isAuthorised(roles) {

    return function (req, res,next) {
      if (roles.includes(req.role) == true) {
        next()
      } else {
        res.status(200).json({
          status: "user not allowed"
        })
      }
    }
  }


async function forgetPassword(req,res){
    let {email}=req.body;

    try{

        const user=await userModel.findOne({email:email});
       console.log(user);
        if(user)
        {
            // link=>reser Password/token
         const resetToken= await user.createResetToken();
         const resetPath="http://localhost:3000/api/users/resetPassword/"+resetToken;

          await user.save({validateBeforeSave:false});
          sendMail(email,resetPath,"Reset password")
          .then (function(){
              console.log("Reset Email has been sent to "+email);
          })
          .catch(function(err){
              console.log(err);
          });

            res.status(200).json({
                resetToken,
                resetPath,
                status:"Reset token sent to your mail",
            });

        }
        else
        {
            throw new Error("User not found");
        }
    }catch(err){
        res.status(201).json({
            err,
            status:"Can't reset Password",
        });
    }
   
};


async function resetPassword(req,res){
    try{
        const token=req.params.token;
        const {password,confirmPassword}=req.body;
        const user=await userModel.findOne({
            resetToken:token,
            resetToken:{$gt:Date.now()},
        });
        if(user){
            console.log(user);
            user.resetPasswordHandler(password,confirmPassword);
            await user.save();
            res.status(200).json({
                status:"Password Reset successfully",
            });
        }

        else{
            throw new Error("Not a valid token");
        }

    }catch(err){
        res.status(201).json({
            status:"Some error occurred",
            err,
        });

    };
}

module.exports.resetPassword=resetPassword;

module.exports.forgetPassword=forgetPassword;

module.exports.login=login;

module.exports.signup=signup;

module.exports.protectRoute=protectRoute;

module.exports.isAuthorised=isAuthorised;

module.exports.isAdmin=isAdmin;

module.exports.isUserLoggedIn=isUserLoggedIn;

module.exports.logout=logout;

