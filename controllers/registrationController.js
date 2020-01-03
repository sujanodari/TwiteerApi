var user = require("../models/UserModel.js");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");


function registrationValidation(req,res,next){
    //req.result=0;
    if(!req.body.username){
        res.send("Username is required");
    }
    if(!req.body.password){
        res.send("Password is required");
    }
    if(req.body.username === null)
    {
        res.send("Username cannot be empty");
    }
    if(req.body.password === null)
    {
        res.send("Password cannot be empty");
    }
    if(!req.body.phone && !req.body.email)
    {
        res.send("Please enter phone number or email");
    }
    if(req.body.username){
        user.findOne({
        where:{username:req.body.username}
        })
        .then(function(result){
        if(result !== null){
            res.status(303);
            res.json({
                status:303,
                messsage:"User already exist, please enter new username"
            });
          
        }
        else{
            if(req.body.email){
                if(req.body.email === null){
                    res.send("Please enter email");   
                }else{
                    user.findOne({
                        where:{email:req.body.email}
                        })
                        .then(function(result){
                        if(result !== null){
                            res.status(303);
                            res.json({
                                status:303,
                                messsage:"User already exist, please enter new email"
                            });
                            
                        }
                        else{
                            next();
                        }
                        })
                        .catch(function(err){
                            console.log(err);
                        });
                }
               
            }

            if(req.body.phone){
                if(req.body.phone === null){
                    res.send("Please enter phone number");   
                }else{
                user.findOne({
                    where:{phone:req.body.phone}
                    })
                    .then(function(result){
                    if(result !== null){
                        res.status(303);
                        res.json({
                            status:303,
                            messsage:"User already exist, please enter new phone number"
                        });
                       
                    }
                    else{
                        next();
                    }
                    
                    })
                    .catch(function(err){
                        console.log(err);
                    });
                }
            }
        }
        
        })
        .catch(function(err){
            console.log(err);
        });
            }
    
  
   
    // if(req.result===2){
    //     next();
    // }
    // console.log(req.result);
    // if(!res.status===303){
    // next();
    // }
}


function hashPassword(req,res,next){
    const saltRounds = 10;
    bcrypt.hash(req.body.password, saltRounds).then(function(hash) {
        // Store hash in your password DB.
        req.hashedPassword=hash;
        next();
    }).catch(function(err){
        next("Hassing error");
    });
}
function registerUser(req,res,next){
            if(req.body.phone){
                user.create({
                    username:req.body.username,
                    phone:req.body.phone,
                    password:req.hashedPassword,
                    profileImage:req.body.profileImage,
                    bio:req.body.bio,
                    interest:req.body.interest
                })
                .then(function(result){
                res.json({
                    status:201,
                    messsage:"User is Registered"
                });
                })
                .catch(function(err){
                    next(err);
                });
            }
            if(req.body.email){
                user.create({
                    username:req.body.username,
                    email:req.body.email,
                    password:req.hashedPassword,
                    profileImage:req.body.profileImage,
                    bio:req.body.bio,
                    interest:req.body.interest
                })
                .then(function(result){
                res.json({
                    status:201,
                    messsage:"User is Registered"
                });
                })
                .catch(function(err){
                    next(err);
                });
            }
       
}

module.exports={
    registrationValidation,
    hashPassword,
    registerUser
}