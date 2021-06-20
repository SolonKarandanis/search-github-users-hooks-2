const Sequelize =require('sequelize');
const sequelize = require('../util/databaseSequelize');

const Users = sequelize.define('users',{
    username:{
        type: Sequelize.STRING,
        allowNull:false,
        primaryKey: true
    },
    password:{
        type: Sequelize.STRING,
        allowNull:false,
    },
    first_name:{
        type: Sequelize.STRING,
        allowNull:false,
    },
    last_name:{
        type: Sequelize.STRING,
        allowNull:false,
    },
    email:{
        type: Sequelize.STRING,
    },
    phone:{
        type: Sequelize.STRING,
    },
    fax:{
        type: Sequelize.STRING, 
    },
    status:{
        type: Sequelize.STRING,
    }
});

module.exports =Users;