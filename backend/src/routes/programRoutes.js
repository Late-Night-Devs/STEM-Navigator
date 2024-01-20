const express = require('express');
const programController = require('../controllers/programController');
//path url/programs/...
const router = express.Router();

router.get('/', programController.getPrograms);
router.post('/filter', programController.filterPrograms);

// delete all associated entries to proID and its self based on programId params
router.delete("/:programIDs", programController.deleteProgram);

module.exports = router;