const Sequelize =require('sequelize');

const sequelize = require('../util/databaseSequelize');

const VeconsumPercentages = sequelize.define('veconsum_percentages',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    veconsum_id:{
        type: Sequelize.INTEGER,
    },
    vekind:{
        type: Sequelize.STRING,
    },
    percentage:{
        type: Sequelize.DOUBLE,
    },
    
});

module.exports = VeconsumPercentages;