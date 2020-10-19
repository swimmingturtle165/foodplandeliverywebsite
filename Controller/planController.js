const planModel=require("../Model/planModel")


// module.exports.checkbody= function checkbody(req,res,next){
//     if(Object.keys(req.body).length==0)
//     {
//         res.status(404).json({
//             status:"client error",
//             data:"data not sent"
//         });
//     }
// }

// module.exports.checkId= function checkId(req,res,next,id){

//     console.log(id);
//     if(id<0 || id>plans.length)
//     {
//         res.status(404).json({
//             status:"failed",
//             data:"Wrong Id"
//         });
//     }
// }
module.exports.createPlan=async function createPlan(req,res)
{

    // console.log("Actual plan ran");
    // const plan=req.body;
    // plan.id=plans.length+1;
    // plans.push(plan);
    // fs.writeFileSync("./data/plans.json",JSON.stringify(plans));
    // res.status(201).json({
    //     status:"Plan created successfully",
    //     plan:plan
    // });

    // Promise based
    // const recievedPlan=req.body;
    // planModel
    //     .create(recievedPlan)
    //     .then(function(createdPlan){
    //         console.log(createdPlan);
    //                 res.status(201).json({
    //             status:"Plan created successfully",
    //             plan:plan
    //         });

    //     })
    //     .catch(function(err){
    //         console.log(err);
    //         res.status(501).json({
    //             status:"Server Error"
    //         })
    //     })

    // await
    const recievedPlan=req.body;

    try{
        let createdPlan=await planModel.create(recievedPlan);
        res.status(201).json({
        status:"Plan created successfully",
        plan:createdPlan
        });
    }catch(err){
        res.status(501).json({
        err,
    status:"Server Error"
    })
    }
    
}



module.exports.getPlan= async function getPlan(req,res)
{
    try{
        const id=req.params.id;
         const plan= await planModel.findById(id);
    console.log(plan);
    res.status(201).json({
        status:"successfully fetched plan",
        data:plan,
    });
    }catch(err){
    res.status(404).json({
        status:"Plan not found",
        err,
    });
    }
    
};
module.exports.getAllPlan= async function getAllPlan(req,res){
    try{
        let plans= await planModel.find();
        res.status(200).json({
            success:"got all Plans",
            plans,
        });
    }catch(err){
        res.status(404).json({
            status:"Plans not found",
            err,
        });
    }
   
}
module.exports.deletePlan=async function deletePlan(req,res){
    const id=req.params.id;
    try{
        const plan=await planModel.findByIdAndDelete(id);

        res.status(200).json({
            status:"Plan deleted successfully",
            plan:plan
        });
    }catch(err){
        res.status(501).json({
            status:"Plan couldn't be removed",
            err,
        })
    }
    

}

module.exports.updatePlan= async function updatePlan(req,res){
    // const id=req.params.id;
    // const plan=req.body;
    // var flg=false;
    // for(var i=0;i<plans.length;i++)
    // {
    //     if(plans[i].id==id)
    //     {
    //         flg=true;
    //         Object.keys(plan).forEach(function(key) {
    //            plans[i][key] = plan[key];
    //         });
    //         fs.writeFileSync("./data/plans.json",JSON.stringify(plans));
    //         res.status(200).json({
    //             status:"Plan Updated successfully",
    //             upd_plan:plan
    //         });
    //         break;
            
    //     }
    // }
   
    // if(flg==false)
    // {
    //     plan.id=id;
    //     plans.push(plan);
    //     fs.writeFileSync("./data/plans.json",JSON.stringify(plans));
    //     res.status(200).json({
    //         status:"Plan created successfully",
    //         new_plan:plan
    //     });
    // }
    const id=req.params.id;
    const toUpdateData=req.body;
    try{
        const orignalPlan=await planModel.findById(id);
        const keys=[];
        for(let key in orignalPlan)
        {
            keys.push(key);
        }
        for(var i = 0 ; i <keys.length;i++)
        {
            orignalPlan[keys[i]]=toUpdateData[keys[i]];
        }
        // express server is modified
        await orignalPlan.save();
        // const updatePlan=await planModel.findByIdAndUpdate(id,toUpdateData,{new:true})
    

    res.status(200).json({
        status:"update request recieved",
        data:updatePlan,
    })
    }catch(err){
        res.status(501).json({
            status:"Plan couldn't be updated",
            err,
        })
    }
    

};

