var usersmodel=require('../models/UsersModel');

// console.log(usersmodel);
var bcrypt=require('bcrypt');

var saltRounds=10;



function userValidator(req,res,next){
    usersmodel.User.findOne({
        where:{email:req.body.email}
    })
        .then(function (result) {
            // console.log(result.dataValues);
            if (result.dataValues!='') {
                next({"status": 409, "message": "Email already exists"})
            }
        })
        .catch(function (err) {
                next();
        })
}

function confirm(req,res,next){

        if(req.body.password!==req.body.pw){
            next({"status":500 , "message": "Password and Confirm password didn't match"})
        }
        else
        {
           next();

        }


}
function hashGenerator(req,res,next){
    // req.body.password //this is password from frontend
    bcrypt.hash(req.body.password,saltRounds)
        .then(function (hash) {
            // console.log(hash);
            req.hashvalue=hash;
            next();
        })
        .catch(function (err) {

        })

}
// console.log(usersmodel);
function registerUser(req,res,next){
    usersmodel.User.create({
        image:req.file.filename,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        phone:req.body.phone,
        state:req.body.state,
        city:req.body.city,
        address:req.body.address,
        gender:req.body.gender,
        email:req.body.email,
        password:req.hashvalue,
        usertype:req.body.usertype
    })
        .then(function (result) {
            console.log(result);
            next();
        })
        .catch(function (err) {
            // console.log(err);
            next({"status":500,"message":"DB error"})
            // next('Error in registeruser of usercontroller ');
        })
}

function registerUserTest(req,res,next){
    usersmodel.User.create({
        image:req.body.image,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        phone:req.body.phone,
        state:req.body.state,
        city:req.body.city,
        address:req.body.address,
        gender:req.body.gender,
        email:req.body.email,
        password:req.hashvalue,
        usertype:req.body.usertype
    })
        .then(function (result) {
            console.log(result);
            next();
        })
        .catch(function (err) {
            // console.log(err);
            next({"status":500,"message":"DB error"})
            // next('Error in registeruser of usercontroller ');
        })
}
module.exports={
    registerUser,
    hashGenerator,
    userValidator,
    confirm,
    registerUserTest
}
// registerUser();
