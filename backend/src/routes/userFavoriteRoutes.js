const express = require('express');
const userFavoriteController = require('../controllers/userFavoriteController');

const router = express.Router();

router.get('/', userFavoriteController.getAllFavorites);

module.exports = router;
