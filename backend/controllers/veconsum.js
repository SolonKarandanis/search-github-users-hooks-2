const veconsumFacade = require('../facades/veconsum');

// Models
const Veconsum = require('../models/veconsum.model');
const VeconsumDetail = require('../models/veconsumDetail.model');
const VeconsumPercentages = require('../models/veconsumPercentages.model');

exports.findById = (req, res, next) =>{
    const veconsumId = req.params.veconsumId;
    veconsumFacade.findById(veconsumId).then((results)=>{
        if(results.length >0){
            return res.status(200).json(results.rows);
        }else{
            return res.status(404).json({message:'No data found'})
        }
    }).catch(err => console.log(err));
};

exports.findByCompid=(req, res, next)=>{
    const compid = req.params.compid;
    veconsumFacade.findByCompid(compid).then((results)=>{
        if(results.length >0){
            return res.status(200).json(results.rows);
        }else{
            return res.status(404).json({message:'No data found'})
        }
    }).catch(err => console.log(err));
};

exports.findByEtos=(req, res, next)=>{
    const etos =req.params.etos;
    veconsumFacade.findByEtos(parseInt(etos)).then((results)=>{
        if(results.length >0){
            return res.status(200).json(results.rows);
        }else{
            return res.status(404).json({message:'No data found'})
        }
    }).catch(err => console.log(err));
};

exports.findAlll = (req, res, next) =>{
    veconsumFacade.findAlll().then((results)=>{
        if(results.length >0){
            return res.status(200).json(results.rows);
        }else{
            return res.status(404).json({message:'No data found'})
        }
    }).catch(err => console.log(err));
}



// with ORM

exports.findAlllPgbl=(req, res, next)=>{
    const page =req.query.page;
    const rows = req.query.page;
    // Veconsum.find()
    // .skip(page-1)
    // .then()
    // .catch(err => console.log(err))
};

exports.createVeconsum =(req, res, next)=>{
    const veconsum =req.body;
    Veconsum.create({
        id: veconsum.id,
        compid: veconsum.compid,
        barcode: veconsum.barcode,
        etos: veconsum.etos,
        period: veconsum.period,
        production: veconsum.production,
        export: veconsum.export,
        stock: veconsum.stock,
        import: veconsum.import
    })
    .then(result=>{
        if(result.length ===0){
            const error = new Error('No data found');
            error.code = 404;
            next(error);
        }
        return res.status(200).json(result);
    })
    .catch(err => console.log(err));

};



exports.editVeconsum=(req,res,next)=>{
    const veconsum =req.body;
    const veconsumId = req.params.veconsumId;
    Veconsum.findByPk(+veconsumId)
    .then((product)=>{
        if(veconsum.production){
            product.production= veconsum.production;
        }
        if(veconsum.export){
            product.export=veconsum.export;
        }
        if(veconsum.stock){
            product.stock=veconsum.stock;
        }
        if(veconsum.import){
            product.import=veconsum.import;
        }
        return product.save();
    })
    .then(result =>{
        if(result.length ===0){
            const error = new Error('No data found');
            error.code = 404;
            next(error);
        }
        return res.status(200).json(result);
    })
    .catch(err => console.log(err));
};

exports.deleteVeconsum = (req,res,next)=>{
    const veconsumId = req.params.veconsumId;
    Veconsum.findByPk(+veconsumId)
    .then(veconsum =>{
        return veconsum.destroy();
    })
    .then(result=>{

    })
    .catch(err => console.log(err));
};

exports.viewVeconsumDto = (req, res, next)=>{

};

exports.createVeconsumDto =(req, res, next) =>{

};

exports.deleteVeconsumDto = (req, res, next)=>{

};

exports.fetchAll= (req, res, next) =>{
    Veconsum.findAll()
    .then((results)=>{
        if(results.length ===0){
            const error = new Error('No data found');
            error.code = 404;
            next(error);
        }
        return res.status(200).json(results);
    })
    .catch(err => console.log(err));
};

exports.fetchById=(req,res,next)=>{
    const veconsumId = req.params.veconsumId;
    // Veconsum.findAll({ where:{id:+veconsumId}})
    Veconsum.findByPk(+veconsumId)
    .then((results)=>{
        if(results.length ===0){
            const error = new Error('No data found');
            error.code = 404;
            next(error);
        }
        return res.status(200).json(results);
        // if(results.length >0){
        //     return res.status(200).json(results);
        // }else{
        //     return res.status(404).json({message:'No data found'})
        // }
    })
    .catch(err => console.log(err));
};

/////////////////////////// VeconsumDetail CRUD//////////////////////////////////////////////////

exports.findDetailById = (req, res, next) =>{
    const veconsumDetailId = req.params.veconsumDetailId;
    VeconsumDetail.findByPk(+veconsumDetailId)
    .then((results)=>{
        if(results.length ===0){
            const error = new Error('No data found');
            error.code = 404;
            next(error);
        }
        return res.status(200).json(results);
    })
    .catch(err => console.log(err));
};

exports.findDetailsByVeconsumId= (req, res, next)=>{
    const veconsumId = req.params.veconsumId;
    VeconsumDetail.findAll({ where:{veconsum_id:+veconsumId}})
    .then((results)=>{
        if(results.length ===0){
            const error = new Error('No data found');
            error.code = 404;
            next(error);
        }
        return res.status(200).json(results);
    })
    .catch(err => console.log(err));
};

exports.createVeconsumDetail = (req, res, next)=>{
    const veconsumDetail =req.body;
    VeconsumDetail.create({
        id: veconsumDetail.id,
        veconsum_id: veconsumDetail.veconsum_id,
        marketcategory: veconsumDetail.marketcategory,
        quant: veconsumDetail.quant,
    })
    .then(result=>{
        return res.status(200).json(result);
    })
    .catch(err => {
        // console.log(err.errors);
        const error = new Error(err.message);
        error.code = 500;
        next(error);
    });
};

exports.editVeconsumDetail= (req, res, next) =>{
    const veconsumDetail =req.body;
    const veconsumDetailId = req.params.veconsumDetailId;
    VeconsumDetail.update({
        id: veconsumDetail.id,
        veconsum_id: veconsumDetail.veconsum_id,
        marketcategory: veconsumDetail.marketcategory,
        quant: veconsumDetail.quant,
    })
    .then(result=>{
        return res.status(200).json(result);
    })
    .catch(err =>{
        const error = new Error(err.message);
        error.code = 500;
        next(error);
    })
};

exports.deleteVeconsumDetail = (req, res, next)=>{
    const veconsumDetailId = req.params.veconsumDetailId;
    VeconsumDetail.findByPk(+veconsumDetailId)
    .then(veconsumDetail =>{
        return veconsumDetail.destroy();
    })
    .then(result=>{
        next();
    })
    .catch(err => {
        const error = new Error('deleting failed');
        error.httpStatusCode=500;
        return next(error);
    });
};

exports.deleteVeconsumDetailsByVeconsumId = (req, res, next)=>{
    const veconsumId = req.params.veconsumId;
    VeconsumDetail.destroy({ where:{veconsum_id:+veconsumId}})
    .then(result=>{
        next();
    })
    .catch(err => console.log(err));;
};

/////////////////////////// VeconsumPercentages CRUD//////////////////////////////////////////////////

exports.findPercentageById=(req, res, next)=>{
    const veconsumPercentageId = req.params.veconsumPercentageId;
    VeconsumPercentages.findByPk(+veconsumPercentageId)
    .then((results)=>{
        if(results.length ===0){
            const error = new Error('No data found');
            error.code = 404;
            next(error);
        }
        return res.status(200).json(results);
    })
    .catch(err => console.log(err));
};

exports.findPercentagesByVeconsumId=(req, res, next)=>{
    const veconsumId = req.params.veconsumId;
    VeconsumPercentages.findAll({ where:{veconsum_id:+veconsumId}})
    .then((results)=>{
        if(results.length ===0){
            const error = new Error('No data found');
            error.code = 404;
            next(error);
        }
        return res.status(200).json(results);
    })
    .catch(err => console.log(err));
};

exports.createVeconsumPercentage=(req, res, next)=>{
    const veconsumPercentage =req.body;
    VeconsumPercentages.create({
        id: veconsumPercentage.id,
        veconsum_id: veconsumPercentage.veconsum_id,
        vekind: veconsumPercentage.vekind,
        percentage: veconsumPercentage.percentage,
    })
    .then(result=>{
        // console.log(result);
    })
    .catch(err => console.log(err));
};

exports.deleteVeconsumPercentage = (req, res, next)=>{
    const veconsumPercentageId = req.params.veconsumPercentageId;
    VeconsumPercentages.findByPk(+veconsumPercentageId)
    .then(veconsumPercentage =>{
        return veconsumPercentage.destroy();
    })
    .then(result=>{

    })
    .catch(err => console.log(err));
};

exports.deleteVeconsumPercentagesByVeconsumId = (req, res, next)=>{
    const veconsumId = req.params.veconsumId;
    VeconsumPercentages.findAll({ where:{veconsum_id:+veconsumId}})
    .then(veconsPercentList=>{
        console.log(veconsPercentList);
    })
    .then(result=>{

    })
    .catch(err => console.log(err));;
};

exports.uploadCsv =(req, res, next)=>{
    const file =req.file;
    if(!file){
       return res.status(422); 
    }
};