const multer =require('multer');

const fileStorage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'csv');
    },
    filename: (req,file,cb)=>{
        cb(null,`${new Date().toISOString}-${file.originalname}`);
    },
});

const fileFilter = (req,file,cb) =>{
    if(file.mimetype=== 'csv'){
        // then accept the file
        cb(null,true);
    }else{
        cb(null,false);
    }
    
};

const fileUpload = multer({storage:fileStorage,fileFilter:fileFilter});

module.exports = fileUpload;