var db=require('../configs/databaseconfigs');

// console.log(db.sequelize);

const Book = db.sequelize.define('BookEmployee', {
        // attributes
        bookId:{
            type:db.Sequelize.INTEGER,
            allowNull: false,
            autoIncrement:true,
            primaryKey:true
        },
    hirerid: {
            type: db.Sequelize.INTEGER,
    allowNull: false
},
    hirerfirstName: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    hirerlastName: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    hirerphone: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    hirercity: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    hireraddress: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    hireremail: {
        type: db.Sequelize.STRING,
        allowNull: false

    },
    hirerimage: {
    type: db.Sequelize.STRING,
        allowNull: false}
,
    employeeId: {
        type: db.Sequelize.INTEGER,
        allowNull: false
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
    },
    status: {
        type: db.Sequelize.STRING,
        allowNull: false
    }

    }, {
        freezeTableName:true,
        tableName: 'BookEmployee'
    }
);

//force true only at first attempt, otherwise it tends to create new table
Book.sync({force:false})
    .then(function (result) {
        // console.log(result);
    })
    .catch(function (err) {
        console.log(err);
    })

module.exports={
    Book
}