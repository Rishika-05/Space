const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin_controller.js');
router.post('/questionUpload',adminController.questionUpload);


module.exports = router;