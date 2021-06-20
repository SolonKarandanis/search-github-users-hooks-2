const Sequelize = require('sequelize');
// DATABASE_URL = 'postgres://grevis:mimer@disdb.mimerhellas.local/grevis';

// const sequelize = new Sequelize(DATABASE_URL);
const sequelize = new Sequelize('grevis','grevis','mimer',{
    // host: "disdb.mimerhellas.local",
    host: "localhost",
    dialect: 'postgres',
    define: {
        timestamps: false,
        //prevent sequelize from pluralizing table names
        freezeTableName: true
    }
});
module.exports = sequelize;