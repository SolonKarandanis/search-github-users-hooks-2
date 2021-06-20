const authFacade = require('../facades/authentication');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const {validationResult} =require('express-validator');
const jwt = require('jsonwebtoken');

const Users = require('../models/auth.model');

const transporter = nodemailer.createTransport(sendgridTransport({
    auth:{
        api_key:'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',
    }
}));

exports.login = (req, res, next)=>{
    const {username,password}= req.query
    // console.log(user);
    Users.findOne({ where:{username:username, password:password}})
    .then(results=>{
        if(results.length ===0){
            const error = new Error('No data found');
            error.code = 404;
            next(error);
        }
        let token;
        try{
            token = jwt
                .sign({username:results.username},'supersecret_dont_share_key',{expiresIn:'5h'});
        }catch(error){

        }
        
        return res.status(200).json({results,token});
    })
    .catch(err => console.log(err));
};

exports.sendMail = (req,res,next) =>{
    return transporter.sendMail({
        to: 'kostas@mimerhellas.com',
        from: 'solon@mimerhellas.com',
        subject: 'Success',
        html:'<h1>Success</h1>'
    })
    .catch(err => console.log(err));
};

exports.signUp = (req,res,next)=>{
    const errors = validationResult(req);
};