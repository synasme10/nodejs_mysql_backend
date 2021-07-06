var favmodel=require('../models/FavouriteModel');

function favValidator(req,res,next){
    favmodel.Favourite.findOne({
        where:{employeeId:req.body.employeeId}
    })
        .then(function (result) {
            // console.log(result.dataValues);
            if (result.dataValues!='') {
                next({"status":409,"message": "Already in Favourite List"})
            }
        })
        .catch(function (err) {
            next();
        })
}

function favouriteDetail(req,res,next){
    favmodel.Favourite.create({
        employeeId:req.body.employeeId,
        userId:req.body.userId,
        Skill:req.body.Skill,
        Experiance:req.body.Experiance,
        JobCompleted:req.body.JobCompleted,
        Language:req.body.Language,
        Payment:req.body.Payment,
        Working:req.body.Working,
        Cost:req.body.Cost,
        Available:req.body.Available,
        image:req.body.image,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        phone:req.body.phone,
        state:req.body.state,
        city:req.body.city,
        address:req.body.address,
        email:req.body.email,
        gender:req.body.gender


    })
        .then(function (result) {
            // console.log(result);
            next();
        })
        .catch(function (err) {
            // console.log(err);
            next({"status":500,"message":"DB errors"})

        })
}

module.exports={
    favouriteDetail,
    favValidator
}
