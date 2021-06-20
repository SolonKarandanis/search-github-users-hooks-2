const jwt = require('jsonwebtoken');

module.exports= (req,res,next)=>{
    if(req.method ==='OPTIONS'){
        return next();
    }
    try{
        const token =req.headers.authorization.split(' ')[1];
        // token.split(' ')[1]; // Bearer TOKEN
        if(!token){
            throw new Error('Authentication failed');
        }
        const decodedToken = jwt.verify(token,'supersecret_dont_share_key');
        req.userData ={username:decodedToken.username};
        next();
    }catch(error){
        // console.log(error);
        error = new Error('Authentication failed');
        error.code = 401;
        return next(error);
    }
};