const express = require('express');
const router = express.Router();
const problemPageController = require('../controllers/problemPage_controller');

router.get('/:id', problemPageController.pPage)

module.exports = router;