var db=require('../configs/databaseconfigs');

// console.log(db.sequelize);

const Employee = db.sequelize.define('Employee', {
        // attributes
        employeeId:{
            type:db.Sequelize.INTEGER,
            allowNull: false,
            autoIncrement:true,
            primaryKey:true
        },
        userId: {
        type: db.Sequelize.INTEGER,
        allowNull: false
        },
        Skill: {
            type: db.Sequelize.STRING,
            allowNull: false
        },
        Experiance: {
            type: db.Sequelize.STRING,
            allowNull: false
        },
        JobCompleted: {
            type: db.Sequelize.STRING,
            allowNull: false
        },
        Language: {
            type: db.Sequelize.STRING,
            allowNull: false

        },
        Payment: {
            type: db.Sequelize.STRING,
            allowNull: false
        },
        Working: {
            type: db.Sequelize.STRING,
            allowNull: false
        },
        Cost: {
            type: db.Sequelize.INTEGER,
            allowNull: false
        },
         Available: {
        type: db.Sequelize.STRING,
        allowNull: false
        },
    image: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
        firstName: {
            type: db.Sequelize.STRING,
            allowNull: false
        },
        lastName: {
            type: db.Sequelize.STRING,
            allowNull: false
        },
        phone: {
            type: db.Sequelize.STRING,
            allowNull: false
        },
        state: {
            type: db.Sequelize.STRING,
            allowNull: false
        },
        city: {
            type: db.Sequelize.STRING,
            allowNull: false
        },
        address: {
            type: db.Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: db.Sequelize.STRING,
            allowNull: false

        },
    gender: {
        type: db.Sequelize.STRING,
        allowNull: false

    }

    }, {
        freezeTableName:true,
        tableName: 'Employee'
    }
);

//force true only at first attempt, otherwise it tends to create new table
Employee.sync({force:false})
    .then(function (result) {
        // console.log(result);
    })
    .catch(function (err) {
        console.log(err);
    })

module.exports={
    Employee
}