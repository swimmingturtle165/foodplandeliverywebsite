const userRouter=require("express").Router();

// const{
//     // getAllUser,
//     // checkId,
//     // checkbody,
//     // createUser,
//     // updateUser,
//     // deleteUser,
//     // getUser
    
//     }=require("../Controller/userController");
    
const {signup,login,protectRoute,isAuthorised,forgetPassword,resetPassword} =require("../Controller/authController");
const {getUser,getAllUsers} =require("../Controller/userController");


// planRouter.param("id",checkId);


// userRouter
//    .route("")
//    .get(getAllUser)
//    .post(createUser);

// userRouter
//     .route("/:id")
//     .get(getUser)
//     .patch(updateUser)
//     .delete(deleteUser);

userRouter.post("/signUp", signup);
userRouter.post("/login", login);
userRouter.patch("/forgetPassword",forgetPassword);
userRouter.patch("/resetPassword/:token",resetPassword);


userRouter.use(protectRoute);

userRouter.post("/userProfile",getUser);

userRouter.use(isAuthorised(["admin"]));




userRouter
   .route("")
   .get(getAllUsers);

userRouter
    .route("/:id")
    .get(getUser);
    // .patch(updateUser)
    // .delete(deleteUser);


module.exports=userRouter;