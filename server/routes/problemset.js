const express = require('express');
const router = express.Router();
const problemsetController = require('../controllers/problemset_controller.js');
router.get('/filter',problemsetController.getFilterData);
module.exports = router;