var db=require('../configs/databaseconfigs');

// console.log(db.sequelize);
// var User=this.sequelize.define('User',{})
//     ,Employee=this.sequelize.define('Employee',{});
//
// Employee.belongsTo(User);
const User = db.sequelize.define('User', {
    // attributes
    userId:{
        type:db.Sequelize.INTEGER,
        allowNull: false,
        autoIncrement:true,
        primaryKey:true
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
        gender: {
            type: db.Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: db.Sequelize.STRING,
            allowNull: false

        },
        password: {
            type: db.Sequelize.STRING,
            allowNull: false
        },
        usertype: {
            type: db.Sequelize.STRING,
            allowNull: false
        }

}, {
    freezeTableName:true,
    tableName: 'Users'
}
);

//force true only at first attempt, otherwise it tends to create new table
User.sync({force:false})
.then(function (result) {
    // console.log(result);
})
.catch(function (err) {
    console.log(err);
})

module.exports={
    User
}