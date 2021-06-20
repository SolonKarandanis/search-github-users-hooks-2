const db = require('../util/database');
const sqDb = require('../util/databaseSequelize');

exports.findById = (id)=>{
    return db.query(`select * from veconsum_new where id='${id}'`);
};

exports.findByEtos = (etos)=>{
   return db.query(`select * from veconsum_new where compid=${etos}`);
};

exports.findByCompid = (compid)=>{
   return db.query(`select * from veconsum_new where compid='${compid}'`);
};

exports.findAlll = () =>{
   return db.query('SELECT * FROM veconsum_new' );
};

exports.save = ()=>{

};

exports.delete = ()=>{

};

// db.connect();