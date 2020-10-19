const userModel=require("../Model/userModel");


module.exports.getUser=async function getUser(req,res){
    
    const id=req.param.id || req.id;

    // log id
    // console.log(id);
    const user=await userModel.findById(id);
    res.status(200).json({
        status:"successfull",
        user,
    });
};




module.exports.getAllUsers=async function getUser(req,res){
    
    let users=await userModel.find();
    res.status(201).json({
        status:"got all users",
        users,
    })
};

















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
//     if(id<0 || id>users.length)
//     {
//         res.status(404).json({
//             status:"failed",
//             data:"Wrong Id"
//         });
//     }
// }

// module.exports.createUser= function createUser(req,res){
//     console.log("Actual user Creation ran");
//     const user_det=req.body;
//     user_det.id=users.length+1;
//     users.push(user_det);
//     fs.writeFileSync("./data/user.json",JSON.stringify(users));
//     res.status(201).json({
//         status:"User created successfully",
//         user:user_det
//     });
// }

// module.exports.getUser= function getUser (req,res){
//     const id=req.params.id;
//     const user=users[id];
//     console.log("FETCHING USER DETAILS");
//     res.status(200).json({
//         status:"successfully fetched user",
//         user:user
//     });
// }

// module.exports.getAllUser= function getAllUser(req,res){
//     res.status(200).json({
//         success:"got all users",
//         data:users
//     });
// }

// module.exports.deleteUser= function deleteUser(req,res){
//     const id=req.params.id;
//     const user=users.splice(id-1,1);
//     fs.writeFileSync("./data/user.json",JSON.stringify(users));

//     res.status(200).json({
//         "status":"User deleted successfully",
//         user:user
//     });

// }

// module.exports.updateUser= function updateUser(req,res){
//     const user=req.body;
//     const id=req.params.id;
//     var flg=false;
//     for(var i=0;i<users.length;i++)
//     {
//         if(users[i].id==id)
//         {
//             flg=true;
//             Object.keys(user).forEach(function(key) {
//                 users[i][key] = user[key];
//             });
//             fs.writeFileSync("./data/user.json",JSON.stringify(users));

//             res.status(200).json({
//                 status:"User Updated successfully",
//                 upd_user:user
//             });
//             break;
            
//         }
//     }
   
//     if(flg==false)
//     {
//         user.id=id;
//         users.push(user);
//         fs.writeFileSync("./data/users.json",JSON.stringify(user));
//         res.status(200).json({
//             status:"Plan created successfully",
//             new_user:user
//         });
//     }
    

// }