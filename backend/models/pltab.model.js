const Sequelize =require('sequelize');

const sequelize = require('../util/databaseSequelize');

const Pltab= sequelize.define('pltab',{
    plcolumn:{
        type: Sequelize.STRING,
        primaryKey: true
    },
    plcode:{
        type: Sequelize.STRING,
        primaryKey: true
    },
    pllang:{
        type: Sequelize.STRING,
        primaryKey: true
    },
    plstext:{
        type: Sequelize.STRING,
    },
    pltext:{
        type: Sequelize.STRING,
    },
    sporcode:{
        type: Sequelize.STRING,
    },
    selectable:{
        type: Sequelize.STRING,
    },
    seq:{
        type: Sequelize.STRING,
    },
    htmlstyle:{
        type: Sequelize.STRING,
    },
    status:{
        type: Sequelize.STRING,
    },
    backcolor:{
        type: Sequelize.STRING,
    },
    fontcolor:{
        type: Sequelize.STRING,
    },
});

module.exports = Pltab;