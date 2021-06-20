const express = require('express');

const pltabController = require('../controllers/pltab');

const router = express.Router();

router.get('/getdesc',pltabController.getDescription);
router.get('/getpls',pltabController.getPltabs);

module.exports = router;