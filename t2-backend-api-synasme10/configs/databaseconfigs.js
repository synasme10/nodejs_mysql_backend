var Sequelize = require('sequelize');

var sequelize = new Sequelize('daywork', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging:false
});

sequelize.authenticate()
    .then(function()  {
         console.log('Database Connection has been established successfully.');
    })
    .catch(function (err) {
        console.log('Unable to connect to the database:', err);
    });

// const db={};
// db.Sequelize=Sequelize;
// db.sequelize=sequelize;
//
// //Models
// db.users=require('../models/UsersModel')(Sequelize,sequelize);
// db.employees=require('../models/EmployeeModel')(Sequelize,sequelize);
//
// //Relation
// db.users.hasMany(db.employees);
// db.employees.belongsTo(db.users);
module.exports={
    Sequelize,
    sequelize,

}