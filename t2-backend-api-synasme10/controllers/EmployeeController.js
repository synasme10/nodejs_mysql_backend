var employeemodel=require('../models/EmployeeModel');

function employeeValidator(req,res,next){
    employeemodel.Employee.findOne({
        where:{userId:req.body.userId}
    })
        .then(function (result) {
            // console.log(result.dataValues);
            if (result.dataValues!='') {
                next({"status":409,"message": "You have already registered your work Profile .... You may update your work profile"})
            }
        })
        .catch(function (err) {
            next();
        })
}
 // console.log(employeemodel);
function employeeDetail(req,res,next){
    employeemodel.Employee.create({
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
        // Skill:"S",
        // Experiance:"S",
        // JobCompleted:"S",
        // Language:"S",
        // Payment:"S",
        // Working:"S",
        // Cost:500

    })
        .then(function (result) {
            // console.log(result);
            next();
        })
        .catch(function (err) {
            // console.log(err);
            next({"status":500,"message":"DBs error"})
            // next('Error in employeedetail of employee Controller ');
        })
}

module.exports={
    employeeDetail,
    employeeValidator
}
