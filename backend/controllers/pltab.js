const pltabFacade = require('../facades/pltab');

// Models
const Pltab = require('../models/pltab.model');

exports.getDescription =(req, res, next) =>{
    const {plcolumn ,plcode,pllang} =req.query;
    Pltab.findAll({ where:{plcolumn:plcolumn, plcode: plcode,pllang:pllang}})
    .then(results=>{
        if(results.length ===0){
            const error = new Error('No data found');
            error.code = 404;
            next(error);
        }
        return res.status(200).json(results);
    })
    .catch(err => console.log(err));
};

exports.getPltabs =(req, res, next) =>{
    const {plcolumn ,pllang} =req.query;
    Pltab.findAll({ where:{plcolumn:plcolumn,pllang:pllang}})
    .then(results=>{
        if(results.length ===0){
            const error = new Error('No data found');
            error.code = 404;
            next(error);
        }
        return res.status(200).json(results);
    })
    .catch(err => console.log(err));
};