        var user = require("../models/UserModel.js");
        const bcrypt = require("bcrypt");
        var jwt = require("jsonwebtoken");
        function loginValidator(req,res,next){    
            if(!req.body.username && !req.body.email && !req.body.phone){
                res.send("Please enter username/phone/email");
            }
        
            if(!req.body.password){
                res.send("Password is required");
            }
            if(req.body.password === null)
            {
                res.send("Password cannot be empty");
            }
            if(req.body.phone){
                if(req.body.phone === null)
            {
                res.send("phone Number cannot be empty");
            }
               
                user.findOne({
                    where:{phone:req.body.phone}
                })
                .then(function(result){
                    if(result===null){
                        res.send("You have not registered, please register first");
                    }
                    else{
                        //console.log(result);
                        req.passwordFromDB=result.dataValues.password;
                        req.user=result.dataValues.username;
                        next();
                    }
                }).catch(function(err){
                    next(err);
                });
            }
             if(req.body.username){
                if(req.body.username === null)
                {
                    res.send("Username cannot be empty");
                }
                
                user.findOne({
                    where:{username:req.body.username}
                })
                .then(function(result){
                    if(result===null){
                        res.send("You have not registered, please register first");
                    }
                    else{
                        //console.log(result);
                        req.passwordFromDB=result.dataValues.password;
                        req.user=result.dataValues.username;
                        next();
                    }
                }).catch(function(err){
                    next(err);
                });
            }
            if(req.body.email){
                if(req.body.email === null)
                {
                    res.send("email cannot be empty");
                }
                user.findOne({
                    where:{email:req.body.email}
                })
                .then(function(result){
                    if(result===null){
                        res.send("You have not registered, please register first");
                    }
                    else{
                        //console.log(result);
                        req.passwordFromDB=result.dataValues.password;
                        req.user=result.dataValues.username;
                        next();
                    }
                }).catch(function(err){
                    next(err);
                });
            }
           
        }


        function chkLogin(req,res,next){
            if(req.passwordFromDB !==null){
                bcrypt.compare(req.body.password, req.passwordFromDB).then(function(res) {
                    next();  
                }).catch(function(err){
                    next("Hassing error");
                });  
            } else{
                res.end("User login Unsucessfull");
            }
        
        }

        function jwtTokenGen(req,res,next){
            var payloadd={
                username:req.user,
                userlevel:"superadmin"
            }
        
        jwt.sign(payloadd,"thisIsSecreatKey",{expiresIn:"10h"},
        function(err,resultToken){
            req.token=resultToken;
            next();
        });
        }
        
        function getUser(req,res,next){
            user.findOne({
                where:{username:req.params.username}
            })
            .then(function(result){
                if(result===null){
                    res.send("You have not registered, please register first");
                }
                else{
                    username=result.dataValues.username;
                    email=result.dataValues.email;
                    phone=result.dataValues.phone;
                    profileImage=result.dataValues.profileImage
                    res.json({
                        username:username,
                        email:email,
                        phone:phone,
                        profileImage:profileImage
                    });
                

            } 
            }).catch(function(err){
                next(err);
            });
        }
      
        function login(req,res,next){
            if(req.token){
            res.json({
                status:202,
                username:req.user,
                usertoken:req.token});
            }

        }

        module.exports={loginValidator,
            chkLogin,jwtTokenGen,login,getUser};
        
