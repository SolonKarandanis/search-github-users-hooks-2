const Sequelize =require('sequelize');

const sequelize = require('../util/databaseSequelize');

const VeconsumDetail = sequelize.define('veconsum_detail',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: true,
    },
    veconsum_id:{
        type: Sequelize.INTEGER,
    },
    marketcategory:{
        type: Sequelize.STRING,
    },
    quant:{
        type: Sequelize.DOUBLE,
    },
    
});

module.exports = VeconsumDetail;