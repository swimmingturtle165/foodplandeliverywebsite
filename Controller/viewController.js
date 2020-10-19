const planModel=require("../Model/planModel");
const userModel = require("../Model/userModel");
function getTrialPage(req, res) {
   
    res.render("trial.pug",{
        title:"Trial page"
    })
  };
function getHomePage(req,res){
  res.render("home.pug",{
    title:"Home Page",
  })
};

async function getplanPage(req,res){
  let plans = await planModel.find();

  res.render("planPage.pug",{
    title:"Plans Page",plans,
  })
};
function getLoginPage(req,res){
  res.render("login.pug",{
    title:"Login Page",
  })
}
function getSignUpPage(req,res){
  res.render("signup.pug",{
    title:"Signup Page",
  })
}
async function getProfilePage(req, res) {
  const user = await userModel.findById(req.id);
  const name = req.userName;
  res.render("profile.pug", {
    title: "Profile Page",
    user, name
  })
};

module.exports.getTrialPage=getTrialPage;
module.exports.getSignUpPage=getSignUpPage;
module.exports.getHomePage=getHomePage;
module.exports.getplanPage=getplanPage;
module.exports.getLoginPage=getLoginPage;
module.exports.getProfilePage=getProfilePage;



