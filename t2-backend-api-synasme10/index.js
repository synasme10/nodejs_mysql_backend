var express= require('express');
var myapp=new express();
var bodyParser=require('body-parser');
var path = require('path');

const Sequelize = require('sequelize');

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
// put this in the beginning of your app.js/server.js



var swaggerDefinition = {

    info: {
        // API informations (required)
        title: 'Day Work', // Title (required)
        version: 'v1', // Version (required)
        description: 'API Documetation', // Description (optional)
    },
    host: 'localhost:3000', // Host (optional)
    basePath: '/', // Base path (optional)
    securityDefinitions : {
        bearerAuth : {
            type: 'apiKey',
            name: 'authorization',
            scheme : 'bearer',
            in : 'header'
        }
    }

}

var options = {
    swaggerDefinition,
    apis: ['./index.js']
}

const swaggerSpec=swaggerJSDoc(options);
myapp.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec));
// const op = Sequelize.Op;
// const operatorsAliases = {
//     $eq: op.eq,
//     $or: op.or,
// }

var multer = require('multer');

var mystorage= multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, 'uploads')
    },

    filename: (req, file, cb) => {
        cb(null,file.originalname + '-' + Date.now() +
            path.extname(file.originalname));
    }
});

var uploads= multer({storage: mystorage});


// var dbconfig=require('./configs/databaseconfigs');

var usermodel=require('./models/UsersModel');
var userController=require('./controllers/UsersController');

var employeemodel=require('./models/EmployeeModel');
var employeeController=require('./controllers/EmployeeController');

var authController=require('./controllers/AuthController');

var favmodel=require('./models/FavouriteModel');

var favouriteController=require('./controllers/FavouriteController');

var bookmodel=require('./models/BookemployeeModel');

var bookController=require('./controllers/BookEmployeeController');

//making api public, this is first middleware -application middleware
myapp.use(function (req,res,next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'content-type,X-Requested-With,Authorization');
    next();
})

//this will parse the json data in form body that arrives from client-browser(ajax)
myapp.use(bodyParser.json());



/**
 * @swagger
 * /v1/users:
 *   post:
 *     tags:
 *      - Users
 *     name: Resigister name
 *     summary: This API registers a single  user
 *     description: Register a single user
 *     produces: application/json
 *     parameters:
 *     - name: user
 *       in: body
 *       schema:
 *         type: object
 *         properties:
 *          firstName:
 *           type: string
 *          lastName:
 *           type: string
 *          phone:
 *           type: string
 *          state:
 *           type: string
 *          city:
 *           type: string
 *          address:
 *           type: string
 *          gender:
 *           type: string
 *          email:
 *           type: string
 *          password:
 *           type: string
 *          usertype:
 *           type: string
 *     responses:
 *       201:
 *         description: User was registered
 *       409:
 *        description: email already exists, password and Confirm password didn't match
 *       500:
 *        description: DB Error
 *
 */
myapp.post('/v1/users',uploads.single('image'),userController.userValidator,userController.confirm,userController.hashGenerator,userController.registerUser,function(req,res){

    res.status(206);
    res.send({"message":"user was registered succesfully"})

});

myapp.post('/v1/userstest',userController.hashGenerator,userController.registerUserTest,function(req,res){

    res.status(206);
    res.send({"message":"user was registered succesfully"})

});


/**
 * @swagger
 * /v1/usersdetail:
 *   get:
 *     tags:
 *       - Employee
 *     name: Find employee
 *     summary: Finds a employee detail
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A employee object in array
 *       500:
 *         description: DB Error
 */
myapp.get('/v1/usersdetail',function(req,res) {
    employeemodel.Employee.findAll({

    })
        .then(function (result) {
            // console.log(result)
            res.json(result);
        })
        .catch(function (err) {

        })

});

/**
 * @swagger
 * /v1/vieweachusers/user_id:
 *   get:
 *     tags:
 *       - Users
 *     name: Find user profile
 *     summary: Finds a user detail for that particular single user
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A Single user object in array
 *       500:
 *         description: DB Error
 */
myapp.get('/v1/vieweachusers/:user_id',function(req,res) {
    // console.log(req.params.user_id);
    usermodel.User.findOne({
        where: {userId: req.params.user_id}
    })
        .then(function (result) {
            // console.log(result)
            res.json(result);
        })
        .catch(function (err) {

        })
})
/**
 * @swagger
 * /v1/editmydetail/{user_id}:
 *   put:
 *     tags:
 *      - Users
 *     summary: This API updates a single  user
 *     description: Updates a single user
 *     produces: application/json
 *     parameters:
 *     - name: user_id
 *       in: path
 *       description: id
 *     - name: user
 *       in: body
 *       schema:
 *         type: object
 *         properties:
 *          firstName:
 *           type: string
 *          lastName:
 *           type: string
 *          phone:
 *           type: string
 *          state:
 *           type: string
 *          city:
 *           type: string
 *          address:
 *           type: string
 *          gender:
 *           type: string
 *          email:
 *           type: string
 *          password:
 *           type: string
 *          usertype:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully updated User Profile registered
 *
 */
    myapp.put('/v1/editmydetail/:user_id',function (req,res) {
        // console.log(req.params.user_id);
        usermodel.User.update({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,
            state: req.body.state,
            city: req.body.city,
            address: req.body.address,
            gender:req.body.gender

        }, {
            where: {
                userId: req.params.user_id
            }
        })
            .then(function(result) {
                // console.log(result)
                res.status(201);
                res.send({
                    "message": "User Edited successfully"
                })
            })
            .catch(function(err) {

            })
    })

// myapp.get('/v1/users',function(req,res) {
//     usersmodel.User.findAll({
//         include: [{
//             model: employeemodel.Employee,
//         }]
//     }).then(User => {
//         const resObj = User.map(user => {
//
//             //tidy up the user data
//             return Object.assign(
//                 {},
//                 {
//                     userId: user.userId,
//                     firstname: user.firstName,
//                     lastname: user.lastName,
//                     gender: user.gender,
//                     Employee: user.Employee.map(employee => {
//
//                         //tidy up the post data
//                         return Object.assign(
//                             {},
//                             {
//                                 employee_id: employee.employee_id,
//                                 user_id: employee.userId,
//                                 skill: employee.Skill,
//                             }
//                         )
//                     })
//                 }
//             )
//         });
//         console.log(resObj)
//     });
// })

/**
 * @swagger
 * /v1/login:
 *   post:
 *     tags:
 *       - Users
 *     name: Login
 *     summary: User can login after being registered
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: email
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *         required:
 *           - email
 *           - password
 *     responses:
 *       200:
 *         description: logged in successfully
 *       401:
 *         description: Email didn't match, Not registered in database
 *       403:
 *         description: Username didn't match, password didn't match
 */
myapp.post('/v1/login',authController.validator,authController.check,authController.jwtTokenGen,authController.userData,function (req,res) {
    res.status(205);
    res.send({
        "message": "Login Successfull",
        "token": req.genToken,
        "result": result

    });
// console.log(req.genToken)
});

/**
 * @swagger
 * /v1/employeedetail:
 *   post:
 *     tags:
 *      - Employee
 *     name: Employee Work Detail Register
 *     summary: This API registers a work detail for Employee usertype user
 *     description: Work detail register for Register Employee user
 *     produces: application/json
 *     parameters:
 *     - name: employee
 *       in: body
 *       schema:
 *         type: object
 *         properties:
 *          employeeId:
 *           type: string
 *          userId:
 *           type: string
 *          Skill:
 *           type: string
 *          Experiance:
 *           type: string
 *          JobCompleted:
 *           type: string
 *          Language:
 *           type: string
 *          Payment:
 *           type: string
 *          Working:
 *           type: string
 *          Cost:
 *           type: string
 *          Available:
 *           type: string
 *     responses:
 *       201:
 *         description: Employee work detail was registered
 *       409:
 *        description: Already had an work profile, you may update your work profile
 *       500:
 *        description: DB Error
 *
 */
myapp.post('/v1/employeedetail',employeeController.employeeValidator,employeeController.employeeDetail,function(req,res){

    res.status(201);
    res.send({"message":"Employee work Detail was registered succesfully"})

});

myapp.post('/v1/emptest',employeeController.employeeDetail,function(req,res){

    res.status(201);
    res.send({"message":"Employee work Detail was registered succesfully"})

});


 /**
 * @swagger
 * /v1/viewoneemployee/:user_id:
 *   get:
 *     tags:
 *       - Employee
 *     name: Find employee single
 *     summary: Finds a one employee
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A single Employee object
 */


myapp.get('/v1/viewoneemployee/:user_id',function (req,res) {
    // console.log(req.params.user_id);
    employeemodel.Employee.findOne({
        where: {userId: req.params.user_id}
    })
        .then(function (result) {
            // console.log(result);
            res.json(result);
        })
        .catch(function (err) {
            // res.send({"message":"Your work profile is empty.. Please registered your work profile"})
            // console.log('e');
        })
});

/**
 * @swagger
 * /v1/editworkdetail/{eid}:
 *   put:
 *     tags:
 *      - Employee
 *     description: Updates a Work Detail user
 *     produces: application/json
 *     parameters:
 *     - name: id
 *       in: path
 *       description: id
 *     - name: user
 *       in: body
 *       schema:
 *         type: object
 *         properties:
 *          employeeId:
 *           type: string
 *          userId:
 *           type: string
 *          Skill:
 *           type: string
 *          Experiance:
 *           type: string
 *          JobCompleted:
 *           type: string
 *          Language:
 *           type: string
 *          Payment:
 *           type: string
 *          Working:
 *           type: string
 *          Cost:
 *           type: string
 *          Available:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully updated
 */
myapp.put('/v1/editworkdetail/:eid',function (req,res) {
    // console.log(req.params.eid);
    employeemodel.Employee.update({
       Skill: req.body.Skill,
        Experiance: req.body.Experiance,
        JobCompleted: req.body.JobCompleted,
        Language: req.body.Language,
        Payment: req.body.Payment,
        Working: req.body.Working,
        Cost:req.body.Cost,
        Available:req.body.Available

    }, {
        where: {
            employeeId: req.params.eid
        }
    })
        .then(function(result) {
            // console.log(result)
            res.status(201);
            res.send({
                "message": "Employee Work Detail Updated successfully"
            })
        })
        .catch(function(err) {

        })
});

myapp.put('/v1/testupdate/:eid',function (req,res) {
    // console.log(req.params.eid);
    employeemodel.Employee.update({
        Skill: req.body.Skill,
        Experiance: req.body.Experiance,
        JobCompleted: req.body.JobCompleted,
        Language: req.body.Language,
        Payment: req.body.Payment,
        Working: req.body.Working,
        Cost:req.body.Cost,
        Available:req.body.Available

    }, {
        where: {
            employeeId: req.params.eid
        }
    })
        .then(function(result) {
            // console.log(result)
            res.status(201);
            res.send({
                "message": "Employee Work Detail Updated successfully"
            })
        })
        .catch(function(err) {

        })
});

/**
 * @swagger
 * /v1/deleteworkdetail/{employee_id}:
 *   delete:
 *     tags:
 *       - Employee
 *     description: Deletes a single user Employee Detail
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: employee_id
 *         description: user's employee_id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted Work Detail
 */
myapp.delete('/v1/deleteworkdetail/:employee_id',function (req,res) {
    // console.log(req.params.employee_id);
    employeemodel.Employee.destroy({
        where:{employeeId:req.params.employee_id}

    }).then(function (result) {
        res.status(200)
        res.send({"message":"Work Detail Deleted successfully"})
    }).catch(function (err) {
            next({"status":"500","message":"Error deleting work detail"})
        })

});

/**
 * @swagger
 * /v1/addtofav:
 *   post:
 *     tags:
 *      - Favourite
 *     name: Add Employee to Favourite
 *     summary: This API registers a detail of Employee for Hirer
 *     description: Add to Favourite whom you want for Future
 *     produces: application/json
 *     parameters:
 *     - name: favourite
 *       in: body
 *       schema:
 *         type: object
 *         properties:
 *          favId:
 *           type: string
 *          employeeId:
 *           type: string
 *          userId:
 *           type: string
 *     responses:
 *       201:
 *         description: Add to Favourite Successfully
 *       500:
 *        description: DB Error
 *
 */
myapp.post('/v1/addtofav',favouriteController.favouriteDetail,function(req,res){

    res.status(201);
    res.send({"message":"Added to Favourite"})

});

/**
 * @swagger
 * /v1/favourite/{user_id}:
 *   get:
 *     tags:
 *       - Favourite
 *     name: Find Favourite of particular hirer users
 *     summary: Finds favourite employee for hirer
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A favouirte list for hirer
 */
myapp.get('/v1/favourite/:user_id',function (req,res) {
    // console.log(req.params.user_id);
    favmodel.Favourite.findAll({
        where: {userId: req.params.user_id}
    })
        .then(function (result) {
            // console.log(result);
            res.json(result);
        })
        .catch(function (err) {

        })
});

/**
 * @swagger
 * /v1/deletefavourite/{favid}:
 *   delete:
 *     tags:
 *       - Favourite
 *     description: Deletes a single user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: favid
 *         description: user's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
myapp.delete('/v1/deletefavourite/:fav_id',function (req,res) {
    // console.log(req.params.fav_id);
    favmodel.Favourite.destroy({
        where:{favId:req.params.fav_id}

    }).then(function (result) {
        res.status(200)
        res.send({"message":"Removed from favourite"})
    }).catch(function (err) {
        next({"status":"500","message":"Error deleting  favourited"})
    })

});

/**
 * @swagger
 * /v1/viewemployeedetail/{employee_id}:
 *   get:
 *     tags:
 *       - Employee
 *     name: Find Employee of particular employee users
 *     summary: Finds Employee detail of employee
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A Employee profile for employee
 */
myapp.get('/v1/viewemployeedetail/:employee_id',function (req,res) {
    // console.log(req.params.employee_id);
    employeemodel.Employee.findOne({
        where: {employeeId: req.params.employee_id}
    })
        .then(function (result) {
            // console.log(result);
            res.json(result);
        })
        .catch(function (err) {
            // res.send({"message":"Your work profile is empty.. Please registered your work profile"})
            // console.log('e');
        })
});

/**
 * @swagger
 * /v1/employeebook:
 *   post:
 *     tags:
 *      - Book
 *     name: Add Employee in your booking list
 *     summary: This API book Employee for Hirer
 *     description: Employee will then view the book detail and update status
 *     produces: application/json
 *     parameters:
 *     - name: favourite
 *       in: body
 *       schema:
 *         type: object
 *         properties:
 *          bookId:
 *           type: string
 *          employeeId:
 *           type: string
 *          hirerId:
 *           type: string
 *          status:
 *           type: string
 *     responses:
 *       201:
 *         description: Booking Successfull
 *       500:
 *        description: DB Error
 *
 */
myapp.post('/v1/employeebook',bookController.bookDetail,function(req,res){

    res.status(201);
    res.send({"message":"Successfully Hired"})

});

myapp.get('/v1/book/:user_id',function (req,res) {
    // console.log(req.params.user_id);
    bookmodel.Book.findAll({
        where:
            {hirerid: req.params.user_id}
    })
        .then(function (result) {
            // console.log(result);
            res.json(result);
        })
        .catch(function (err) {

        })
});


/**
 * @swagger
 * /v1/deletebook/{bookid}:
 *   delete:
 *     tags:
 *       - Book
 *     description: Deletes a Booking employee by hirer
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: bookid
 *         description: user's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
myapp.delete('/v1/deletebook/:book_id',function (req,res) {

    bookmodel.Book.destroy({
        where:{bookId:req.params.book_id}

    }).then(function (result) {
        res.status(200)
        res.send({"message":"Removed from favourite"})
    }).catch(function (err) {
        next({"status":"500","message":"Error deleting  favourited"})
    })

});

/**
 * @swagger
 * /v1/employeebookdetail/{employee_id}:
 *   get:
 *     tags:
 *       - Book
 *     name: Find book of particular employee users
 *     summary: Finds book detail for employee notifying who hired them
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A Employee Book profile for employee
 */
myapp.get('/v1/employeebookdetail/:user_id',function (req,res) {
    // console.log(req.params.user_id);
    bookmodel.Book.findAll({
        where:
            {userId: req.params.user_id}
    })
        .then(function (result) {
            // console.log(result);
            res.json(result);
        })
        .catch(function (err) {

        })
});

/**
 * @swagger
 * /v1/editbookstatus/{bookid}:
 *   put:
 *     tags:
 *      - Book
 *     description: Updates a Booking status and availability by employee user
 *     produces: application/json
 *     parameters:
 *     - name: bookid
 *       in: path
 *       description: id
 *     - name: user
 *       in: body
 *       schema:
 *         type: object
 *         properties:
 *          status:
 *           type: string
 *          Available:
 *           type:string
 *     responses:
 *       200:
 *         description: Successfully updated
 */
myapp.put('/v1/editbookstatus/:bookid',function (req,res) {
    // console.log(req.params.eid);
    bookmodel.Book.update({
        status:req.body.status,
        Available:req.body.Available,
    }, {
        where: {
            bookId: req.params.bookid
        }
    })
        .then(function(result) {
            // console.log(result)
            res.status(201);
            res.send({
                "message": "Status Updated successfully"
            })
        })
        .catch(function(err) {

        })
});

/*hosting uploads folder */

var publicDir = require('path').join(__filename,'/uploads');
myapp.use(express.static(publicDir));

myapp.use(express.static('public'));

//Serves all the request which includes /images in the url from Images folder
myapp.use('/uploads', express.static(__dirname + '/uploads'));


myapp.get("/uploads",function(req,res,next){
    res.send(publicDir)
});

myapp.post("/uploads",uploads.single('image'),function(req,res,next){
    // res.send(publicDir)
    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    res.json(req.file)


});

myapp.use(function (err,req,res,next) {
     res.status(err.status);
    res.send({"message":err.message});

    // console.log(err.status);
    // console.log(err.message);

});
myapp.listen(3000);

module.exports=myapp;
