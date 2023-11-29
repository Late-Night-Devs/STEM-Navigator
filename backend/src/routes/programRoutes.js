const express = require('express');
const programController = require('../controllers/programController');

const router = express.Router();

router.get('/', programController.getPrograms);
router.post('/filter', programController.filterPrograms);

module.exports = router;
