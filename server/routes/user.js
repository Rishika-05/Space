const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller.js')

app.post('./login',userController.login);
app.post('./signUp',userController.signUp);

module.exports = router;