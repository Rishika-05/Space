const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller.js');
const codeController = require('../controllers/code_controller.js');
const allUserController = require('../controllers/alluser_controller');
router.post('/login', userController.login);
router.post('/signUp', userController.signUp);
router.get('/leaderboard', allUserController.leaderboard);
router.use('/profile', require('./profile'));
router.use('/update', require('./update'));
router.use('/admin', require('./admin'));
router.use('/problemset', require('./problemset'));
router.use('/problemPage', require('./problemPage'));
router.post('/run', codeController.getResult);
router.post('/solution',codeController.solutionLog)
module.exports = router;