const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller.js');
const codeController = require('../controllers/code_controller.js')
router.post('/login', userController.login);
router.post('/signUp', userController.signUp);
router.use('/profile', require('./profile'));
router.use('/update', require('./update'));
router.use('/admin', require('./admin'));
router.use('/problemset', require('./problemset'));
router.use('/problemPage', require('./problemPage'));
router.post('/run', codeController.getResult);
module.exports = router;