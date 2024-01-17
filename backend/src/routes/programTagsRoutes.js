const express = require('express');
const programTagsController = require('../controllers/programTagsController');

const router = express.Router();

router.get('/', programTagsController.getProgramTags);

module.exports = router;
