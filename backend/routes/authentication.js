const express = require('express');
const {check} = require('express-validator');


const authController = require('../controllers/authentication');

const router = express.Router();

router.get('/login',authController.login);
router.get('/sendMail',authController.sendMail);

router.post('/signup',check('email').isEmail(),authController.signUp);

module.exports = router;