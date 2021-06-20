const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/databaseSequelize');
const helmet = require('helmet');
const csrf = require('csurf');

// for handling multipart/form-data, which is primarily used for uploading files
// const multer =require('multer');


const app = express();
// default settings for csrf
const csrfProtection = csrf();

// !!!!!!!!!!!!!!!!!!!!!!read about helmet
// app.use(helmet());

// csrf needs to be configured!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// app.use(csrfProtection);
// app.use((req,res,next)=>{
//     res.locals.csrfToken = req.csrfToken();
//     next();
// });

// routes imports
const veconsumRoutes = require('./routes/veconsum');
const authRoutes = require('./routes/authentication');
const plRoutes = require('./routes/pltab');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// <input name="csv">
// options
// fileUpload.single('csv');
// app.use(multer({storage:fileStorage,fileFilter:fileFilter}).single('csv'));



// relations
// Product.belongsTo(User,{constraints:true,onDelete:'CASCADE'});

// handling cors
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PATCH,DELETE')
    next();
});

app.use('/veconsum',veconsumRoutes);
app.use('/auth',authRoutes);
app.use('/pltab',plRoutes);

// error redirect
app.use((error,req,res,next)=>{
    res.redirect('/500');
});
app.use((error,req,res,next)=>{
    // checks if a response has already been sent
    if(res.headerSent){
        return next(error);
    }
    res.status(error.code || 500).json({message:error.message || 'An Unknown Error occured'});
});

// sequelize.sync({
//     force : false , // To create table if exists , so make it false
//     alter : true // To update the table if exists , so make it true
// });

const server =app.listen(3500);
const io = require('socket.io')(server);