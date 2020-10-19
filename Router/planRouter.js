const planRouter=require("express").Router();

const{
getAllPlan,
// checkId,
// checkbody,
createPlan,
updatePlan,
deletePlan,
getPlan
}=require("../Controller/planController");

const {protectRoute,isAuthorised}=require("../Controller/authController");

// planRouter.param("id",checkId);

planRouter.use(protectRoute);
planRouter.use(isAuthorised(["admin","restaurantowner"]));


planRouter
   .route("")
   .get(getAllPlan)
   .post(createPlan);

planRouter
    .route("/:id")
    .get(getPlan)
    .patch(updatePlan)
    .delete(deletePlan);

module.exports=planRouter;
