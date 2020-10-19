const viewRouter = require("express").Router();


const {getTrialPage,getHomePage,getplanPage,getLoginPage,getSignUpPage,getProfilePage}=require("../Controller/viewController");
const{protectRoute,isUserLoggedIn}=require("../Controller/authController");

// viewRouter.use(isUserLoggedIn);

viewRouter.get("/trial", getTrialPage);
viewRouter.get("", getHomePage);
viewRouter.get("/plans", getplanPage);
viewRouter.get("/login", getLoginPage);
viewRouter.get("/signUp", getSignUpPage);
viewRouter.get("/profile", protectRoute,getProfilePage);








module.exports=viewRouter;

