const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller.js')

router.post('/login',userController.login);
router.post('/signUp',userController.signUp);

module.exports = router;