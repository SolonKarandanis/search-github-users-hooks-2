const express = require('express');

const veconsumController = require('../controllers/veconsum');
const fileUpload = require('../middleware/file-upload');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

// routes executed only with valid jwt
router.use(checkAuth);

router.post('/upload',fileUpload.single('csv'),veconsumController.uploadCsv);

router.get('/getAll', veconsumController.fetchAll);
router.get('/:veconsumId', veconsumController.fetchById);
router.get('/byComp/:compid', veconsumController.findByCompid);
router.get('/byEtos/:etos', veconsumController.findByEtos);

// with ORM
router.post('/create',veconsumController.createVeconsum);
router.get('/get',veconsumController.fetchAll);
router.get('/getById/:veconsumId',veconsumController.fetchById);
router.put('/getById/:veconsumId',veconsumController.editVeconsum);
router.delete('/getById/:veconsumId',veconsumController.deleteVeconsum);

/////////////////////////// VeconsumDetail CRUD//////////////////////////////////////////////////
router.get('/detail/getById/:veconsumDetailId',veconsumController.findDetailById);
router.get('/detail/getByVeconsumId/:veconsumId',veconsumController.findDetailsByVeconsumId);
router.post('/detail/create',veconsumController.createVeconsumDetail);
router.patch('/detail/edit/:veconsumDetailId',veconsumController.editVeconsumDetail);
router.delete('/detail/deleteById/:veconsumDetailId',veconsumController.deleteVeconsumDetail);
router.delete('/detail/deleteByVeconsumId/:veconsumId',veconsumController.deleteVeconsumDetailsByVeconsumId);

/////////////////////////// VeconsumPercentages CRUD//////////////////////////////////////////////////
router.get('/percent/getById/:veconsumPercentageId',veconsumController.findPercentageById);
router.get('/percent/getByVeconsumId/:veconsumId',veconsumController.findPercentagesByVeconsumId);
router.post('/percent/create',veconsumController.createVeconsumPercentage);
router.delete('/percent/deleteById/:veconsumPercentageId',veconsumController.deleteVeconsumPercentage);
router.delete('/percent/deleteByVeconsumId/:veconsumId',veconsumController.deleteVeconsumPercentagesByVeconsumId);

module.exports = router;