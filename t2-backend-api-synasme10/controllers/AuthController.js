var usersmodel=require('../models/UsersModel');


var bcrypt=require('bcrypt');

var jwt=require('jsonwebtoken');
//check if the user is valid user
function validator(req,res,next) {
usersmodel.User.findOne({
    where:{email:req.body.email}

})
    //User have been registered
    .then(function (result) {
        if(result != null){
            // console.log(result);
            next();
        }else{
            next({"status":409,"message":"Email didn't match..Enter Correct Email "});
        }
    })
    //err denotes the user was not found i.e. not registered
    .catch(function (err) {
        // console.log(err);
  next({"status":409,"message":"Please registered "})
})
}

function check(req,res,next){
    usersmodel.User.findOne({
        where:{email:req.body.email}
    })
        .then(function (result) {
            //console.log(result.dataValues)
            // all the information -firstname,lastname,gender,email, password,etc

            if(result != null){

                bcrypt.compare(req.body.password, result.dataValues.password, function(err, res) {


                    if(res) {

                        // next({"status":200,"message":"Valid User Login."});

                        next()
                    }

                    else {
                        console.log(result);
                        next({"status":500,"message":"Password didn't match."});
                    }
                });
                // res.json(result);
            }else{
                next({"status":500,"message":"Credentials didn't match."});
            }

        })
        .catch(function (err) {
            next({"status":500,"message":"Error Occured"})
        })
    // next();

}

function jwtTokenGen(req, res, next) {

	jwt.sign({
			email: req.body.email,
			accessLevel: 'superadmin'
		}, 'thisissecretkey', {
			expiresIn: "10h"
		},

		function(err, token) {
			if(err != null || undefined ){
			console.log(err)
			next({"status":401, "message":"Unauthorized token"})
			}
			else{
				req.genToken=token;
				next();
			// console.log(token)
			}

		}
	)

}

//Token generating parts
function tokenVerify(req,res,next){

	console.log(req.headers)

if(req.headers.authorization ==  undefined){

			next({status:500,message:'no authorization header present'})

}
else{

	let token = req.headers.authorization.slice(7,req.headers.authorization.length)

	jwt.verify(token,'thisissecretkey',function(err,decoded){
		console.log(decoded);
		if(err !=null){
			next({status:500,message:err.message})
		console.log(err);
		}
		else{
			next();
		}
	})

}
}

function userData(req,res,next) {
    usersmodel.User.findOne({
        where:{email:req.body.email}

    })
        .then(function (result) {
         if (result!=null) {
             // res.json(result)
             res.send({
                 "message": "Login Successfull",
                 "token": req.genToken,
                 "result": result

             });
         }
                })
                .catch(function (err) {
                    next({"status":500,"message":"DBs error"});
                })
        }



module.exports={
    validator,
    userData,
    check,
    jwtTokenGen,
    tokenVerify
}