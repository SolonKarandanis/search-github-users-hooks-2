const Sequelize =require('sequelize');

const sequelize = require('../util/databaseSequelize');

const Veconsum = sequelize.define('veconsum_new',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    compid:{
        type: Sequelize.STRING,
        allowNull:false,

    },
    barcode:{
        type: Sequelize.STRING,
        allowNull:false,
    },
    etos:{
        type: Sequelize.INTEGER,
        allowNull:false,
    },
    period:{
        type: Sequelize.STRING,
        allowNull:false,
    },
    production:{
        type: Sequelize.DOUBLE,
    },
    export:{
        type: Sequelize.DOUBLE,
    },
    stock:{
        type: Sequelize.DOUBLE,
    },
    import:{
        type: Sequelize.DOUBLE,
    }

});

module.exports = Veconsum;