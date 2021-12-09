const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller.js')
router.post('/login',userController.login);
router.post('/signUp',userController.signUp);
router.use('/profile',require('./profile'));

module.exports = router;