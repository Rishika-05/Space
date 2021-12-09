const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller.js')
router.post('/login',userController.login);
router.post('/signUp',userController.signUp);
router.use('/user',require('./user'));

module.exports = router;